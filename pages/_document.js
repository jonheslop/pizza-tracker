import React from 'react'
import Document, {Head, Main, NextScript} from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <html>
        <Head>
          <meta charSet="utf-8"/>
          <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
          <title>🍕  Pizza Tipi — Order tracker</title>
          <meta property="og:title" content="🍕  Pizza Tipi — Order tracker" />
          <meta property="og:description" content="Watch the screen for your pizza" />
          <link rel="stylesheet" href="https://unpkg.com/tachyons@4.6.1/css/tachyons.min.css"/>
        </Head>
        <body className="bg-near-black near-white sans-serif">
          <Main/>
          <NextScript/>
        </body>
      </html>
    )
  }
}
