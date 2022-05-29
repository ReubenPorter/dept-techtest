import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import SearchInput from "../src/components/SearchInput";
import { Location } from "@interfaces";

const testLocations: Location[] = [];

const setStateMock = jest.fn();

describe("SearchInput component", () => {
	it("Input renders as expected with placeholder by default", () => {
		render(
			<SearchInput
				locations={testLocations}
				setSelectedLocationHandler={setStateMock}
			/>
		);

		const input = screen.getByPlaceholderText("Enter city name...");
		expect(input).toBeInTheDocument();
	});

	it("Input has a corresponding label that is present for accessibility requirements but hidden from view", () => {
		render(
			<SearchInput
				locations={testLocations}
				setSelectedLocationHandler={setStateMock}
			/>
		);

		const label = screen.getByLabelText("Search for a city");
		expect(label).toBeInTheDocument();
	});

	it("Search results box is displayed when the input is clicked", async () => {
		render(
			<SearchInput
				locations={testLocations}
				setSelectedLocationHandler={setStateMock}
			/>
		);

		fireEvent.focus(screen.getByPlaceholderText("Enter city name..."));

		await waitFor(() => screen.getByTestId("search-results-container"));

		expect(
			screen.getByTestId("search-results-container")
		).toBeInTheDocument();
	});
});
