<script lang="ts">
  import { fade } from "svelte/transition";
  import { t, setLocale } from "./lib/i18n/i18n.svelte";
  setLocale("cs");
  const Steps = {
    step1: 1,
    step2: 2,
    step3: 3,
  };

  let currentStep = $state(Steps.step2);
  let filesNationalId: FileList | undefined = $state();
  let filesEuPassport: FileList | undefined = $state();
  let filesNonEu: FileList | undefined = $state();
  let filesNationalIdInput: HTMLInputElement | undefined = $state();
  let filesEuPassportInput: HTMLInputElement | undefined = $state();
  let filesNonEuInput: HTMLInputElement | undefined = $state();

  type Bucket = "nationalId" | "euPassport" | "nonEu";

  function toFileList(files: File[]): FileList {
    const dt = new DataTransfer();
    files.forEach((f) => dt.items.add(f));
    return dt.files;
  }
  function appendFilesTo(which: Bucket, incoming: FileList | File[]) {
    const get = (w: Bucket) =>
      w === "nationalId"
        ? filesNationalId
        : w === "euPassport"
          ? filesEuPassport
          : filesNonEu;

    const set = (w: Bucket, fl: FileList | undefined) => {
      if (w === "nationalId") filesNationalId = fl;
      else if (w === "euPassport") filesEuPassport = fl;
      else filesNonEu = fl;
    };

    const current = Array.from(get(which) ?? []);
    const add = Array.isArray(incoming) ? incoming : Array.from(incoming);

    // de-dupe by (name, size, lastModified)
    const byKey = new Map<string, File>();
    for (const f of [...current, ...add]) {
      byKey.set(`${f.name}|${f.size}|${f.lastModified}`, f);
    }

    const next = toFileList([...byKey.values()]);
    set(which, next);

    // clear the input so selecting the same file again triggers change
    const node =
      which === "nationalId"
        ? filesNationalIdInput
        : which === "euPassport"
          ? filesEuPassportInput
          : filesNonEuInput;
    if (node) node.value = "";
  }

  function removeFileFrom(which: Bucket, target: File | string) {
    const get = () =>
      which === "nationalId"
        ? filesNationalId
        : which === "euPassport"
          ? filesEuPassport
          : filesNonEu;

    const set = (fl: FileList) => {
      if (which === "nationalId") {
        filesNationalId = fl;
        if (filesNationalIdInput) (filesNationalIdInput as any).files = fl; // TS says readonly; runtime works
      } else if (which === "euPassport") {
        filesEuPassport = fl;
        if (filesEuPassportInput) (filesEuPassportInput as any).files = fl;
      } else {
        filesNonEu = fl;
        if (filesNonEuInput) (filesNonEuInput as any).files = fl;
      }
    };

    const current = get();
    if (!current) return;

    const keep = (f: File) =>
      typeof target === "string"
        ? f.name !== target
        : !(
            f === target ||
            (f.name === target.name && f.lastModified === target.lastModified)
          );

    const next = toFileList(Array.from(current).filter(keep));
    set(next);
  }

  const values = $state({
    firstName: "",
    lastName: "",
    phone: "",
    companyId: "",
    nationalId: "",
    applyAsCompany: "",
    country: t("select.placeholder.country"),
    street: "",
    houseNumber: "",
    city: "",
    zip: "",
    bank: {
      prefix: "",
      number: null,
      code: t("select.placeholder.bank"),
    },
  });

  $inspect(values, filesNationalId);
</script>

<div>
  <form
    id="wf-form-Registrace"
    name="wf-form-Registrace"
    data-name="Registrace"
    method="post"
    class="form"
    data-wf-page-id="68a31b8e75b63d43d6eb4364"
    data-wf-element-id="bbf84c42-1309-ca45-9ba6-1cbc04e602c1"
  >
    {#if currentStep === Steps.step1}
      <div class="form-step is-active">
        <div class="box has-24-gap">
          <div class="box has-8-gap">
            <div class="form-steps">
              <div class="step is-active"><div>{t("steps.1")}</div></div>
              <div class="step"><div>{t("steps.2")}</div></div>
              <div class="step"><div>{t("steps.3")}</div></div>
            </div>

            <h2 class="heading is-regular">{t("step1.title")}</h2>
            <p class="body-text">{t("step1.lead")}</p>
          </div>
          <div class="box has-8-gap">
            <div class="input-group-wrap">
              <div class="input-wrap">
                <label for="firstName" class="field-label"
                  >{t("labels.firstName")}</label
                ><input
                  data-parsley-error-message={t("errors.firstName")}
                  class="input-2 w-input"
                  maxlength="256"
                  name="firstName"
                  data-name="firstName"
                  placeholder={t("ph.firstName")}
                  type="text"
                  id="firstName"
                  required
                  bind:value={values.firstName}
                />
              </div>
              <div class="input-wrap">
                <label for="lastName" class="field-label"
                  >{t("labels.lastName")}</label
                ><input
                  data-parsley-error-message={t("errors.lastName")}
                  class="input-2 w-input"
                  maxlength="256"
                  name="lastName"
                  data-name="lastName"
                  placeholder={t("ph.lastName")}
                  type="text"
                  id="lastName"
                  required
                  bind:value={values.lastName}
                />
              </div>
            </div>
            <div class="input-group-wrap">
              <div class="input-wrap">
                <label for="phone" class="field-label"
                  >{t("labels.phone")}</label
                ><input
                  data-parsley-error-message={t("errors.phone")}
                  class="input-2 w-input"
                  maxlength="256"
                  name="phone"
                  data-name="phone"
                  placeholder={t("ph.phone")}
                  data-parsley-czphone=""
                  type="text"
                  id="phone"
                  required
                  bind:value={values.phone}
                />
                <div class="text-explain">
                  {@html t("hints.czPhone")}
                </div>
              </div>
              <div class="input-wrap">
                <label for="email" class="field-label"
                  >{t("labels.email")}</label
                ><input
                  data-parsley-error-message={t("errors.email")}
                  class="input-2 w-node-_5ce9e5d7-7108-1705-b1ac-8651e86feced-d6eb4364 w-input"
                  maxlength="256"
                  name="email"
                  data-name="email"
                  placeholder={t("ph.email")}
                  type="email"
                  id="email"
                  required
                />
                <div class="text-explain">
                  {@html t("hints.useRealEmail")}
                </div>
              </div>
            </div>
            <div class="input-wrap">
              <label for="field" class="field-label"
                >{t("labels.applyAsCompany")}</label
              >
              <div class="input-group-wrap">
                <label
                  id="ruzove-prohlaseni-ano"
                  class="registrationtype w-node-_7a7458f0-b249-90e6-4e96-a52d92089dde-d6eb4364 w-radio"
                >
                  <div
                    class="w-form-formradioinput w-form-formradioinput--inputType-custom radio-button w-radio-input"
                    class:w--redirected-checked={values.applyAsCompany ===
                      "ANO"}
                  ></div>
                  <input
                    type="radio"
                    name="ruzove-prohlaseni"
                    id="apply-as-company-yes"
                    data-name="ruzove-prohlaseni"
                    style="opacity:0;position:absolute;z-index:-1"
                    value="ANO"
                    bind:group={values.applyAsCompany}
                  /><span class="w-form-label">{t("answer.yes")}</span>
                </label><label
                  id="ruzove-prohlaseni-ne"
                  class="registrationtype w-node-_7a7458f0-b249-90e6-4e96-a52d92089de2-d6eb4364 w-radio"
                >
                  <div
                    class="w-form-formradioinput w-form-formradioinput--inputType-custom radio-button w-radio-input"
                    class:w--redirected-checked={values.applyAsCompany === "NE"}
                  ></div>
                  <input
                    type="radio"
                    name="ruzove-prohlaseni"
                    id="NE"
                    data-name="ruzove-prohlaseni"
                    style="opacity:0;position:absolute;z-index:-1"
                    value="NE"
                    bind:group={values.applyAsCompany}
                  /><span class="w-form-label">{t("answer.no")}</span>
                </label>
              </div>
            </div>
            {#if values.applyAsCompany === "ANO"}
              <div in:fade class="input-wrap">
                <label for="companyId" class="field-label"
                  >{t("labels.companyId")}
                </label><input
                  data-parsley-error-message="Zadejte platné rodné číslo."
                  class="input-2 w-node-_8d497551-0a0a-68b8-5bf7-6f944b9fc4f1-d6eb4364 w-input"
                  maxlength="256"
                  name="companyId"
                  data-name="companyId"
                  placeholder={t("ph.companyId")}
                  data-parsley-rc=""
                  type="text"
                  id="companyId"
                  bind:value={values.companyId}
                />
              </div>
            {/if}

            {#if values.applyAsCompany === "NE"}
              <div in:fade class="input-wrap">
                <label for="nationalId" class="field-label"
                  >{t("labels.nationalId")}
                </label><input
                  data-parsley-error-message={t("errors.nationalId")}
                  class="input-2 w-node-_8d497551-0a0a-68b8-5bf7-6f944b9fc4f1-d6eb4364 w-input"
                  maxlength="256"
                  name="nationalId"
                  data-name="nationalId"
                  placeholder={t("ph.nationalId")}
                  data-parsley-rc=""
                  type="text"
                  id="nationalId"
                  bind:value={values.nationalId}
                />
              </div>
            {/if}
          </div>
        </div>
        <div class="form-nav">
          <div></div>
          <button class="button w-button">{t("nav.next")} </button>
        </div>
      </div>
    {/if}

    {#if currentStep === Steps.step2}
      <div class="form-step is-active">
        <div class="box has-24-gap">
          <div class="box has-8-gap">
            <div class="form-steps">
              <div class="step"><div>{t("steps.1")}</div></div>
              <div class="step is-active"><div>{t("steps.2")}</div></div>
              <div class="step"><div>{t("steps.3")}</div></div>
            </div>

            <h2 class="heading is-regular">{t("step2.title")}</h2>
            <p class="body-text">{t("step2.lead")}</p>
          </div>
          <div class="box has-8-gap">
            <div class="input-wrap">
              <label for="St-tn-ob-anstv" class="field-label"
                ><strong>{t("labels.citizenship")}</strong></label
              >
              <div class="w-embed">
                <select
                  name="country"
                  id="statni-obcanstvi"
                  class="input-2"
                  required
                  autocomplete="off"
                  bind:value={values.country}
                >
                  <option value={t("select.placeholder.country")} disabled
                    >{t("select.placeholder.country")}</option
                  >
                  <option value="CZ">Česko</option>
                  <option value="SK">Slovensko</option>
                  <option value="UA">Ukrajina</option>
                  <option value="RU">Rusko</option>
                  <option value="AF">Afghánistán</option>
                  <option value="AL">Albánie</option>
                  <option value="DZ">Alžírsko</option>
                  <option value="AS">Americká Samoa</option>
                  <option value="AD">Andorra</option>
                  <option value="AO">Angola</option>
                  <option value="AI">Anguilla</option>
                  <option value="AQ">Antarktida</option>
                  <option value="AG">Antigua a Barbuda</option>
                  <option value="AR">Argentina</option>
                  <option value="AM">Arménie</option>
                  <option value="AW">Aruba</option>
                  <option value="AU">Austrálie</option>
                  <option value="AT">Rakousko</option>
                  <option value="AZ">Ázerbájdžán</option>
                  <option value="BS">Bahamy</option>
                  <option value="BH">Bahrajn</option>
                  <option value="BD">Bangladéš</option>
                  <option value="BB">Barbados</option>
                  <option value="BY">Bělorusko</option>
                  <option value="BE">Belgie</option>
                  <option value="BZ">Belize</option>
                  <option value="BJ">Benin</option>
                  <option value="BM">Bermudy</option>
                  <option value="BT">Bhútán</option>
                  <option value="BO">Bolívie</option>
                  <option value="BQ">Bonaire, Svatý Eustach a Saba</option>
                  <option value="BA">Bosna a Hercegovina</option>
                  <option value="BW">Botswana</option>
                  <option value="BV">Bouvetův ostrov</option>
                  <option value="BR">Brazílie</option>
                  <option value="IO">Britské indickooceánské území</option>
                  <option value="BN">Brunej</option>
                  <option value="BG">Bulharsko</option>
                  <option value="BF">Burkina Faso</option>
                  <option value="BI">Burundi</option>
                  <option value="CV">Kapverdy</option>
                  <option value="KH">Kambodža</option>
                  <option value="CM">Kamerun</option>
                  <option value="CA">Kanada</option>
                  <option value="KY">Kajmanské ostrovy</option>
                  <option value="CF">Středoafrická republika</option>
                  <option value="TD">Čad</option>
                  <option value="CL">Chile</option>
                  <option value="CN">Čína</option>
                  <option value="CX">Vánoční ostrov</option>
                  <option value="CC">Kokosové ostrovy</option>
                  <option value="CO">Kolumbie</option>
                  <option value="KM">Komory</option>
                  <option value="CG">Kongo (Brazzaville)</option>
                  <option value="CD">Kongo (Kinshasa)</option>
                  <option value="CK">Cookovy ostrovy</option>
                  <option value="CR">Kostarika</option>
                  <option value="CI">Pobřeží slonoviny</option>
                  <option value="HR">Chorvatsko</option>
                  <option value="CU">Kuba</option>
                  <option value="CW">Curaçao</option>
                  <option value="CY">Kypr</option>
                  <option value="DK">Dánsko</option>
                  <option value="DJ">Džibutsko</option>
                  <option value="DM">Dominika</option>
                  <option value="DO">Dominikánská republika</option>
                  <option value="EC">Ekvádor</option>
                  <option value="EG">Egypt</option>
                  <option value="SV">Salvador</option>
                  <option value="GQ">Rovníková Guinea</option>
                  <option value="ER">Eritrea</option>
                  <option value="EE">Estonsko</option>
                  <option value="SZ">Eswatini</option>
                  <option value="ET">Etiopie</option>
                  <option value="FI">Finsko</option>
                  <option value="FR">Francie</option>
                  <option value="GA">Gabon</option>
                  <option value="GM">Gambie</option>
                  <option value="GE">Gruzie</option>
                  <option value="DE">Německo</option>
                  <option value="GH">Ghana</option>
                  <option value="GR">Řecko</option>
                  <option value="GL">Grónsko</option>
                  <option value="GD">Grenada</option>
                  <option value="GT">Guatemala</option>
                  <option value="GN">Guinea</option>
                  <option value="GW">Guinea-Bissau</option>
                  <option value="GY">Guyana</option>
                  <option value="HT">Haiti</option>
                  <option value="HM"
                    >Heardův ostrov a McDonaldovy ostrovy</option
                  >
                  <option value="VA">Vatikán</option>
                  <option value="HN">Honduras</option>
                  <option value="HK">Hongkong – ZAO Číny</option>
                  <option value="HU">Maďarsko</option>
                  <option value="IS">Island</option>
                  <option value="IN">Indie</option>
                  <option value="ID">Indonésie</option>
                  <option value="IR">Írán</option>
                  <option value="IQ">Irák</option>
                  <option value="IE">Irsko</option>
                  <option value="IM">Ostrov Man</option>
                  <option value="IL">Izrael</option>
                  <option value="IT">Itálie</option>
                  <option value="JM">Jamajka</option>
                  <option value="JP">Japonsko</option>
                  <option value="JE">Jersey</option>
                  <option value="JO">Jordánsko</option>
                  <option value="KZ">Kazachstán</option>
                  <option value="KE">Keňa</option>
                  <option value="KI">Kiribati</option>
                  <option value="KP">Severní Korea</option>
                  <option value="KR">Jižní Korea</option>
                  <option value="KW">Kuvajt</option>
                  <option value="KG">Kyrgyzstán</option>
                  <option value="LA">Laos</option>
                  <option value="LV">Lotyšsko</option>
                  <option value="LB">Libanon</option>
                  <option value="LS">Lesotho</option>
                  <option value="LR">Libérie</option>
                  <option value="LY">Libye</option>
                  <option value="LI">Lichtenštejnsko</option>
                  <option value="LT">Litva</option>
                  <option value="LU">Lucembursko</option>
                  <option value="MO">Macao – ZAO Číny</option>
                  <option value="MG">Madagaskar</option>
                  <option value="MW">Malawi</option>
                  <option value="MY">Malajsie</option>
                  <option value="MV">Maledivy</option>
                  <option value="ML">Mali</option>
                  <option value="MT">Malta</option>
                  <option value="MH">Marshallovy ostrovy</option>
                  <option value="MQ">Martinik</option>
                  <option value="MR">Mauritánie</option>
                  <option value="MU">Mauricius</option>
                  <option value="YT">Mayotte</option>
                  <option value="MX">Mexiko</option>
                  <option value="FM">Mikronésie</option>
                  <option value="MD">Moldavsko</option>
                  <option value="MC">Monako</option>
                  <option value="MN">Mongolsko</option>
                  <option value="ME">Černá Hora</option>
                  <option value="MS">Montserrat</option>
                  <option value="MA">Maroko</option>
                  <option value="MZ">Mosambik</option>
                  <option value="MM">Myanmar (Barma)</option>
                  <option value="NA">Namibie</option>
                  <option value="NR">Nauru</option>
                  <option value="NP">Nepál</option>
                  <option value="NL">Nizozemsko</option>
                  <option value="NC">Nová Kaledonie</option>
                  <option value="NZ">Nový Zéland</option>
                  <option value="NI">Nikaragua</option>
                  <option value="NE">Niger</option>
                  <option value="NG">Nigérie</option>
                  <option value="NU">Niue</option>
                  <option value="NF">Norfolk</option>
                  <option value="MK">Severní Makedonie</option>
                  <option value="MP">Severní Mariany</option>
                  <option value="NO">Norsko</option>
                  <option value="OM">Omán</option>
                  <option value="PK">Pákistán</option>
                  <option value="PW">Palau</option>
                  <option value="PS">Palestina</option>
                  <option value="PA">Panama</option>
                  <option value="PG">Papua-Nová Guinea</option>
                  <option value="PY">Paraguay</option>
                  <option value="PE">Peru</option>
                  <option value="PH">Filipíny</option>
                  <option value="PN">Pitcairnovy ostrovy</option>
                  <option value="PL">Polsko</option>
                  <option value="PT">Portugalsko</option>
                  <option value="PR">Portoriko</option>
                  <option value="QA">Katar</option>
                  <option value="RE">Réunion</option>
                  <option value="RO">Rumunsko</option>
                  <option value="RW">Rwanda</option>
                  <option value="BL">Svatý Bartoloměj</option>
                  <option value="SH">Svatá Helena</option>
                  <option value="KN">Svatý Kryštof a Nevis</option>
                  <option value="LC">Svatá Lucie</option>
                  <option value="MF">Svatý Martin (francouzská část)</option>
                  <option value="PM">Saint-Pierre a Miquelon</option>
                  <option value="VC">Svatý Vincenc a Grenadiny</option>
                  <option value="WS">Samoa</option>
                  <option value="SM">San Marino</option>
                  <option value="ST">Svatý Tomáš a Princův ostrov</option>
                  <option value="SA">Saúdská Arábie</option>
                  <option value="SN">Senegal</option>
                  <option value="RS">Srbsko</option>
                  <option value="SC">Seychely</option>
                  <option value="SL">Sierra Leone</option>
                  <option value="SG">Singapur</option>
                  <option value="SX">Svatý Martin (nizozemská část)</option>
                  <option value="SI">Slovinsko</option>
                  <option value="SB">Šalamounovy ostrovy</option>
                  <option value="SO">Somálsko</option>
                  <option value="ZA">Jihoafrická republika</option>
                  <option value="GS"
                    >Jižní Georgie a Jižní Sandwichovy ostrovy</option
                  >
                  <option value="SS">Jižní Súdán</option>
                  <option value="ES">Španělsko</option>
                  <option value="LK">Srí Lanka</option>
                  <option value="SD">Súdán</option>
                  <option value="SR">Surinam</option>
                  <option value="SJ">Špicberky a Jan Mayen</option>
                  <option value="SE">Švédsko</option>
                  <option value="CH">Švýcarsko</option>
                  <option value="SY">Sýrie</option>
                  <option value="TW">Tchaj-wan</option>
                  <option value="TJ">Tádžikistán</option>
                  <option value="TZ">Tanzanie</option>
                  <option value="TH">Thajsko</option>
                  <option value="TL">Východní Timor</option>
                  <option value="TG">Togo</option>
                  <option value="TK">Tokelau</option>
                  <option value="TO">Tonga</option>
                  <option value="TT">Trinidad a Tobago</option>
                  <option value="TN">Tunisko</option>
                  <option value="TR">Turecko</option>
                  <option value="TM">Turkmenistán</option>
                  <option value="TC">Ostrovy Turks a Caicos</option>
                  <option value="TV">Tuvalu</option>
                  <option value="UG">Uganda</option>
                  <option value="AE">Spojené arabské emiráty</option>
                  <option value="GB">Spojené království</option>
                  <option value="US">Spojené státy</option>
                  <option value="UM">Menší odlehlé ostrovy USA</option>
                  <option value="UY">Uruguay</option>
                  <option value="UZ">Uzbekistán</option>
                  <option value="VU">Vanuatu</option>
                  <option value="VE">Venezuela</option>
                  <option value="VN">Vietnam</option>
                  <option value="VG">Britské Panenské ostrovy</option>
                  <option value="VI">Americké Panenské ostrovy</option>
                  <option value="WF">Wallis a Futuna</option>
                  <option value="EH">Západní Sahara</option>
                  <option value="YE">Jemen</option>
                  <option value="ZM">Zambie</option>
                  <option value="ZW">Zimbabwe</option>
                  <option value="AX">Ålandy</option>
                </select>
              </div>
            </div>
            <div class="input-group-wrap">
              <div class="input-wrap">
                <label for="street" class="field-label"
                  >{t("labels.street")}</label
                ><input
                  data-parsley-error-message={t("errors.street")}
                  class="input-2 w-node-_48acfe53-5ca2-1118-0e8c-0cdd22174c3b-d6eb4364 w-input"
                  maxlength="256"
                  name="street"
                  data-name="street"
                  placeholder=""
                  type="text"
                  id="street"
                  required
                  bind:value={values.street}
                />
              </div>
              <div class="input-wrap">
                <label for="houseNumber" class="field-label"
                  >{t("labels.houseNumber")}</label
                ><input
                  data-parsley-error-message={t("errors.houseNumber")}
                  class="input-2 w-node-_75182725-5b9f-8942-268c-668a41ccdfd7-d6eb4364 w-input"
                  maxlength="256"
                  name="houseNumber"
                  data-name="Cislo popisne"
                  placeholder=""
                  type="tel"
                  id="houseNumber"
                  required
                  bind:value={values.houseNumber}
                />
              </div>
            </div>
            <div class="input-group-wrap">
              <div class="input-wrap">
                <label for="city" class="field-label">{t("labels.city")}</label
                ><input
                  data-parsley-error-message={t("errors.city")}
                  class="input-2 w-node-_9b7ed3bb-d228-0d66-fa58-ba76e3894472-d6eb4364 w-input"
                  maxlength="256"
                  name="city"
                  data-name="city"
                  placeholder=""
                  type="text"
                  id="city"
                  required
                  bind:value={values.city}
                />
              </div>
              <div class="input-wrap">
                <label for="zip" class="field-label">{t("labels.zip")}</label
                ><input
                  data-parsley-error-message={t("errors.zip")}
                  class="input-2 w-node-_9b7ed3bb-d228-0d66-fa58-ba76e3894476-d6eb4364 w-input"
                  maxlength="256"
                  name="zip"
                  data-name="zip"
                  placeholder=""
                  type="tel"
                  id="zip"
                  required
                  bind:value={values.zip}
                />
              </div>
            </div>
            <div class="input-group-wrap">
              <div class="input-group-wrap">
                <div class="prefix">
                  <label for="bankPrefix" class="field-label"
                    >{t("labels.bank.prefix")}</label
                  >
                  <div class="w-embed">
                    <input
                      type="text"
                      id="bankPrefix"
                      name="bankPrefix"
                      class="input-2"
                      maxlength="5"
                      pattern="\d*"
                      inputmode="numeric"
                      placeholder={t("ph.bank.prefix")}
                      bind:value={values.bank.prefix}
                    />
                  </div>
                </div>
                <div class="bank-number">
                  <label for="bankNumber" class="field-label"
                    >{t("labels.bank.number")}</label
                  ><input
                    data-parsley-error-message={t("errors.bank.number")}
                    class="input-2 w-node-_5456f3ba-5ad3-f3cf-d87e-1e89755a0bb4-d6eb4364 w-input"
                    maxlength="256"
                    name="bankNumber"
                    data-name="Číslo účtu"
                    placeholder=""
                    type="number"
                    id="bankNumber"
                    required
                    bind:value={values.bank.number}
                  />
                </div>
                <div class="bank-code">
                  <label for="bankCode" class="field-label"
                    >{t("labels.bank.code")}</label
                  >
                  <div class="w-embed">
                    <select
                      name="bankCode"
                      id="bankCode"
                      class="input-2"
                      required
                      bind:value={values.bank.code}
                    >
                      <option value={t("select.placeholder.bank")} disabled
                        >{t("select.placeholder.bank")}</option
                      >
                      <option value="0100">0100 – Komerční banka</option>
                      <option value="0300">0300 – ČSOB</option>
                      <option value="0600">0600 – MONETA</option>
                      <option value="0800">0800 – Česká spořitelna</option>
                      <option value="2010">2010 – Fio banka</option>
                      <option value="3030">3030 – Air Bank</option>
                      <option value="5500">5500 – Raiffeisenbank</option>
                      <option value="6210">6210 – mBank</option>
                      <option value="2700">2700 – UniCredit Bank</option>
                      <option value="3050">3050 – Hello bank</option>
                      <option value="3500">3500 – ING Bank</option>
                      <option value="6800">6800 – Sberbank</option>
                      <option value="2250">2250 – Banka Creditas</option>
                      <option value="2070">2070 – Trinity Bank</option>
                      <option value="4000">4000 – Expobank</option>
                      <option value="8040">8040 – Oberbank</option>
                      <option value="2600">2600 – Citibank</option>
                      <option value="2020">2020 – MUFG Bank</option>
                      <option value="2100">2100 – Hypoteční banka</option>
                      <option value="2060">2060 – Citfin</option>
                      <option value="2200">2200 – Peněžní dům</option>
                      <option value="2220">2220 – Artesa</option>
                      <option value="2260">2260 – NEY</option>
                      <option value="3060">3060 – PKO BP</option>
                      <option value="4300"
                        >4300 – Národní rozvojová banka</option
                      >
                      <option value="5800">5800 – J&T BANKA</option>
                      <option value="6000">6000 – PPF banka</option>
                      <option value="6200">6200 – COMMERZBANK</option>
                      <option value="6300">6300 – BNP Paribas</option>
                      <option value="6700"
                        >6700 – Všeobecná úvěrová banka</option
                      >
                      <option value="7910">7910 – Deutsche Bank</option>
                      <option value="7950"
                        >7950 – Raiffeisen stavební spořitelna</option
                      >
                      <option value="7960"
                        >7960 – ČSOB Stavební spořitelna</option
                      >
                      <option value="7970"
                        >7970 – MONETA Stavební Spořitelna</option
                      >
                      <option value="7990"
                        >7990 – Modrá pyramida stavební spořitelna</option
                      >
                      <option value="8030"
                        >8030 – Volksbank Raiffeisenbank Nordoberpfalz</option
                      >
                      <option value="8060"
                        >8060 – Stavební spořitelna České spořitelny</option
                      >
                      <option value="8090">8090 – Česká exportní banka</option>
                      <option value="8150"
                        >8150 – HSBC Continental Europe</option
                      >
                      <option value="6363">6363 – Partners banka</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div class="input-group-wrap">
              {#snippet fileItem(f: File, b: Bucket)}
                <div tabindex="-1" class="w-file-upload-success mt-4 mr-2">
                  <div class="w-file-upload-file">
                    <div class="w-file-upload-file-name">
                      {f.name}
                    </div>
                    <button
                      aria-label="Remove file"
                      tabindex="0"
                      class="w-file-remove-link"
                      onclick={() => removeFileFrom(b, f)}
                    >
                      <div class="w-icon-file-upload-remove"></div>
                    </button>
                  </div>
                </div>
              {/snippet}
              <div class="upload">
                <label for="Ulice" class="field-label"
                  >{@html t("labels.doc.nationalId")}</label
                >
                <div id="file-1" class="w-file-upload">
                  <div class="default-state-2 w-file-upload-default">
                    <input
                      class="w-file-upload-input"
                      accept=""
                      name="filesNationalId"
                      data-name="filesNationalId"
                      aria-hidden="true"
                      type="file"
                      id="filesNationalId"
                      tabindex="-1"
                      required
                      multiple
                      onchange={(e) => {
                        const files = (e.currentTarget as HTMLInputElement)
                          .files;
                        if (files) appendFilesTo("nationalId", files);
                      }}
                      bind:this={filesNationalIdInput}
                    />
                    <button
                      class="upload-button"
                      onclick={() => filesNationalIdInput?.click()}
                    >
                      <label for="File-1-2" class="w-file-upload-label">
                        <div class="w-icon-file-upload-icon"></div>
                        <div class="w-inline-block">{t("upload.button")}</div>
                      </label></button
                    >

                    <div class="w-file-upload-info">{t("upload.max")}</div>
                  </div>

                  {#if filesNationalId && filesNationalId?.length > 0}
                    <div>
                      {#each filesNationalId as file}
                        {@render fileItem(file, "nationalId")}
                      {/each}
                    </div>
                  {/if}

                  <div tabindex="-1" class="w-file-upload-error w-hidden">
                    <div
                      class="w-file-upload-error-msg"
                      data-w-size-error="Upload failed. Max size for files is 10 MB."
                      data-w-type-error="Upload failed. Invalid file type."
                      data-w-generic-error="Upload failed. Something went wrong. Please retry."
                    >
                      Upload failed. Max size for files is 10 MB.
                    </div>
                  </div>
                </div>
                <div class="text-explain">
                  {@html t("hints.doc.nationalId")}
                </div>
              </div>

              <div class="upload">
                <label for="Ulice" class="field-label"
                  >{@html t("labels.doc.euPassport")}</label
                >
                <div id="file-2" class="w-file-upload">
                  <div class="default-state-2 w-file-upload-default">
                    <input
                      class="w-file-upload-input"
                      accept=""
                      name="filesEuPassport"
                      data-name="filesEuPassport"
                      aria-hidden="true"
                      type="file"
                      id="filesEuPassport"
                      tabindex="-1"
                      required
                      multiple
                      onchange={(e) => {
                        const files = (e.currentTarget as HTMLInputElement)
                          .files;
                        if (files) appendFilesTo("euPassport", files);
                      }}
                      bind:this={filesEuPassportInput}
                    />
                    <button
                      class="upload-button"
                      onclick={() => filesEuPassportInput?.click()}
                    >
                      <label for="File-1-2" class="w-file-upload-label">
                        <div class="w-icon-file-upload-icon"></div>
                        <div class="w-inline-block">{t("upload.button")}</div>
                      </label></button
                    >

                    <div class="w-file-upload-info">{t("upload.max")}</div>
                  </div>

                  {#if filesEuPassport && filesEuPassport?.length > 0}
                    <div>
                      {#each filesEuPassport as file}
                        {@render fileItem(file, "euPassport")}
                      {/each}
                    </div>
                  {/if}

                  <div tabindex="-1" class="w-file-upload-error w-hidden">
                    <div
                      class="w-file-upload-error-msg"
                      data-w-size-error="Upload failed. Max size for files is 10 MB."
                      data-w-type-error="Upload failed. Invalid file type."
                      data-w-generic-error="Upload failed. Something went wrong. Please retry."
                    >
                      Upload failed. Max size for files is 10 MB.
                    </div>
                  </div>
                </div>
                <div class="text-explain">
                  {@html t("hints.doc.euPassport")}
                </div>
              </div>

              <div class="upload">
                <label for="Ulice" class="field-label"
                  >{@html t("labels.doc.nonEu")}</label
                >
                <div id="file-2" class="w-file-upload">
                  <div class="default-state-2 w-file-upload-default">
                    <input
                      class="w-file-upload-input"
                      accept=""
                      name="filesNonEu"
                      data-name="filesNonEu"
                      aria-hidden="true"
                      type="file"
                      id="filesNonEu"
                      tabindex="-1"
                      required
                      multiple
                      onchange={(e) => {
                        const files = (e.currentTarget as HTMLInputElement)
                          .files;
                        if (files) appendFilesTo("nonEu", files);
                      }}
                      bind:this={filesNonEuInput}
                    />
                    <button
                      class="upload-button"
                      onclick={() => filesNonEuInput?.click()}
                    >
                      <label for="File-1-2" class="w-file-upload-label">
                        <div class="w-icon-file-upload-icon"></div>
                        <div class="w-inline-block">{t("upload.button")}</div>
                      </label></button
                    >

                    <div class="w-file-upload-info">{t("upload.max")}</div>
                  </div>

                  {#if filesNonEu && filesNonEu?.length > 0}
                    <div>
                      {#each filesNonEu as file}
                        {@render fileItem(file, "nonEu")}
                      {/each}
                    </div>
                  {/if}

                  <div tabindex="-1" class="w-file-upload-error w-hidden">
                    <div
                      class="w-file-upload-error-msg"
                      data-w-size-error="Upload failed. Max size for files is 10 MB."
                      data-w-type-error="Upload failed. Invalid file type."
                      data-w-generic-error="Upload failed. Something went wrong. Please retry."
                    >
                      Upload failed. Max size for files is 10 MB.
                    </div>
                  </div>
                </div>
                <div class="text-explain">
                  {@html t("hints.doc.nonEu")}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="form-nav">
          <button class="button is-ghost w-button">{t("nav.prev")}</button>
          <button class="button w-button">{t("nav.next")}</button>
        </div>
      </div>
    {/if}

    {#if currentStep === Steps.step3}
      <div class="form-step is-active">
        <div class="box has-24-gap">
          <div class="box has-8-gap">
            <div class="form-steps">
              <div class="step"><div>{t("steps.1")}</div></div>
              <div class="step"><div>{t("steps.2")}</div></div>
              <div class="step is-active"><div>{t("steps.3")}</div></div>
            </div>
            <h2 class="heading is-regular">{t("step3.title")}</h2>
            <p class="body-text">{t("step3.lead")}</p>
          </div>
          <div class="box has-8-gap">
            <div class="input-wrap">
              <label for="misto-rozvazeni" class="field-label"
                >Město kde budete rozvážet</label
              >
              <select
                id="misto-rozvazeni"
                name="Misto-rozvazeni"
                data-name="Misto rozvazeni"
                required=""
                class="input-2 w-select"
              >
                <option value="">Vyberte jednu z možností....</option>
                <option value="Brno">Brno</option>
                <option value="České Budějovice">České Budějovice</option>
                <option value="Cheb">Cheb</option>
                <option value="Hradec Králové">Hradec Králové</option>
                <option value="Jihlava">Jihlava</option>
                <option value="Karlovy Vary">Karlovy Vary</option>
                <option value="Kladno">Kladno</option>
                <option value="Liberec">Liberec</option>
                <option value="Mladá Boleslav">Mladá Boleslav</option>
                <option value="Most">Most</option>
                <option value="Olomouc">Olomouc</option>
                <option value="Opava">Opava</option>
                <option value="Ostrava">Ostrava</option>
                <option value="Pardubice">Pardubice</option>
                <option value="Písek">Písek</option>
                <option value="Plzeň">Plzeň</option>
                <option value="Praha">Praha</option>
                <option value="Přerov">Přerov</option>
                <option value="Příbram">Příbram</option>
                <option value="Prostějov">Prostějov</option>
                <option value="Tábor">Tábor</option>
                <option value="Teplice">Teplice</option>
                <option value="Uherské Hradiště">Uherské Hradiště</option>
                <option value="Ústí nad Labem">Ústí nad Labem</option>
                <option value="Zlín">Zlín</option>
              </select>
            </div>
            <div class="input-wrap">
              <label for="field" class="field-label"
                >Na čem budete rozvážet?</label
              >
              <div class="input-wrap">
                <div class="w-embed">
                  <select name="doprava" class="input-2" required="">
                    <option value="" disabled="" selected=""
                      >Vyberte způsob dopravy</option
                    >
                    <option value="auto">Auto</option>
                    <option value="kolo">Kolo</option>
                    <option value="motorka">Motorka / Skútr</option>
                    <option value="el-kolobezka">Elektrická koloběžka</option>
                  </select>
                </div>
              </div>
            </div>
            <div
              id="w-node-_7a7458f0-b249-90e6-4e96-a52d92089dd6-d6eb4364"
              class="input-wrap"
            >
              <label for="Pojistovna" class="field-label"
                >Zdravotní pojištovna</label
              >
              <div class="w-embed">
                <select name="zdravotni-pojistovna" class="input-2" required="">
                  <option value="" disabled="" selected=""
                    >Vyberte zdravotní pojišťovnu</option
                  >
                  <option value="111"
                    >111 – Všeobecná zdravotní pojišťovna ČR</option
                  >
                  <option value="201"
                    >201 – Vojenská zdravotní pojišťovna ČR</option
                  >
                  <option value="205"
                    >205 – Česká průmyslová zdravotní pojišťovna</option
                  >
                  <option value="207"
                    >207 – Oborová zdravotní pojišťovna zaměstnanců bank,
                    pojišťoven a stavebnictví</option
                  >
                  <option value="209"
                    >209 – Zaměstnanecká pojišťovna ŠKODA</option
                  >
                  <option value="211"
                    >211 – Zdravotní pojišťovna Ministerstva vnitra ČR</option
                  >
                  <option value="213"
                    >213 – Revírní bratrská pokladna, zdravotní pojišťovna</option
                  >
                  <option value="300">300 – Samoplátce</option>
                  <option value="999">999 – Ostatní</option>
                </select>
              </div>
            </div>
            <div class="input-wrap">
              <label for="field" class="field-label"
                >Chcete uplatnit růžové prohlášení?</label
              >
              <div class="input-group-wrap">
                <label
                  id="ruzove-prohlaseni-ano"
                  class="registrationtype w-node-_7a7458f0-b249-90e6-4e96-a52d92089dde-d6eb4364 w-radio"
                >
                  <div
                    class="w-form-formradioinput w-form-formradioinput--inputType-custom radio-button w-radio-input"
                  ></div>
                  <input
                    type="radio"
                    name="ruzove-prohlaseni"
                    id="ANO-2"
                    data-name="ruzove-prohlaseni"
                    required=""
                    style="opacity:0;position:absolute;z-index:-1"
                    value="ANO"
                  /><span class="w-form-label" for="ANO-2">ANO</span>
                </label><label
                  id="ruzove-prohlaseni-ne"
                  class="registrationtype w-node-_7a7458f0-b249-90e6-4e96-a52d92089de2-d6eb4364 w-radio"
                >
                  <div
                    class="w-form-formradioinput w-form-formradioinput--inputType-custom radio-button w-radio-input"
                  ></div>
                  <input
                    type="radio"
                    name="ruzove-prohlaseni"
                    id="NE"
                    data-name="ruzove-prohlaseni"
                    style="opacity:0;position:absolute;z-index:-1"
                    value="NE"
                  /><span class="w-form-label" for="NE">NE</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="form-nav">
          <button class="button is-ghost w-button">{t("nav.prev")}</button>
          <button type="submit" class="button w-button"
            >{t("nav.submit")}</button
          >
        </div>
      </div>
    {/if}
  </form>
  <div class="success-message-5 w-form-done">
    <div>{t("result.success")}</div>
  </div>
  <div class="w-form-fail">
    <div>{t("result.fail")}</div>
  </div>
</div>

<style>
  .upload-button {
    background-color: transparent;
  }

  .mt-4 {
    margin-top: 16px;
  }

  .mr-2 {
    margin-right: 8px;
  }

  .block {
    display: block;
  }
</style>
