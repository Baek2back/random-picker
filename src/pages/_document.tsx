import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta charSet="UTF-8" />
        <link
          rel="stylesheet"
          as="style"
          href="https://cdnjs.cloudflare.com/ajax/libs/pretendard/1.3.6/variable/pretendardvariable-dynamic-subset.css"
          crossOrigin="anonymous"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
