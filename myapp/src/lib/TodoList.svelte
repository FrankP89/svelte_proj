<script>
    import Button from "./Button.svelte";

    export let todos = [];
    let input;
    let inputText = '';

    function handleAddTodo() {
        // console.log(input.value);
        console.log(inputText);
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
        <Button type="submit">Add</Button>
    </form>

</div>
