import Layout from '@/components/layout/layout';
import '@/styles/globals.css';
import Head from 'next/head';

export default function App({ Component, pageProps }) {
    return (
        <Layout>
            <Head>
                <title>NextJS Events</title>
                <meta
                    name="description"
                    content="Great event by nextjs"
                />
                <meta name='viewport' content='initial-scale=1.0, width=device-width' />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Component {...pageProps} />
        </Layout>
    );
}
