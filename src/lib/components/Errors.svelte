<script lang="ts">
  interface Props {
    errors?: { [key: string]: string[] };
    path?: string;
  }
  let { errors = {}, path = undefined }: Props = $props();
</script>

{#if path && errors[path]}
  <ul class="errors text-explain">
    {#each errors[path] as message}
      <li>{message}</li>
    {/each}
  </ul>
{/if}

<!-- <style>
  .errors {
    list-style-type: none;
    margin: 8px 0px 0px 0px;
    padding: 0px 0px 8px 0px;
    color: indianred;
  }
</style> -->
