export const DEFAULT_POLICY = Object.freeze({
  openingTime: "08:00",
  closingTime: "18:00",
  announceAfterHours: true,
  cooldownSeconds: 120,
});

export function isWithinOperatingHours(now, openingTime, closingTime) {
  const minute = now.getHours() * 60 + now.getMinutes();
  const open = toMinute(openingTime);
  const close = toMinute(closingTime);

  if (open === close) return true;
  if (open < close) return minute >= open && minute < close;
  return minute >= open || minute < close;
}

export function evaluateObservation({
  observation,
  now = new Date(),
  policy = DEFAULT_POLICY,
  lastAnnouncementAt = null,
}) {
  if (!observation?.personDetected) {
    return {
      action: "none",
      reason: "No person was detected.",
      announcement: null,
      withinOperatingHours: isWithinOperatingHours(now, policy.openingTime, policy.closingTime),
    };
  }

  const withinOperatingHours = isWithinOperatingHours(
    now,
    policy.openingTime,
    policy.closingTime,
  );

  if (withinOperatingHours || !policy.announceAfterHours) {
    return {
      action: "observe",
      reason: withinOperatingHours
        ? "The property is within configured operating hours."
        : "After-hours announcements are disabled.",
      announcement: null,
      withinOperatingHours,
    };
  }

  if (lastAnnouncementAt) {
    const elapsedSeconds = (now.getTime() - lastAnnouncementAt.getTime()) / 1000;
    if (elapsedSeconds < policy.cooldownSeconds) {
      return {
        action: "cooldown",
        reason: "An announcement was already delivered " + Math.round(elapsedSeconds) + " seconds ago.",
        announcement: null,
        withinOperatingHours,
      };
    }
  }

  const personText = observation.personCount === 1 ? "person" : "people";
  return {
    action: "announce",
    reason: "Detected " + observation.personCount + " " + personText + " while the property is closed.",
    announcement: "Hello. This property is currently closed. Please leave the area. Thank you.",
    withinOperatingHours,
  };
}

function toMinute(value) {
  if (typeof value !== "string" || !/^([01]\d|2[0-3]):[0-5]\d$/.test(value)) {
    throw new Error("Invalid time value: " + value);
  }
  const [hour, minute] = value.split(":").map(Number);
  return hour * 60 + minute;
}
