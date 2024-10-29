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
  import { fade, fly, slide, blur } from "svelte/transition";
  import { cubicInOut } from "svelte/easing";
  import spin from "./lib/transitions/spin.js";

  let todoList = [];
  let showList = true;

  let todos = null;
  let error = null;
  let isLoading = true;
  let promise = loadTodos();
  let isAdding = false;
  let disabledItems = [];
  let disabledToggleItems = [];
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
    disabledItems = disabledItems.filter((itemId) => itemId !== id);
  }

  async function handleToggleTodo(event) {
    const id = event.detail.id;
    const value = event.detail.value;
    if (disabledToggleItems.includes(id)) {
      return;
    }
    disabledToggleItems = [...disabledToggleItems, id];
    await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
      method: "PATCH",
      body: JSON.stringify({
        completed: value,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }).then(async (response) => {
      if (!response.ok) {
        error = "Unable to toggle ToDo";
        alert(error);
      } else {
        const updatedTodo = await response.json();
        todos = todos.map((todo) => {
          if (todo.id === id) {
            return updatedTodo;
          }
          return { ...todo };
        });
      }
    });
    disabledToggleItems = disabledToggleItems.filter((itemId) => itemId !== id);
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
  <div transition:spin={{ spin: 1, duration: 4000 }} 
  style:max-width="400px"
  >
    <!-- in:slide={{ duration: 700, easing: cubicInOut }}
    out:blur={{ amount: 10, duration: 700 }} -->
    <!-- on:introstart={() => {
      console.log("introstart");
    }} -->
    <!-- style="opacity:0.5; transform: rotate(90deg)" -->
    <!-- transition:fly={{ y:400, duration: 10000 }}  -->
    <TodoList
      {todos}
      {error}
      {isLoading}
      {disabledItems}
      disableToggleItems={disabledToggleItems}
      disableAdding={isAdding}
      bind:this={todoList}
      on:removetodo={handleRemoveTodo}
      on:addtodo={handleAddTodo}
      on:toggletodo={handleToggleTodo}
      let:todo
    >
      <!-- <div> 
      {todo.title}
    </div> -->
    </TodoList>
  </div>
  {#if todos}
    <p>
      Number of ToDos: {#key todos.length}<span
          style:display="inline-block"
          in:fly|local={{ y: -10 }}>{todos.length}</span
        >{/key}
    </p>
  {/if}
{/if}

<!-- {/if} -->

<!-- <button on:click={() => todoList.focusInput()}> Focus </button> -->

<style>
</style>
