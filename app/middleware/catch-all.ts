import { data, type unstable_MiddlewareFunction } from "react-router";

/**
 * Catch all middleware errors thrown
 */
export const serverCatchAll: unstable_MiddlewareFunction = async (_, next) => {
  try {
    return await next();
  } catch (e) {
    if (e instanceof Response) {
      return e;
    }

    console.log("catch all", e);

    throw data({ message: "unknown error", details: e }, { status: 500 });
  }
};
