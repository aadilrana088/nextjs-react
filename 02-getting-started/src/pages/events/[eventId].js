import EventContent from '@/components/event-detail/event-content';
import EventLogistics from '@/components/event-detail/event-logistics';
import EventSummary from '@/components/event-detail/event-summary';
import ErrorAlert from '@/components/ui/error-alert';
// import { getAllEvents, getEventById } from 'dummy-data';
import { getAllEvents, getEventById } from 'helpers/api-util';
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
        </>
    );
}

export default EventDetailPage;


export async function getStaticPaths() {
    const events = await getAllEvents();
    const paths = events.map((event) => ({ params: { eventId: event.id } }));

    return {
        paths: paths,
        fallback: false, // can also be true or 'blocking'
    };
}

export async function getStaticProps(context) {
    const eventId = context.params.eventId;
    const event = await getEventById(eventId);

    return { props: { event } };
}
