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
    "labels.passportOrId": "občanský průkaz nebo cestovní pas",
    "labels.citizenship": "Státní občanství",
    "labels.street": "Ulice",
    "labels.houseNumber": "Číslo popisné",
    "labels.city": "Město",
    "labels.zip": "PSČ",
    "labels.bank.prefix": "Předčíslí",
    "labels.bank.number": "Číslo bankovního účtu",
    "labels.bank.code": "Kód banky",
    "labels.doc.nationalId": `Nahrajte ID/ jiný platný doklad. <br /><span class="bold-green">1. PŘEDNÍ STRANA</span><br /><span class="bold-green">2. ZADNÍ STRANA</span>`,
    "labels.doc.euPassport": `Nahrajte svůj občanský průkaz nebo cestovní pas. <br /><span class="bold-green">1. PŘEDNÍ STRANA</span><br /><span class="bold-green">2. ZADNÍ STRANA</span>`,
    "labels.doc.nonEu": `Nahrajte následující platné dokumenty. <br /><span class="bold-green">1. Průkaz totožnosti nebo cestovní pas</span><br /><span class="bold-green">2. Vízum NEBO povolení k pobytu NEBO Potvrzení o</span><br /><span class="bold-green">2. studiu nebo pracovní povolení</span>`,

    "hints.czPhone":
      "Pro rozvážení v České republice je nezbytné <strong>české telefonní číslo.</strong>",
    "hints.useRealEmail":
      "Zvolte prosím email, který reálně používáte. <strong>Budou Vám na něj chodit důležité emaily.</strong>",
    "hints.doc.nationalId":
      "Nahrajte přední i zadní stranu svého občanského průkazu.",
    "hints.doc.euPassport":
      "Nahrajte přední i zadní stranu svého občanského průkazu.",
    "hints.doc.nonEu":
      "*Tyto dokumenty jsou vyžadovány. Občanský průkaz (přední i zadní strana) nebo cestovní pas, vízum nebo povolení k pobytu, studijní nebo pracovní povolení.",

    "ph.firstName": "Zde napište své křestní jméno",
    "ph.lastName": "Zde napište své přijmení",
    "ph.phone": "775111222",
    "ph.email": "Zadejte svou e-mailovou adresu",
    "ph.nationalId": "Zadejte prosím číslo cestovního dokladu",
    "ph.companyId": "Zadejte číslo vaší společnosti",
    "ph.bank.prefix": "Např. 12345",
    "ph.passportOrId": "Zadejte ID nebo pas",

    "errors.firstName": "Zadejte prosím své jméno",
    "errors.lastName": "Zadejte prosím své přijmení",
    "errors.fox.firstName": "Zadejte prosím platné jméno",
    "errors.fox.lastName": "Zadejte prosím platné jméno",
    "errors.phone": "Zadejte české telefonní číslo ve formátu XXX XXX XXXX.",
    "errors.email": "Zadejte prosím svůj email",
    "errors.nationalId": "Zadejte platné rodné číslo.",
    "errors.street": "Zadejte prosím název ulice",
    "errors.houseNumber": "Zadejte prosím číslo popisné",
    "errors.city": "Zadejte prosím město či obec",
    "errors.zip": "Zadejte prosím poštovní směrovací číslo",
    "errors.bank.number": "Zadejte prosím vaše číslo účtu",
    "errors.bank.code": "Vyberte možnost",
    "errors.applyAsCompany": "Vyberte možnost",
    "errors.files": "Požadované soubory: ",
    "errors.fox.company":
      "We could not find this company. Please search and select your company using the registration number.",

    "nav.prev": "Předchozí",
    "nav.next": "Pokračovat",
    "nav.submit": "Odeslat",
    "nav.validate": "Ověřování....",
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
    "labels.gender": "Jaké je tvé pohlaví?",
    "labels.birthDate": "Datum narození",
    "labels.passportExpiryDate": "Datum vypršení platnosti pasu",

    "answer.yes": "ANO",
    "answer.no": "NE",

    "select.placeholder.country": "Vyberte stát",
    "select.placeholder.city": "Vyberte jednu z možností....",
    "select.placeholder.transport": "Vyberte způsob dopravy",
    "select.placeholder.insurance": "Vyberte zdravotní pojišťovnu",
    "select.placeholder.bank": "Vyberte banku",
    "select.placeholder.gender": "Vyberte pohlaví",

    "options.transport.car": "Auto",
    "options.transport.bike": "Kolo",
    "options.transport.motorcycle": "Motorka / Skútr",
    "options.transport.electricScooter": "Elektrická koloběžka",
    "options.gender.male": "Samec",
    "options.gender.female": "Žena",
    "options.gender.other": "Ostatní",

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
    "labels.passportOrId": "ID card or passport",
    "labels.nationalId": "Social Security number",
    "labels.applyAsCompany": "Are you applying as a company?",
    "labels.citizenship": "Citizenship",
    "labels.street": "Street",
    "labels.houseNumber": "House number",
    "labels.city": "City",
    "labels.zip": "ZIP / Postal code",
    "labels.bank.prefix": "Prefix",
    "labels.bank.number": "Bank account number",
    "labels.bank.code": "Bank code",
    "labels.doc.nationalId": `Upload ID / other valid document. <br /><span class="bold-green">FRONT SIDE</span><br /><span class="bold-green">BACK SIDE</span>`,
    "labels.doc.euPassport": `Upload your Identity card or passport. <br /><span class="bold-green">FRONT SIDE</span><br /><span class="bold-green">BACK SIDE</span>`,
    "labels.doc.nonEu": `Upload the following valid documents. <br /><span class="bold-green">ID CARD OR PASSPORT</span><br /><span class="bold-green">VISA OR RESIDENCE PERMIT</span><br /><span class="bold-green">STUDY OR PERMIT</span>`,

    "hints.czPhone":
      "For deliveries in the Czech Republic you must provide a <strong>Czech phone number.</strong>",
    "hints.useRealEmail":
      "Use an email you actually check. <strong>Important messages will go there.</strong>",
    "hints.doc.nationalId": "Upload both front and back of your ID card.",
    "hints.doc.euPassport": "Upload both front and back of your ID card.",
    "hints.doc.nonEu":
      "*These files are required. ID card (front and back) or passport, Visa or residence permit, Study or work permit",

    "ph.firstName": "Type your first name",
    "ph.lastName": "Type your last name",
    "ph.phone": "775111222",
    "ph.email": "Enter your email address",
    "ph.nationalId": "Your social security number",
    "ph.companyId": "Enter your company number",
    "ph.bank.prefix": "Např. 12345",
    "ph.passportOrId": "Enter ID or passport number",

    "errors.firstName": "Please enter your first name",
    "errors.lastName": "Please enter your last name",
    "errors.fox.firstName": "Please enter a valid name",
    "errors.fox.lastName": "Please enter a valid last name",
    "errors.phone": "Enter a Czech phone number in the format XXX XXX XXXX.",
    "errors.email": "Please enter your email",
    "errors.nationalId": "Enter a valid national social security number.",
    "errors.street": "Please enter the street name",
    "errors.houseNumber": "Please enter the house number",
    "errors.city": "Please enter the city or town",
    "errors.zip": "Please enter the postal code",
    "errors.bank.number": "Please enter your bank account number",
    "errors.bank.code": "Please select an option",
    "errors.applyAsCompany": "Please select an option",
    "errors.files": "Files required: ",
    "errors.fox.company":
      "We could not find this company. Please search and select your company using the registration number.",

    "nav.prev": "Back",
    "nav.next": "Continue",
    "nav.submit": "Submit",
    "nav.wait": "Please wait…",
    "nav.validate": "Validating...",

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
    "labels.birthDate": "Birth date",
    "labels.gender": "What is your gender?",
    "labels.passportExpiry": "Passport expiry date",

    "answer.yes": "YES",
    "answer.no": "NO",

    "select.placeholder.country": "Select a country",
    "select.placeholder.city": "Choose an option…",
    "select.placeholder.transport": "Select transport",
    "select.placeholder.insurance": "Select health insurer",
    "select.placeholder.gender": "Select gender",
    "select.placeholder.bank": "Select a bank",

    "options.transport.car": "Car",
    "options.transport.bike": "Bicycle",
    "options.transport.motorcycle": "Motorcycle / Scooter",
    "options.transport.electricScooter": "Electric Scooter",
    "options.gender.male": "Male",
    "options.gender.female": "Female",
    "options.gender.other": "Other",

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
