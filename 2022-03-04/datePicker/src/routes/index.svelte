<script>
    import Picker from './picker/index.svelte'
    import DateInput from './input/DateInput.svelte'

</script>

<div class='outer'>
    <div class='inner'>
        <DateInput />
        <div class='box'></div>
    </div>
</div>

<Picker />

<style lang='scss'>

  .outer {
    min-height: 150vh;
    overflow: auto;
    background-color: rgb(243, 10, 80);
  }

  .inner {
    height: 400px;
    width: 400px;
    overflow: auto;
    padding: 100px;
    background-color: #49f157;
    margin: 100px;

    .box {
      margin: 20px;
      height: 600px;
      width: 600px;
      background-color: #3c3c3c;
    }
  }
</style>
