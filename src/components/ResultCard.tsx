import { XIcon } from "@heroicons/react/outline";
import { FC } from "react";

interface Props {}

const ResultCard: FC<Props> = () => {
	return (
		<div className="relative col-span-6 rounded-lg bg-white p-8">
			<button
				className="absolute top-3 right-3 outline-none"
				aria-label="Close result card"
				onClick={(e) => console.log("close card")}
			>
				<XIcon className="h-7 w-7 text-gray-900" aria-hidden="true" />
			</button>
			<span className="block text-xs uppercase text-gray-900">
				Updated an hour ago
			</span>
			<h2 className="text-lg font-semibold text-dept-purple">
				Manchester Piccadilly
			</h2>
			<p className="text-gray-700">In Manchester, United Kingdom</p>
			<p className="text-gray-900">
				Values: PM25: 9, SO2: 32, O3: 8, NO2: 43
			</p>
		</div>
	);
};

export default ResultCard;
