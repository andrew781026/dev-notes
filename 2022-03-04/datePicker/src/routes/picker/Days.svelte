<script>
  import moment from 'moment'

  export let selectDate
  export let viewDate
  export let minDate
  export let maxDate
  export let setViewMode
  export let setSelectDate
  export let setViewDate

  const hasPrev = (viewDate) => minDate ? (minDate.isBefore(moment(viewDate).startOf('month'))) : true
  const hasNext = (viewDate) => maxDate ? (maxDate.isAfter(moment(viewDate).endOf('month'))) : true

  const minusMonthToViewDate = () => hasPrev(viewDate) && setViewDate(moment(viewDate).subtract(1, 'month'))
  const addMonthToViewDate = () => hasNext(viewDate) && setViewDate(moment(viewDate).add(1, 'month'))
  const selectDay = day => {

    if (minDate && day.isBefore(minDate)) return null
    else if (maxDate && day.isAfter(maxDate)) return null
    else if (viewDate.month() !== day.month()) {
      setViewDate(day)
      setSelectDate(day)
    } else return setSelectDate(day)
  }

  function getDayArr(viewDate) {

    const row = 6
    const column = 7

    const firstDate = moment(viewDate).date(1).startOf('week')
    const dateArr = []
    dateArr.push(firstDate)

    while (dateArr.length < row * column) {

      const newDate = moment(dateArr[dateArr.length - 1]).add(1, 'day')
      dateArr.push(newDate)
    }

    return dateArr
  }

  function getDayClass(selectDate, day) {

    let classes = 'day'

    if (selectDate.isSame(day)) classes += ' active '
    if (day.isSame(moment().startOf('day'))) classes += ' today '
    if (minDate && day.isBefore(minDate)) classes += ' disabled '
    if (maxDate && day.isAfter(maxDate)) classes += ' disabled '
    if (viewDate.month() !== day.month()) classes += ' old '

    return classes
  }

</script>

<div class='date-picker-days'>
  <!-- 放 prev . next icon & 目前年月的地方 -->
  <div class='date-picker-header'>
    <div class='icon' on:click={minusMonthToViewDate} disabled={!hasPrev(viewDate)}>
      <i class='prev' />
    </div>
    <div class='year-month flex-1 text-center' on:click={ ()=>setViewMode('months') }>
      <span>{viewDate.year()}</span>
      <span> 年 </span>
      <span>{viewDate.month() + 1}</span>
      <span> 月 </span>
    </div>
    <div class='icon' on:click={addMonthToViewDate} disabled={!hasNext(viewDate)}>
      <i class='next' />
    </div>
  </div>
  <!-- 放至內容的地方 -->
  <div class='date-picker-body'>
    <div class='weekdays'>
      <span>日</span>
      <span>一</span>
      <span>二</span>
      <span>三</span>
      <span>四</span>
      <span>五</span>
      <span>六</span>
    </div>
    <div class='days-container'>
      <!-- 總共有 6 行 -->
      {#each getDayArr(viewDate) as day, i}
        <span class='{getDayClass(selectDate,day)}' on:click={() => selectDay(day)}>
          {day.date()}
        </span>
      {/each}
    </div>
  </div>
</div>

<style lang='scss'>

  .date-picker-body .days-container .day {
    position: relative;
    height: 30px;
    line-height: 30px;
    text-align: center;

    &.disabled {
      color: #dee2e6;
      cursor: not-allowed;
    }

    &.old {
      color: #dee2e6;
    }

    &:not(.disabled):hover {
      background-color: rgba(51, 139, 248, 0.25);
      cursor: pointer;
      border-radius: 0.25rem;
    }

    &.active.today::before {
      border-bottom-color: #fff;
    }

    &.today {
      color: var(--date-picker-primary-color);
      font-weight: 700;
      font-size: 16px;
    }

    &.active {
      font-weight: 700;
      font-size: 16px;
      color: #fff;
      background-color: var(--date-picker-primary-color);
      border-radius: 50%;
      padding: 0;
      transform: scale(0.8);
    }

    &.today::before {
      content: '';
      display: inline-block;
      border: solid transparent;
      border-width: 0 0 7px 7px;
      border-bottom-color: #dee2e6;
      border-top-color: rgba(0, 0, 0, .2);
      position: absolute;
      bottom: 4px;
      right: 4px;
    }
  }

  .weekdays {
    display: grid;
    grid-template-columns: repeat(7, 30px);

    span {
      position: relative;
      height: 30px;
      line-height: 30px;
      text-align: center;
      font-weight: 700;
    }
  }

  .days-container {
    display: grid;
    grid-template-columns: repeat(7, 30px);
  }
</style>