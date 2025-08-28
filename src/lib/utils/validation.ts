import { z } from "zod";
import { fields, steps } from "./stateMachine";
import { formSchema } from "../schema";
import {
  validateCompany,
  validateEmail,
  validateName,
  validatePhone,
} from "../foxentry";
import { t } from "../i18n/i18n.svelte";

// Track fields the user actually saw (populate this in your renderer per step)
type FxChecker = (data: any) => Promise<string | undefined>;

// Map only the fields Foxentry can validate
const fxValidators: Record<string, FxChecker> = {
  firstName: async (d) => {
    if (!d.firstName) return t("errors.firstName");
    const r = await validateName(d.firstName, "name");
    return r.isValid ? undefined : t("errors.fox.firstName");
  },
  lastName: async (d) => {
    if (!d.lastName) return t("errors.lastName");
    const r = await validateName(d.lastName, "surname");
    return r.isValid ? undefined : t("errors.fox.lastName");
  },
  email: async (d) => {
    if (!d.email) return t("errors.email");
    const r = await validateEmail(d.email);
    return r.isValid ? undefined : t("errors.fox.email");
  },
  phone: async (d) => {
    if (!d.phone) return t("errors.phone");
    const r = await validatePhone(d.phone);
    return r.isValid ? undefined : t("errors.fox.phone");
  },
  companyId: async (d) => {
    if (d.applyAsCompany !== true) return; // not visible/required in this branch
    if (!d.companyId) return t("errors.companyId");
    const r = await validateCompany({
      name: d.companyName, // optional if you have it
      country: "CZ",
      registrationNumber: d.companyId, // IČO as string
    });
    return r.isValid ? undefined : t("errors.fox.company");
  },
  // You can add address-related checks if you have a single-line API:
  // address: async (d) => { ... }
};

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
  return z.object({}).merge(requiredPart).merge(optionalPart);
}

function pick<T extends object>(obj: T, keys: string[]) {
  const out: any = {};
  for (const k of keys) if (k in obj) out[k] = (obj as any)[k];
  return out;
}

const hasNoKeys = (o?: Record<string, unknown> | null) =>
  !o || Object.keys(o).length === 0;

/**
 * Validate one step (Zod first, then Foxentry for the visible fields it knows).
 * Returns a merged FieldErrors map. `ok` is true only if the merged map is empty.
 */
export async function validateStepAsync(
  stepId: "step1" | "step2" | "step3",
  data: any
) {
  const visible = getVisibleIds(stepId, data);
  visible.forEach((id) => everVisible.add(id));
  const required = getRequiredIds(visible, data);

  const stepSchema = makeStepSchema(visible, required);
  const payload = pick(data, visible);

  // 1) Zod (structural & requiredness)
  const zres = await stepSchema.safeParseAsync(payload);

  // flatten to { field: string[] }
  let mergedErrors: FieldErrors = zres.success
    ? {}
    : (zres.error.flatten().fieldErrors as FieldErrors);

  // 2) Foxentry on visible fields that have checkers and no Zod error for that field
  const toCheck = visible.filter((k) => k in fxValidators);
  const checks = await Promise.all(
    toCheck.map(async (k) => {
      // optional: skip external if Zod already has an error for k
      if (Array.isArray(mergedErrors[k]) && mergedErrors[k]!.length > 0) {
        return { k, msg: undefined as string | undefined };
      }
      try {
        const msg = await fxValidators[k](data);
        return { k, msg };
      } catch (e) {
        // network or SDK error → treat as a validation failure with a generic message
        return { k, msg: "Validation service unavailable. Try again." };
      }
    })
  );

  for (const { k, msg } of checks) {
    if (msg) mergedErrors[k] = (mergedErrors[k] ?? []).concat(msg);
    else if (mergedErrors[k]?.length === 0) delete mergedErrors[k]; // tidy
  }

  const ok = hasNoKeys(mergedErrors);
  return { ok, fieldErrors: mergedErrors };
}

/** Final pass across everything the user actually saw */
export async function validateFinalAsync(data: any) {
  const visible = Array.from(everVisible);
  const required = visible.filter((id) => fields[id].requiredWhen(data));
  const finalSchema = makeStepSchema(visible, required);
  const payload = pick(data, visible);
  const zres = await finalSchema.safeParseAsync(payload);

  let merged: FieldErrors = zres.success
    ? {}
    : (zres.error.flatten().fieldErrors as FieldErrors);

  const toCheck = visible.filter((k) => k in fxValidators);
  const out = await Promise.all(
    toCheck.map(async (k) => ({ k, msg: await fxValidators[k](data) }))
  );
  for (const { k, msg } of out) {
    if (msg) merged[k] = (merged[k] ?? []).concat(msg);
    else if (merged[k]?.length === 0) delete merged[k];
  }

  return { ok: hasNoKeys(merged), fieldErrors: merged };
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
