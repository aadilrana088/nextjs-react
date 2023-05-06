import Head from 'next/head';
import { Inter } from 'next/font/google';
import path from 'path';
import fs from 'fs/promises';

const inter = Inter({ subsets: ['latin'] });

export default function Home(props) {
    const { products } = props;
    return (
        <>
            <Head>
                <title>Data fetching in Nextjs</title>
                <meta name="description" content="Data fetching in Nextjs" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={`${inter.className}`}>
                {products.map((product) => (
                    <li key={product.id}>{product.title}</li>
                ))}
            </main>
        </>
    );
}

export async function getStaticProps() {
    console.log('(Re-)Generating...');
    const filePath = path.join(process.cwd(), 'data', 'dummy-backend.json');
    const jsonData = await fs.readFile(filePath);
    const data = JSON.parse(jsonData);

    return {
        props: {
            products: data.products,
        },
        revalidate: 10,
    };
}
