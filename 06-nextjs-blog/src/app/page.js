import FeaturedPosts from "../../components/home-page/featured-posts";
import Hero from "../../components/home-page/hero";
import { getFeaturedPosts } from "../../lib/posts-util";



export default function Home(props) {
  return (
    <>
      <Hero />
      <FeaturedPosts posts={props.featuredPosts} />
    </>
  )
}

export function getStaticProps() {
  const featuredPosts = getFeaturedPosts();

  return {
    props: {
      featuredPosts
    },
  };
}