<script>
  // let name = 'svelte';
  // let src = 'https://picsum.photos/200/300';
  // let string = 'Some <strong>string</strong> with html'
  import Counter from "./lib/Counter.svelte";

  

  const maxCount = 6;

  const props = {initialCount: 3, maxCount};
</script>


<Counter {...props}/>



<style>

</style>