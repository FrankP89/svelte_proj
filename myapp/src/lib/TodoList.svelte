<script>
    import Button from "./Button.svelte";
    import {v4 as uuid} from "uuid";

    export let todos = [];
    let input;
    let inputText = '';

    function handleAddTodo() {
        // console.log(input.value);
        if (!inputText) {
            return;
        }
        else{
            console.log(inputText);
            // todos.push({
            //     id: uuid(),
            //     title: inputText,
            //     complete: false
            // });
            // todos = todos;
            todos = [...todos, {
                id: uuid(),
                title: inputText,
                complete: false
            }]

            inputText = ''; // This is to remove the previous input
        }
    }
</script>

<div class="todo-list-wrapper">
    <ui>
        {#each todos as { id, title }, index (id)}
            {@const number = index + 1}
            <li>{number} - {title}</li>
        {/each}
    </ui>
    <form class="add-todo-form" 
        on:submit|preventDefault={handleAddTodo} >
        <!-- <input bind:this={input}/> -->
        <!-- <input on:input={e => {
            // console.log(e.currentTarget.value);
            inputText = e.currentTarget.value;
        }}
        /> -->
        <input 
            bind:value={inputText}
        />
        <Button type="submit" disabled={!inputText}>
            Add
        </Button>
    </form>

</div>
