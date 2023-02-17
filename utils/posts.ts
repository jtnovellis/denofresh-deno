import { extract } from "$std/encoding/front_matter/any.ts";
import { render } from "$gfm/mod.ts";
import { Post } from "../types.d.ts";

export async function loadPost(id: string): Promise<Post | null> {
  let raw: string;
  try {
    raw = await Deno.readTextFile(`./content/posts/${id}.md`);
    const { attrs, body } = extract(raw);
    const params = attrs as Record<string, string>;
    const post: Post = {
      id,
      title: params.title,
      body: render(body),
      date: new Date(params.date),
      excerpt: params.excerpt,
    };
    return post;
  } catch {
    return null;
  }
}

export async function listPost(): Promise<Post[]> {
  const postsPromises = [];
  for await (const entry of Deno.readDir("./content/posts")) {
    const [id, _ext] = entry.name.split(".");
    if (id) {
      postsPromises.push(loadPost(id));
    }
  }
  const posts = await Promise.all(postsPromises) as Post[];
  posts.sort((a, b) => b.date.getTime() - a.date.getTime());
  return posts;
}
