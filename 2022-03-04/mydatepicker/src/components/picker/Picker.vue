<template>
  <div class='date-picker-container bottom'
       :class="{hide:pickerHide}"
       :style="{top:pickerPosition.top+'px',left:pickerPosition.left+'px'}"
       ref="datePicker">
    <Days v-if="viewMode === 'days'" {selectDate} {viewDate} {minDate} {maxDate} {setSelectDate} {setViewMode}
          {setViewDate}/>
    <Months v-else-if="viewMode === 'months'" {selectDate} {viewDate} {minDate} {maxDate} {format} {setSelectDate}
            {setViewMode} {setViewDate}/>
    <Years v-else-if="viewMode === 'years'" {selectDate} {viewDate} {minDate} {maxDate} {format} {setSelectDate}
           {setViewMode} {setViewDate}/>
    <Decades v-else-if="viewMode === 'decades'" {selectDate} {viewDate} {minDate} {maxDate} {setSelectDate}
             {setViewMode} {setViewDate}/>
  </div>
</template>

<script>
import {datePicker, pickerHide, targetInput, pickerPosition, usePicker} from "./usePicker";

export default {
  name: "Picker",
  setup() {

    // 註冊 mounted 的事件
    usePicker();

    return {datePicker, pickerHide, targetInput, pickerPosition}
  },
}
</script>

<style scoped>

</style>
