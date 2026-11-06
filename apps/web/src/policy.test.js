import test from "node:test";
import assert from "node:assert/strict";
import { evaluateObservation, isWithinOperatingHours } from "./policy.js";

test("operating hours support ordinary daytime schedules", () => {
  assert.equal(isWithinOperatingHours(new Date("2026-01-01T12:00:00"), "08:00", "18:00"), true);
  assert.equal(isWithinOperatingHours(new Date("2026-01-01T20:00:00"), "08:00", "18:00"), false);
});

test("operating hours support schedules that cross midnight", () => {
  assert.equal(isWithinOperatingHours(new Date("2026-01-01T23:00:00"), "22:00", "06:00"), true);
  assert.equal(isWithinOperatingHours(new Date("2026-01-01T04:00:00"), "22:00", "06:00"), true);
  assert.equal(isWithinOperatingHours(new Date("2026-01-01T12:00:00"), "22:00", "06:00"), false);
});

test("closed property produces a respectful announcement", () => {
  const result = evaluateObservation({ observation: { personDetected: true, personCount: 1 }, now: new Date("2026-01-01T22:00:00") });
  assert.equal(result.action, "announce");
  assert.match(result.announcement, /currently closed/i);
});

test("open property does not intervene", () => {
  const result = evaluateObservation({ observation: { personDetected: true, personCount: 1 }, now: new Date("2026-01-01T12:00:00") });
  assert.equal(result.action, "observe");
  assert.equal(result.announcement, null);
});

test("non-person observations produce no action", () => {
  const result = evaluateObservation({ observation: { personDetected: false, personCount: 0 }, now: new Date("2026-01-01T22:00:00") });
  assert.equal(result.action, "none");
  assert.equal(result.announcement, null);
});

test("after-hours announcements can be disabled", () => {
  const result = evaluateObservation({
    observation: { personDetected: true, personCount: 1 },
    now: new Date("2026-01-01T22:00:00"),
    policy: { openingTime: "08:00", closingTime: "18:00", announceAfterHours: false, cooldownSeconds: 120 },
  });
  assert.equal(result.action, "observe");
  assert.equal(result.announcement, null);
});

test("announcement cooldown suppresses repeated intervention", () => {
  const result = evaluateObservation({
    observation: { personDetected: true, personCount: 1 },
    now: new Date("2026-01-01T22:01:00"),
    lastAnnouncementAt: new Date("2026-01-01T22:00:10"),
  });
  assert.equal(result.action, "cooldown");
  assert.equal(result.announcement, null);
});
