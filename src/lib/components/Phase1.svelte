<script lang="ts">
    import { t } from "../i18n/i18n.svelte";
    import Errors from "./Errors.svelte";
    import { RegistrationState } from "../state/RegistrationState.svelte";
    import { fade } from "svelte/transition";
    import { getCountries } from "../i18n/countriesGetter";
    import { isEu } from "../i18n/euCountriesFilter";
    import PersonalData from "./steps/PersonalData.svelte";
    import Citizenship from "./steps/Citizenship.svelte";
    import Address from "./steps/Address.svelte";
    import PaymentDetails from "./steps/PaymentDetails.svelte";

    let { registrationState }: { registrationState: RegistrationState } =
        $props();

    // Local state for this phase
    let currentSubStep = $state(1);
    const totalSubSteps = 4;

    // Step 1: Personal data
    // Step 2: Address
    // Step 3: Citizenship
    // Step 4: Bank

    async function next() {
        // Validate current sub-step
        // We can use the existing validation logic, but we might need to adapt it
        // since we are splitting the original "step1" and "step2" into 4 sub-steps.
        // For now, I'll rely on the state's validation method but I might need to
        // pass a specific scope or just validate everything visible.

        // Simplification: map sub-steps to original step IDs for validation
        // SubStep 1 -> "step1" (mostly)
        // SubStep 2, 3, 4 -> "step2" (mostly)

        const validationScope = currentSubStep === 1 ? "step1" : "step2";
        const valid =
            await registrationState.validateCurrentStep(validationScope);

        if (valid) {
            if (currentSubStep < totalSubSteps) {
                currentSubStep++;
            } else {
                await registrationState.submitPhase1();
            }
        }
    }

    function prev() {
        if (currentSubStep > 1) {
            currentSubStep--;
        }
    }
</script>

<div class="form-phase-1">
    <!-- Progress Indicator -->
    <div class="form-steps">
        {#each Array(totalSubSteps) as _, i}
            <div class="step" class:is-active={currentSubStep === i + 1}>
                <div>{i + 1}</div>
            </div>
        {/each}
    </div>

    <h2 class="heading is-regular">
        {currentSubStep === 1
            ? t("step1.title")
            : currentSubStep === 2
              ? t("labels.companyId") // Placeholder title
              : currentSubStep === 3
                ? t("labels.address")
                : t("labels.bank.number")}
    </h2>

    <!-- Step 1: Personal data -->
    {#if currentSubStep === 1}
        <PersonalData {registrationState} />
    {/if}

    <!-- Step 2: Address -->
    {#if currentSubStep === 2}
        <Address {registrationState} />
    {/if}

    <!-- Step 3: Citizenship -->
    {#if currentSubStep === 3}
        <Citizenship {registrationState} />
    {/if}

    <!-- Step 4: Bank -->
    {#if currentSubStep === 4}
        <PaymentDetails {registrationState} />
    {/if}

    <div class="form-nav">
        <button
            class="button is-ghost w-button"
            onclick={prev}
            disabled={currentSubStep === 1}
        >
            {t("nav.prev")}
        </button>
        <button
            class="button w-button"
            onclick={next}
            disabled={registrationState.submitting}
        >
            {currentSubStep === totalSubSteps ? t("nav.submit") : t("nav.next")}
        </button>
    </div>
</div>
