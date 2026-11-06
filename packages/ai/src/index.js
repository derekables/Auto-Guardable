const DEFAULT_MODEL = process.env.AUTOGUARD_AI_MODEL || "gpt-6-astra";
const DEFAULT_BASE_URL = (process.env.OPENAI_BASE_URL || "https://api.openai.com/v1").replace(/\/$/, "");

export class DemoAIProvider {
  name = "demo";
  model = "deterministic-demo";

  async analyzeScene() {
    return {
      personDetected: true,
      personCount: 1,
      confidence: 1,
      summary: "Demo mode: a simulated person detection was supplied so the complete pipeline can be exercised without an API key.",
      provider: this.name,
      model: this.model,
    };
  }
}

export class OpenAIResponsesProvider {
  name = "openai-responses";

  constructor({ apiKey, model = DEFAULT_MODEL, baseUrl = DEFAULT_BASE_URL } = {}) {
    if (!apiKey) {
      throw new Error("OPENAI_API_KEY is required for the OpenAI provider.");
    }
    this.apiKey = apiKey;
    this.model = model;
    this.baseUrl = baseUrl.replace(/\/$/, "");
  }

  async analyzeScene({ imageDataUrl, context = {} } = {}) {
    if (typeof imageDataUrl !== "string" || !imageDataUrl.startsWith("data:image/")) {
      throw new Error("A camera frame data URL is required.");
    }

    const prompt = [
      "You are the visual observation component of Auto-Guardable.",
      "Analyze only what is visibly present in the image.",
      "Do not infer identity, intent, criminality, danger, homelessness, intoxication, emotion, disability, or protected characteristics.",
      "Do not make legal or threat determinations.",
      "Return ONLY valid JSON with these fields:",
      '{"personDetected":boolean,"personCount":integer,"confidence":number,"summary":string}',
      "personDetected means at least one clearly visible human figure is present.",
      "personCount is the number of visible people, using your best conservative estimate.",
      "confidence must be between 0 and 1.",
      "Operational context: " + JSON.stringify(context),
    ].join("\n");

    const response = await fetch(this.baseUrl + "/responses", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + this.apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: this.model,
        input: [
          {
            role: "user",
            content: [
              { type: "input_text", text: prompt },
              { type: "input_image", image_url: imageDataUrl, detail: "low" },
            ],
          },
        ],
      }),
      signal: AbortSignal.timeout(30000),
    });

    const bodyText = await response.text();
    if (!response.ok) {
      throw new Error("OpenAI Responses API " + response.status + ": " + bodyText.slice(0, 500));
    }

    let body;
    try {
      body = JSON.parse(bodyText);
    } catch {
      throw new Error("OpenAI returned a non-JSON response envelope.");
    }

    const outputText = typeof body.output_text === "string"
      ? body.output_text
      : extractOutputText(body);

    if (!outputText) {
      throw new Error("OpenAI response contained no output text.");
    }

    const parsed = parseJsonObject(outputText);
    return normalizeAnalysis(parsed, this.name, this.model);
  }
}

export function createAIProvider(env = process.env) {
  if (env.OPENAI_API_KEY) {
    return new OpenAIResponsesProvider({
      apiKey: env.OPENAI_API_KEY,
      model: env.AUTOGUARD_AI_MODEL || DEFAULT_MODEL,
      baseUrl: env.OPENAI_BASE_URL || DEFAULT_BASE_URL,
    });
  }
  return new DemoAIProvider();
}

export function parseJsonObject(text) {
  const trimmed = String(text ?? "").trim();
  if (!trimmed) throw new Error("AI output was empty.");

  try {
    return JSON.parse(trimmed);
  } catch {
    const start = trimmed.indexOf("{");
    const end = trimmed.lastIndexOf("}");
    if (start === -1 || end <= start) {
      throw new Error("AI output did not contain a JSON object.");
    }
    return JSON.parse(trimmed.slice(start, end + 1));
  }
}

function extractOutputText(body) {
  const chunks = [];
  for (const item of body?.output ?? []) {
    for (const content of item?.content ?? []) {
      if (typeof content?.text === "string") chunks.push(content.text);
    }
  }
  return chunks.join("\n").trim();
}

function normalizeAnalysis(value, provider, model) {
  const personDetected = Boolean(value?.personDetected);
  const personCount = Number.isInteger(value?.personCount)
    ? Math.max(0, value.personCount)
    : personDetected ? 1 : 0;
  const confidence = Number.isFinite(Number(value?.confidence))
    ? Math.min(1, Math.max(0, Number(value.confidence)))
    : 0;
  const summary = typeof value?.summary === "string"
    ? value.summary.trim().slice(0, 500)
    : "No scene summary was provided.";

  return {
    personDetected,
    personCount,
    confidence,
    summary,
    provider,
    model,
  };
}
