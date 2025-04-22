import type { unstable_MiddlewareFunction } from "react-router";

export const serverLogger: unstable_MiddlewareFunction = async ({ request }, next) => {
  const start = performance.now();

  // 👇 Grab the response here
  const res = await next();

  const duration = performance.now() - start;
  console.log(`Navigated to ${request.url} (${duration}ms)`);

  // 👇 And return it here (optional if you don't modify the response)
  return res;
};
