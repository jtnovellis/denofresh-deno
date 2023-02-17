import { assertEquals } from "$std/testing/asserts.ts";
import { loadPost } from "./posts.ts";

Deno.test({
  name: "loadPost should to returns null",
  fn: async () => {
    const post = await loadPost("non-exist");
    assertEquals(post, null);
  },
});

Deno.test({
  name: "should to return a post object",
  fn: async () => {
    const post = await loadPost("hello");
    assertEquals(post?.id, "hello");
  },
});
