<script lang="ts">
    import { fade } from "svelte/transition";
    import type { RegistrationState } from "../../../state/RegistrationState.svelte";
    import Errors from "../../Errors.svelte";
    import { t } from "../../../i18n/i18n.svelte";

    let { registrationState }: { registrationState: RegistrationState } =
        $props();
</script>

<div in:fade class="box has-8-gap"></div>
