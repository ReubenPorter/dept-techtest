# Compare your Air

![Tests](https://github.com/ReubenPorter/dept-techtest/actions/workflows/tests.yml/badge.svg)
![ESlint](https://github.com/ReubenPorter/dept-techtest/actions/workflows/eslint.yml/badge.svg)

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

-   Better search experience for the user, as the API only supports full text search, which **is** case sensitive.
-   Not having to spam the API every time the user changes the search input.
-   Increased performance as the filtering is done on the client and therefore not affected by API latency.

Disadvantages:

-   If the dataset was very large, this could impact performance and I'd probably opt for dynamically calling the API when a user enters some search criteria. However the API is currently returning 1122 locations for GB, and after some testing in the browser, seems to perform fine. I would reconsider this approach if the brief stated locations across the world, rather than GB for example.
-   If a user leaves the app open on a stale tab per say, then revisits it without refreshing the page, the data could be out of sync with the API. If this was a requirement, then I'd opt for something like SWR to ensure the data is never stale. This isn't a requirement in the brief but is something I would probably discuss with clients/POs if this was a real project.

## Improvements

I have only added a few basic tests just as a demonstration really. If I was to spend more time I'd include some more RTL tests for the `SearchInput` component, as well as setting up Cypress and have some end to end tests, e.g. Using the search, adding a card, removing a card.

In a larger project I'd usually include Lighthouse CI for accessibility, performance testing etc. I'm using Next js ESLint config which includes the ESLint jsx-a11y plugin which has helped bring to light to any accessibility errors during development.

I've tried to keep to the breif as much as possible, but would have probably preferred if the search results box didn't cause a layout shift - this would probably prompt a discussion with the UX team / client (in a real life scenario).
