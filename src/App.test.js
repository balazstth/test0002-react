import {render, screen} from '@testing-library/react';
import App from './App';

//------------------------------------------------------------------------------

// TODO: Add Enzyme

// TODO: Functional or integration tests for
//  proper currency conversion
//  filtering elements through custom input
//  filtering elements through custom URL param

// TODO: Unittests for
//  utility functions

//------------------------------------------------------------------------------
// A couple of test for checking rendered data

/**
 * Country list
 */
test('Countries are rendered', () => {
    render(<App/>);

    const countries = [
        "United Arab Emirates (the)",
        "Afghanistan",
        "Albania",
        "Armenia",
        "Curaçao",
        "Sint Maarten (Dutch part)",
        "Angola",
        "Argentina",

        "Saint Barthélemy",   // special character
        "Saint Martin (French part)",
        "Saint Pierre and Miquelon",

        "Lesotho",  // multiple occurrences on the page
        "Namibia",
        "South Africa"
    ];

    // Country names
    countries.forEach((item) => {
        // All occurrences
        const elems = screen.getAllByText(item);
        elems.forEach((elem) => {
            expect(elem).toBeInTheDocument();
        });
    })
});

//------------------------------------------------------------------------------
