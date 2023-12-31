import { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { Post } from "..";
import Image from "next/image";
import Head from "next/head";

export default function BlogPost({ post }: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <article className="grid max-w-md m-auto text-center mt-10">
            <Head>
                <title>{post.title}</title>
            </Head>
            <h1 className="text-violet-500 font-black">{post.title}</h1>
            <Image
                src="/next.svg"
                className="my-5 m-auto"
                alt={post.title}
                width={100}
                height={100}
            />
            <p className="text-black">{post.body}</p>
        </article>
    );
}

export async function getStaticPaths() {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const posts: Post[] = await res.json();

    const paths = posts.map((post) => ({
        params: { id: post.id.toString() },
    }));

    return { paths, fallback: false };
}

export async function getStaticProps(context: GetStaticPropsContext) {
    const { params } = context;

    const EmptyPost: Post = {
        userId: 0,
        id: 0,
        title: "Not found",
        body: "",
    };

    if (!params?.id) {
        return {
            props: {
                post: EmptyPost,
            },
        };
    }
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`);

    const post: Post = await res.json();

    return {
        props: {
            post,
        },
    };
}
