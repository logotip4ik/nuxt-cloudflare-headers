import cloudflareHeaders from "..";

export default defineNuxtConfig({
  modules: [cloudflareHeaders],

  cloudflareHeaders: {
    "/*": [{ "some-cool": "header " }, { header: false }],
  },
});
