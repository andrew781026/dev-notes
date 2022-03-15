<script>
    import {onMount} from 'svelte'
    import Picker from './picker/index.svelte'
    import DateInput from './input/DateInput.svelte'

    let pickerHide = true
    let targetInput
    const setPickerHide = newPickerHide => pickerHide = newPickerHide
    const setTargetInput = newTargetInput => targetInput = newTargetInput
    const setPickerPosition = ({top, left}) => {

        const datePicker = document.querySelector('.date-picker-container')
        datePicker.style.top = top + 'px'
        datePicker.style.left = left + 'px'
    }

    const getInputPosition = el => {

        const bounding = el.getBoundingClientRect()

        const inputHeight = parseFloat(getComputedStyle(el).getPropertyValue('height').match(/\d+/)[0])
        const inputWidth = parseFloat(getComputedStyle(el).getPropertyValue('width').match(/\d+/)[0])
        const finalTop = bounding.top + inputHeight
        const finalLeft = bounding.left // bounding.left + inputWidth

        return {top: finalTop, left: finalLeft}
    }


    const handleInputVanish = input => {

        const parentTop = input.parentElement.getBoundingClientRect().top
        const parentBottom = input.parentElement.getBoundingClientRect().bottom
        const parentLeft = input.parentElement.getBoundingClientRect().left
        const parentRight = input.parentElement.getBoundingClientRect().right
        const elTop = input.getBoundingClientRect().top
        const elBottom = input.getBoundingClientRect().bottom
        const elLeft = input.getBoundingClientRect().left
        const elRight = input.getBoundingClientRect().right

        // console.log('elTop < parentTop=', elTop < parentTop)
        // console.log('elBottom > parentBottom=', elBottom > parentBottom)
        // console.log('elLeft < parentLeft=', elLeft < parentLeft)
        // console.log('elRight > parentRight=', elRight > parentRight)

        const hidePicker = () => {
            input.blur()
            setPickerHide(true)
        }

        if (elTop < parentTop || elBottom > parentBottom) hidePicker()
        if (elLeft < parentLeft || elRight > parentRight) hidePicker()

        // console.log($input.offset())
        // console.log(dateInput.offsetTop)
        // console.log(dateInput.getBoundingClientRect())
        // console.log(dateInput.parentElement.getBoundingClientRect())
    }

    const clickOutSide = (getElements, fn) => {

        document.addEventListener('click', (evt) => {

            let targetElement = evt.target // clicked element

            do {

                // This is a click inside. Do nothing, just return.
                if (getElements().find(el => targetElement === el)) return

                // Go up the DOM
                targetElement = targetElement.parentNode
            } while (targetElement)

            // This is a click outside.
            fn()

        }, true)
    }

    onMount(() => {

        const getElements = () => [targetInput, document.querySelector('.date-picker-container')]
        clickOutSide(getElements, () => setPickerHide(true))

        document.addEventListener('scroll', function (e) {
            // Handle scroll event -> datePicker 開啟時 , 需要追蹤它 targetElement 的位置
            // console.log(e)

            const {top: finalTop, left: finalLeft} = getInputPosition(document.querySelector('input[data-date-format]'))
            setPickerPosition({top: finalTop, left: finalLeft})

            // 開啟的時候才顯示 top / left / bottom / right

            handleInputVanish(targetInput)

        }, true)
    })
</script>

<div class='outer'>
    <div class='inner'>
        <DateInput {setPickerHide} {setPickerPosition} {getInputPosition} {setTargetInput}/>
        <div class='box'></div>
    </div>
</div>

<Picker {pickerHide}/>

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
