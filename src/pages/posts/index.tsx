import Link from "next/link";
import "../../app/globals.css";
import { InferGetStaticPropsType } from "next";

export async function getStaticProps() {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");

    const posts = await res.json();

    return {
        props: {
            posts,
        },
    };
}

export default function Index({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1>Posts</h1>

            <ul>
                {posts.map((p: Post) => (
                    <li key={p.id} className="space-y-6 my-2 py-2 leading-5 ">
                        <Link
                            className="text-gray-600 font-semibold hover:text-violet-500"
                            href={`/posts/${p.id}`}
                        >
                            {p.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </main>
    );
}

export type Post = {
    userId: number;
    id: number;
    title: string;
    body: string;
};
