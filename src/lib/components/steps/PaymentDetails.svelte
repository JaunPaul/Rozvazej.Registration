<script lang="ts">
    import { fade } from "svelte/transition";
    import type { RegistrationState } from "../../state/RegistrationState.svelte";
    import Errors from "../Errors.svelte";
    import { t } from "../../i18n/i18n.svelte";
    import { getInsuranceOptions } from "../../i18n/insuranceGetter";

    let { registrationState }: { registrationState: RegistrationState } =
        $props();
</script>

<div in:fade class="box has-8-gap">
    <div class="input-group-wrap">
        <div class="prefix">
            <label for="bankPrefix" class="field-label"
                >{t("labels.bank.prefix")}</label
            >
            <input
                class="input-2"
                type="text"
                id="bankPrefix"
                bind:value={registrationState.values.bankPrefix}
            />
        </div>
        <div class="bank-number">
            <label for="bankNumber" class="field-label"
                >{t("labels.bank.number")}</label
            >
            <input
                class="input-2 w-input"
                type="text"
                id="bankNumber"
                bind:value={registrationState.values.bankNumber}
            />
            <Errors errors={registrationState.errors} path="bankNumber" />
        </div>
        <div class="bank-code">
            <label for="bankCode" class="field-label"
                >{t("labels.bank.code")}</label
            >
            <select
                class="input-2"
                id="bankCode"
                bind:value={registrationState.values.bankCode}
            >
                <option value="" disabled>{t("select.placeholder.bank")}</option
                >
                <option value="0100">0100 – Komerční banka</option>
                <!-- ... other banks ... -->
            </select>
            <Errors errors={registrationState.errors} path="bankCode" />
        </div>
    </div>
    <div class="input-wrap">
        <label for="insurance" class="field-label"
            >{t("labels.insurance")}</label
        >
        <select
            class="input-2"
            id="insurance"
            bind:value={registrationState.values.insurance}
        >
            <option value="" disabled
                >{t("select.placeholder.insurance")}</option
            >
            {#await getInsuranceOptions("cs") then opts}
                {#each Object.entries(opts) as [k, v]}
                    <option value={k}>{v}</option>
                {/each}
            {/await}
        </select>
    </div>
    <div class="input-wrap">
        <label class="field-label" for="pinkStatementYes"
            >{t("labels.pinkStatement")}</label
        >
        <div class="input-group-wrap">
            <label
                class="registrationtype w-radio"
                class:is-checked={registrationState.values.pinkStatement ===
                    true}
            >
                <input
                    id="pinkStatementYes"
                    type="radio"
                    bind:group={registrationState.values.pinkStatement}
                    value={true}
                    style="opacity:0;position:absolute"
                />
                <span class="w-form-label">{t("answer.yes")}</span>
            </label>
            <label
                class="registrationtype w-radio"
                class:is-checked={registrationState.values.pinkStatement ===
                    false}
            >
                <input
                    id="pinkStatementNo"
                    type="radio"
                    bind:group={registrationState.values.pinkStatement}
                    value={false}
                    style="opacity:0;position:absolute"
                />
                <span class="w-form-label">{t("answer.no")}</span>
            </label>
        </div>
    </div>
</div>
