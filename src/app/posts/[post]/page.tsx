import { Post } from "@/pages/posts";

export default async function BlogPost({ params }: { params: { post: string } }) {
    if (!params?.post) {
        return <p className="text-violet-500 font-black">Post not found</p>;
    }

    const res = await fetch(`https://jsonplaceholder.typicode.com/posts/${params.post}`);

    const post: Post = await res.json();
    return (
        <article className="grid max-w-md m-auto text-center mt-5">
            <h1 className="text-violet-500 font-black">{post.title}</h1>
            <p>{post.body}</p>
        </article>
    );
}
