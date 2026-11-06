import test from "node:test";
import assert from "node:assert/strict";
import { evaluateObservation, isWithinOperatingHours } from "./policy.js";

test("operating hours support ordinary daytime schedules", () => {
  assert.equal(isWithinOperatingHours(new Date("2026-01-01T12:00:00"), "08:00", "18:00"), true);
  assert.equal(isWithinOperatingHours(new Date("2026-01-01T20:00:00"), "08:00", "18:00"), false);
});

test("closed property produces a respectful announcement", () => {
  const result = evaluateObservation({
    observation: { personDetected: true, personCount: 1 },
    now: new Date("2026-01-01T22:00:00"),
  });
  assert.equal(result.action, "announce");
  assert.match(result.announcement, /currently closed/i);
});

test("open property does not intervene", () => {
  const result = evaluateObservation({
    observation: { personDetected: true, personCount: 1 },
    now: new Date("2026-01-01T12:00:00"),
  });
  assert.equal(result.action, "observe");
  assert.equal(result.announcement, null);
});
