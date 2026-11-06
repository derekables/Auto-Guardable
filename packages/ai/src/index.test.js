import test from "node:test";
import assert from "node:assert/strict";
import { DemoAIProvider, parseJsonObject } from "./index.js";

test("demo provider returns a usable observation", async () => {
  const provider = new DemoAIProvider();
  const result = await provider.analyzeScene();
  assert.equal(result.personDetected, true);
  assert.equal(result.personCount, 1);
  assert.equal(result.provider, "demo");
});

test("JSON parser accepts fenced/prose-wrapped model output", () => {
  const result = parseJsonObject("Here is the result:\n{\"personDetected\":true}");
  assert.deepEqual(result, { personDetected: true });
});
