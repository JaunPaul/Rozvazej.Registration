<script lang="ts">
  import { fade } from "svelte/transition";
  import { t, setLocale } from "./lib/i18n/i18n.svelte";
  setLocale("cs");
  const Steps = {
    step1: 1,
    step2: 2,
    step3: 3,
  };

  const currentStep = $state(Steps.step1);

  const values = $state({
    firstName: "",
    lastName: "",
    phone: "",
    companyId: "",
    nationalId: "",
    applyAsCompany: "",
  });

  $inspect(values);
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
                ><strong>Státní občanství</strong></label
              >
              <div class="w-embed">
                <select
                  name="country"
                  id="statni-obcanstvi"
                  class="input-2"
                  required=""
                  autocomplete="off"
                >
                  <option value="" disabled="" selected="">Vyberte stát</option>
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
                <label for="Ulice" class="field-label">Ulice</label><input
                  data-parsley-error-message="Zadejte prosím název ulice"
                  class="input-2 w-node-_48acfe53-5ca2-1118-0e8c-0cdd22174c3b-d6eb4364 w-input"
                  maxlength="256"
                  name="Ulice"
                  data-name="Ulice"
                  placeholder=""
                  type="text"
                  id="Ulice"
                  required=""
                />
              </div>
              <div class="input-wrap">
                <label for="Cislo-popisne" class="field-label"
                  >Číslo popisné</label
                ><input
                  data-parsley-error-message="Zadejte prosím číslo popisné"
                  class="input-2 w-node-_75182725-5b9f-8942-268c-668a41ccdfd7-d6eb4364 w-input"
                  maxlength="256"
                  name="Cislo-popisne"
                  data-name="Cislo popisne"
                  placeholder=""
                  type="tel"
                  id="Cislo-popisne"
                  required=""
                />
              </div>
            </div>
            <div class="input-group-wrap">
              <div class="input-wrap">
                <label for="Mesto" class="field-label">Město</label><input
                  data-parsley-error-message="Zadejte prosím město či obec"
                  class="input-2 w-node-_9b7ed3bb-d228-0d66-fa58-ba76e3894472-d6eb4364 w-input"
                  maxlength="256"
                  name="Mesto"
                  data-name="Mesto"
                  placeholder=""
                  type="text"
                  id="Mesto"
                  required=""
                />
              </div>
              <div class="input-wrap">
                <label for="PSC" class="field-label">PSČ</label><input
                  data-parsley-error-message="Zadejte prosím poštovní směrovací číslo"
                  class="input-2 w-node-_9b7ed3bb-d228-0d66-fa58-ba76e3894476-d6eb4364 w-input"
                  maxlength="256"
                  name="PSC"
                  data-name="PSC"
                  placeholder=""
                  type="tel"
                  id="PSC"
                  required=""
                />
              </div>
            </div>
            <div class="input-group-wrap">
              <div class="input-group-wrap">
                <div class="prefix">
                  <label for="cislo-uctu" class="field-label">Předčíslí</label>
                  <div class="w-embed">
                    <input
                      type="text"
                      id="predcisli"
                      name="predcisli"
                      class="input-2"
                      maxlength="5"
                      pattern="\d*"
                      inputmode="numeric"
                      placeholder="Např. 12345"
                    />
                  </div>
                </div>
                <div class="bank-number">
                  <label for="cislo-uctu" class="field-label"
                    >Číslo bankovního účtu</label
                  ><input
                    data-parsley-error-message="Zadejte prosím vaše číslo účtu"
                    class="input-2 w-node-_5456f3ba-5ad3-f3cf-d87e-1e89755a0bb4-d6eb4364 w-input"
                    maxlength="256"
                    name="slo-tu"
                    data-name="Číslo účtu"
                    placeholder=""
                    type="number"
                    id="cislo-uctu"
                    required=""
                  />
                </div>
                <div class="bank-code">
                  <label for="cislo-uctu" class="field-label">Kód banky</label>
                  <div class="w-embed">
                    <select
                      name="kod-banky"
                      id="kod-banky"
                      class="input-2"
                      required=""
                    >
                      <option value="" disabled="" selected=""
                        >Vyberte banku</option
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
              <div class="upload">
                <label for="Ulice" class="field-label"
                  >Nahrajte ID/ jiný platný doklad. <br /><span
                    class="bold-green">PŘEDNÍ STRANA</span
                  ></label
                >
                <div id="file-1" class="w-file-upload">
                  <div class="default-state-2 w-file-upload-default">
                    <input
                      class="w-file-upload-input"
                      accept=""
                      name="File-1-2"
                      data-name="File 1"
                      aria-hidden="true"
                      type="file"
                      id="File-1-2"
                      tabindex="-1"
                      required=""
                    /><label
                      for="File-1-2"
                      role="button"
                      tabindex="0"
                      class="w-file-upload-label"
                    >
                      <div class="w-icon-file-upload-icon"></div>
                      <div class="w-inline-block">Upload File</div>
                    </label>
                    <div class="w-file-upload-info">Max file size 10MB.</div>
                  </div>
                  <div tabindex="-1" class="w-file-upload-uploading w-hidden">
                    <div class="w-file-upload-uploading-btn">
                      <svg
                        class="w-icon-file-upload-uploading"
                        xmlns="http://www.w3.org/2000/svg"
                        viewbox="0 0 30 30"
                        aria-hidden="true"
                      >
                        <path
                          fill="currentColor"
                          opacity=".2"
                          d="M15 30a15 15 0 1 1 0-30 15 15 0 0 1 0 30zm0-3a12 12 0 1 0 0-24 12 12 0 0 0 0 24z"
                        ></path>
                        <path
                          fill="currentColor"
                          opacity=".75"
                          d="M0 15A15 15 0 0 1 15 0v3A12 12 0 0 0 3 15H0z"
                        ></path>
                        <animatetransform
                          attributename="transform"
                          attributetype="XML"
                          dur="0.6s"
                          from="0 15 15"
                          repeatcount="indefinite"
                          to="360 15 15"
                          type="rotate"
                        ></animatetransform>
                      </svg>
                      <div class="w-inline-block">Uploading...</div>
                    </div>
                  </div>
                  <div tabindex="-1" class="w-file-upload-success w-hidden">
                    <div class="w-file-upload-file">
                      <div class="w-file-upload-file-name">
                        fileuploaded.jpg
                      </div>
                      <div
                        aria-label="Remove file"
                        role="button"
                        tabindex="0"
                        class="w-file-remove-link"
                      >
                        <div class="w-icon-file-upload-remove"></div>
                      </div>
                    </div>
                  </div>
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
              </div>
              <div class="upload">
                <label for="Ulice" class="field-label"
                  >Nahrajte ID/ jiný platný doklad. <br /><span
                    class="bold-green">ZADNÍ STRANA</span
                  ></label
                >
                <div id="file-2" class="w-file-upload">
                  <div class="default-state-2 w-file-upload-default">
                    <input
                      class="w-file-upload-input"
                      accept=""
                      name="File-2-2"
                      data-name="File 2"
                      aria-hidden="true"
                      type="file"
                      id="File-2-2"
                      tabindex="-1"
                      required=""
                    /><label
                      for="File-2-2"
                      role="button"
                      tabindex="0"
                      class="w-file-upload-label"
                    >
                      <div class="w-icon-file-upload-icon"></div>
                      <div class="w-inline-block">Upload File</div>
                    </label>
                    <div class="w-file-upload-info">Max file size 10MB.</div>
                  </div>
                  <div tabindex="-1" class="w-file-upload-uploading w-hidden">
                    <div class="w-file-upload-uploading-btn">
                      <svg
                        class="w-icon-file-upload-uploading"
                        xmlns="http://www.w3.org/2000/svg"
                        viewbox="0 0 30 30"
                        aria-hidden="true"
                      >
                        <path
                          fill="currentColor"
                          opacity=".2"
                          d="M15 30a15 15 0 1 1 0-30 15 15 0 0 1 0 30zm0-3a12 12 0 1 0 0-24 12 12 0 0 0 0 24z"
                        ></path>
                        <path
                          fill="currentColor"
                          opacity=".75"
                          d="M0 15A15 15 0 0 1 15 0v3A12 12 0 0 0 3 15H0z"
                        ></path>
                        <animatetransform
                          attributename="transform"
                          attributetype="XML"
                          dur="0.6s"
                          from="0 15 15"
                          repeatcount="indefinite"
                          to="360 15 15"
                          type="rotate"
                        ></animatetransform>
                      </svg>
                      <div class="w-inline-block">Uploading...</div>
                    </div>
                  </div>
                  <div tabindex="-1" class="w-file-upload-success w-hidden">
                    <div class="w-file-upload-file">
                      <div class="w-file-upload-file-name">
                        fileuploaded.jpg
                      </div>
                      <div
                        aria-label="Remove file"
                        role="button"
                        tabindex="0"
                        class="w-file-remove-link"
                      >
                        <div class="w-icon-file-upload-remove"></div>
                      </div>
                    </div>
                  </div>
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
