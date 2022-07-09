import { defineEventHandler } from "h3";

// @ts-ignore
import { stringify } from "#utils";
// @ts-ignore
import { name } from "#package";

import { useRuntimeConfig } from "#imports";

export default defineEventHandler(({ res }) => {
  const config = useRuntimeConfig();

  const headers = config[name] || {};

  const headersString = stringify(headers);

  res.setHeader("Content-Type", "text/plain");

  return headersString;
});
