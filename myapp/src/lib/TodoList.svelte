<script>
    import Button from "./Button.svelte";
    import {
        createEventDispatcher,
        onDestroy,
        onMount,
        beforeUpdate,
        afterUpdate,
    } from "svelte";
    import FaRegTrashAlt from "svelte-icons/fa/FaRegTrashAlt.svelte";

    export let todos = [];

    // onMount(() => {
    //     console.log("Mounted");
    // });

    // onDestroy(() => {
    //     console.log("Destroyed");
    // });

    // beforeUpdate(() => {
    //     if (listDiv) {
    //         console.log(listDiv.offsetHeight, "Before Update");
    //     }
    // });

    afterUpdate(() => {
        if (autoScroll) {
            listDiv.scrollTo(0, listDivScrollHeight);
            autoScroll = false;
        }
    });

    export const readonly = "read only";
    let prevTodos = todos;

    let inputText = "";
    let input, listDiv, autoScroll, listDivScrollHeight;

    const dispatch = createEventDispatcher();

    $: {
        console.log(prevTodos, todos);

        autoScroll = todos.length > prevTodos.length;
        prevTodos = todos;
    }

    export function clearInput() {
        inputText = "";
    }

    export function focusInput() {
        input.focus();
    }

    function handleAddTodo() {
        // // console.log(input.value);
        // if (!inputText) {
        //     return;
        // }
        // else{
        //     console.log(inputText);
        //     // todos.push({
        //     //     id: uuid(),
        //     //     title: inputText,
        //     //     complete: false
        //     // });
        //     // todos = todos;
        //     todos = [...todos, {
        //         id: uuid(),
        //         title: inputText,
        //         complete: false
        //     }]

        //     inputText = ''; // This is to remove the previous input
        // }

        // Never control the actions from inside the component,
        // Rather, utilize a dispatch (custom event)

        const isNotCancelled = dispatch(
            "addtodo",
            {
                title: inputText,
                // complete: false
            },
            { cancelable: true },
        );
        if (isNotCancelled) {
            inputText = "";
        }
    }

    function handleRemoveTodo(id) {
        dispatch("removetodo", {
            id,
        });
    }

    function handleToggleTodo(id, value) {
        dispatch("toggletodo", {
            id,
            value,
        });
    }
</script>

<div class="todo-list-wrapper">
    <div class="todo-list" bind:this={listDiv}>
        <div bind:offsetHeight={listDivScrollHeight}>
            {#if todos.length === 0}
                <p class="no-items-text">No To Dos yet</p>
            {:else}
                <ul>
                    {#each todos as { id, title, completed }, index (id)}
                        <!-- {@debug id, title}
                    {@const number = index + 1} -->
                        <li class:completed>
                            <label>
                                <input
                                    on:input={(event) => {
                                        event.currentTarget.checked = completed;
                                        handleToggleTodo(id, !completed);
                                    }}
                                    type="checkbox"
                                    checked={completed}
                                />

                                {title}
                            </label>
                            <button
                                class="remove-todo-button"
                                aria-label="Remove ToDo: {title}"
                                on:click={() => handleRemoveTodo(id)}
                            >
                                <span
                                    style:width="10px"
                                    style:display="inline-block"
                                >
                                    <FaRegTrashAlt />
                                </span>
                            </button>
                        </li>
                    {/each}
                </ul>
            {/if}
        </div>
    </div>
    <form class="add-todo-form" on:submit|preventDefault={handleAddTodo}>
        <!-- <input bind:this={input}/> -->
        <!-- <input on:input={e => {
            // console.log(e.currentTarget.value);
            inputText = e.currentTarget.value;
        }}
        /> -->
        <input
            bind:this={input}
            bind:value={inputText}
            placeholder="Add a To Do"
        />
        <Button type="submit" disabled={!inputText}>Add</Button>
    </form>
</div>

<style>
    .todo-list {
        max-height: 150px;
        overflow: auto;
    }
</style>
