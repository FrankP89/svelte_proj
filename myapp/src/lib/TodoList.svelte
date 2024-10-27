<script>
    import Button from "./Button.svelte";
    import { createEventDispatcher } from "svelte";

    export let todos = [];
    let input;
    let inputText = "";

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

        const isNotCancelled = dispatch("addtodo", {
            title: inputText,
            // complete: false
        },{cancelable: true});
        if(isNotCancelled){
            inputText = '';
        }
    }

        function handleRemoveTodo(id) {
            
            dispatch('removetodo', {
                id
            });
        }




</script>

<div class="todo-list-wrapper">
    <ui>
        {#each todos as { id, title, completed}, index (id)}
            {@const number = index + 1}
            <li>
                <label>
                    <input type="checkbox" checked={completed}/>
                    
                    {title}
                </label>
                <button on:click={() =>                     
                    handleRemoveTodo(id)
                    }>
                    Remove
                </button>
            </li>
        {/each}
    </ui>
    <form class="add-todo-form" on:submit|preventDefault={handleAddTodo}>
        <!-- <input bind:this={input}/> -->
        <!-- <input on:input={e => {
            // console.log(e.currentTarget.value);
            inputText = e.currentTarget.value;
        }}
        /> -->
        <input bind:value={inputText} />
        <Button type="submit" disabled={!inputText}>Add</Button>
    </form>
</div>
