<script>
    import moment from 'moment'
    import Days from './Days.svelte'
    import Months from './Months.svelte'
    import Years from './Years.svelte'
    import Decades from './Decades.svelte'

    export let pickerHide;
    let minDate = null;
    let maxDate = null;
    let selectDate = moment().startOf('day')
    let format = 'YYYY-MM-DD'
    let viewMode = 'days' // 有 'times' . 'days' . 'months' . 'years' . 'decades'
    let viewDate = selectDate ? moment(selectDate).startOf('month') : moment()

    const setViewMode = newViewMode => viewMode = newViewMode
    const setSelectDate = newSelectDate => selectDate = newSelectDate
    const setViewDate = newViewDate => viewDate = newViewDate
</script>

<div class='date-picker-container bottom' class:hide="{pickerHide}">
    {#if viewMode === 'days'}
        <Days {selectDate} {viewDate} {minDate} {maxDate} {setSelectDate} {setViewMode} {setViewDate}/>
    {:else if viewMode === 'months'}
        <Months {selectDate} {viewDate} {minDate} {maxDate} {format} {setSelectDate} {setViewMode} {setViewDate}/>
    {:else if viewMode === 'years'}
        <Years {selectDate} {viewDate} {minDate} {maxDate} {format} {setSelectDate} {setViewMode} {setViewDate}/>
    {:else if viewMode === 'decades'}
        <Decades {selectDate} {viewDate} {minDate} {maxDate} {setSelectDate} {setViewMode} {setViewDate}/>
    {/if}
</div>
