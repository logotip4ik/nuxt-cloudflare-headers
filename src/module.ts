import {
  defineNuxtModule,
  createResolver,
  resolveModule,
  useLogger,
} from "@nuxt/kit";
import { defu } from "defu";

import { ModuleOptions } from "./types";
import { headersStorageKey } from "./utils";

const logger = useLogger("cloudflare-headers");

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "nuxt-cloudflare-headers",
    configKey: "cloudflareHeaders",
    compatibility: { nuxt: "^3.0.0" },
  },
  setup(options = {}, nuxt) {
    // @ts-ignore
    const headers = defu(nuxt.options.cloudflareHeaders, options);

    const { resolve } = createResolver(import.meta.url);
    const resolveRuntimeModule = (path: string) =>
      resolveModule(path, { paths: resolve("./runtime") });

    nuxt.options.runtimeConfig[headersStorageKey] = headers;

    nuxt.hook("nitro:config", (nitroConfig) => {
      nitroConfig.prerender = nitroConfig.prerender || {};
      nitroConfig.prerender.routes = nitroConfig.prerender.routes || [];
      nitroConfig.handlers = nitroConfig.handlers || [];

      nitroConfig.handlers.push({
        method: "get",
        route: "/_headers",
        handler: resolveRuntimeModule("./server/routes/_headers"),
      });

      if (!nuxt.options.dev) {
        nitroConfig.prerender.routes.push("/_headers");
        logger.success("added `_headers` route to prerender");
      }
    });

    logger.success("Added `_headers` route handler");
  },
});
