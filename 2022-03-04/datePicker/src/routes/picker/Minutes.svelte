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

    const getMinuteArr = () => Array(12).fill('').map((x, i) => i * 5).map(y => (y > 9) ? y : '0' + y)
</script>

<div class='date-picker-minutes can-collapse' class:collapse="{viewMode !== 'minutes'}">
    <!-- 放 prev . next icon & 目前年月的地方 -->
    <div class="toggle-wrap">
        <div class='icon flex-1' on:click={toDayPicker}>
            <i class='calendar'/>
        </div>
    </div>

    <!-- 放至內容的地方 -->
    <div class='date-picker-body'>
        <div class='minutes-container'>
            <!-- 總共有 6 行 -->
            {#each getMinuteArr() as minute, i}
            <span class='minute'>
              {minute}
            </span>
            {/each}
        </div>
    </div>
</div>

<style lang='scss'>

  .date-picker-minutes {
    height: 240px;
  }

  .minutes-container {
    display: grid;
    grid-template-columns: repeat(4, 54px);
  }

  .date-picker-body .minutes-container .minute {
    position: relative;
    height: 54px;
    line-height: 54px;
    text-align: center;
    font-weight: 400;
    font-size: 14px;

    &.disabled, &:disabled {
      color: #dee2e6;
      cursor: not-allowed;
    }

    &:not(.disabled):not(:disabled):hover {
      border-radius: 0.25rem;
      cursor: pointer;
      background-color: #338BF83F;
    }
  }
</style>
