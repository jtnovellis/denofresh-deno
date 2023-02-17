import { Handlers, PageProps } from "$fresh/server.ts";
import { CSS } from "$gfm/mod.ts";
import { loadPost } from "../../utils/posts.ts";

export const handler: Handlers = {
  async GET(req, ctx) {
    const { id } = ctx.params;
    const post = await loadPost(id);
    return ctx.render({ post });
  },
};

export default function PagePost(props: PageProps) {
  const { post } = props?.data;
  return (
    <article>
      <h1 class="text-3xl font-bold">{post.title}</h1>
      <time>{Intl.DateTimeFormat("es").format(post.date)}</time>
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div
        class="markdown-body"
        dangerouslySetInnerHTML={{ __html: post.body }}
      />
    </article>
  );
}
