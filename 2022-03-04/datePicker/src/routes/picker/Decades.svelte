<script>
  import moment from 'moment'

  export let selectDate
  export let viewDate
  export let minDate
  export let maxDate
  export let setViewMode
  export let setSelectDate
  export let setViewDate

  const hasPrev = (viewDate) => minDate ? (minDate.year() < Math.floor(viewDate.year() / 100) * 100) : true
  const hasNext = (viewDate) => maxDate ? (maxDate.year() > Math.floor(viewDate.year() / 100) * 100 + 12 * 12 - 1) : true
  const isDisabled = (type, year) => {

    if (type === 'min' && minDate && (minDate.year() > year + 11)) return true
    else if (type === 'max' && maxDate && (maxDate.year() < year)) return true
    else return false
  }

  const minusDecadeToViewDate = () => hasPrev(viewDate) && setViewDate(moment(viewDate).subtract(100, 'year'))
  const addDecadeToViewDate = () => hasNext(viewDate) && setViewDate(moment(viewDate).add(100, 'year'))

  const getYearRange = viewDate => {

    const startYear = Math.floor(viewDate.year() / 100) * 100
    const endYear = startYear + 12 * 12 - 1
    return `${startYear} － ${endYear}`
  }

  const getDecadesArr = viewDate => {

    const viewYear = viewDate.year()
    const startYear = Math.floor(viewYear / 100) * 100
    return Array(12).fill('').map((x, i) => startYear + i * 12)
  }

  function getDecadeClass(selectDate, year) {

    const isActive = year <= selectDate.year() && selectDate.year() <= year + 11

    if (isDisabled('min', year)) return 'month disabled'
    else if (isDisabled('max', year)) return 'month disabled'
    else if (isActive) return 'month active smaller'
    else return 'month' // 'month old'
  }

  function selectDecades(year) {

    if (isDisabled('min', year) || isDisabled('max', year)) return null

    setViewDate(moment({ year: year + 6, month: viewDate.month() }))
    setViewMode('years')
  }
</script>

<div class='date-picker-months'>
  <!-- 放 prev . next icon & 目前年月的地方 -->
  <div class='date-picker-header'>
    <div class='icon' on:click={minusDecadeToViewDate} disabled={!hasPrev(viewDate)}>
      <i class='prev' />
    </div>
    <div class='year-month flex-1 text-center disabled'>
      <span>{getYearRange(viewDate)}</span>
    </div>
    <div class='icon' on:click={addDecadeToViewDate} disabled={!hasNext(viewDate)}>
      <i class='next' />
    </div>
  </div>
  <!-- 放至內容的地方 -->
  <div class='date-picker-body'>
    <div class='months-container'>
      <!-- 總共有 6 行 -->
      {#each getDecadesArr(viewDate) as year, i}
        <span class='{getDecadeClass(selectDate,year)}' on:click={() => selectDecades(year)}>
          {year} - {year + 11}
        </span>
      {/each}
    </div>
  </div>
</div>

