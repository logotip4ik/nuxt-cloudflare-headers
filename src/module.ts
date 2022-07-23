import { defineNuxtModule, createResolver, resolveModule, useLogger } from "@nuxt/kit";
import defaultsDeep from "@logotip4ik_/defaults-deep";

import { name, version } from "../package.json";
import { ModuleOptions } from "./types";
import { getStorageKey } from "./runtime/utils";

const logger = useLogger("cloudflare-headers");

export * from "./types";

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
    configKey: "cloudflareHeaders",
    compatibility: { nuxt: "^3.0.0" },
  },
  defaults: () => ({}),
  setup(options = {}, nuxt) {
    // @ts-expect-error
    const headers = defaultsDeep(options, nuxt.options.cloudflareHeaders || {});

    const { resolve } = createResolver(import.meta.url);
    const resolveRuntimeModule = (path: string) =>
      resolveModule(path, { paths: resolve("./runtime") });

    nuxt.options.build.transpile = nuxt.options.build.transpile || [];
    nuxt.options.build.transpile.push(resolve("./runtime"));

    // This enables to import `stringify` function from `#utils` and `name` from `package.json`
    nuxt.options.alias = nuxt.options.alias || {};
    nuxt.options.alias["#cloudflare-headers/utils"] = resolve("./runtime/utils");
    nuxt.options.alias["#cloudflare-headers/package"] = resolve("../package");

    nuxt.hook("nitro:build:before", async (nitroConfig) => {
      // NOTE: just a name wont work, unstorage just will not create an item with such a key
      // the name must have some prefix
      const key = getStorageKey();

      await nitroConfig.storage.setItem(key, headers);
    });

    nuxt.hook("nitro:config", (nitroConfig) => {
      // Adding utils as external to nitro, so it will know where to import
      nitroConfig.externals = nitroConfig.externals || {};
      nitroConfig.externals.inline = nitroConfig.externals.inline || [];
      nitroConfig.externals.inline.push(resolve("./runtime/utils"));

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
        logger.success("Added `_headers` route to prerender");
      }
    });

    logger.success("Added `_headers` route handler");
  },
});
