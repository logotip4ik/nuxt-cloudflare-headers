import { ModuleOptions } from "../types";
import { name } from "../../package.json";

export const getStorageKey = () => `cache:${name}`;

export function stringify(obj: ModuleOptions) {
  let result = "";

  for (const [host, headers] of Object.entries(obj)) {
    if (!result) result += host;
    else result += `\n\n${host}`;

    const normalizedHeaders = Array.isArray(headers) ? headers : [headers];

    result += normalizedHeaders.reduce((acc, header) => {
      let headers = "";

      for (const [headerName, headerValue] of Object.entries(header)) {
        if (headerValue === false) headers += `\n\t! ${headerName}`;
        else headers += `\n\t${headerName}: ${headerValue}`;
      }

      return acc + headers;
    }, "");
  }

  return result;
}
