<script lang="ts">
  import type { Snippet } from "svelte";
  import { quintInOut, quintOut } from "svelte/easing";
  import { slide } from "svelte/transition";

  interface Props {
    id: string;
    heading: string;
    children: Snippet;
  }

  let { id, heading, children }: Props = $props();
  let isOpen = $state(false);
</script>

<div class="accordion-item">
  <button
    type="button"
    class="accordion__title"
    aria-expanded={isOpen}
    aria-controls={id}
    onclick={() => (isOpen = !isOpen)}
  >
    <span class="faq-h3 noselect"><strong>{heading}</strong></span>
    <span class="accordion__plus-wrapper" aria-hidden="true">
      <span class="accordion__bar-vert" class:is-open={isOpen}></span>
      <span class="accordion__bar-hor"></span>
    </span>
  </button>
  <div id={id} class="accordion__content-wrap">
    {#if isOpen}
      <div
        class="accordion__content"
        in:slide={{ duration: 500, easing: quintOut }}
        out:slide={{ duration: 500, easing: quintInOut }}
      >
        <div class="paragraph-18 text-color-gray">
          {@render children()}
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  .accordion__title {
    width: 100%;
    background: transparent;
    font-family: inherit;
    text-align: left;
  }

  .accordion__bar-vert {
    transition: transform 300ms ease-in-out;
  }

  .accordion__bar-vert.is-open {
    transform: rotate(90deg);
  }

  .accordion__content-wrap {
    height: auto;
  }

  .accordion__content :global(p:last-child),
  .accordion__content :global(ul:last-child) {
    margin-bottom: 0;
  }
</style>
