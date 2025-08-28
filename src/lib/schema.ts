import { z } from "zod";

// helper for file arrays
const fileArray = (min: number) =>
  z
    .array(z.instanceof(File), { error: "These files are required" })
    .min(min, { message: `At least ${min} files required` });

export const formSchema = z.object({
  // step1
  firstName: z
    .string({ error: "You must input a name" })
    .min(1, { error: "First name is required" }),
  lastName: z.string().min(1, { error: "Last name is required" }),
  phone: z.string().min(1, { error: "Phone number is required" }),
  email: z
    .email({ error: "Email is invalid" })
    .min(1, { error: "Email is required" }),
  applyAsCompany: z.boolean({ error: "You must select an option" }),

  // step2
  companyId: z
    .string()
    .min(1, { error: "Company registration number is required" }),
  country: z.string().min(1, { error: "Citizensship is required" }),
  nationalId: z.string().min(1, { error: "National ID is required" }),
  passportOrId: z.string().min(1, { error: "Document ID is required" }),
  street: z.string(),
  houseNumber: z.string(),
  city: z.string(),
  zip: z.string(),
  bankPrefix: z
    .string()
    .min(5, { error: "Bank prefix has 5 numbers" })
    .max(5, { error: "Bank prefix has 5 numbers" }),
  bankNumber: z.string().min(1, { error: "Bank account number is required" }),
  bankCode: z.string().min(1, { error: "You must choose a bank code" }),

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
