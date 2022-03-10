<script>
  import { onMount } from 'svelte'
  import Picker from './picker/index.svelte'

  onMount(() => {

    document.addEventListener('scroll', function(e) {
      // Handle scroll event -> datePicker 開啟時 , 需要追蹤它 targetElement 的位置
      // console.log(e)

      function isVisible(element, vp) {
        /* This checks if the element is in the viewport area, you could also
         * check the display and visibility of its style.
         */
        var rect = element.getBoundingClientRect()
        var x = rect.left
        var x2 = x + element.offsetWidth
        var y = rect.top
        var y2 = y + element.offsetHeight
        return !(x >= vp.w || y >= vp.h || x2 < 0 || y2 < 0)
      }

      const h1 = document.querySelector('input[data-date-format]')

      const bounding = h1.getBoundingClientRect()

      const inputHeight = parseFloat(getComputedStyle(h1).getPropertyValue('height').match(/\d+/)[0])
      const inputWidth = parseFloat(getComputedStyle(h1).getPropertyValue('width').match(/\d+/)[0])
      const finalTop = bounding.top + inputHeight
      const finalLeft = bounding.left + inputWidth

      // console.table({ inputHeight, inputWidth, finalTop })

      const datePicker = document.querySelector('.date-picker-container')

      datePicker.style.top = finalTop + 7 + 'px'
      datePicker.style.left = finalLeft - 15 + 'px'
      document.documentElement.style.setProperty('--left', (bounding.left + 5) + 'px')

      // 開啟的時候才顯示 top / left / bottom / right

    }, true)
  })
</script>

<div class='outer'>
  <div class='inner'>
    <input type='text' data-date-format='YYYY-MM-DD'>
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
      height: 400px;
      width: 400px;
      background-color: #3c3c3c;
    }
  }
</style>