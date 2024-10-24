<script>
    // export let title = 'My Button';
</script>
<button>
    <!-- {title} -->
    <slot>Fallback</slot> 
</button>

<style lang="scss">
    button {
        background-color: #ff3e00;
        color: #fff;
        border: none;
        border-radius: 5px;
        padding: 15px 20px;
        font-weight: bold;
        cursor: pointer;
        &:hover {
            // background-color: darken(#ff3e00, 10%);
            background-color: variables.$color;
        }
    }
</style>