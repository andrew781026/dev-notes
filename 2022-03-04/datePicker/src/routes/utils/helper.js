export const getInputPosition = el => {

    const bounding = el.getBoundingClientRect()

    const inputHeight = parseFloat(getComputedStyle(el).getPropertyValue('height').match(/\d+/)[0])
    const inputWidth = parseFloat(getComputedStyle(el).getPropertyValue('width').match(/\d+/)[0])
    const finalTop = bounding.top + inputHeight
    const finalLeft = bounding.left // bounding.left + inputWidth

    return {top: finalTop, left: finalLeft}
}

export const handleInputVanish = (input, setPickerHide) => {

    const parentTop = input.parentElement.getBoundingClientRect().top
    const parentBottom = input.parentElement.getBoundingClientRect().bottom
    const parentLeft = input.parentElement.getBoundingClientRect().left
    const parentRight = input.parentElement.getBoundingClientRect().right
    const elTop = input.getBoundingClientRect().top
    const elBottom = input.getBoundingClientRect().bottom
    const elLeft = input.getBoundingClientRect().left
    const elRight = input.getBoundingClientRect().right

    const hidePicker = () => {
        input.blur()
        setPickerHide(true)
    }

    if (elTop < parentTop || elBottom > parentBottom) hidePicker()
    if (elLeft < parentLeft || elRight > parentRight) hidePicker()
}

export const clickOutSide = (getElements, fn) => {

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
