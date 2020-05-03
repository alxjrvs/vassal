# VASSAL

## Tracking Landlords in ???

## THE THINNEST DESCRIPTION

Largely, this is a scraper still in development.

look at `src/index.ts` for more info.

run `Medord.buildCache()` to generate new JSON files.

Run `Medford.parseSingleAddress(<pid>)` to begin scraping a single page.

Running `Medford.parse()` as is (after un-commenting) will (If I understand correctly) queue up ~20,000 requests at once, which (IMO) haas been unkind to the hosting server. I'll figure out a good batching solution soon.
