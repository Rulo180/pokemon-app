# Broken Next.js application v2

## Problem Statement

You have received git repository with a broken [Next.js](https://nextjs.org/) application written in TypeScript. The App is displaying list of Pokémons using a simple REST API. Target of this assessment is to fix the application features as described bellow.

## Application features

On the main page, there is a list of Pokémons. User can switch between `cards` and `table` view. The list of Pokémons can be filtered by search in the top left corner, allowing users to search Pokémons by their name.

_Table view with sorting is missing_, you need to implement it. Sorting must be implemented on REST API. Users can sort stats columns in the table by clicking on the header of the respected column. Columns can be sorted ascending, descending.

[See screenshots](./docs)

## Deliverable

Github repository with a functional application.

#### Make sure

- Users can search Pokémons by their name
- Users can sort table of the Pokémons by their stats
- Sorting is implemented on REST API
- All scripts defined in `package.json` must be passing (tests, linter, build etc.)
- Development and production versions of the application are working

## Evaluation Criteria

1. Deliverables
2. Following best FE practices & idioms
3. UI design best practices, good user experience
4. Simplicity of implementation combined with the extensibility of design
5. Any improvements you can think of
