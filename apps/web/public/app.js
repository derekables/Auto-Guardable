const video = document.querySelector("#camera");
const canvas = document.querySelector("#frameCanvas");
const startCameraButton = document.querySelector("#startCamera");
const scanFrameButton = document.querySelector("#scanFrame");
const simulateButton = document.querySelector("#simulatePerson");
const cameraState = document.querySelector("#cameraState");
const videoPlaceholder = document.querySelector("#videoPlaceholder");
const systemStatus = document.querySelector("#systemStatus");

const openingTime = document.querySelector("#openingTime");
const closingTime = document.querySelector("#closingTime");
const announceAfterHours = document.querySelector("#announceAfterHours");
const cooldownSeconds = document.querySelector("#cooldownSeconds");
const savePolicyButton = document.querySelector("#savePolicy");

const peopleCount = document.querySelector("#peopleCount");
const confidence = document.querySelector("#confidence");
const observationSummary = document.querySelector("#observationSummary");
const decisionReason = document.querySelector("#decisionReason");
const announcementText = document.querySelector("#announcementText");
const decisionMeta = document.querySelector("#decisionMeta");
const actionBadge = document.querySelector("#actionBadge");
const speakButton = document.querySelector("#speak");
const eventList = document.querySelector("#eventList");
const resetLogButton = document.querySelector("#resetLog");

let stream = null;
let latestAnnouncement = null;

startCameraButton.addEventListener("click", startCamera);
scanFrameButton.addEventListener("click", scanFrame);
simulateButton.addEventListener("click", simulateDetection);
savePolicyButton.addEventListener("click", savePolicy);
speakButton.addEventListener("click", speakAnnouncement);
resetLogButton.addEventListener("click", resetLog);

loadStatus();
loadEvents();

async function startCamera() {
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "environment", width: { ideal: 1280 }, height: { ideal: 720 } },
      audio: false,
    });
    video.srcObject = stream;
    videoPlaceholder.hidden = true;
    cameraState.textContent = "Camera running";
    scanFrameButton.disabled = false;
    startCameraButton.textContent = "Restart camera";
  } catch (error) {
    cameraState.textContent = "Camera unavailable";
    showError(error.message);
  }
}

async function scanFrame() {
  if (!video.videoWidth) return showError("The camera has not produced a frame yet.");
  const maxWidth = 960;
  const scale = Math.min(1, maxWidth / video.videoWidth);
  canvas.width = Math.round(video.videoWidth * scale);
  canvas.height = Math.round(video.videoHeight * scale);
  const context = canvas.getContext("2d");
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  const imageData = canvas.toDataURL("image/jpeg", 0.72);

  await runAnalysis("/api/analyze", { imageData });
}

async function simulateDetection() {
  await runAnalysis("/api/simulate", {});
}

async function runAnalysis(endpoint, body) {
  setBusy(true);
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || "Request failed.");
    renderDecision(result.observation, result.decision);
    await loadEvents();

    if (result.decision?.announcement) {
      latestAnnouncement = result.decision.announcement;
      speakButton.disabled = false;
      await speakAnnouncement();
    } else {
      latestAnnouncement = null;
      speakButton.disabled = true;
    }
  } catch (error) {
    showError(error.message);
  } finally {
    setBusy(false);
  }
}

async function savePolicy() {
  const body = {
    openingTime: openingTime.value,
    closingTime: closingTime.value,
    announceAfterHours: announceAfterHours.checked,
    cooldownSeconds: Number(cooldownSeconds.value),
  };
  const response = await fetch("/api/policy", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const result = await response.json();
  if (!response.ok) return showError(result.error || "Could not save policy.");
  systemStatus.textContent = "Policy saved";
  await loadEvents();
}

async function speakAnnouncement() {
  if (!latestAnnouncement) return;
  if (!("speechSynthesis" in window)) {
    return showError("This browser does not expose speech synthesis.");
  }

  speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(latestAnnouncement);
  utterance.rate = 0.95;
  utterance.pitch = 1;
  utterance.onend = async () => {
    await fetch("/api/announcement-played", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: latestAnnouncement }),
    });
    await loadEvents();
  };
  speechSynthesis.speak(utterance);
}

async function loadStatus() {
  try {
    const response = await fetch("/api/status");
    const status = await response.json();
    if (!response.ok) throw new Error(status.error);
    systemStatus.textContent = status.ai.configured
      ? "AI: " + status.ai.model
      : "AI: demo mode";

    openingTime.value = status.policy.openingTime;
    closingTime.value = status.policy.closingTime;
    announceAfterHours.checked = status.policy.announceAfterHours;
    cooldownSeconds.value = status.policy.cooldownSeconds;
  } catch (error) {
    showError(error.message);
  }
}

async function loadEvents() {
  try {
    const response = await fetch("/api/events?limit=50");
    const result = await response.json();
    eventList.replaceChildren(...(result.events || []).map(renderEvent));
  } catch (error) {
    showError(error.message);
  }
}

function renderDecision(observation, decision) {
  peopleCount.textContent = observation?.personCount ?? 0;
  confidence.textContent = typeof observation?.confidence === "number"
    ? Math.round(observation.confidence * 100) + "%"
    : "—";
  observationSummary.textContent = observation?.summary || "No observation summary.";
  decisionReason.textContent = decision?.reason || "No decision reason.";
  announcementText.textContent = decision?.announcement || "No announcement scheduled.";
  decisionMeta.textContent = (observation?.provider || "unknown") + " · " + (observation?.model || "unknown");

  const label = String(decision?.action || "waiting").toUpperCase();
  actionBadge.textContent = label;
  actionBadge.className = "badge " + badgeClass(decision?.action);
}

function renderEvent(event) {
  const item = document.createElement("article");
  item.className = "event-item";

  const top = document.createElement("div");
  top.className = "event-top";

  const title = document.createElement("strong");
  title.textContent = event.type;

  const time = document.createElement("time");
  time.textContent = new Date(event.timestamp).toLocaleTimeString();

  const source = document.createElement("div");
  source.className = "event-source";
  source.textContent = event.source || "unknown";

  const pre = document.createElement("pre");
  pre.textContent = JSON.stringify(event.payload ?? {}, null, 2);

  top.append(title, time);
  item.append(top, source, pre);
  return item;
}

async function resetLog() {
  await fetch("/api/reset", { method: "POST" });
  latestAnnouncement = null;
  speakButton.disabled = true;
  await loadEvents();
}

function setBusy(busy) {
  scanFrameButton.disabled = busy || !stream;
  simulateButton.disabled = busy;
  savePolicyButton.disabled = busy;
  if (busy) systemStatus.textContent = "Working...";
}

function showError(message) {
  systemStatus.textContent = "Error: " + message;
  systemStatus.className = "status-pill error";
}

function badgeClass(action) {
  if (action === "announce") return "announce";
  if (action === "observe") return "observe";
  if (action === "cooldown") return "cooldown";
  return "neutral";
}
