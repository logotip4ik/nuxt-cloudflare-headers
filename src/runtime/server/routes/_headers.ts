// @ts-ignore
import { useRuntimeConfig } from "#imports";
import { defineEventHandler } from "h3";

import { stringify, headersStorageKey } from "../../../utils";

export default defineEventHandler(async ({ res }) => {
  const config = useRuntimeConfig();
  const headers = config[headersStorageKey] || {};

  const headersString = stringify(headers);

  res.setHeader("Content-Type", "text/plain");

  return headersString;
});
