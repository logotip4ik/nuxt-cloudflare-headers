export interface Header {
  [key: string]: string | false;
}

export interface ModuleOptions {
  /**
   * Key will be route matcher and value is an array of rules
   * @see https://developers.cloudflare.com/pages/platform/headers
   *
   * @example
   * {
   *   '/': [{ generatedBy: 'nuxtCloudflareHeaders' }],
   *   '/admin': [{ generatedBy: false }]
   * }
   */
  [key: string]: Header[];

  "/"?: Header[];
  "/*"?: Header[];
}
