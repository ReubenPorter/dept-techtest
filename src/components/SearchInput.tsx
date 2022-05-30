import {
	Dispatch,
	FC,
	SetStateAction,
	useCallback,
	useEffect,
	useState,
} from "react";
import { SearchIcon } from "@heroicons/react/outline";
import { AnimatePresence, motion } from "framer-motion";
import ClickAwayListener from "react-click-away-listener";

import { Location } from "@interfaces";

interface Props {
	locations: Location[];
	selectedLocations: Location[];
	setSelectedLocationHandler: Dispatch<SetStateAction<Location[]>>;
}

const SearchInput: FC<Props> = ({
	locations,
	selectedLocations,
	setSelectedLocationHandler,
}) => {
	const [expandSearch, setExpandSearch] = useState(false);
	const [searchValue, setSearchValue] = useState("");
	const [filteredLocations, setFilteredLocations] = useState(locations);

	const handleFilterLocation = useCallback(
		(locationName: string) => {
			setSearchValue(locationName);
			// Filtering locations on the client side to save spamming API requests.
			// This also makes the search feel nice and snappy for the user as well.
			// This is another benefit over querying the api with each change as it means we can use a more accurate text search,
			// as the API requires the full location name, including correct capitalization etc.
			// Convert each city and input to lowercase for more accurate filtering.
			const filtered = locations.filter((loc) =>
				loc.name?.toLowerCase().includes(locationName.toLowerCase())
			);
			setFilteredLocations(filtered);
		},
		[locations]
	);

	const resetFilteredLocations = useCallback(() => {
		// Reset search state and filtered locations
		setSearchValue("");
		setFilteredLocations(locations);
	}, [locations]);

	const selectLocation = useCallback(
		(location: Location) => {
			// Do not allow the user to re-select the same location.
			// Better UX may be to remove it from the list altogether if already selected maybe?
			if (!selectedLocations.includes(location)) {
				// Append the selected location to the selected locations state.
				setSelectedLocationHandler((prevState) => [
					...prevState,
					location,
				]);
			}
			// UX choice here, closing the search input after selecting a location.
			setExpandSearch(false);
			// Reset the filtered locations state to the default 'all' locations. So all locations are shown again when refocussing the search input.
			// UX choice, clear the search value after a location has been selected.
			resetFilteredLocations();
		},
		[setSelectedLocationHandler, resetFilteredLocations, selectedLocations]
	);

	// The search input may render before all of the locations have been returned from the API. Therefore this
	// use effect will update the available locations once the api has returned them (received via props).
	// I've done some testing and all of the locations are returned very quickly so this doesn't effect the UX.
	// If there was a lot more data on initial load, or the API was slow, I'd need to rethink this approach.
	useEffect(() => {
		setFilteredLocations(locations);
	}, [locations]);

	return (
		<ClickAwayListener
			onClickAway={() => {
				setExpandSearch(false);
				resetFilteredLocations();
			}}
		>
			<div className="relative w-full md:w-[400px]">
				<div className="relative z-10">
					<label htmlFor="search" className="sr-only">
						Search for a city
					</label>
					<SearchIcon
						className="absolute top-0 left-3.5 h-full w-6 text-gray-400"
						aria-hidden="true"
					/>
					<input
						autoComplete="off"
						id="search"
						type="text"
						className="w-full rounded-xl border-2 border-gray-400 py-3.5 pl-12 pr-4 text-gray-900 outline-none placeholder:text-gray-900 md:py-3"
						placeholder="Enter city name..."
						value={searchValue}
						onFocus={() => {
							setExpandSearch(true);
							resetFilteredLocations();
						}}
						onChange={(e) =>
							handleFilterLocation(e.currentTarget.value)
						}
					/>
				</div>
				<AnimatePresence>
					{expandSearch && (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
							className="-mt-5 overflow-hidden rounded-b-xl bg-white pt-8 pb-4"
						>
							<ul
								data-testid="search-results-container"
								aria-label="Results list"
								className="max-h-[285px] w-full space-y-0.5 overflow-x-hidden overflow-y-scroll rounded-b-lg bg-white"
								tabIndex={-1}
								role="listbox"
							>
								{filteredLocations.map((location, index) => (
									<li
										key={index}
										className="cursor-pointer px-4 py-2 text-black outline-none hover:bg-gray-200 focus:bg-gray-200"
										tabIndex={0}
										onClick={() => selectLocation(location)}
										aria-label="Select this location"
										role="button"
										onKeyDown={(e) => {
											switch (e.key) {
												case " ":
												case "SpaceBar":
												case "Enter":
													e.preventDefault();
													selectLocation(location);
													break;
												case "Escape":
													setExpandSearch(false);
													resetFilteredLocations();
													break;
												default:
													break;
											}
										}}
									>
										{location.name}
									</li>
								))}

								{searchValue.length >= 1 &&
								!filteredLocations.length ? (
									<li className="cursor-default px-4 text-black">
										No results found.
									</li>
								) : null}
							</ul>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</ClickAwayListener>
	);
};

export default SearchInput;
