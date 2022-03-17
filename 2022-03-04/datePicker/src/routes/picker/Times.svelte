<script>
    export let selectDate
    export let viewDate
    export let viewMode
    export let minDate
    export let maxDate
    export let setViewMode
    export let setSelectDate

    // 點擊 日曆 icon , 切換到 "日期選擇器"
    const toDayPicker = () => setViewMode('days')
    const toHourPicker = () => setViewMode('hours')
    const toMinutePicker = () => setViewMode('minutes')

    const addHour = () => setSelectDate(selectDate.add(1, 'hour'))
    const minusHour = () => setSelectDate(selectDate.subtract(1, 'hour'))
    const addMinutes = () => setSelectDate(selectDate.add(1, 'minutes'))
    const minusMinutes = () => setSelectDate(selectDate.subtract(1, 'minutes'))
</script>

<div class='date-picker-times can-collapse' class:collapse="{viewMode !== 'times'}">
    <!-- 放 prev . next icon & 目前年月的地方 -->
    <div class="toggle-wrap">
        <div class='icon flex-1' on:click={toDayPicker}>
            <i class='calendar'/>
        </div>
    </div>

    <!-- 放至內容的地方 -->
    <div class='time-picker-body'>
        <div class="times-container">
            <div class="time" on:click={addHour}>
                <i class='prev green up'/>
            </div>
            <div></div>
            <div class="time" on:click={ addMinutes}>
                <i class='prev green up'/>
            </div>
            <div class="time" on:click={toHourPicker}>
                {selectDate.hours()}
            </div>
            <div class="time colon">：</div>
            <div class="time" on:click={toMinutePicker}>
                {selectDate.minutes()}
            </div>
            <div class="time" on:click={minusHour}>
                <i class='prev green down'/>
            </div>
            <div></div>
            <div class="time" on:click={minusMinutes}>
                <i class='prev green down'/>
            </div>
        </div>
    </div>
</div>

<style lang='scss'>

  .date-picker-times {
    height: 240px;
  }

  .times-container {
    display: grid;
    gap: 24px;
    grid-template-columns: repeat(3, 54px);
  }

  .time-picker-body .times-container .time {
    position: relative;
    height: 54px;
    line-height: 54px;
    text-align: center;
    font-weight: 700;
    font-size: 1.4em;

    &.disabled, &:disabled {
      color: #dee2e6;
      cursor: not-allowed;
    }

    &:not(.disabled):not(.colon):hover {
      border-radius: 0.25rem;
      cursor: pointer;
      background-color: #f8f9fa;
    }
  }
</style>
