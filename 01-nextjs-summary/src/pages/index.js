import Head from 'next/head';
import { Inter } from 'next/font/google';
import MeetupList from '@/components/meetups/MeetupList';

const inter = Inter({ subsets: ['latin'] });

const DUMMY_MEETUPS = [
    {
        id: 'm1',
        title: 'A First Meetup',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
        address: 'Some address 5, 12345 Some City',
        description: 'This is a first meetup!',
    },
    {
        id: 'm2',
        title: 'A Second Meetup',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Stadtbild_M%C3%BCnchen.jpg/1280px-Stadtbild_M%C3%BCnchen.jpg',
        address: 'Some address 10, 12345 Some City',
        description: 'This is a second meetup!',
    },
];

export default function Home(props) {
    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta
                    name="description"
                    content="Generated by create next app"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={`${inter.className}`}>
                <MeetupList meetups={props.meetups} />
            </main>
        </>
    );
}

export async function getServerSideProps() {
    // Fetch data from external API

    // Pass data to the page via props
    return {
        props: {
            meetups: DUMMY_MEETUPS,
        },
    };
}

// export async function getStaticProps() {
//   // fetch data from an API
//   return {
//     props: {
//       meetups: DUMMY_MEETUPS
//     }
//   };
// }
