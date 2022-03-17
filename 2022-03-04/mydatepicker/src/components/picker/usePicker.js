import moment from "moment";
import {ref, onMounted} from '@vue/composition-api'
import {clickOutSide, getInputPosition, handleInputVanish} from "../../utils/helper";

export const pickerHide = ref(true);
export const targetInput = ref(null);
export const datePicker = ref(null);
export const minDate = ref(null);
export const maxDate = ref(null);
export const selectDate = ref(null); // moment().startOf('day')
export const pickerPosition = ref({top: null, left: null});
export const format = ref('YYYY-MM-DD');


// 目前顯示的類型 :  有 'times' . 'hour' . 'minus' . 'days' . 'months' . 'years' . 'decades'
const viewMode = ref('days');

// 目前顯示的日期
export const viewDate = selectDate ? moment(selectDate).startOf('month') : moment();

export const setViewMode = newViewMode => viewMode.value = newViewMode;
export const setSelectDate = newSelectDate => selectDate.value = newSelectDate;
export const setViewDate = newViewDate => viewDate.value = newViewDate;
export const setPickerHide = newPickerHide => pickerHide.value = newPickerHide;
export const setTargetInput = newTargetInput => targetInput.value = newTargetInput;
export const setPickerPosition = ({top, left}) => pickerPosition.value = {top, left};

// 引入 usePicker 時 , 元件 mounted 的時候會執行下方的 onMounted 的內容
export const usePicker = () => {

    onMounted(() => {

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
        clickOutSide(() => [targetInput.value, datePicker.value], () => setPickerHide(true))

        // 註冊捲動的相關事件
        document.addEventListener('scroll', function (e) {

            if (targetInput.value) {

                // 取得 input 的位置 , 並將 datePicker 的位置設定到上面
                const {top: finalTop, left: finalLeft} = getInputPosition(targetInput.value)
                setPickerPosition({top: finalTop, left: finalLeft})

                // 看不到 input 的時候 , 就將 DatePicker 關起來
                handleInputVanish(targetInput.value, setPickerHide)
            }

        }, true)
    })
}

/*{

    datePicker.style.top = top + 'px'
    datePicker.style.left = left + 'px'
}*/
