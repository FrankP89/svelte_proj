<script>
  // let name = 'svelte';
  // let src = 'https://picsum.photos/200/300';
  // let string = 'Some <strong>string</strong> with html'
  // import Counter from "./lib/Counter.svelte";
  import Button from "./lib/Button.svelte";
  import GiTrackedRobot from "svelte-icons/gi/GiTrackedRobot.svelte";
  import GiRobotLeg from "svelte-icons/gi/GiRobotLeg.svelte";

  import TodoList from "./lib/TodoList.svelte";
  import {v4 as uuid} from "uuid";
    import { compile } from "svelte/compiler";

  let todos = [
    {
      id: uuid(),
      title: 'Todo 1',
      complete: true
    },
    {
      id: uuid(),
      title: 'Todo 2',
      complete: false
    },
    {
      id: uuid(),
      title: 'Todo 3',
      complete: false
    }
  ]

  $: console.log(todos);

  const maxCount = 6;
  const props = { initialCount: 3, maxCount };
</script>

<!-- <Counter {...props} /> -->

<!-- <Button title="Your Button"/> -->
<!-- <Button
  on:click|once={(event) => { 
    // you can add other modifiers after the | symbol
    alert(true);
  }}
  disabled={true}
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
</Button> -->

<h2>{todos.length} TO DOs </h2>

<TodoList bind:todos={todos}/>



<style>
</style>
