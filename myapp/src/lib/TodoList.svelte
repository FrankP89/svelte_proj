<script>
export let todos = [];

</script>

<ui>
    {#each todos as {id, title}, index (id)}
        {@const number = index + 1}
        <li>{number} - {title}</li>
    {/each}
</ui>
