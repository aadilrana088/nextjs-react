import PostHeader from './post-header';
import classes from './post-content.module.css';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import Image from 'next/image';
// const DUMMY_POST = {
//     slug: 'getting-started-with-nextjs',
//     title: 'Getting Started with NextJS',
//     image: 'getting-started-nextjs.png',
//     date: '2022-02-10',
//     content: '# This is a first post',
// };

function PostContent(props) {
    const { post } = props;
    // const imagePath = `/images/posts/${DUMMY_POST.slug}/${DUMMY_POST.image}`;
    const imagePath = `/images/posts/${post.slug}/${post.image}`;

    const customRenderers = {
        // img(image) {
        //   return (
        //     <Image
        //       src={`/images/posts/${post.slug}/${image.src}`}
        //       alt={image.alt}
        //       width={600}
        //       height={300}
        //     />
        //   );
        // },
        p(paragraph) {
            const { node } = paragraph;
            if (node.children[0].tagName === 'img') {
                const image = node.children[0];
                console.log(image);
                return (
                    <div className={classes.image}>
                        <Image
                            src={`/images/posts/${post.slug}/${image.properties.src}`}
                            alt={image.alt}
                            width={600}
                            height={300}
                        />
                    </div>
                );
            }

            return <p>{paragraph.children}</p>;
        },
    };

    return (
        <article className={classes.content}>
            <PostHeader title={post.title} image={imagePath} />
            <ReactMarkdown
                components={customRenderers}
            >
                {post.content}
            </ReactMarkdown>
        </article>
    );
}

export default PostContent;
