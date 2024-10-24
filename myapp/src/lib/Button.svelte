<script>
    // export let title = 'My Button';
    export let size = 'small';
    export let shadow = false;
    export let bgColor = 'inherit'; // Inherit in case there's no info provided
    export let textColor = 'inherit';
</script>
<button class={size == "large" ? "size-lg" :  "size-sm"}
        style:--buttonBgColor={bgColor}
        style:--buttonTextColor= {textColor}
        class:shadow
        class:active={shadow}>
    <!-- {title} -->
    <slot>Fallback</slot> 
</button>

<style lang="scss">
    button {
        background-color: var(--buttonBgColor);
        color: var(--buttonTextColor); // They are references in the app.css root
        border: none;
        border-radius: 5px;
        padding: 15px 20px;
        font-weight: bold;
        cursor: pointer;
        &:hover {
            // background-color: darken(#ff3e00, 10%);
            // background-color: variables.$color;
            background-image: linear-gradient(rgba(0, 0, 0, 0.4 ) 0 0);
        }
        &.active{
            background-image: linear-gradient(rgba(255, 255, 255, 0.1 ) 0 0);
        }
        &.size-sm{
            padding: 15px 20px;
        }
        &.size-lg{
            padding: 20px 25px;
            font-size: 20px;
        }
        &.shadow {
            box-shadow: 0 0 10px rgba(1, 1, 1, 0.3);
        }
    }
</style>