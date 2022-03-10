<script>
  import moment from 'moment'

  export let selectDate
  export let viewDate
  export let minDate
  export let maxDate
  export let format
  export let setViewMode
  export let setSelectDate
  export let setViewDate

  const hasPrev = (viewDate) => minDate ? (minDate.year() < viewDate.year() - 5) : true
  const hasNext = (viewDate) => maxDate ? (maxDate.year() > viewDate.year() + 6) : true
  const isDisabled = (type, year) => {

    if (type === 'min' && minDate && (minDate.year() > year)) return true
    else if (type === 'max' && maxDate && (maxDate.year() < year)) return true
    else return false
  }

  const minusYearToViewDate = () => hasPrev(viewDate) && setViewDate(moment(viewDate).subtract(10, 'year'))
  const addYearToViewDate = () => hasNext(viewDate) && setViewDate(moment(viewDate).add(10, 'year'))

  const getYearRange = viewDate => `${viewDate.year() - 5} － ${viewDate.year() + 6}`

  const getYearArr = viewDate => {

    const viewYear = viewDate.year()
    return Array(12).fill('').map((x, i) => viewYear - 5 + i)
  }

  function getYearClass(selectDate, year) {

    const isActive = selectDate.year() === year

    if (isDisabled('min', year)) return 'month disabled'
    else if (isDisabled('max', year)) return 'month disabled'
    else if (isActive) return 'month active'
    else return 'month' // 'month old'
  }

  function selectYear(year) {

    if (isDisabled('min', year) || isDisabled('max', year)) return null

    if (format === 'YYYY') setSelectDate(moment({ year }))
    else {

      setViewDate(moment({ year, month: viewDate.month() }))
      setViewMode('months')
    }
  }
</script>

<div class='date-picker-years'>
  <!-- 放 prev . next icon & 目前年月的地方 -->
  <div class='date-picker-header'>
    <div class='icon' on:click={minusYearToViewDate} disabled={!hasPrev(viewDate)}>
      <i class='prev' />
    </div>
    <div class='year-month flex-1 text-center' on:click={ ()=>setViewMode('decades') }>
      <span>{getYearRange(viewDate)}</span>
    </div>
    <div class='icon' on:click={addYearToViewDate} disabled={!hasNext(viewDate)}>
      <i class='next' />
    </div>
  </div>
  <!-- 放至內容的地方 -->
  <div class='date-picker-body'>
    <div class='months-container'>
      <!-- 總共有 6 行 -->
      {#each getYearArr(viewDate) as year, i}
            <span class='{getYearClass(selectDate,year)}' on:click={() => selectYear(year)}>
              {year}
            </span>
      {/each}
    </div>
  </div>
</div>
