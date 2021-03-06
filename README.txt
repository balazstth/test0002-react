
================================================================================
    Documentation
================================================================================

This little application was made in response to this challenge:
https://github.com/keriati/george-fx-test

This is my first ever app with React. I put up an arbitrary time limit for the dev duration: together with the research it must not be longer than two days. The solution is feature-complete, with no test coverage in this timeframe.

Live demo: https://balazstth.github.io/test0002-react/

Architecture:
    React
    query-string
    Vanilla CSS
    Complementing data set for country names, 2-letter ISO country codes, currency types. It was compiled according to
        https://www.iban.com/country-codes
        https://www.iban.com/currency-codes
        as of 2021-03-06

App creation:
    WebStorm, React + JS

Remarks:
    - I consciously deviated from the spec in using 4 decimals in exchange rates.

    - The term exchange rate was not clearly defined, I choose the middle one.
    - As I went further in the exercise a few more things became obscure, most of all the currency type to country induction. In a real-life scenario this would have been the most crucial point to discuss. I went with a full-fledged solution to represent all countries in the list per currency that use that currency type.

    - Right now the input data set is consumed directly as a JS file. No async interfacing or anything. Maybe a requisite, maybe not. If so, axios or JSON.parse(string) may come in the picture.
    - I would ask the architect if service workers are a thing re this task. (As a newbie to React I am not sure how much effort could or should be put into offline optimization.) Maybe dependencies / hooks to define a cache for the referenced pictures could be a viable idea as well in a more serious application.

TODO
    - Granular imports (e.g. from 'import React from "react";' to a more refined list).
    - Tests. Time, time, time. I ran out of the two days.
    - Tests for type safety.
    - Tests for data mapping (countries, currencies, ISO-codes, etc.).
    - Tests for content rendering. I have little experience in that area, I would ask colleagues who already incorporate that in their workflow for directions. (I mostly tackled data sets and backend business logic in my testing work so far.)

================================================================================
    2021-03-06
================================================================================
