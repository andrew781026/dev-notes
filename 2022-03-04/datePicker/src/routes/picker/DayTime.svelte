<script>
    import Days from './Days.svelte'
    import Times from './Times.svelte'
    import Hours from './Hours.svelte'
    import Minutes from './Minutes.svelte'

    export let selectDate
    export let viewDate
    export let viewMode
    export let minDate
    export let maxDate
    export let setViewMode
    export let setSelectDate
    export let setViewDate
</script>

<Days {selectDate} {viewDate} {viewMode} {minDate} {maxDate} {setSelectDate} {setViewMode} {setViewDate}/>
<Times {selectDate} {viewDate} {viewMode} {minDate} {maxDate} {setSelectDate} {setViewMode} {setViewDate}/>
<Hours {selectDate} {viewDate} {viewMode} {minDate} {maxDate} {setSelectDate} {setViewMode} {setViewDate}/>
<Minutes {selectDate} {viewDate} {viewMode} {minDate} {maxDate} {setSelectDate} {setViewMode} {setViewDate}/>
