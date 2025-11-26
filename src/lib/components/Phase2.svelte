<script lang="ts">
  import { t } from "../i18n/i18n.svelte";
  import Errors from "./Errors.svelte";
  import { RegistrationState } from "../state/RegistrationState.svelte";
  import { fade } from "svelte/transition";
  import { isEu } from "../i18n/euCountriesFilter";
  import { getCountries } from "../i18n/countriesGetter";
  import CzechFileUpload from "./CzechFileUpload.svelte";
  import EuFileUpload from "./EuFileUpload.svelte";
  import NonEuFileUpload from "./NonEuFileUpload.svelte";
  import DriversLicenseUpload from "./DriversLicenseUpload.svelte";

  let { registrationState }: { registrationState: RegistrationState } =
    $props();

  // Local state for this phase
  let currentSubStep = $state(1);
  const totalSubSteps = 1;

  // SubStep 1: Documents (moved from original Step 2)
  // SubStep 2: Additional Info (Delivery, Insurance, etc.)

  async function next() {
    // Validate
    // Phase 2 has only one step now
    const validationScope = "phase2"; // Mapping to original scopes roughly
    const valid = await registrationState.validateCurrentStep(
      validationScope as any
    );

    console.log("[next]", valid, currentSubStep, registrationState.errors);
    if (valid) {
      if (currentSubStep < totalSubSteps) {
        currentSubStep++;
      } else {
        await registrationState.submitPhase2();
      }
    }
  }

  function prev() {
    if (currentSubStep > 1) {
      currentSubStep--;
    }
  }
</script>

<div class="form-step is-active">
  <div class="box has-24-gap">
    <div class="box has-8-gap">
      <h2 class="heading is-regular">{t("step3.title")}</h2>
      <p class="body-text">{t("step3.lead")}</p>
    </div>
    <!-- Step 1: Documents -->
    {#if currentSubStep === 1}
      <div in:fade class="box has-8-gap">
        <h3>{t("labels.documents")}</h3>
        {#if registrationState.askCountryAgain}
          <div class="input-wrap">
            <label for="country" class="field-label"
              >{t("labels.citizenship")}</label
            >
            <select
              class="input-2"
              id="country"
              bind:value={registrationState.values.country}
            >
              <option value="" disabled
                >{t("select.placeholder.country")}</option
              >
              {#await getCountries("cs") then countries}
                {#each countries as country}
                  {#each Object.entries(country) as [code, name]}
                    <option value={code}>{name}</option>
                  {/each}
                {/each}
              {/await}
            </select>
            <Errors errors={registrationState.errors} path="country" />
          </div>
        {/if}

        <div class="input-wrap">
          <label for="transport" class="field-label"
            >{t("labels.transport")}</label
          >
          <select
            class="input-2"
            id="transport"
            bind:value={registrationState.values.transport}
          >
            <option value="" disabled
              >{t("select.placeholder.transport")}</option
            >
            <option value="auto">{t("options.transport.car")}</option>
            <option value="kolo">{t("options.transport.bike")}</option>
            <option value="motorka">{t("options.transport.motorcycle")}</option>
            <option value="el-kolobezka"
              >{t("options.transport.electricScooter")}</option
            >
          </select>
          <Errors errors={registrationState.errors} path="transport" />
        </div>

        <!-- Drivers License if Auto -->
        {#if registrationState.values.transport === "auto"}
          <DriversLicenseUpload {registrationState}></DriversLicenseUpload>
        {/if}

        <div class="input-group-wrap">
          <div class="input-wrap">
            <label for="gender" class="field-label">{t("labels.gender")}</label>
            <select
              class="input-2"
              id="gender"
              bind:value={registrationState.values.gender}
            >
              <option value="" disabled>{t("select.placeholder.gender")}</option
              >
              <option value="muž">{t("options.gender.male")}</option>
              <option value="žena">{t("options.gender.female")}</option>
            </select>
            <Errors errors={registrationState.errors} path="gender" />
          </div>
        </div>

        {#if registrationState.values.country === "CZ"}
          <CzechFileUpload {registrationState}></CzechFileUpload>
        {/if}

        {#if registrationState.values.country && isEu(registrationState.values.country) && registrationState.values.country !== "CZ"}
          <EuFileUpload {registrationState}></EuFileUpload>
        {/if}

        {#if registrationState.values.country && !isEu(registrationState.values.country)}
          <NonEuFileUpload {registrationState}></NonEuFileUpload>
        {/if}
      </div>
    {/if}

    <div class="form-nav">
      <div></div>

      <button
        class="button w-button"
        onclick={next}
        disabled={registrationState.validating || registrationState.submitting}
        type="button"
      >
        {registrationState.validating
          ? t("nav.validate")
          : registrationState.submitting
            ? t("nav.wait")
            : currentSubStep === totalSubSteps
              ? t("nav.submit")
              : registrationState.stepNavTextPaseTwo}
      </button>
    </div>
  </div>
</div>
