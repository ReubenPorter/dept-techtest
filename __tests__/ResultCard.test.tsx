import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ResultCard from "../src/components/ResultCard";
import { Location } from "@interfaces";

const testLocation: Location = {
	id: 2312,
	city: "Manchester",
	name: "Manchester Piccadilly",
	entity: "government",
	country: "GB",
	sources: [
		{
			id: "department-for-environmental-food-rural-affairs",
			url: "https://uk-air.defra.gov.uk/latest/currentlevels",
			name: "Department for Environmental Food & Rural Affairs",
		},
	],
	isMobile: false,
	isAnalysis: false,
	parameters: [
		{
			id: 4195,
			unit: "µg/m³",
			count: 110327,
			average: 32.5420522628187,
			lastValue: 12,
			parameter: "no2",
			displayName: "NO₂ mass",
			lastUpdated: "2022-05-29T17:00:00+00:00",
			parameterId: 5,
			firstUpdated: "2016-02-27T22:00:00+00:00",
		},
		{
			id: 5267,
			unit: "µg/m³",
			count: 112802,
			average: 31.4963032570344,
			lastValue: 58,
			parameter: "o3",
			displayName: "O₃ mass",
			lastUpdated: "2022-05-29T17:00:00+00:00",
			parameterId: 3,
			firstUpdated: "2016-02-27T21:00:00+00:00",
		},
		{
			id: 5269,
			unit: "µg/m³",
			count: 109802,
			average: 9.40948252308701,
			lastValue: 4,
			parameter: "pm25",
			displayName: "PM2.5",
			lastUpdated: "2022-05-29T17:00:00+00:00",
			parameterId: 2,
			firstUpdated: "2016-02-27T21:00:00+00:00",
		},
		{
			id: 5270,
			unit: "µg/m³",
			count: 106992,
			average: 5.64671190369373,
			lastValue: 5,
			parameter: "so2",
			displayName: "SO₂ mass",
			lastUpdated: "2022-05-29T02:00:00+00:00",
			parameterId: 6,
			firstUpdated: "2016-02-27T21:00:00+00:00",
		},
	],
	sensorType: "reference grade",
	coordinates: {
		latitude: 53.48152,
		longitude: -2.237881,
	},
	lastUpdated: "2022-05-29T17:00:00+00:00",
	firstUpdated: "2016-02-27T21:00:00+00:00",
	measurements: 490764,
};

const setStateMock = jest.fn();

// These tests are very basic, more so just a demonstration of having some tests. Ideally I'd add some more integration style
// tests or even setup Cypress for some end to end testing.
describe("ResultCard component", () => {
	it("Renders Location name", () => {
		render(
			<ResultCard
				location={testLocation}
				setSelectedLocationHandler={setStateMock}
			/>
		);

		const locationName = screen.getByText("Manchester Piccadilly");
		expect(locationName).toBeInTheDocument();
	});

	it("Renders City and Country as expected", () => {
		render(
			<ResultCard
				location={testLocation}
				setSelectedLocationHandler={setStateMock}
			/>
		);

		const cityCountryText = screen.getByText(
			"in Manchester, United Kingdom"
		);
		expect(cityCountryText).toBeInTheDocument();
	});

	it("Renders PM25 value", () => {
		render(
			<ResultCard
				location={testLocation}
				setSelectedLocationHandler={setStateMock}
			/>
		);

		const value = screen.getByText(/PM25: 4/);
		expect(value).toBeInTheDocument();
	});

	it("Renders SO2 value", () => {
		render(
			<ResultCard
				location={testLocation}
				setSelectedLocationHandler={setStateMock}
			/>
		);

		const value = screen.getByText(/SO2: 5/);
		expect(value).toBeInTheDocument();
	});

	it("Renders O3 value", () => {
		render(
			<ResultCard
				location={testLocation}
				setSelectedLocationHandler={setStateMock}
			/>
		);

		const value = screen.getByText(/O3: 58/);
		expect(value).toBeInTheDocument();
	});

	it("Renders NO2 value", () => {
		render(
			<ResultCard
				location={testLocation}
				setSelectedLocationHandler={setStateMock}
			/>
		);

		const value = screen.getByText(/NO2: 12/);
		expect(value).toBeInTheDocument();
	});
});
