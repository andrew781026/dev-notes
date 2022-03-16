<script>
    import {onMount} from 'svelte';

    let dateInput;

    onMount(() => {

        const $input = window.$(dateInput)

        const open = () => window.DateTimePicker.open(dateInput)
        const viewMode = (newViewMode) => window.DateTimePicker.viewMode(newViewMode)

        $input.data('DateTimePicker', {
            date: () => console.log("設定日期"), // 取得目前的時間
            format: () => console.log("日期的文字格式"),
            minDate: () => console.log("最小日期"),
            maxDate: () => console.log("最大大日期"),
            defaultDate: () => console.log("預設日期"),
            viewMode,
            showClear: () => console.log("顯示清除按鈕"),
            showClose: () => console.log("顯示關閉按鈕"),
            keepOpen: () => console.log("選定日期後 , 還是開著 DatePicker"),
            debug: () => console.log("Will cause the date picker to stay open after a blur event."),
            close: () => console.log("DatePicker close !!"),
            open,
        })

        $input.on('focus', open)
    })
</script>

<input bind:this={dateInput} type='text' class='w115' data-date-format='YYYY-MM-DD' placeholder="開始日期">

<style lang='scss'>
  input[data-date-format] {
    width: 320px;
    padding: 5px 10px;
    box-sizing: border-box;
    margin-right: 5px;
    background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABoAAAAcCAMAAABIzV/hAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAA5UExURUdwTM3Nzc3NzeHh4czMzM7Ozs3NzdDQ0M3NzdbW1s3Nzc7Ozs3NzczMzM3Nzc3NzczMzMzMzMzMzNw6gAYAAAASdFJOUwBmoQj6GOsmyw+SOttLf5y13NGIxKAAAAC4SURBVCjPnZLbDsMgDEPNpSTQDlj+/2MHtKydRic0P0S2zosDAZo0G3RdfZHI+u1NcKJqVNJ0eBcMwhmvSCTAtbjZJe4oVl+RQ40ZC4F3xNXn6hqSRKTlkCZKcqKh/kYYagLR47G2ScDa5hvVnXzd3sG33U70LHmBFbFYit0uaLtHSusIxD7VXEND5AHfp/lsaHtDO93wB4rM2SAxJ5jMHCca+hEp71VqpQHzqZQNdz8Z2okOVE70BQwFGkp74UjJAAAAAElFTkSuQmCC) no-repeat 15px;
    background-size: 15px;
    background-position: 5px;
    text-indent: 15px;
    position: relative;
    border: 1px solid #ccc;
    border-radius: 4px;
    color: #565656;
    background-color: #fff;
  }

  input.w115 {
    width: 115px;
  }

  input::placeholder {
    color: var(--sliver);
  }
</style>
