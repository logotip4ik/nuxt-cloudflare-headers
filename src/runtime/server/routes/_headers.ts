// @ts-ignore
import { defineEventHandler } from "h3";
import { stringify, headersStorageKey } from "../../utils";

import { useRuntimeConfig } from "#imports";

export default defineEventHandler(({ res }) => {
  const config = useRuntimeConfig();
  const headers = config[headersStorageKey] || {};

  const headersString = stringify(headers);

  res.setHeader("Content-Type", "text/plain");

  return headersString;
});
