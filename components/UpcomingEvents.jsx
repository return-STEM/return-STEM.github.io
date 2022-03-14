import useSWR from 'swr'

const fetcher = (...args) => fetch(...args).then((res) => ICAL.parse(res))
export default function UpcomingEvents(props) {

    const {data, error} = useSWR("https://calendar.google.com/calendar/ical/en.usa%23holiday%40group.v.calendar.google.com/public/basic.ics", fetcher)
    return (
        <p>{data}</p>
    )
}