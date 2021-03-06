
const qs = require('query-string');

/**
 * setQueryStringWhithoutPageReload: replaces the current query string value with the new provided value without
 * triggering a page refresh.
 * @param qsValue
 */
export const setQueryStringWithoutPageReload = qsValue => {
    const newURL = window.location.protocol + "//" +
    window.location.host +
    window.location.pathname +
    qsValue;

    window.history.pushState({ path: newURL }, "", newURL);
};

/**
 * setQueryStringValue: updates the query string parameters only for the provided key, keeping the remaining
 * parameters intact.
 * @param key
 * @param value
 * @param queryString
 */
export const setQueryStringValue = (
    key,
    value,
    queryString = window.location.search
) => {
    const values = qs.parse(queryString);
    const newQsValue = qs.stringify({ ...values, [key]: value });
    setQueryStringWithoutPageReload(`?${newQsValue}`);
};

/**
 * getQueryStringValue: returns the query string value for the provided key.
 * @param key
 * @param queryString
 * @returns {*}
 */
export const getQueryStringValue = (
    key,
    queryString = window.location.search
) => {
    const values = qs.parse(queryString);
    return values[key];
};
