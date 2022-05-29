export interface City {
    country: string,
    city: string,
    locations: number,
    firstUpdated: string,
    lastUpdated: string,
    parameters: any
}

export interface Location {
    id: number;
    city?: string;
    name: string;
    entity: string;
    country: string;
    sources: {
        id: string;
        url: string;
        name: string
    }[],
    isMobile: boolean;
    isAnalysis: boolean;
    parameters: {
        id: number;
        unit: string;
        count: number;
        average: number;
        lastValue: number;
        parameter: string;
        displayName: string;
        lastUpdated: string;
        parameterId: number;
        firstUpdated: string;
    }[];
    sensorType: string;
    coordinates: {
        latitude: number;
        longitude: number;
    };
    lastUpdated: string;
    firstUpdated: string;
    measurements: number;
}

export interface Meta {
    name: string;
    license: string;
    website: string;
    page: number;
    limit: number;
    found: number;
}