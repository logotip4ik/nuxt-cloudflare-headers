import { stringify } from "../src/runtime/utils";
import { ModuleOptions } from "../src/types";

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
  {
    data: { "/*": [{ "some-cool": false }] },
    result: "/*\n\t! some-cool",
  },
];

describe("Main stringify function", () => {
  test("Generation of one rule for one route", () => {
    const test = tests[0];

    const headerString = stringify(test.data);

    expect(headerString).toEqual(test.result);
  });

  test("Generation of multiple rules for one route", () => {
    const test = tests[1];

    const headerString = stringify(test.data);

    expect(headerString).toEqual(test.result);
  });

  test("Generation of one rule for multiple routes", () => {
    const test = tests[2];

    const headerString = stringify(test.data);

    expect(headerString).toEqual(test.result);
  });

  test("Generation of one disallow rule for one route", () => {
    const test = tests[3];

    const headerString = stringify(test.data);

    expect(headerString).toEqual(test.result);
  });
});
