<svelte:options immutable={true} />

<script>
  // @ts-nocheck

  // let name = 'svelte';
  // let src = 'https://picsum.photos/200/300';
  // let string = 'Some <strong>string</strong> with html'
  // import Counter from "./lib/Counter.svelte";
  import Button from "./lib/Button.svelte";
  import GiTrackedRobot from "svelte-icons/gi/GiTrackedRobot.svelte";
  import GiRobotLeg from "svelte-icons/gi/GiRobotLeg.svelte";

  import TodoList from "./lib/TodoList.svelte";
  import { v4 as uuid } from "uuid";

  let todoList = [];
  let showList = true;

  let todos = [
    {
      id: uuid(),
      title: "Todo 1",
      completed: true,
    },
    {
      id: uuid(),
      title: "Todo 2",
      completed: false,
    },
    {
      id: uuid(),
      title: "Todo 3",
      completed: false,
    },
  ];

  // $: console.log(todos);  // Reactive variables

  function handleAddTodo(event) {
    event.preventDefault();

    setTimeout(() => {
      // Gives some time for the form to be submitted
      // This approach creates new arrays
      todos = [
        ...todos,
        {
          id: uuid(),
          title: event.detail.title,
          completed: false,
        },
      ];
      todoList.clearInput();
    }, 1000); // 1 second
  }

  function handleRemoveTodo(event) {
    todos = todos.filter((t) => t.id !== event.detail.id);
  }

  const maxCount = 6;
  const props = { initialCount: 3, maxCount };

  function handleToggleTodo(event) {
    todos = todos.map((todo) => {
      if (todo.id === event.detail.id) {
        return {
          ...todo,
          completed: event.detail.value,
        };
      } else {
        return { ...todo };
      }
    });
  }
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

<h2>{todos.length} TO DOs</h2>

<label>
  <input type="checkbox" bind:checked={showList} />
  Show List
</label>
{#if showList}

<TodoList
  {todos}
  bind:this={todoList}
  on:removetodo={handleRemoveTodo}
  on:addtodo={handleAddTodo}
  on:toggletodo={handleToggleTodo}
/>

{/if}


<!-- <button on:click={() => todoList.focusInput()}> Focus </button> -->

<style>
</style>
