import type { NextPage } from "next";
import ResultCard from "../components/ResultCard";

import SearchInput from "../components/SearchInput";

const Home: NextPage = () => {
	return (
		<div className="container mx-auto text-white">
			<h1 className="mb-7 mt-32 text-center text-5xl font-medium tracking-tight">
				Compare your Air
			</h1>
			<p className="text-center text-xl leading-8">
				Compare the air quality between cities in the UK.
			</p>
			<p className="mb-8 text-center text-xl leading-9">
				Select cities to compare using the search tool below.
			</p>

			<div className="flex justify-center">
				<SearchInput />
			</div>

			<div className="grid grid-cols-12 gap-10 lg:mx-36">
				<ResultCard />
				<ResultCard />
				<ResultCard />
				<ResultCard />
			</div>
		</div>
	);
};

export default Home;
