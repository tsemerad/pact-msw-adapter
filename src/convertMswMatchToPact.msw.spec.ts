import { MockedResponse } from "@mswjs/interceptors";
import { convertMswMatchToPact } from "./convertMswMatchToPact";
import { MswMatch, PactFile } from "./pactMswAdapter";
import { Headers } from "headers-polyfill";

const pjson = require("../package.json");
const generatedPact: PactFile = {
  consumer: { name: "interaction.consumer.name" },
  provider: { name: "interaction.provider.name" },
  interactions: [
    {
      description: "de5eefb0-c451-4ae2-9695-e02626f00ca7",
      providerState: "",
      request: {
        method: "GET",
        path: "/products",
        body: undefined,
        headers: {
          accept: "application/json, text/plain, */*",
          authorization: "Bearer 2022-03-01T19:36:18.277Z",
        },
      },
      response: {
        status: 200,
        body: [{ id: "09", type: "CREDIT_CARD", name: "Gem Visa" }],
        headers: { "x-powered-by": "msw", "content-type": "application/json" },
      },
    },
    {
      description: "073d6de0-e1ac-11ec-8fea-0242ac120002",
      providerState: "",
      request: {
        method: "GET",
        path: "/products",
        body: undefined,
        headers: {
          accept: "application/json, text/plain, */*",
          authorization: "Bearer 2022-03-01T19:36:18.277Z",
        },
        query: "sort=asc",
      },
      response: {
        status: 200,
        body: [{ id: "09", type: "CREDIT_CARD", name: "Gem Visa" }],
        headers: { "x-powered-by": "msw", "content-type": "application/json" },
      },
    },
  ],
  metadata: {
    pactSpecification: { version: "2.0.0" },
    client: { name: "pact-msw-adapter", version: pjson.version },
  },
};

const sampleMatch: MswMatch[] = [
  {
    // YAK SHAVE: this is a hack to get the test to pass
    // src/convertMswMatchToPact.msw.spec.ts:57:5 - error TS2322: Type "{ id: string; url: URL; method: string; body: undefined; headers: Headers; cookies: {}; redirect: "manual"; referrer: string; keepalive: false; cache: "default"; mode: "cors"; referrerPolicy: "no-referrer"; ... 12 more ...; arrayBuffer: any; }" is not assignable to type "MockedRequest<DefaultBodyType>".
    // Property "getCookies" is private in type "MockedRequest<DefaultBodyType>" but not in type "{ id: string; url: URL; method: string; body: undefined; headers: HeadersPolyfill; cookies: {}; redirect: "manual"; referrer: string; keepalive: false; cache: "default"; mode: "cors"; ... 13 more ...; arrayBuffer: any; }".

    // @ts-ignore
    request: {
      id: "de5eefb0-c451-4ae2-9695-e02626f00ca7",
      url: new URL("http://localhost:8081/products"),
      method: "GET",
      body: undefined,
      headers: new Headers({
        accept: "application/json, text/plain, */*",
        authorization: "Bearer 2022-03-01T19:36:18.277Z",
        "user-agent": "axios/0.21.1",
        host: "localhost:8081",
        "content-type": "application/json",
      }),
      cookies: {},
      redirect: "manual",
      referrer: "",
      keepalive: false,
      cache: "default",
      mode: "cors",
      referrerPolicy: "no-referrer",
      integrity: "",
      destination: "document",
      bodyUsed: false,
      credentials: "same-origin",
      priority: "auto",
      getCookies: null as any,
      _body: null,
      _bodyUsed: null,
      clone: null as any,
      passthrough: null as any,
      text: null as any,
      json: null as any,
      arrayBuffer: null as any,
    },
    response: {
      status: 200,
      statusText: "OK",
      headers: new Headers({
        "x-powered-by": "msw",
        "content-type": "application/json",
      }),
      body: JSON.stringify([
        { id: "09", type: "CREDIT_CARD", name: "Gem Visa" },
      ]),
    },
    body: JSON.stringify([{ id: "09", type: "CREDIT_CARD", name: "Gem Visa" }]),
  },
  {
    // @ts-ignore
    request: {
      id: "073d6de0-e1ac-11ec-8fea-0242ac120002",
      url: new URL("http://localhost:8081/products?sort=asc"),
      method: "GET",
      body: undefined,
      headers: new Headers({
        accept: "application/json, text/plain, */*",
        authorization: "Bearer 2022-03-01T19:36:18.277Z",
        "user-agent": "axios/0.21.1",
        host: "localhost:8081",
        "content-type": "application/json",
      }),
      cookies: {},
      redirect: "manual",
      referrer: "",
      keepalive: false,
      cache: "default",
      mode: "cors",
      referrerPolicy: "no-referrer",
      integrity: "",
      destination: "document",
      bodyUsed: false,
      credentials: "same-origin",
      priority: "auto",
      getCookies: null as any,
      _body: null,
      _bodyUsed: null,
      clone: null as any,
      passthrough: null as any,
      text: null as any,
      json: null as any,
      arrayBuffer: null as any,
    },
    response: {
      status: 200,
      statusText: "OK",
      headers: new Headers({
        "x-powered-by": "msw",
        "content-type": "application/json",
      }),
      body: JSON.stringify([
        { id: "09", type: "CREDIT_CARD", name: "Gem Visa" },
      ]),
    },
    body: JSON.stringify([{ id: "09", type: "CREDIT_CARD", name: "Gem Visa" }]),
  },
];

describe("writes an msw req/res to a pact", () => {
  it("should convert an msw server match to a pact", async () => {
    expect(
      convertMswMatchToPact({
        matches: sampleMatch as any,
        consumer: "interaction.consumer.name",
        provider: "interaction.provider.name",
      })
    ).toMatchObject(generatedPact);
  });
});
