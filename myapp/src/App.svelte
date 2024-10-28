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
  import { onMount, tick } from "svelte";

  let todoList = [];
  let showList = true;

  let todos = null;
  let error = null;
  let isLoading = true;
  let promise = loadTodos();
  let isAdding = false;
  let disabledItems = [];
  // $: console.log(todos);  // Reactive variables

  onMount(() => {
    loadTodos();
  });

  async function loadTodos() {
    isLoading = true;
    await fetch("https://jsonplaceholder.typicode.com/todos?_limit=10").then(
      async (response) => {
        if (response.ok) {
          todos = await response.json();
        } else {
          error = "Unable to load data from the server";
          // throw new Error(error);
        }
      },
    );
    isLoading = false;
  }

  async function handleAddTodo(event) {
    event.preventDefault();
    isAdding = true;

    await fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      body: JSON.stringify({
        title: event.detail.title,
        completed: false,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(async (response) => {
      if (response.ok) {
        const todo = await response.json();
        // setTimeout(async () => {
        // Gives some time for the form to be submitted
        // This approach creates new arrays
        todos = [...todos, { ...todo, id: uuid() }];
        // await tick();
        todoList.clearInput();
        // }, 500); // 500 = 0.5 second
        // return response.json();
      } else {
        error = "Unable to add ToDo";
        alert(error);
      }
    });

    isAdding = false;

    await tick(); // This will ensure all changes are applied to the DOM
    todoList.focusInput();
  }

  async function handleRemoveTodo(event) {
    const id = event.detail.id;
    if (disabledItems.includes(id)) {
      return;
    }
    disabledItems = [...disabledItems, id];
    await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "DELETE",
    }).then((response) => {
      if (!response.ok) {
        error = "Unable to remove ToDo";
        alert(error);
      } else {
        todos = todos.filter((t) => t.id !== event.detail.id);
      }
    });
    // You want to remove the id from the disabledItems
    disabledItems = disabledItems.filter(itemId => itemId !== id);
  }

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

<!-- {#if todos}
  <h2>{todos.length} TO DOs</h2> -->

<label>
  <input type="checkbox" bind:checked={showList} />
  Show List
</label>
{#if showList}
  <div style:max-width="400px">
    <TodoList
      {todos}
      {error}
      {isLoading}
      {disabledItems}
      disableAdding={isAdding}
      bind:this={todoList}
      on:removetodo={handleRemoveTodo}
      on:addtodo={handleAddTodo}
      on:toggletodo={handleToggleTodo}
    />
  </div>
{/if}

<!-- {/if} -->

<!-- <button on:click={() => todoList.focusInput()}> Focus </button> -->

<style>
</style>
