import { Post } from "@/pages/posts";
import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import { usePathname } from "next/navigation";

export default async function BlogPost({ params }: GetStaticPropsContext) {
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
// async function getPosts({ params }) {

//     return {
//         props: {
//             post,
//         },
//     };
// }
