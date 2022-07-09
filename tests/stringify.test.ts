import { ModuleOptions } from "../src/types";
import { stringify } from "../src/utils";

const tests: { data: ModuleOptions; result: string }[] = [
  {
    data: { "/*": [{ "some-cool": "header" }] },
    result: "/*\n\tsome-cool: header",
  },
  {
    data: { "/*": [{ header: "type" }, { "content-type": "text-plain" }] },
    result: "/*\n\theader: type\n\tcontent-type: text-plain",
  },
  {
    data: {
      "/*": [{ header: "header" }],
      "/api/*": [{ "x-powered-by": "jest" }],
    },
    result: "/*\n\theader: header\n/api/*\n\tx-powered-by: jest",
  },
];

describe("Main stringify function", () => {
  test("Generation of the header strings", () => {
    for (const test of tests) {
      const headerString = stringify(test.data);

      expect(headerString).toEqual(test.result);
    }
  });
});
