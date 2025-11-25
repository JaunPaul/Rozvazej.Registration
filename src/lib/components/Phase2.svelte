<script lang="ts">
    import { t } from "../i18n/i18n.svelte";
    import Errors from "./Errors.svelte";
    import { RegistrationState } from "../state/RegistrationState.svelte";
    import { fade } from "svelte/transition";
    import { isEu } from "../i18n/euCountriesFilter";

    let { registrationState }: { registrationState: RegistrationState } =
        $props();

    // Local state for this phase
    let currentSubStep = $state(1);
    const totalSubSteps = 2;
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

    // Helper for file items
    function removeFile(bucket: any, file: File) {
        registrationState.removeFile(bucket, file);
    }
</script>

{#snippet fileItem(f: File, b: any)}
    <div tabindex="-1" class="w-file-upload-success mt-4 mr-2">
        <div class="w-file-upload-file">
            <div class="w-file-upload-file-name">{f.name}</div>
            <button
                aria-label="Remove file"
                tabindex="0"
                class="w-file-remove-link"
                onclick={() => removeFile(b, f)}
            >
                <div class="w-icon-file-upload-remove"></div>
            </button>
        </div>
    </div>
{/snippet}

<div class="form-phase-2">
    <h2 class="heading is-regular">{t("step3.title")}</h2>
    <p class="body-text">{t("step3.lead")}</p>

    <!-- Step 1: Documents -->
    {#if currentSubStep === 1}
        <div in:fade class="box has-8-gap">
            <h3>{t("labels.documents")}</h3>

            {#if registrationState.values.country === "CZ"}
                <div class="upload">
                    <label class="field-label" for="filesNationalId"
                        >{@html t("labels.doc.nationalId")}</label
                    >
                    <div class="w-file-upload">
                        <input
                            id="filesNationalId"
                            type="file"
                            multiple
                            onchange={(e) => {
                                if (e.currentTarget.files) {
                                    registrationState.appendFiles(
                                        "nationalId",
                                        e.currentTarget.files,
                                    );
                                }
                            }}
                        />
                        {#each registrationState.values.filesNationalId as file}
                            {@render fileItem(file, "nationalId")}
                        {/each}
                    </div>
                    <Errors
                        errors={registrationState.errors}
                        path="filesNationalId"
                    />
                </div>
            {/if}

            {#if registrationState.values.country && isEu(registrationState.values.country) && registrationState.values.country !== "CZ"}
                <div class="upload">
                    <label class="field-label" for="filesEuPassport"
                        >{@html t("labels.doc.euPassport")}</label
                    >
                    <div class="w-file-upload">
                        <input
                            id="filesEuPassport"
                            type="file"
                            multiple
                            onchange={(e) => {
                                if (e.currentTarget.files) {
                                    registrationState.appendFiles(
                                        "euPassport",
                                        e.currentTarget.files,
                                    );
                                }
                            }}
                        />
                        {#each registrationState.values.filesEuPassport as file}
                            {@render fileItem(file, "euPassport")}
                        {/each}
                    </div>
                    <Errors
                        errors={registrationState.errors}
                        path="filesEuPassport"
                    />
                </div>
            {/if}

            {#if registrationState.values.country && !isEu(registrationState.values.country)}
                <div class="upload">
                    <label class="field-label" for="filesNonEu"
                        >{@html t("labels.doc.nonEu")}</label
                    >
                    <div class="w-file-upload">
                        <input
                            id="filesNonEu"
                            type="file"
                            multiple
                            onchange={(e) => {
                                if (e.currentTarget.files) {
                                    registrationState.appendFiles(
                                        "nonEu",
                                        e.currentTarget.files,
                                    );
                                }
                            }}
                        />
                        {#each registrationState.values.filesNonEu as file}
                            {@render fileItem(file, "nonEu")}
                        {/each}
                    </div>
                    <Errors
                        errors={registrationState.errors}
                        path="filesNonEu"
                    />
                </div>
            {/if}
        </div>
    {/if}

    <!-- Step 2: Additional Info -->
    {#if currentSubStep === 2}
        <div in:fade class="box has-8-gap">
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
                    <option value="motorka"
                        >{t("options.transport.motorcycle")}</option
                    >
                    <option value="el-kolobezka"
                        >{t("options.transport.electricScooter")}</option
                    >
                </select>
                <Errors errors={registrationState.errors} path="transport" />
            </div>

            <!-- Drivers License if Auto -->
            {#if registrationState.values.transport === "auto"}
                <div class="upload">
                    <label class="field-label" for="filesDriversLicense"
                        >{@html t("labels.doc.driversLicense")}</label
                    >
                    <div class="w-file-upload">
                        <input
                            id="filesDriversLicense"
                            type="file"
                            multiple
                            onchange={(e) => {
                                if (e.currentTarget.files) {
                                    registrationState.appendFiles(
                                        "driversLicense",
                                        e.currentTarget.files,
                                    );
                                }
                            }}
                        />
                        {#each registrationState.values.filesDriversLicense as file}
                            {@render fileItem(file, "driversLicense")}
                        {/each}
                    </div>
                    <Errors
                        errors={registrationState.errors}
                        path="filesDriversLicense"
                    />
                </div>
            {/if}

            <div class="input-group-wrap">
                <div class="input-wrap">
                    <label for="gender" class="field-label"
                        >{t("labels.gender")}</label
                    >
                    <select
                        class="input-2"
                        id="gender"
                        bind:value={registrationState.values.gender}
                    >
                        <option value="" disabled
                            >{t("select.placeholder.gender")}</option
                        >
                        <option value="muž">{t("options.gender.male")}</option>
                        <option value="žena"
                            >{t("options.gender.female")}</option
                        >
                    </select>
                </div>
            </div>
        </div>
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
