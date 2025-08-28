import { z } from "zod";
import { t } from "./i18n/i18n.svelte";

// helper for file arrays
const fileArray = (min: number) =>
  z
    .array(z.instanceof(File), { error: t("errors.files") })
    .min(min, { message: `At least ${min} files required` });

export const formSchema = z.object({
  // step1
  firstName: z
    .string({ error: t("errors.firstName") })
    .min(1, { error: t("errors.firstName") }),
  lastName: z.string().min(1, { error: t("errors.lastName") }),
  phone: z.string().min(1, { error: t("errors.phone") }),
  email: z
    .email({ error: t("errors.email") })
    .min(1, { error: t("errors.email") }),
  applyAsCompany: z.boolean({ error: t("errors.applyAsCompany") }),

  // step2
  companyId: z.string().min(1, { error: t("errors.companyId") }),
  country: z.string().min(1, { error: t("errors.country") }),
  nationalId: z.string().min(1, { error: t("errors.nationalId") }),
  passportOrId: z.string().min(1, { error: t("errors.passportOrId") }),
  street: z.string().min(1, { error: t("errors.street") }),
  houseNumber: z.string().min(1, { error: t("errors.houseNumber") }),
  city: z.string().min(1, { error: t("errors.city") }),
  zip: z.string().min(1, { error: t("errors.zip") }),
  bankPrefix: z
    .string()
    .min(5, { error: t("errors.bank.prefix") })
    .max(5, { error: t("errors.bank.prefix") }),
  bankNumber: z.string().min(1, { error: t("errors.bank.number") }),
  bankCode: z.string().min(1, { error: t("errors.bank.code") }),

  filesNationalId: fileArray(2),
  filesEuPassport: fileArray(2),
  filesNonEu: fileArray(3),

  // step3
  deliveryCity: z.string(),
  transport: z.string(),
  gender: z.string(),
  birthDate: z.string(),
  passportExpiryDate: z.string(),
  insurance: z.string(),
  pinkStatement: z.boolean(),
});

export type FormSchema = z.infer<typeof formSchema>;
