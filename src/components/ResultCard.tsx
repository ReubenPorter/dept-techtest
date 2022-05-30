import { Dispatch, FC, SetStateAction, useMemo } from "react";
import { DateTime } from "luxon";
import { XIcon } from "@heroicons/react/outline";

import { Location } from "@interfaces";

interface Props {
	location: Location;
	setSelectedLocationHandler: Dispatch<SetStateAction<Location[]>>;
}

const ResultCard: FC<Props> = ({ location, setSelectedLocationHandler }) => {
	const relativeLastUpdatedDate = useMemo(
		() => DateTime.fromISO(location.lastUpdated).toRelative(),
		[location.lastUpdated]
	);

	return (
		<div className="relative w-full rounded-lg bg-white p-6 md:p-8">
			<button
				className="absolute top-3 right-3 outline-black"
				aria-label="Close result card"
				onClick={() =>
					setSelectedLocationHandler((prevState) =>
						prevState.filter((loc) => loc.id !== location.id)
					)
				}
			>
				<XIcon className="h-7 w-7 text-gray-900" aria-hidden="true" />
			</button>
			<span className="mb-1 block text-sm font-semibold uppercase text-gray-900">
				UPDATED {relativeLastUpdatedDate}
			</span>
			<h2 className="mb-1.5 text-lg font-bold text-dept-purple md:text-xl">
				{location.name}
			</h2>
			{/* Not all locations contain city data so show N/A if this is the case */}
			{/* API country code GB is classed as United Kingdom, as shown in the designs */}
			<p className="mb-2 text-gray-900">
				in {location?.city || "N/A"}, United Kingdom
			</p>
			{/* The data isn't really formalised and consistent on the API, however I am sticking to the brief and only displaying
			the specified values as displayed in the design. If no value is found, display 'N/A'. I opted to use 'lastValue' as the brief
			asks for value at the time of retrieval, rather than using the 'average'. */}
			<p className="font-semibold text-black">
				Values: PM25:{" "}
				{location.parameters.find((param) => param.parameter === "pm25")
					?.lastValue || "N/A"}
				, SO2:{" "}
				{location.parameters.find((param) => param.parameter === "so2")
					?.lastValue || "N/A"}
				, O3:{" "}
				{location.parameters.find((param) => param.parameter === "o3")
					?.lastValue || "N/A"}
				, NO2:{" "}
				{location.parameters.find((param) => param.parameter === "no2")
					?.lastValue || "N/A"}
			</p>
		</div>
	);
};

export default ResultCard;
