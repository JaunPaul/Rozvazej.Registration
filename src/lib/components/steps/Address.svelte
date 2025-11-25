<script lang="ts">
    import { fade } from "svelte/transition";
    import type { RegistrationState } from "../../state/RegistrationState.svelte";
    import Errors from "../Errors.svelte";
    import { t } from "../../i18n/i18n.svelte";
    import { getCities } from "../../i18n/citiesGetter";

    let { registrationState }: { registrationState: RegistrationState } =
        $props();
</script>

<div in:fade class="box has-8-gap">
    <div class="input-group-wrap">
        <div class="input-wrap">
            <label for="street" class="field-label">{t("labels.street")}</label>
            <input
                class="input-2 w-input"
                type="text"
                id="street"
                bind:value={registrationState.values.street}
            />
            <Errors errors={registrationState.errors} path="street" />
        </div>
        <div class="input-wrap">
            <label for="houseNumber" class="field-label"
                >{t("labels.houseNumber")}</label
            >
            <input
                class="input-2 w-input"
                type="text"
                id="houseNumber"
                bind:value={registrationState.values.houseNumber}
            />
            <Errors errors={registrationState.errors} path="houseNumber" />
        </div>
    </div>
    <div class="input-group-wrap">
        <div class="input-wrap">
            <label for="city" class="field-label">{t("labels.city")}</label>
            <input
                class="input-2 w-input"
                type="text"
                id="city"
                bind:value={registrationState.values.city}
            />
            <Errors errors={registrationState.errors} path="city" />
        </div>
        <div class="input-wrap">
            <label for="zip" class="field-label">{t("labels.zip")}</label>
            <input
                class="input-2 w-input"
                type="text"
                id="zip"
                bind:value={registrationState.values.zip}
            />
            <Errors errors={registrationState.errors} path="zip" />
        </div>
    </div>
    <div class="input-wrap">
        <label for="deliveryCity" class="field-label"
            >{t("labels.cityToDeliver")}</label
        >
        <select
            class="input-2 w-select"
            id="deliveryCity"
            bind:value={registrationState.values.deliveryCity}
        >
            <option value="" disabled>{t("select.placeholder.city")}</option>
            {#await getCities("cs", registrationState.values.deliveryCompany[0] || "") then cities}
                {#each [...cities].sort() as city}
                    <option value={city}>{city}</option>
                {/each}
            {/await}
        </select>
        <Errors errors={registrationState.errors} path="deliveryCity" />
    </div>
</div>
