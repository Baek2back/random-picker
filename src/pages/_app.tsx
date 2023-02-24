import favicon from "public/favicon.ico";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { NextSeo } from "next-seo";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <NextSeo
        title="Mash-up | Random Picker"
        additionalLinkTags={[
          {
            rel: "icon",
            href: favicon.src,
          },
        ]}
      />
      <Component {...pageProps} />
    </>
  );
}
