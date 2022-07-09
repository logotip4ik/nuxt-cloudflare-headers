import { defineEventHandler } from "h3";

// @ts-ignore
import { stringify } from "#utils";
// @ts-ignore
import { name } from "#package";
// @ts-ignore
import { useRuntimeConfig, useStorage } from "#imports";

export default defineEventHandler(async ({ res }) => {
  const storage = useStorage();

  const cacheKey = `cache:${name}`;

  const headers = (await storage.getItem(cacheKey)) || {};

  const headersString = stringify(headers);

  res.setHeader("Content-Type", "text/plain");

  return headersString;
});
