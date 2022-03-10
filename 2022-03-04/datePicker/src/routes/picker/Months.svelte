<script>
  import moment from 'moment'

  export let selectDate
  export let viewDate
  export let format
  export let minDate
  export let maxDate
  export let setViewMode
  export let setSelectDate
  export let setViewDate

  const hasPrev = (viewDate) => minDate ? (minDate.year() < viewDate.year()) : true
  const hasNext = (viewDate) => maxDate ? (maxDate.year() > viewDate.year()) : true
  const isDisabled = (type, currMonth) => {

    if (type === 'min' && minDate && currMonth.isBefore(minDate)) return true
    else if (type === 'max' && maxDate && currMonth.isAfter(maxDate)) return true
    else return false
  }

  const minusYearToViewDate = () => hasPrev(viewDate) && setViewDate(moment(viewDate).subtract(1, 'year'))
  const addYearToViewDate = () => hasNext(viewDate) && setViewDate(moment(viewDate).add(1, 'year'))

  const getMonthArr = () => Array(12).fill('').map((x, i) => i + 1)

  function getMonthClass(selectDate, month) {

    const currMonth = moment({ year: viewDate.year(), month: month - 1 })
    const hasSameMonth = (a, b) => (a.year() === b.year() && a.month() === b.month())
    const isActive = hasSameMonth(selectDate, currMonth)

    if (isDisabled('min', currMonth)) return 'month disabled'
    else if (isDisabled('max', currMonth)) return 'month disabled'
    else if (isActive) return 'month active'
    else return 'month' // 'month old'
  }

  function selectMonth(month) {

    const currMonth = moment({ year: viewDate.year(), month: month - 1 })
    if (isDisabled('min', currMonth) || isDisabled('max', currMonth)) return null

    if (format === 'YYYY-MM') setSelectDate(currMonth)
    else {

      setViewDate(currMonth)
      setViewMode('days')
    }
  }
</script>

<div class='date-picker-months'>
  <!-- 放 prev . next icon & 目前年月的地方 -->
  <div class='date-picker-header'>
    <div class='icon' on:click={minusYearToViewDate} disabled={!hasPrev(viewDate)}>
      <i class='prev' />
    </div>
    <div class='year-month flex-1 text-center' on:click={ ()=>setViewMode('years') }>
      <span>{viewDate.year()}</span>
      <span> 年 </span>
    </div>
    <div class='icon' on:click={addYearToViewDate} disabled={!hasNext(viewDate)}>
      <i class='next' />
    </div>
  </div>
  <!-- 放至內容的地方 -->
  <div class='date-picker-body'>
    <div class='months-container'>
      <!-- 總共有 6 行 -->
      {#each getMonthArr(viewDate) as month, i}
            <span class='{getMonthClass(selectDate,month)}' on:click={() => selectMonth(month)}>
              {month} 月
            </span>
      {/each}
    </div>
  </div>
</div>

