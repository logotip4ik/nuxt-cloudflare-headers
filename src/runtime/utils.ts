import { ModuleOptions } from "../types";

export function stringify(obj: ModuleOptions) {
  let result = "";

  for (const [host, headers] of Object.entries(obj)) {
    if (!result) result += host;
    else result += `\n${host}`;

    result += headers.reduce((acc, header) => {
      const [headerName, headerValue] = Object.entries(header)[0];

      return acc + `\n\t${headerName}: ${headerValue}`;
    }, "");
  }

  return result;
}
