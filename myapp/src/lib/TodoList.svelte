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
        // console.log(prevTodos, todos);

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

<style lang="scss">
    .todo-list-wrapper {
        background-color: #424242;
        border: 1px solid #4b4b4b;
        .no-items-text {
            margin: 0;
            padding: 15px;
            text-align: center;
        }
        .todo-list {
            max-height: 200px;
            overflow: auto;
            ul {
                margin: 0;
                padding: 10px;
                list-style: none;
                li {
                    margin-bottom: 5px;
                    display: flex;
                    align-items: center;
                    background-color: #303030;
                    border-radius: 5px;
                    padding: 10px;
                    position: relative;
                    label {
                        cursor: pointer;
                        font-size: 18px;
                        display: flex;
                        align-items: baseline;
                        padding-right: 20px;
                        // font-weight: bold;
                        // flex: 1;
                        input[type="checkbox"] {
                            margin: 0 10px 0 0;
                            cursor: pointer;
                        }
                    }
                    &.completed > label {
                        opacity: 0.5;
                        text-decoration: line-through;
                    }
                    .remove-todo-button {
                        border: none;
                        background: none;
                        padding: 5px;
                        position: absolute;
                        right: 10px;
                        cursor: pointer;
                        display: none;
                        :global(svg) {
                            fill: #bd1414;
                        }
                    }
                    &:hover {
                        .remove-todo-button {
                            display: block;
                        }
                    }
                    
                }
                
            }
        }
        .add-todo-form {
            padding: 15px;
            background-color: #303030;
            display: flex;
            flex-wrap: wrap;
            border-top: 1px solid #4b4b4b;
            input {
                flex: 1;
                background-color: #424242;
                border: 1px solid #4b4b4b;
                padding: 10px;
                color: #fff;
                border-radius: 5px;
                margin-right: 10px;                
                
            }
        }
    }
</style>
