import { ReactElement } from "react";

import Head from "next/head";
import { SWRConfig } from "swr";
import type { AppProps } from "next/app";

import "../styles/globals.css";

const fetcher = (url: string) => fetch(url).then((response) => response.json());

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
			<SWRConfig
				value={{
					fetcher,
					fallback: pageProps.fallback,
				}}
			>
				<main>
					<Component {...pageProps} />
				</main>
			</SWRConfig>
		</>
	);
};

export default App;
