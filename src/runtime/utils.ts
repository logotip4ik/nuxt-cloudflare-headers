import { ModuleOptions } from "../types";
import { name } from "../../package.json";

export const getStorageKey = () => `cache:${name}`;

export function stringify(obj: ModuleOptions) {
  let result = "";

  for (const [host, headers] of Object.entries(obj)) {
    if (!result) result += host;
    else result += `\n${host}`;

    result += headers.reduce((acc, header) => {
      const [headerName, headerValue] = Object.entries(header)[0];

      if (headerValue === false) return acc + `\n\t! ${headerName}`;

      return acc + `\n\t${headerName}: ${headerValue}`;
    }, "");
  }

  return result;
}
