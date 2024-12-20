// app/routes/__root.tsx
import {
  Outlet,
  ScrollRestoration,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import {Meta, Scripts} from "@tanstack/start";
import {Suspense, type ReactNode} from "react";
import appStyling from "../globals.css?url";
import {ThemeProvider, UseThemeProps} from "@solorev/react-themes";
import {TanStackRouterDevtools} from "@tanstack/router-devtools";

interface RouterContexts {
  theme: Omit<
    UseThemeProps,
    "setTheme" | "forcedTheme" | "systemTheme" | "resolvedTheme" | "themes"
  >;
}

const fonts: React.LinkHTMLAttributes<HTMLLinkElement>[] = [
  {
    rel: "preload",
    href: "/font/Khand-Variable.woff2",
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous",
  },
  {
    rel: "preload",
    href: "/font/Supreme-Variable.woff2",
    as: "font",
    type: "font/woff2",
    crossOrigin: "anonymous",
  },
];

export const Route = createRootRouteWithContext<RouterContexts>()({
  head: ({loaderData}) => {
    return {
      scripts: [
        {
          type: "module",
          children: `import RefreshRuntime from "/_build/@react-refresh";
    RefreshRuntime.injectIntoGlobalHook(window)
    window.$RefreshReg$ = () => {}
    window.$RefreshSig$ = () => (type) => type`,
        },
      ],
      meta: [
        {
          charSet: "utf-8",
        },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1",
        },
        {
          title: "Scrapp Payment",
        },
      ],
      links: [
        {
          rel: "stylesheet",
          href: appStyling,
        },
        ...fonts,
      ],
    };
  },
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <ThemeProvider attribute={"class"}>
        <Outlet />
      </ThemeProvider>
    </RootDocument>
  );
}

function RootDocument({children}: Readonly<{children: ReactNode}>) {
  return (
    <html>
      <head dir="ltr">
        <Meta />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <Suspense>
          <TanStackRouterDevtools />
        </Suspense>
      </body>
    </html>
  );
}
