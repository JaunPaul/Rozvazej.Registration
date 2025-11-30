<script lang="ts">
  import { t } from "./lib/i18n/i18n.svelte";
  import Loader from "./lib/components/Loader.svelte";
  import Phase1 from "./lib/components/Phase1.svelte";
  import Phase2 from "./lib/components/Phase2.svelte";
  import { RegistrationState } from "./lib/state/RegistrationState.svelte";
  import { SubmissionStatus } from "./lib/enums/form";
  import { onMount } from "svelte";
  import { verifyUser } from "./lib/utils/helpers";

  const registrationState = new RegistrationState();

  onMount(async () => {
    if (registrationState.currentPhase === 2) {
      const userId = registrationState.values.userId;
      const verification = await verifyUser(userId);

      if (verification.success && verification.data.contractSigned) {
        registrationState.verified = true;
      } else {
        registrationState.formState = "fail";
      }
    }
  });
</script>

{#if registrationState.submitting}
  <Loader />
{:else if registrationState.currentPhase === 2 && !registrationState.verified}
  <Loader
    progressText={[
      t("result.verifying.stage1"),
      t("result.verifying.stage2"),
      t("result.verifying.stage3"),
    ]}
  />
{:else}
  <div class="form">
    {#if registrationState.formState === "neutral" || registrationState.formState === "submitting"}
      {#if registrationState.currentPhase === 1}
        <Phase1 {registrationState} />
      {:else}
        <Phase2 {registrationState} />
      {/if}
    {/if}
  </div>
{/if}

{#if registrationState.formState === "success"}
  <div class="w-form-done" style="display: block;">
    <div>
      {#if registrationState.submissionStatus === SubmissionStatus.APPROVED}
        {t("messages.success")}
      {:else}
        {t("messages.rejected")}
      {/if}
    </div>
  </div>
{/if}

{#if registrationState.formState === "fail"}
  <div class="w-form-fail" style="display: block;">
    <div>{t("messages.error")}</div>
    {#if registrationState.errors?.error && typeof registrationState.errors.error === "object" && "message" in registrationState.errors.error}
      <div>{(registrationState.errors.error as any).message}</div>
    {/if}
  </div>
{/if}
