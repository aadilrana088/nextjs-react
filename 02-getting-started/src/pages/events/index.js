import EventList from "@/components/events/event-list";
import EventsSearch from "@/components/events/events-search";
import { getAllEvents } from "helpers/api-util";
// import { getAllEvents } from "dummy-data";
import { useRouter } from "next/router";

function AllEventsPage(props) {
    const router = useRouter();
    // const events = getAllEvents();
    const findEventsHandler = (year, month) => {
        const fullPath = `/events/${year}/${month}`;
        router.push(fullPath)
    }
    return (
        <div>
            <EventsSearch onSearch={findEventsHandler} />
            <EventList items={props.events} />
        </div>
    );
}

export default AllEventsPage;

export async function getStaticProps() {
    const events = await getAllEvents();

    return {
        props : {
            events
        },
        revalidate: 60
    }
}