// src/lib/i18n.svelte.ts
export type Locale = "cs" | "en";

let locale = $state<Locale>("cs");

const dict = $state<Record<Locale, Record<string, string>>>({
  cs: {
    "steps.1": "Krok 1",
    "steps.2": "Krok 2",
    "steps.3": "Krok 3",

    "step1.title": "Začínáme – nic složitého",
    "step1.lead":
      "Na úvod nám stačí pár základních informací. Zvládnete to během chvilky.",

    "labels.firstName": "Jméno",
    "labels.lastName": "Přijmení",
    "labels.phone": "Telefonní číslo",
    "labels.email": "Email",
    "labels.companyId": "Číslo firmy",
    "labels.nationalId": "Rodné číslo",
    "labels.applyAsCompany": "Podáváte žádost jako firma?",
    "labels.citizenship": "Státní občanství",
    "labels.street": "Ulice",
    "labels.houseNumber": "Číslo popisné",
    "labels.city": "Město",
    "labels.zip": "PSČ",
    "labels.bank.prefix": "Předčíslí",
    "labels.bank.number": "Číslo bankovního účtu",
    "labels.bank.code": "Kód banky",
    "labels.doc.front": "Nahrajte ID/ jiný platný doklad.\nPŘEDNÍ STRANA",
    "labels.doc.back": "Nahrajte ID/ jiný platný doklad.\nZADNÍ STRANA",

    "hints.czPhone":
      "Pro rozvážení v České republice je nezbytné <strong>české telefonní číslo.</strong>",
    "hints.useRealEmail":
      "Zvolte prosím email, který reálně používáte. <strong>Budou Vám na něj chodit důležité emaily.</strong>",

    "ph.firstName": "Zde napište své křestní jméno",
    "ph.lastName": "Zde napište své přijmení",
    "ph.phone": "+420",
    "ph.email": "Zadejte svou e-mailovou adresu",
    "ph.nationalId": "Vaše rodné číslo",
    "ph.companyId": "Zadejte číslo vaší společnosti",

    "errors.firstName": "Zadejte prosím své jméno",
    "errors.lastName": "Zadejte prosím své přijmení",
    "errors.phone":
      "Zadejte české telefonní číslo ve formátu +420 XXX XXX XXX.",
    "errors.email": "Zadejte prosím svůj email",
    "errors.nationalId": "Zadejte platné rodné číslo.",
    "errors.street": "Zadejte prosím název ulice",
    "errors.houseNumber": "Zadejte prosím číslo popisné",
    "errors.city": "Zadejte prosím město či obec",
    "errors.zip": "Zadejte prosím poštovní směrovací číslo",
    "errors.bankNumber": "Zadejte prosím vaše číslo účtu",

    "nav.prev": "Předchozí",
    "nav.next": "Pokračovat",
    "nav.submit": "Odeslat",
    "nav.wait": "Prosím čekejte..",

    "step2.title": "Už jen pár údajů",
    "step2.lead":
      "Tato část obsahuje povinné údaje potřebné k dokončení registrace – na jejich základě Vám připravíme smlouvu, proto je prosím vyplňte pečlivě.",

    "step3.title": "Chcete mít registraci hotovou co nejrychleji?",
    "step3.lead":
      "Následující údaje nejsou povinné, ale pokud je vyplníte už teď, budeme moci vše zpracovat rychleji a bez zbytečného čekání.",

    "labels.cityToDeliver": "Město kde budete rozvážet",
    "labels.transport": "Na čem budete rozvážet?",
    "labels.insurance": "Zdravotní pojištovna",
    "labels.pinkStatement": "Chcete uplatnit růžové prohlášení?",
    "answer.yes": "ANO",
    "answer.no": "NE",

    "select.placeholder.state": "Vyberte stát",
    "select.placeholder.city": "Vyberte jednu z možností....",
    "select.placeholder.transport": "Vyberte způsob dopravy",
    "select.placeholder.insurance": "Vyberte zdravotní pojišťovnu",
    "select.placeholder.bank": "Vyberte banku",

    "upload.button": "Nahrát soubor",
    "upload.max": "Maximální velikost souboru 10 MB.",
    "upload.error.size": "Nahrávání selhalo. Max. velikost souboru je 10 MB.",
    "upload.error.type": "Nahrávání selhalo. Neplatný typ souboru.",
    "upload.error.generic": "Nahrávání selhalo. Zkuste to prosím znovu.",

    "result.success": "Děkujeme. Pracujeme na tom.",
    "result.fail": "Oops! Something went wrong while submitting the form.",
  },
  en: {
    "steps.1": "Step 1",
    "steps.2": "Step 2",
    "steps.3": "Step 3",

    "step1.title": "Let's start — easy stuff",
    "step1.lead":
      "We only need a few basics to begin. This will take just a moment.",

    "labels.firstName": "First name",
    "labels.lastName": "Last name",
    "labels.phone": "Phone number",
    "labels.email": "Email",
    "labels.companyId": "Company ID Number",
    "labels.nationalId": "National ID number",
    "labels.applyAsCompany": "Are you applying as a company?",
    "labels.citizenship": "Citizenship",
    "labels.street": "Street",
    "labels.houseNumber": "House number",
    "labels.city": "City",
    "labels.zip": "ZIP / Postal code",
    "labels.bank.prefix": "Prefix",
    "labels.bank.number": "Bank account number",
    "labels.bank.code": "Bank code",
    "labels.doc.front": "Upload ID / other valid document.\nFRONT SIDE",
    "labels.doc.back": "Upload ID / other valid document.\nBACK SIDE",

    "hints.czPhone":
      "For deliveries in the Czech Republic you must provide a <strong>Czech phone number.</strong>",
    "hints.useRealEmail":
      "Use an email you actually check. <strong>Important messages will go there.</strong>",

    "ph.firstName": "Type your first name",
    "ph.lastName": "Type your last name",
    "ph.phone": "+420",
    "ph.email": "Enter your email address",
    "ph.nationalId": "Your national ID number",
    "ph.companyId": "Enter your company number",

    "errors.firstName": "Please enter your first name",
    "errors.lastName": "Please enter your last name",
    "errors.phone":
      "Enter a Czech phone number in the format +420 XXX XXX XXX.",
    "errors.email": "Please enter your email",
    "errors.nationalId": "Enter a valid national ID number.",
    "errors.street": "Please enter the street name",
    "errors.houseNumber": "Please enter the house number",
    "errors.city": "Please enter the city or town",
    "errors.zip": "Please enter the postal code",
    "errors.bankNumber": "Please enter your bank account number",

    "nav.prev": "Back",
    "nav.next": "Continue",
    "nav.submit": "Submit",
    "nav.wait": "Please wait…",

    "step2.title": "Just a few more details",
    "step2.lead":
      "These mandatory details are needed to finish your registration and prepare the contract. Please fill them in carefully.",

    "step3.title": "Want to finish even faster?",
    "step3.lead":
      "The following fields are optional. If you add them now, we can process everything quicker without extra back‑and‑forth.",

    "labels.cityToDeliver": "City you will deliver in",
    "labels.transport": "What will you deliver on?",
    "labels.insurance": "Health insurance",
    "labels.pinkStatement": "Apply the “pink tax declaration”?",
    "answer.yes": "YES",
    "answer.no": "NO",

    "select.placeholder.state": "Select a country",
    "select.placeholder.city": "Choose an option…",
    "select.placeholder.transport": "Select transport",
    "select.placeholder.insurance": "Select health insurer",
    "select.placeholder.bank": "Select a bank",

    "upload.button": "Upload File",
    "upload.max": "Max file size 10MB.",
    "upload.error.size": "Upload failed. Max size is 10 MB.",
    "upload.error.type": "Upload failed. Invalid file type.",
    "upload.error.generic":
      "Upload failed. Something went wrong. Please retry.",

    "result.success": "Thanks. We’re on it.",
    "result.fail": "Oops! Something went wrong while submitting the form.",
  },
});

/** Change current locale */
export function setLocale(l: Locale) {
  locale = l;
}

/** Translate helper with fallback to key, then Czech */
export function t(key: string) {
  const hit = dict[locale]?.[key];
  if (hit) return hit;
  return dict.cs[key] ?? key;
}
