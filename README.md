# Compare your Air

Compare air quality in cities across the UK using the [Open AQ API]("https://api.openaq.org/docs")

## Running locally

First, create a `.env.local` file in the root of the project with the following contents:

```env
NEXT_PUBLIC_ENV_API_BASE_URL='https://api.openaq.org/v2'
```

Then, install dependencies and start the local development server

```bash
npm install
npm run dev
```

## Notes

The data returned from the API is not always consistent, e.g. does not include an 'SO2' value for every location. As a solution I've made sure to cover cases where data is not present by displaying 'N/A'. I have decided to stick to the brief and only include the values requested, even though the API sometimes returns more.

I decided to take the approach of fetching all of the locations on the client on initial load, this comes with the following advantages and disadvantages:

Advantages:

-   Better search experience for the user, as the API only supports full text search, which **is** case sensitive
-   Not having to spam the API every time the user changes the search input
-   Increased performance as the filtering is done on the client and therefore not affected by API latency.

Disadvantages:

-   If the dataset was very large, this could impact performance and I'd probably opt for dynamically calling the API when a user enters some search criteria. However the API is currently returning 1122 locations for GB, and after some testing in the browser, seems to perform fine. I would reconsider this approach if the brief stated locations across the world, rather than GB for example.
