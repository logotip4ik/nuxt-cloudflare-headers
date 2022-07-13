# ☁ Nuxt3 Cloudflare Headers

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]

> Cloudflare headers Module for Nuxt3

[📖 **Release Notes**](https://github.com/logotip4ik/nuxt-cloudflare-headers/releases)

## Features

- 👌 Easy to use
- ✅ Nuxt3 compatible
- 🧾 Supports static generation

## Setup

1. Add `@logotip4ik_/nuxt-cloudflare-headers` dependency to your project

```bash
yarn add @logotip4ik_/nuxt-cloudflare-headers # or npm install @logotip4ik_/nuxt-cloudflare-headers
```

2. Add `@logotip4ik_/nuxt-cloudflare-headers` to the `modules` section of `nuxt.config.js`

```js
// nuxt.config.js
import { defineNuxtConfig } from "nuxt";
import cloudflareHeaders from "@logotip4ik_/nuxt-cloudflare-headers";

export default defineNuxtConfig({
  modules: [
    // With inlined options
    [cloudflareHeaders, { "/api": [{ "x-powered-by": "cloudflare" }] }],
  ],
});
```

Or a separate section `nuxt-cloudflare-headers` for module options:

```js
// nuxt.config.js
import { defineNuxtConfig } from "nuxt";
import cloudflareHeaders from "@logotip4ik_/nuxt-cloudflare-headers";

export default defineNuxtConfig({
  modules: [cloudflareHeaders],

  cloudflareHeaders: {
    "/*": [{ "some-cool": "header" }],
  },
});
```

## Documentation

```js
// nuxt.config.js
import { defineNuxtConfig } from "nuxt";
import cloudflareHeaders from "@logotip4ik_/nuxt-cloudflare-headers";

export default defineNuxtConfig({
  modules: [cloudflareHeaders],

  cloudflareHeaders: {
    "/*": [{ "some-cool": "header" }],
  },
});
```

In `cloudflareHeaders` object key `/*` will be route matcher and array or objects will be actual header rules. Where `some-cool` will be header name and `header` will be header value. So if you are generating your project with such a config, nuxt will prerender `_headers` file with this content inside:

```text
/*
  some-cool: header
```

## Development

1. Clone this repository
2. Run `npm run dev:prepare` to generate type stubs.
3. Use `npm run dev` to start [playground](./playground) in development mode.

## License

[MIT License](./LICENSE)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/@logotip4ik_/nuxt-cloudflare-headers/latest.svg
[npm-version-href]: https://npmjs.com/package/@logotip4ik_/nuxt-cloudflare-headers
[npm-downloads-src]: https://img.shields.io/npm/dt/@logotip4ik_/nuxt-cloudflare-headers.svg
[npm-downloads-href]: https://npmjs.com/package/@logotip4ik_/nuxt-cloudflare-headers
