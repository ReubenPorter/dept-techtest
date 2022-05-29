import { ReactElement } from "react";

import Head from "next/head";
import type { AppProps } from "next/app";

import "../styles/globals.css";

const App = ({ Component, pageProps }: AppProps): ReactElement => {
	return (
		<>
			<Head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<title>Compare your Air</title>
			</Head>

			<main>
				<Component {...pageProps} />
			</main>
		</>
	);
};

export default App;
