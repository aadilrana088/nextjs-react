import EventContent from '@/components/event-detail/event-content';
import EventLogistics from '@/components/event-detail/event-logistics';
import EventSummary from '@/components/event-detail/event-summary';
import Comments from '@/components/input/comments';
import ErrorAlert from '@/components/ui/error-alert';
// import { getAllEvents, getEventById } from 'dummy-data';
import {
    getAllEvents,
    getEventById,
    getFeaturedEvents,
} from 'helpers/api-util';
import Head from 'next/head';
import { useRouter } from 'next/router';

function EventDetailPage(props) {
    // const router = useRouter();
    // const eventId = router.query.eventId;
    // const event = getEventById(eventId);

    const { event } = props;

    if (!event) {
        return <p className="center">Loading...</p>;
    }

    // if (!event) {
    //     return (
    //         <ErrorAlert>
    //             <p>No event found!</p>
    //         </ErrorAlert>
    //     );
    // }

    return (
        <>
            <Head>
                <title>{event.title}</title>
                <meta name="description" content={event.description} />
            </Head>
            <EventSummary title={event.title} />
            <EventLogistics
                date={event.date}
                address={event.location}
                image={event.image}
                imageAlt={event.title}
            />
            <EventContent>
                <p>{event.description}</p>
            </EventContent>
            <Comments eventId={event.id} />
        </>
    );
}

export default EventDetailPage;

export async function getStaticPaths() {
    const events = await getFeaturedEvents();
    const paths = events.map((event) => ({ params: { eventId: event.id } }));

    return {
        paths: paths,
        fallback: 'blocking', // can also be true or 'blocking'
    };
}

export async function getStaticProps(context) {
    const eventId = context.params.eventId;
    const event = await getEventById(eventId);

    return { props: { event }, revalidate: 30 };
}
