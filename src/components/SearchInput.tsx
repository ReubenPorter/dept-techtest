import { FC } from "react";
import { SearchIcon } from "@heroicons/react/outline";
import ClickAwayListener from "react-click-away-listener";

interface Props {}

const SearchInput: FC<Props> = () => {
	return (
		<ClickAwayListener onClickAway={() => console.log("clicked away")}>
			<div className="relative mb-14">
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
					className=" rounded-lg border-2 border-gray-400 py-2 pl-12 pr-4 outline-none placeholder:text-gray-900 md:w-[375px]"
					placeholder="Enter city name..."
				/>
			</div>
		</ClickAwayListener>
	);
};

export default SearchInput;
