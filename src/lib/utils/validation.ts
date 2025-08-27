import { z } from "zod";
import { fields, steps } from "./stateMachine";
import { formSchema } from "../schema";

// Track fields the user actually saw (populate this in your renderer per step)
const everVisible = new Set<string>();
const root = formSchema;
export function getVisibleIds(
  stepId: "step1" | "step2" | "step3",
  data: any
): string[] {
  return steps[stepId].filter((id) => fields[id].visibleWhen(data));
}

export function getRequiredIds(visibleIds: string[], data: any): string[] {
  return visibleIds.filter((id) => fields[id].requiredWhen(data));
}

/**
 * Build a Zod schema that validates only the currently visible fields,
 * and makes non-required ones optional.
 */
function makeStepSchema(visibleIds: string[], requiredIds: string[]) {
  const requiredPart = root.pick(
    Object.fromEntries(requiredIds.map((k) => [k, true]))
  );
  const optionalPart = root
    .pick(
      Object.fromEntries(
        visibleIds.filter((k) => !requiredIds.includes(k)).map((k) => [k, true])
      )
    )
    .partial();
  // Merge: required keys stay required; optional keys are optional
  return z.object({}).merge(requiredPart).merge(optionalPart);
}

/**
 * Validate current step only.
 * - Returns { ok: true } or { ok: false, issues, fieldErrors }
 */
export function validateStep(stepId: "step1" | "step2" | "step3", data: any) {
  const visible = getVisibleIds(stepId, data);
  visible.forEach((id) => everVisible.add(id)); // record what the user actually saw
  const required = getRequiredIds(visible, data);
  const stepSchema = makeStepSchema(visible, required);
  const payload = pick(data, visible); // pick only visible keys from data
  const result = stepSchema.safeParse(payload);
  if (result.success) return { ok: true as const };
  return {
    ok: false as const,
    issues: result.error.issues,
    fieldErrors: result.error.flatten().fieldErrors,
  };
}

/**
 * Final validation:
 *  - Option A (what you asked for): validate ONLY what the user saw (everVisible).
 *  - Option B (policy-driven): recompute visibility from final data and validate those.
 * Pick one and stick to it; below uses everVisible.
 */
export function validateFinal(data: any) {
  const visible = Array.from(everVisible); // union across the journey
  const required = visible.filter((id) => fields[id].requiredWhen(data));
  const finalSchema = makeStepSchema(visible, required);
  const payload = pick(data, visible);
  return finalSchema.safeParse(payload);
}

/** Tiny helpers */
function pick<T extends object>(obj: T, keys: string[]) {
  const out: any = {};
  for (const k of keys) if (k in obj) out[k] = (obj as any)[k];
  return out;
}

const EU = new Set([
  "AT",
  "BE",
  "BG",
  "HR",
  "CY",
  "CZ",
  "DK",
  "EE",
  "FI",
  "FR",
  "DE",
  "GR",
  "HU",
  "IE",
  "IT",
  "LV",
  "LT",
  "LU",
  "MT",
  "NL",
  "PL",
  "PT",
  "RO",
  "SK",
  "SI",
  "ES",
  "SE",
]);
const isEu = (a2?: string) => !!a2 && EU.has(a2);
