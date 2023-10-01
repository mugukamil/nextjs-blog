import { Inter } from "next/font/google";
import Link from "next/link";
import { InferGetStaticPropsType } from "next";

const inter = Inter({ subsets: ["latin"] });

export async function getStaticProps() {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");

    const posts: Post[] = await res.json();

    return {
        props: {
            posts,
        },
    };
}

export type Post = {
    userId: number;
    id: number;
    title: string;
    body: string;
};

export default function Home({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <main
            className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
        >
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
            <FeedbackForm />
        </main>
    );
}

function FeedbackForm() {
    return (
        <form
            name="feedback-form"
            method="post"
            data-netlify="true"
            className="text-black"
            action="/thanks"
        >
            <input type="hidden" name="form-name" value="feedback-form" />
            <p className="mb-2">
                <label htmlFor="">
                    Your name
                    <input type="text" name="name" className="border border-gray-300" />
                </label>
            </p>
            <p className="mb-2">
                <label htmlFor="">
                    Feedback
                    <input type="text" name="feedback" className="border border-gray-300" />
                </label>
            </p>
            <p>
                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    Submit
                </button>
            </p>
        </form>
    );
}
