# step1
## fields
all fields required
- firstName > text
- lastName > text
- phone > text
- email > text
- applyAsCompany > radio

# step2
## fields
- companyId > text > required and visible if applyAsCompany = "ANO"
- country > select > required and visible if applyAsCompany = "NE"
- nationalId > text > required and visible if values.applyAsCompany === "NE" && values.country === "CZ"
- passportOrId > text required and visible if values.applyAsCompany === "NE" && values.country !== t("select.placeholder.country") && values.country !== "CZ"
- street > text required
- houseNumber > text required
- city > text required
- zip > text > required
- bankPrefix > number > required
- bankNumber > number > required
- bankCode > select > required
- filesNationalId > files > required and visible if values.country === "CZ"
- filesEuPassport > files > required and visible if values.country !== t("select.placeholder.country") && isEu(values.country) && values.country !== "CZ"
- filesNonEu > files > required and visible if values.country !== t("select.placeholder.country") && !isEu(values.country)

# step3
step3 not available if applyAsCompany = "ANO" they go straight to submit so the next button becomes the submit button
all fields are optional
## fields
- deliveryCity > select
- transport > select
- gender > select
- birthDate > date
- passportExpiryDate > date > visible if values.country !== t("select.placeholder.country") && !isEu(values.country)
- insurance > select
- pinkStatement > radio
