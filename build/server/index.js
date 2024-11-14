import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { RemixServer, useLoaderData, Meta, Links, Outlet, ScrollRestoration, Scripts } from "@remix-run/react";
import { isbot } from "isbot";
import { renderToReadableStream } from "react-dom/server";
import { cssBundleHref } from "@remix-run/css-bundle";
import { createThemeSessionResolver, ThemeProvider, useTheme, PreventFlashOnWrongTheme, createThemeAction } from "remix-themes";
import { createCookieSessionStorage } from "@remix-run/cloudflare";
import { clsx } from "clsx";
import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";
const ABORT_DELAY = 5e3;
function headers() {
  return {
    "X-Cache-Debug": "v1",
    "X-Deploy-Time": (/* @__PURE__ */ new Date()).toISOString()
  };
}
async function handleRequest(request, responseStatusCode, responseHeaders, remixContext, loadContext) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), ABORT_DELAY);
  const body = await renderToReadableStream(
    /* @__PURE__ */ jsx(RemixServer, { context: remixContext, url: request.url, abortDelay: ABORT_DELAY }),
    {
      signal: controller.signal,
      onError(error) {
        if (!controller.signal.aborted) {
          console.error(error);
        }
        responseStatusCode = 500;
      }
    }
  );
  body.allReady.then(() => clearTimeout(timeoutId));
  if (isbot(request.headers.get("user-agent") || "")) {
    await body.allReady;
  }
  responseHeaders.set("Content-Type", "text/html");
  return new Response(body, {
    headers: responseHeaders,
    status: responseStatusCode
  });
}
const entryServer = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: handleRequest,
  headers
}, Symbol.toStringTag, { value: "Module" }));
const appStylesHref = "/assets/styles-GLwjd8WB.css";
const isProduction = process.env.NODE_ENV === "production";
const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "theme",
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secrets: ["s3cr3t"],
    // Set domain and secure only if in production
    ...isProduction ? { domain: "your-production-domain.com", secure: true } : {}
  }
});
const themeSessionResolver = createThemeSessionResolver(sessionStorage);
const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous"
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
  },
  { rel: "stylesheet", href: appStylesHref },
  ...cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []
];
async function loader$1({ request }) {
  const { getTheme } = await themeSessionResolver(request);
  return {
    theme: getTheme()
  };
}
function App() {
  const data = useLoaderData();
  const [theme] = useTheme();
  return /* @__PURE__ */ jsxs("html", { lang: "en", className: clsx(theme), children: [
    /* @__PURE__ */ jsxs("head", { children: [
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
      /* @__PURE__ */ jsx(Meta, {}),
      /* @__PURE__ */ jsx(PreventFlashOnWrongTheme, { ssrTheme: Boolean(data.theme) }),
      /* @__PURE__ */ jsx(Links, {})
    ] }),
    /* @__PURE__ */ jsxs("body", { children: [
      /* @__PURE__ */ jsx(Outlet, {}),
      /* @__PURE__ */ jsx(ScrollRestoration, {}),
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function AppWithProviders() {
  const data = useLoaderData();
  return /* @__PURE__ */ jsx(ThemeProvider, { specifiedTheme: data.theme, themeAction: "/action/set-theme", children: /* @__PURE__ */ jsx(App, {}) });
}
const route0 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  App,
  default: AppWithProviders,
  links,
  loader: loader$1
}, Symbol.toStringTag, { value: "Module" }));
const action = createThemeAction(themeSessionResolver);
const route1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  action
}, Symbol.toStringTag, { value: "Module" }));
const userTable = sqliteTable("user", {
  id: integer("id").primaryKey(),
  username: text("username").notNull().unique(),
  password_hash: text("password_hash").notNull()
});
const sessionTable = sqliteTable("session", {
  id: text("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => userTable.id),
  expiresAt: integer("expires_at", {
    mode: "timestamp"
  }).notNull()
});
const meta = () => {
  return [
    { title: "Sviatoslav Chyzh | Full Stack Software Engineer" },
    {
      name: "description",
      content: "Portfolio of Sviatoslav Chyzh, a full stack software engineer specializing in TypeScript and React. Explore my projects and experience."
    }
  ];
};
const loader = async ({ context }) => {
  const { env } = context.cloudflare;
  const { kv } = env;
  await kv.put("remix", "remix can access cloudflare kv");
  const value = await kv.get("remix");
  console.log("at remix loader", value);
  const turso = createClient({
    url: "libsql://church-pokrova-db-sviatoslavchyzh.turso.io",
    authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MzE0MjkzMTUsImlkIjoiODEyZTFhMTctODM2OS00ZjU1LTlhOWUtODhlMTRjMTM0MDI1In0.Eiy2O-BdUobrZ8-vge8yl6FUSYW2USe9vLXcoiV_7P5cEeYgVJXSs0i2OyeQoZ-ewsKP8RE0vw2kh6EGMahQCQ"
  });
  const db = drizzle(turso, {
    schema: {
      user: userTable,
      session: sessionTable
    }
  });
  const [data] = await db.select().from(userTable);
  if (!data) {
    throw new Error("No data found");
  }
  return data;
};
function Index() {
  const data = useLoaderData();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    "Hello World ",
    data.username
  ] });
}
const route2 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Index,
  loader,
  meta
}, Symbol.toStringTag, { value: "Module" }));
const serverManifest = { "entry": { "module": "/assets/entry.client-Cbb3Cy2-.js", "imports": ["/assets/components-DHPpVo2E.js"], "css": [] }, "routes": { "root": { "id": "root", "parentId": void 0, "path": "", "index": void 0, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/root-CgHMFU71.js", "imports": ["/assets/components-DHPpVo2E.js"], "css": [] }, "routes/action.set-theme": { "id": "routes/action.set-theme", "parentId": "root", "path": "action/set-theme", "index": void 0, "caseSensitive": void 0, "hasAction": true, "hasLoader": false, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/action.set-theme-l0sNRNKZ.js", "imports": [], "css": [] }, "routes/_index": { "id": "routes/_index", "parentId": "root", "path": void 0, "index": true, "caseSensitive": void 0, "hasAction": false, "hasLoader": true, "hasClientAction": false, "hasClientLoader": false, "hasErrorBoundary": false, "module": "/assets/_index-DCE-Y4Lw.js", "imports": ["/assets/components-DHPpVo2E.js"], "css": [] } }, "url": "/assets/manifest-bef6037b.js", "version": "bef6037b" };
const mode = "production";
const assetsBuildDirectory = "build/client";
const basename = "/";
const future = { "v3_fetcherPersist": true, "v3_relativeSplatPath": true, "v3_throwAbortReason": true, "v3_singleFetch": true, "v3_lazyRouteDiscovery": true, "unstable_optimizeDeps": false };
const isSpaMode = false;
const publicPath = "/";
const entry = { module: entryServer };
const routes = {
  "root": {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: route0
  },
  "routes/action.set-theme": {
    id: "routes/action.set-theme",
    parentId: "root",
    path: "action/set-theme",
    index: void 0,
    caseSensitive: void 0,
    module: route1
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: true,
    caseSensitive: void 0,
    module: route2
  }
};
export {
  serverManifest as assets,
  assetsBuildDirectory,
  basename,
  entry,
  future,
  isSpaMode,
  mode,
  publicPath,
  routes
};
