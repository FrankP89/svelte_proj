<script>
  export let initialCount;
  export let maxCount; // Always specify the value or the undefined state if not mentioned in the component.
  
  console.log($$props, $$restProps);

  let count = initialCount;
  // let count2 = 0;
  // $: {console.log(`You have clicked ${getTotal(count1, count2)} time(s)`);}
  // $: string = `You have clicked ${getTotal(count1, count2)} time(s)`

  function increment() {
    if (count === maxCount) {
      return;
    }
    count++;
  }

  // function increment2() {
  //   count2++;
  // }

  function getTotal(x, y) {
    return x + y
  }


</script>

<button on:click={(increment)}>Clicks {count}</button>
<!-- <button on:click={(increment2)}>Clicks {count2}</button> -->

<!-- <h3>You have clicked {string} time(s)</h3> -->

<style>
  button{
    padding: 15px 20 px;
  }
</style>