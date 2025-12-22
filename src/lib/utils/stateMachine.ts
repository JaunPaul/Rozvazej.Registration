import { isEu } from "../i18n/euCountriesFilter";

// 1) Steps → field ids
export const steps: Record<"step1" | "step2" | "step3", string[]> = {
  step1: ["firstName", "lastName", "phone", "email", "applyAsCompany"],
  step2: [
    "companyId",
    "country",
    "nationalId",
    "passportOrId",
    "street",
    "houseNumber",
    "city",
    "zip",
    "bankPrefix",
    "bankNumber",
    "bankCode",
    "filesNationalId",
    "filesEuPassport",
    "filesNonEu",
  ],
  step3: [
    "deliveryCity",
    "transport",
    "gender",
    "birthDate",
    "passportExpiryDate",
    "insurance",
    "pinkStatement",
  ],
};

// 2) Visibility/requiredness per field (examples; complete with your rules)
export const fields: Record<
  string,
  {
    visibleWhen: (data: any) => boolean;
    requiredWhen: (data: any) => boolean;
  }
> = {
  // step1 (all visible+required)
  firstName: { visibleWhen: (d) => true, requiredWhen: (d) => true },
  lastName: { visibleWhen: (d) => true, requiredWhen: (d) => true },
  phone: { visibleWhen: (d) => true, requiredWhen: (d) => true },
  email: { visibleWhen: (d) => true, requiredWhen: (d) => true },
  applyAsCompany: { visibleWhen: (d) => true, requiredWhen: (d) => true },

  // step2
  companyId: {
    visibleWhen: (d) => d.applyAsCompany === true,
    requiredWhen: (d) => d.applyAsCompany === true,
  },
  country: {
    visibleWhen: (d) => d.applyAsCompany === false,
    requiredWhen: (d) => d.applyAsCompany === false,
  },
  nationalId: {
    visibleWhen: (d) => !d.applyAsCompany && d.country === "CZ",
    requiredWhen: (d) => !d.applyAsCompany && d.country === "CZ",
  },
  passportOrId: {
    visibleWhen: (d) => !d.applyAsCompany && d.country && d.country !== "CZ",
    requiredWhen: (d) => !d.applyAsCompany && d.country && d.country !== "CZ",
  },
  street: { visibleWhen: (d) => true, requiredWhen: (d) => true },
  houseNumber: { visibleWhen: (d) => true, requiredWhen: (d) => true },
  city: { visibleWhen: (d) => true, requiredWhen: (d) => true },
  zip: { visibleWhen: (d) => true, requiredWhen: (d) => true },
  bankPrefix: { visibleWhen: (d) => true, requiredWhen: (d) => true },
  bankNumber: { visibleWhen: (d) => true, requiredWhen: (d) => true },
  bankCode: { visibleWhen: (d) => true, requiredWhen: (d) => true },
  filesNationalId: {
    visibleWhen: (d) => d.country === "CZ",
    requiredWhen: (d) => d.country === "CZ",
  },
  filesEuPassport: {
    visibleWhen: (d) => d.country && isEu(d.country) && d.country !== "CZ",
    requiredWhen: (d) => d.country && isEu(d.country) && d.country !== "CZ",
  },
  filesNonEu: {
    visibleWhen: (d) => d.country && !isEu(d.country),
    requiredWhen: (d) => d.country && !isEu(d.country),
  },

  // step3 (all optional)
  deliveryCity: {
    visibleWhen: (d) => !d.applyAsCompany,
    requiredWhen: (d) => false,
  },
  transport: {
    visibleWhen: (d) => !d.applyAsCompany,
    requiredWhen: (d) => false,
  },
  gender: {
    visibleWhen: (d) => !d.applyAsCompany,
    requiredWhen: (d) => false,
  },
  birthDate: {
    visibleWhen: (d) => !d.applyAsCompany,
    requiredWhen: (d) => false,
  },
  passportExpiryDate: {
    visibleWhen: (d) => !d.applyAsCompany && d.country && !isEu(d.country),
    requiredWhen: (d) => false,
  },
  insurance: {
    visibleWhen: (d) => !d.applyAsCompany,
    requiredWhen: (d) => false,
  },
  pinkStatement: {
    visibleWhen: (d) => !d.applyAsCompany,
    requiredWhen: (d) => false,
  },
};
