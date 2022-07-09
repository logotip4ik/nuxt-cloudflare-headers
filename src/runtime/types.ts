export interface ModuleOptions {
  /**
   * Key will be route matcher and value is an array of rules
   * @see https://developers.cloudflare.com/pages/platform/headers
   */
  [key: string]: { [key: string]: string }[];
}
