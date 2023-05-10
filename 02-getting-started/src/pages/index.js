import Head from 'next/head';
import { Inter } from 'next/font/google';
import EventList from '@/components/events/event-list';
// import { getFeaturedEvents } from 'dummy-data';
import { getFeaturedEvents } from 'helpers/api-util';

const inter = Inter({ subsets: ['latin'] });

export default function Home(props) {
    // const featuredEvents = getFeaturedEvents();

    return (
        <>
            <Head>
                <title>NextJS Events</title>
                <meta
                    name="description"
                    content="Find a lot of great events that allow you to evolve..."
                />
            </Head>
            <main className={`${inter.className}`}>
                <EventList items={props.featuredEvents} />
            </main>
        </>
    );
}

export async function getStaticProps() {
    const featuredEvents = await getFeaturedEvents();

    return { props: { featuredEvents }, revalidate: 1800 };
}
