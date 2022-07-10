import { defineEventHandler } from "h3";

// @ts-ignore
import { stringify } from "#cloudflare-headers/utils";
// @ts-ignore
import { name } from "#cloudflare-headers/package";
// @ts-ignore
import { useStorage } from "#internal/nitro";

export default defineEventHandler(async ({ res }) => {
  const storage = useStorage();

  const cacheKey = `cache:${name}`;

  const headers = (await storage.getItem(cacheKey)) || {};

  const headersString = stringify(headers);

  res.setHeader("Content-Type", "text/plain");

  return headersString;
});
