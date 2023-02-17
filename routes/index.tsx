import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { Post } from "../types.d.ts";
import { listPost } from "../utils/posts.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    const posts = await listPost();
    return ctx.render({ posts });
  },
};

export default function Home(props: PageProps) {
  const { data } = props;
  const posts = data.posts as Post[];

  return (
    <>
      <Head>
        <title>Fresh App</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md">
        <h1 class="text-6xl">Esto funciona</h1>
        <div>
          {posts?.map((post) => (
            <a href={`/blog/${post.id}`} class="p-4">
              <article>
                <h2 class="text-2xl font-bold">{post.title}</h2>
                <time>{Intl.DateTimeFormat("es").format(post.date)}</time>
              </article>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}
