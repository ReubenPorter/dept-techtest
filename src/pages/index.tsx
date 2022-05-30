import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { AnimatePresence, motion } from "framer-motion";

import { ResultCard, SearchInput } from "@components";
import { Location, Meta } from "@interfaces";
import { api } from "../lib/api";

const Home: NextPage = () => {
	const [locations, setLocations] = useState<Location[]>([]);
	const [selectedLocations, setSelectedLocations] = useState<Location[]>([]);
	const [error, setError] = useState(false);

	useEffect(() => {
		const getAllLocations = async () => {
			try {
				// API currently returns 1122 locations for GB. This is too much data (just over 1MB) to fetch server side
				// so having to fetch it client side. The benefit of fetching it upfront in a single request means we can then
				// filter on the client when the user starts typing in the search input, rather than sending an API request
				// on every change. If there were a lot more results, it wouldn't be performant enough to grab the data on load,
				// and we'd have to make requests to the api based on the search input - probably debounced to stop crazy spam.
				const res = await api.get<{ meta: Meta; results: Location[] }>(
					"locations?country_id=GB&limit=2000"
				);
				setLocations(res.data.results);
			} catch (err) {
				// Very basic error handling. Normally would consider the different types of errors the API could return and
				// handle them appropiately.
				setError(true);
			}
		};
		getAllLocations();
	}, []);

	return (
		<div className="container mx-auto px-6 pb-12 text-white md:px-14 md:pb-32">
			<h1 className="mb-7 mt-16 text-center text-3xl font-medium tracking-tight md:mt-32 md:text-4xl">
				Compare your Air
			</h1>
			<p className="mb-4 text-center text-lg leading-6 md:mb-0 md:px-0 md:text-xl md:leading-9">
				Compare the air quality between cities in the UK.
			</p>
			<p className="mb-12 text-center text-lg leading-6 md:mb-10 md:text-xl md:leading-9">
				Select cities to compare using the search tool below.
			</p>

			<div className="flex justify-center">
				{!error ? (
					<SearchInput
						locations={locations}
						selectedLocations={selectedLocations}
						setSelectedLocationHandler={setSelectedLocations}
					/>
				) : (
					// Not pretty but I think it's better than rendering the Search Input without any locations - at least this
					// is clear to the user that an error has occurred.
					<p>An error has occured retrieving location data.</p>
				)}
			</div>

			{selectedLocations && selectedLocations.length ? (
				<ul className="mt-12 grid auto-cols-auto grid-cols-1 gap-6 md:mt-20 md:grid-cols-2 md:gap-12 lg:mx-36">
					<AnimatePresence>
						{selectedLocations.map((selectedLocation, index) => (
							<motion.li
								key={index}
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
							>
								<ResultCard
									location={selectedLocation}
									setSelectedLocationHandler={
										setSelectedLocations
									}
								/>
							</motion.li>
						))}
					</AnimatePresence>
				</ul>
			) : null}
		</div>
	);
};

export default Home;
