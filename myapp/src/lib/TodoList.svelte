<script>
    import Button from "./Button.svelte";
    import {
        createEventDispatcher,
        onDestroy,
        onMount,
        beforeUpdate,
        afterUpdate,
    } from "svelte";

    export let todos = [];

    onMount(() => {
        console.log("Mounted");
    });

    onDestroy(() => {
        console.log("Destroyed");
    });

    beforeUpdate(() => {
        if (listDiv) {
            console.log(listDiv.offsetHeight, "Before Update");
        }
    });

    afterUpdate(() => {
        if (autoScroll) {
            listDiv.scrollTo(0, listDiv.scrollHeight);
            autoScroll = false;
        }
    });

    export const readonly = "read only";
    let prevTodos = todos;

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
    let inputText = "";
    let input, listDiv, autoScroll;

    const dispatch = createEventDispatcher();

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
        <ul>
            {#each todos as { id, title, completed }, index (id)}
                <!-- {@debug id, title}
            {@const number = index + 1} -->
                <li>
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
                    <button on:click={() => handleRemoveTodo(id)}>
                        Remove
                    </button>
                </li>
            {/each}
        </ul>
    </div>
    <form class="add-todo-form" on:submit|preventDefault={handleAddTodo}>
        <!-- <input bind:this={input}/> -->
        <!-- <input on:input={e => {
            // console.log(e.currentTarget.value);
            inputText = e.currentTarget.value;
        }}
        /> -->
        <input bind:this={input} bind:value={inputText} />
        <Button type="submit" disabled={!inputText}>Add</Button>
    </form>
</div>

<style>
    .todo-list {
        max-height: 150px;
        overflow: auto;
    }
</style>
