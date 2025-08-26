import { z } from "zod";

// helper for file arrays
const fileArray = (min: number) =>
  z
    .array(z.instanceof(File))
    .min(min, { message: `At least ${min} files required` });

export const formSchema = z.object({
  // step1
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string(),
  email: z.string(),
  applyAsCompany: z.boolean(),

  // step2
  companyId: z.string(),
  country: z.string(),
  nationalId: z.string(),
  passportOrId: z.string(),
  street: z.string(),
  houseNumber: z.string(),
  city: z.string(),
  zip: z.string(),
  bankPrefix: z.string(),
  bankNumber: z.string(),
  bankCode: z.string(),

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
