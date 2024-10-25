<script>
  // let name = 'svelte';
  // let src = 'https://picsum.photos/200/300';
  // let string = 'Some <strong>string</strong> with html'
  // import Counter from "./lib/Counter.svelte";
  import Button from "./lib/Button.svelte";
  import GiTrackedRobot from "svelte-icons/gi/GiTrackedRobot.svelte";
  import GiRobotLeg from "svelte-icons/gi/GiRobotLeg.svelte";

  const maxCount = 6;
  const props = { initialCount: 3, maxCount };
</script>

<!-- <Counter {...props} /> -->

<!-- <Button title="Your Button"/> -->
<Button
  on:click|once={(event) => { 
    // you can add other modifiers after the | symbol
    alert(true);
  }}
  size="small"
  shadow={true}
  bgColor="red"
  textColor="white"
>
  <div style:width="20px" slot="leftContent" let:isLeftHovered>
    {#if isLeftHovered}
      <GiTrackedRobot />
    {:else}
    <GiRobotLeg />
    {/if}
  </div>
  Button Text 
</Button>

<style>
</style>
