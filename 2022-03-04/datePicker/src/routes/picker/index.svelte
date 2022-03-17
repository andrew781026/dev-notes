<script>
    import moment from 'moment'
    import DayTime from './DayTime.svelte'
    import Months from './Months.svelte'
    import Years from './Years.svelte'
    import Decades from './Decades.svelte'
    import {onMount} from "svelte";
    import {clickOutSide, handleInputVanish, getInputPosition} from "../utils/helper";

    let pickerHide = true
    let targetInput
    let datePicker;
    let minDate = null;
    let maxDate = null;
    let selectDate = moment().startOf('day')
    let format = 'YYYY-MM-DD'
    let viewMode = 'hours' // 有 'times' . 'hours' . 'minus' . 'days' . 'months' . 'years' . 'decades'
    let viewDate = selectDate ? moment(selectDate).startOf('month') : moment()

    const setViewMode = newViewMode => viewMode = newViewMode
    const setSelectDate = newSelectDate => selectDate = newSelectDate
    const setViewDate = newViewDate => viewDate = newViewDate
    const setPickerHide = newPickerHide => pickerHide = newPickerHide
    const setTargetInput = newTargetInput => targetInput = newTargetInput
    const setPickerPosition = ({top, left}) => {

        datePicker.style.top = top + 'px'
        datePicker.style.left = left + 'px'
    }

    onMount(() => {

        // 設定 DateTimePicker 的相關事件
        window.DateTimePicker = {
            date: () => console.log("設定日期"),
            format: () => console.log("日期的文字格式"),
            minDate: () => console.log("最小日期"),
            maxDate: () => console.log("最大大日期"),
            defaultDate: () => console.log("預設日期"),
            viewMode: (newViewMode) => {

                console.log("目前顯示模式")

                if (!newViewMode) return viewMode
                else {
                    setViewMode(newViewMode)
                    return newViewMode
                }
            },
            showClear: () => console.log("顯示清除按鈕"),
            showClose: () => console.log("顯示關閉按鈕"),
            keepOpen: () => console.log("選定日期後 , 還是開著 DatePicker"),
            debug: () => console.log("Will cause the date picker to stay open after a blur event."),
            close: () => console.log("DatePicker close !!"),
            open: (dateInput) => {
                console.log("DatePicker Open !!")

                setTargetInput(dateInput)
                setPickerHide(false)
                setPickerPosition(getInputPosition(dateInput))
            },
        }

        // 點擊外側 , 關閉 datePicker
        const getElements = () => [targetInput, datePicker]
        clickOutSide(getElements, () => setPickerHide(true))

        // 註冊捲動的相關事件
        document.addEventListener('scroll', function (e) {

            // 取得 input 的位置 , 並將 datePicker 的位置設定到上面
            const {top: finalTop, left: finalLeft} = getInputPosition(targetInput)
            setPickerPosition({top: finalTop, left: finalLeft})

            // 看不到 input 的時候 , 就將 DatePicker 關起來
            handleInputVanish(targetInput, setPickerHide)

        }, true)
    })

</script>

<div class='date-picker-container bottom' bind:this={datePicker} class:hide="{pickerHide}">

    {#if viewMode === 'months'}
        <Months {selectDate} {viewDate} {minDate} {maxDate} {format} {setSelectDate} {setViewMode} {setViewDate}/>
    {:else if viewMode === 'years'}
        <Years {selectDate} {viewDate} {minDate} {maxDate} {format} {setSelectDate} {setViewMode} {setViewDate}/>
    {:else if viewMode === 'decades'}
        <Decades {selectDate} {viewDate} {minDate} {maxDate} {setSelectDate} {setViewMode} {setViewDate}/>
    {:else}
        <DayTime {selectDate} {viewDate} {viewMode} {minDate} {maxDate} {setSelectDate} {setViewMode} {setViewDate}/>
    {/if}
</div>
