import './App.css';
import React from "react";
// Utility functions
import * as utils from "./Utils";
// Input fx data set
import { fxData } from "./fxData";
// ISO standard mapping data as of 2021-03-06
import { isoMappingData } from "./isoMappingData";

//------------------------------------------------------------------------------

/**
 * Data maintenance / cleaning helper
 * TODO: validation according to further criteria
 *       e.g. re https://www.currency-iso.org/en/home/tables/table-a1.html
 *       where the list of all currencies and precious metals are available
 * We take it granted for now that each entry in fx.json is of a valid currency type
 * Some currencies are misrepresented in the data set (e.g. MOP), maybe some statistical checks
 * would be in place in real life applications as well.
 */
function cleanFx() {
    // Remove entries without a currency code present
    fxData.fx = fxData.fx.filter(fx =>
        fx.currency
        && (typeof fx.currency === "string")
        && fx.currency.trim() !== ""
        && fx.currency.trim() !== "XXX"
    );
}

/**
 * Alphabetically sort the fx data set re currency code
 */
function sortFx() {
    function compare(a, b) {
        const currencyA = a.currency.toLowerCase();
        const currencyB = b.currency.toLowerCase();

        let comparison = 0;
        if (currencyA > currencyB) {
            comparison = 1;
        } else if (currencyA < currencyB) {
            comparison = -1;
        }
        return comparison;
    }

    fxData.fx.sort(compare);
}

//------------------------------------------------------------------------------

// Used for checking if we have a corresponding country flag at our disposal.
// Proved to be more efficient than a hook-based solution in my tests.
const flagImages = "ad,ae,af,ag,al,am,ar,at,au,az,ba,bb,bd,be,bf,bg,bh,bi,bj,bn,bo,br,bs,bt,bw,by,bz,ca,cd,cf,cg,ch,ci,cl,cm,cn,co,cr,cu,cv,cy,cz,de,dj,dk,dm,do,dz,ec,ee,eg,er,es,et,fi,fj,fm,fr,ga,gb,gd,ge,gh,gm,gn,gq,gr,gt,gw,gy,hn,hr,ht,hu,id,ie,il,in,iq,ir,is,it,jm,jo,jp,ke,kg,kh,ki,km,kn,kp,kr,kw,kz,la,lb,lc,li,lk,lr,ls,lt,lu,lv,ly,ma,mc,md,me,mg,mh,mk,ml,mm,mn,mr,mt,mu,mv,mw,mx,my,mz,na,ne,ng,ni,nl,no,np,nr,nz,om,pa,pe,pg,ph,pk,pl,pt,pw,py,qa,ro,rs,ru,rw,sa,sb,sc,sd,se,sg,si,sk,sl,sm,sn,so,sr,ss,st,sv,sy,sz,td,tg,th,tj,tl,tm,tn,to,tr,tt,tv,tw,tz,ua,ug,us,uy,uz,va,vc,ve,vn,vu,ws,xk,ye,za,zm,zw";

const placeholderImageName = "_placeholder";

const flagsLocation = "/test0002-react/flags/";

/**
 * Helper function
 * @param name
 * @returns {string}
 */
function backupImage(name) {
    if (flagImages.includes(name.toLowerCase())) {
        return flagsLocation + name + ".png";
    }
    return flagsLocation + placeholderImageName + ".png";
}

/**
 * Renders countries in list items
 * @param currency
 * @returns {JSX.Element}
 */
function renderCountries(currency) {
    let countries = [];

    isoMappingData.forEach(
        function parser(item) {
            if (item.iso3LetterCurrencyCodes.toLowerCase().includes(currency.toLowerCase())) {
                countries.push([item.isoCountryName, item.iso2LetterCountryCode]);
            }
        }
    );
    if (countries.length === 0) {
        countries.push(["outdated currency", placeholderImageName]);
    }
    
    return (
        <div className="country">
            {countries.map((item, index) =>
                <div key={index}>
                    <img src={backupImage(item[1])} alt="flag" />
                    {item[0]}
                    <br />
                </div>
            )}
        </div>
    );
}

/**
 * Renders currency in list items
 * @param currency
 * @returns {JSX.Element}
 */
function renderCurrency(currency) {
    return (
        <div className="currency">
            {currency}
        </div>
    );
}

/**
 * Renders exchange rates in list items
 * @param fx
 * @returns {JSX.Element}
 */
function renderExchangeRate(fx) {
    let fxString;

    if (fx.exchangeRate && fx.exchangeRate.middle && (typeof fx.exchangeRate.middle === "number")) {
        fxString = (1 / fx.exchangeRate.middle).toFixed(4) + " EUR";
    } else {
        fxString = "-";
    }

    return (
        <div className="fxRate">
            {fxString}
        </div>
    );
}

//------------------------------------------------------------------------------

/**
 * Main
 * @returns {JSX.Element}
 * @constructor
 */
function App() {
    // Clean the data set of invalid entries
    cleanFx();
    // Sort the data set for a nicer output
    sortFx();

    // Set up hooks
    const [searchTerm, setSearchTerm] = React.useState("");
    const handleChange = event => {
        setSearchTerm(event.target.value);
        // Save query string to URL param
        utils.setQueryStringValue("q", event.target.value);
    };
    React.useEffect(() => {
        // Restore search term from URL param
        setSearchTerm(utils.getQueryStringValue("q"));
    }, []);

    // Filter
    const results = !searchTerm
        ? fxData.fx.sort()
        : fxData.fx.filter(fx =>
            fx.currency.toLowerCase().includes(searchTerm.toLocaleLowerCase())
        );

    // Page
    return (
        <div className="App">
            <div className="center-pane">
                <header className="header">
                    <h3>George front-end test exercise | Exchanges rates, ... to EUR</h3>
                    <p>Graphical design was spared on this one, for a reference on the aesthetic sense of the author
                        please refer
                        to <a href="https://aladar.me">aladar.me</a> or <a href="https://or.security">or.security</a>.
                        Thank you.</p>
                    <p>Please also read README.txt in the code repository.</p>
                    <p>Search per currency:</p>
                </header>
                <input
                    className="search-box"
                    type="text"
                    placeholder=""
                    value={searchTerm}
                    onChange={handleChange}
                />
                <ul>
                    {results.map((item, index) =>
                        <li key={index}>
                            {renderCountries(item.currency)}
                            {renderCurrency(item.currency)}
                            {renderExchangeRate(item)}
                        </li>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default App;
