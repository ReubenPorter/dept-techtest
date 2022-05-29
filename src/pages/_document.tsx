import { ReactElement } from "react";

import { Html, Head, Main, NextScript } from "next/document";

const Document = (): ReactElement => (
	<Html lang="en">
		<Head>
			<meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
			<meta
				name="description"
				content="View local air statistics for locations all around the UK."
			/>
			<link rel="icon" type="image/x-icon" href="/favicon.ico" />
		</Head>
		<body className="bg-gradient-to-r from-dept-purple to-dept-blue font-sans antialiased">
			<Main />
			<NextScript />
		</body>
	</Html>
);

export default Document;
