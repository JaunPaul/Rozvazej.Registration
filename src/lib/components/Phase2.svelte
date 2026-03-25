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
  import { onMount } from "svelte";
  import BasicInformation from "./steps/phase2/BasicInformation.svelte";
  import IdentityDocument from "./steps/phase2/IdentityDocument.svelte";
  import ResidenceDocuments from "./steps/phase2/ResidenceDocuments.svelte";

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
      validationScope as any,
    );
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

  onMount(() => {
    const panel = Array.from(
      document.querySelectorAll<HTMLElement>(".panel-items"),
    );
    if (panel.length) {
      panel.forEach((el, i) => {
        el.classList.toggle("hide");
      });
    }
  });
</script>

<div class="form-step is-active">
  <div class="box has-24-gap">
    <div class="form-heading-wrap">
      <h2 class="heading-form-large">{t("form.title")}</h2>
      <p class="body-text">{t("form.lead")}</p>
    </div>
    <div class="box has-8-gap">
      <div class="form-heading">
        {t("phase2.title")}
      </div>
      <div class="form-line"></div>
    </div>

    <!-- Step 1 – Základní informace, adresa a vozidlo / Basic Information, Address & Vehicle -->
    {#if currentSubStep === 1}
      <BasicInformation {registrationState} />
    {/if}

    <!-- Step 2 – Doklad totožnosti / Identity Document -->
    {#if currentSubStep === 2}
      <IdentityDocument {registrationState} />
    {/if}

    <!-- Step 3 – Doklad o pobytu / Residence Document -->
    {#if currentSubStep === 3}
      <ResidenceDocuments {registrationState} />
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
