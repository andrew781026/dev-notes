<template>
  <div class='date-picker-years'>
    <!-- 放 prev . next icon & 目前年月的地方 -->
    <div class='date-picker-header'>
      <div class='icon' @click={minusYearToViewDate} disabled={!hasPrev(viewDate)}>
        <i class='prev'/>
      </div>
      <div class='year-month flex-1 text-center' on:click={ ()=>setViewMode('decades') }>
        <span>{getYearRange(viewDate)}</span>
      </div>
      <div class='icon' on:click={addYearToViewDate} disabled={!hasNext(viewDate)}>
        <i class='next'/>
      </div>
    </div>
    <!-- 放至內容的地方 -->
    <div class='date-picker-body'>
      <div class='months-container'>
        <!-- 總共有 6 行 -->
        <span v-for="year in getYearArr(viewDate)"
              :key="year"
              :class="getYearClass(selectDate,year)"
              @click="() => selectYear(year)">
           {{year}}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import {viewDate,minDate,maxDate} from './usePicker'

const hasPrev = (viewDate) => minDate.value ? (minDate.value.year() < viewDate.value.year() - 5) : true
const hasNext = (viewDate) => maxDate.value ? (maxDate.value.year() > viewDate.value.year() + 6) : true
const isDisabled = (type, year) => {

  if (type === 'min' && minDate.value && (minDate.value.year() > year)) return true
  else if (type === 'max' && maxDate.value && (maxDate.value.year() < year)) return true
  else return false
}

const minusYearToViewDate = () => hasPrev(viewDate) && setViewDate(moment(viewDate).subtract(10, 'year'))
const addYearToViewDate = () => hasNext(viewDate) && setViewDate(moment(viewDate).add(10, 'year'))

const getYearRange = viewDate => `${viewDate.year() - 5} － ${viewDate.year() + 6}`

const getYearArr = viewDate => {

  const viewYear = viewDate.year()
  return Array(12).fill('').map((x, i) => viewYear - 5 + i)
}

export default {
  name: "Years",
  setup() {

    return {viewDate}
  },
  methods: {
    getYearArr,
    selectYear(year) {

      if (isDisabled('min', year) || isDisabled('max', year)) return null

      if (format === 'YYYY') setSelectDate(moment({year}))
      else {

        setViewDate(moment({year, month: viewDate.month()}))
        setViewMode('months')
      }
    },
    getYearClass(selectDate, year) {

      const isActive = selectDate.year() === year

      if (isDisabled('min', year)) return 'month disabled'
      else if (isDisabled('max', year)) return 'month disabled'
      else if (isActive) return 'month active'
      else return 'month'
    }
  },
  /*
  computed: {
    yearArr() {

      const viewYear = this.viewDate.value.year()
      return Array(12).fill('').map((x, i) => viewYear - 5 + i)
    }
  }
   */
}
</script>

<style scoped>

</style>
