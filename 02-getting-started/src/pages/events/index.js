import EventList from '@/components/events/event-list';
import EventsSearch from '@/components/events/events-search';
import { getAllEvents } from 'helpers/api-util';
import Head from 'next/head';
// import { getAllEvents } from "dummy-data";
import { useRouter } from 'next/router';

function AllEventsPage(props) {
    const router = useRouter();
    // const events = getAllEvents();
    const findEventsHandler = (year, month) => {
        const fullPath = `/events/${year}/${month}`;
        router.push(fullPath);
    };
    return (
        <>
            <Head>
                <title>All Events</title>
                <meta
                    name="description"
                    content="Find a lot of great events that allow you to evolve..."
                />
            </Head>
            <EventsSearch onSearch={findEventsHandler} />
            <EventList items={props.events} />
        </>
    );
}

export default AllEventsPage;

export async function getStaticProps() {
    const events = await getAllEvents();

    return {
        props: {
            events,
        },
        revalidate: 60,
    };
}
