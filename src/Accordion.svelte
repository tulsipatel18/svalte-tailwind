<script>
  export let open = false;
  import { slide } from "svelte/transition";
  const handleClick = () => (open = !open);
</script>

<div class="accordion">
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <div class="header" on:click|preventDefault={handleClick}>
    <button>
      <i class="fa-solid fa-angle-down" class:handlearrow={open==true} />
    </button>
    <div class="text mx-4">
      <slot name="head" />
    </div>
  </div>

  {#if open}
    <div class="details" transition:slide>
      <slot name="details" />
    </div>
  {/if}
</div>

<style>
  div.accordion {
    border-top: 0.5px solid #7777776c;
  }
  .header button{
    background: none !important;
  }
  .handlearrow{
    transform: rotate(180deg);
    transition: ease-in-out;
  }

  div.header {
    display: flex;
    width: 100%;
    align-items: center;
    padding: 10px 40px;
    color: #777777;
  }

  div.header:hover {
    color: #1cb9a2;
  }

  div.header:hover i {
    color: #1cb9a2;
  }

  div.header .text {
    flex: 1;
    margin-right: 5px;
  }

  div.details {
    padding: 16px 36px;
    color: #777777;
  }

  div.header i {
    border: none;
    color: #777777;
    font-size: 25px;
  }

  div.header button{
    border: none;
    outline: none;
  }
</style>
