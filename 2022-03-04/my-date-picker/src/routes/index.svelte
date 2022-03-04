<script>
    import moment from "moment";

    let selectDate = moment().startOf('day');
    let format = 'YYYY-MM-DD';
    let viewMode = 'days'; // 有 'times' . 'days' . 'months' . 'years' . 'decades'
    let viewDate = selectDate ? moment(selectDate).startOf('month') : moment();

    function minusMonthToViewDate() {
        viewDate = moment(viewDate).subtract(1, 'month');
    }

    function addMonthToViewDate() {
        viewDate = moment(viewDate).add(1, 'month');
    }

    function getDateArr(viewDate) {

        const row = 6;
        const column = 7;

        const firstDate = moment(viewDate).date(1).startOf('week');
        const dateArr = [];
        dateArr.push(firstDate);

        while (dateArr.length < row * column) {

            const newDate = moment(dateArr[dateArr.length - 1]).add(1, 'day');
            dateArr.push(newDate);
        }

        return dateArr;
    }

    function getDayClass(selectDate,day) {

        if (selectDate.isSame(day) && day.isSame(moment().startOf('day'))) return 'day today active'
        else if (selectDate.isSame(day)) return 'day active'
        else if (day.isSame(moment().startOf('day'))) return 'day today'
        else if (viewDate.month() !== day.month()) return 'day old'
        else return 'day'
    }

    function selectDay(day) {

        console.table({day: day.toDate(), selectDate: selectDate.toDate()});
        selectDate = day;
    }
</script>

<div class="date-picker-container bottom">
    <div class="date-picker-days">
        <!-- 放 prev . next icon & 目前年月的地方 -->
        <div class="date-picker-header">
            <div class="icon" on:click={minusMonthToViewDate}>
                <i class="prev"/>
            </div>
            <div class="year-month flex-1 text-center" on:click={console.log}>
                <span>{viewDate.year()}</span>
                <span> 年 </span>
                <span>{viewDate.month() + 1}</span>
                <span> 月 </span>
            </div>
            <div class="icon" on:click={addMonthToViewDate}>
                <i class="next"/>
            </div>
        </div>
        <!-- 放至內容的地方 -->
        <div class="date-picker-body">
            <div class="weekdays">
                <span>日</span>
                <span>一</span>
                <span>二</span>
                <span>三</span>
                <span>四</span>
                <span>五</span>
                <span>六</span>
            </div>
            <div class="days-container">
                <!-- 總共有 6 行 -->
                {#each getDateArr(viewDate) as day, i}
                    <span class="{getDayClass(selectDate,day)}" on:click={() => selectDay(day)}>
                        {day.date()}
                    </span>
                {/each}
            </div>
        </div>
    </div>
</div>

<style lang="scss">
  .date-picker-container i {
    height: 12px;
    width: 12px;
    display: inline-block;
    background-size: contain;
    background-repeat: no-repeat;
  }

  .date-picker-container .icon {
    height: 30px;
    width: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .date-picker-container i.prev {
    background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='iso-8859-1'%3F%3E%3C!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3E%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 55.753 55.753' style='enable-background:new 0 0 55.753 55.753;' xml:space='preserve'%3E%3Cg%3E%3Cpath d='M12.745,23.915c0.283-0.282,0.59-0.52,0.913-0.727L35.266,1.581c2.108-2.107,5.528-2.108,7.637,0.001 c2.109,2.108,2.109,5.527,0,7.637L24.294,27.828l18.705,18.706c2.109,2.108,2.109,5.526,0,7.637 c-1.055,1.056-2.438,1.582-3.818,1.582s-2.764-0.526-3.818-1.582L13.658,32.464c-0.323-0.207-0.632-0.445-0.913-0.727 c-1.078-1.078-1.598-2.498-1.572-3.911C11.147,26.413,11.667,24.994,12.745,23.915z'/%3E%3C/g%3E%3C/svg%3E%0A");
  }

  .date-picker-container i.next {
    background-image: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='iso-8859-1'%3F%3E%3C!-- Generator: Adobe Illustrator 19.0.0, SVG Export Plug-In . SVG Version: 6.00 Build 0) --%3E%3Csvg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' x='0px' y='0px' viewBox='0 0 55.752 55.752' style='enable-background:new 0 0 55.752 55.752;' xml:space='preserve'%3E%3Cg%3E%3Cpath d='M43.006,23.916c-0.28-0.282-0.59-0.52-0.912-0.727L20.485,1.581c-2.109-2.107-5.527-2.108-7.637,0.001 c-2.109,2.108-2.109,5.527,0,7.637l18.611,18.609L12.754,46.535c-2.11,2.107-2.11,5.527,0,7.637c1.055,1.053,2.436,1.58,3.817,1.58 s2.765-0.527,3.817-1.582l21.706-21.703c0.322-0.207,0.631-0.444,0.912-0.727c1.08-1.08,1.598-2.498,1.574-3.912 C44.605,26.413,44.086,24.993,43.006,23.916z'/%3E%3C/g%3E%3C/svg%3E%0A");
  }

  .date-picker-container .text-center {
    text-align: center;
  }

  .date-picker-container {
    background-color: #fff;
    box-sizing: border-box;
    font-size: 13px;
    font-family: MicrosoftJhengHei, serif;
    background-clip: padding-box;
    box-shadow: 0 2px 6px 2px rgba(0, 0, 0, 0.15);
    color: #212529;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 0.25rem;
    min-width: 10rem;
    z-index: 1000;
    position: absolute;
    display: flex;
    flex-direction: column;
    margin: 2px 0;
    padding: 8px;
    list-style: none;

    * {
      box-sizing: border-box;
    }

    &::before {
      content: '';
      display: inline-block;
      position: absolute;
    }

    &::after {
      content: '';
      display: inline-block;
      position: absolute;
    }

    &.bottom::before {
      border-left: 7px solid transparent;
      border-right: 7px solid transparent;
      border-bottom: 7px solid #ccc;
      border-bottom-color: rgba(0, 0, 0, 0.2);
      top: -7px;
      left: 7px;
    }

    &.bottom::after {
      border-left: 6px solid transparent;
      border-right: 6px solid transparent;
      border-bottom: 6px solid #fff;
      top: -6px;
      left: 8px;
    }
  }

  .date-picker-body .days-container .day {
    position: relative;
    height: 30px;
    line-height: 30px;
    text-align: center;

    &.old {
      color: #dee2e6;
    }

    &:hover {
      background-color: rgba(51, 139, 248, 0.25);
      cursor: pointer;
      border-radius: 0.25rem;
    }

    &.active {
      font-weight: 700;
      font-size: 16px;
      color: #fff;
      background-color: #60ba9a;
      border-radius: 50%;
      padding: 0;
      transform: scale(0.8);
    }

    &.active.today::before {
      border-bottom-color: #fff;
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

  .date-picker-header .icon:hover,
  .date-picker-header .year-month:hover {
    background: #f8f9fa;
    cursor: pointer;
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

  .date-picker-header {
    display: flex;
    align-items: center;
    font-weight: 900;
    line-height: 30px;
    font-size: 16px;
  }

  .date-picker-container .flex-1 {
    flex-grow: 1;
  }
</style>
