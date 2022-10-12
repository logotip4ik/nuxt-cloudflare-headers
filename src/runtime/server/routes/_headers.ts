import { defineEventHandler } from "h3";

// @ts-ignore
import { stringify, getStorageKey } from "#cloudflare-headers/utils";
// @ts-ignore
import { useStorage } from "#internal/nitro";

export default defineEventHandler(async ({ res }) => {
  const storage = useStorage();
  const key = getStorageKey();

  const headers = (await storage.getItem(key)) || {};

  const headersString = stringify(headers);

  res.setHeader("Content-Type", "text/plain");

  return headersString;
});
