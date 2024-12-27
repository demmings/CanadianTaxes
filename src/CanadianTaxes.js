//  *** DEBUG START ***
//  Remove comments for testing in NODE

// function getGross() {
//     const val = GET_GROSS_INCOMES_V2(80000, 70, 70, 2, 2030, 2000, 50000, 9416, 2000, 4000);
//     Logger.log("Gross=" + val);
// }

// function getTax() {
//     const val = GET_INCOMETAX_V2(126016, 68, 13000);
//     Logger.log(126016 - val);
// }

// function getNet() {
//     const val = GET_NET_INCOMES_V2(0, 62, 62, 0, null, 50000, 0, 0, 0);
//     Logger.log("Net=" + val);
// }

class Logger {
    /**
     * 
     * @param {String} msg 
     */
    static log(msg) {
        // skipcq: JS-0002
        console.log(msg);
    }
}

//  *** DEBUG END ***/

/**
 * Basic sanity check.
 * @returns {any[]}
 * @customfunction
 */
function TEST_CANTAX() {
    const TestCantaxData = [
        ["Tax Year", "Age", "Net Income", "Expected Gross Taxable Income", "Dividends Eligible for Enhanced Tax Credit", "Dividends (non elibible)", "Eligible Capital Gains", "OAS", "Pension Credit Eligible Income", "Medical Expenses", "Charitable Donations", "Inflation"],
        [2024, 59, 180000.00, 300244.00, 5000.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00],
        [2024, 60, 57000.00, 70272.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00],
        [2024, 61, 58000.00, 72833.00, 10200.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00],
        [2024, 62, 59000.00, 74277.00, 10450.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00],
        [2024, 63, 60000.00, 75712.00, 10600.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00],
        [2024, 64, 61000.00, 77191.00, 10800.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00],
        [2024, 65, 62000.00, 78368.00, 11000.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00],
        [2024, 66, 70000.00, 90663.00, 12000.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00],
        [2024, 67, 80000.00, 108254.00, 12800.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00],
        [2024, 68, 90000.00, 126016.00, 13000.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00],
        [2024, 69, 90000.00, 120185.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00],
        [2024, 70, 120000.00, 173897.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00],
        [2024, 70, 120000.00, 178565.00, 0.00, 0.00, 10000.00, 0.00, 0.00, 0.00, 0.00, 0.00],
        [2024, 70, 120000.00, 224492.00, 0.00, 0.00, 100000.00, 0.00, 0.00, 0.00, 0.00, 0.00],
        [2024, 70, 120000.00, 502868.00, 0.00, 0.00, 500000.00, 0.00, 0.00, 0.00, 0.00, 0.00],
        [2024, 70, 120000.00, 511335.00, 10000.00, 0.00, 500000.00, 0.00, 0.00, 0.00, 0.00, 0.00],
        [2024, 70, 120000.00, 319350.00, 10000.00, 0.00, 249999.00, 0.00, 0.00, 0.00, 0.00, 0.00],
        [2024, 70, 50000.00, 71924.00, 50000.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00],
        [2024, 70, 10000.00, 10796.00, 50000.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00],
        [2024, 70, 0.00, 600.00, 50000.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00],
        [2024, 70, 180000.00, 309659.00, 5000.00, 0.00, 0.00, 9416.00, 0.00, 0.00, 0.00, 0.00],
        [2024, 70, 80000.00, 108410.00, 5000.00, 0.00, 0.00, 9416.00, 0.00, 0.00, 0.00, 0.00],
        [2024, 70, 50000.00, 59398.00, 5000.00, 0.00, 0.00, 9416.00, 0.00, 0.00, 0.00, 0.00],
        [2024, 70, 50000.00, 58824.00, 5000.00, 0.00, 0.00, 9416.00, 2000.00, 0.00, 0.00, 0.00],
        [2024, 70, 50000.00, 59309.00, 5000.00, 0.00, 2000.00, 9416.00, 2000.00, 0.00, 0.00, 0.00],
        [2024, 70, 50000.00, 58713.00, 5000.00, 0.00, 2000.00, 9416.00, 2000.00, 4000.00, 0.00, 0.00],
        [2025, 62, 50000.00, 59766.00, 5000.00, 0.00, 2000.00, 0.00, 2000.00, 4000.00, 0.00, 0.00],
        [2025, 70, 50000.00, 58254.00, 5000.00, 0.00, 2000.00, 9416.00, 2000.00, 4000.00, 0.00, 0.00],
        [2025, 69, 80000.00, 135075.00, 50000.00, 0.00, 2000.00, 9416.00, 2000.00, 4000.00, 0.00, 0.00],
        [2025, 69, 80000.00, 151965.00, 50000.00, 20000.00, 2000.00, 9416.00, 2000.00, 4000.00, 0.00, 0.00],
        [2025, 69, 80000.00, 151133.00, 50000.00, 20000.00, 2000.00, 9416.00, 2000.00, 4000.00, 1000.00, 0.00],
        [2030, 69, 80000.00, 151133.00, 50000.00, 20000.00, 2000.00, 9416.00, 2000.00, 4000.00, 1000.00, 0.00],
        [2030, 69, 80000.00, 144461.00, 50000.00, 20000.00, 2000.00, 9416.00, 2000.00, 4000.00, 1000.00, 2.00]
    ];

    const calcColums = ["Gross Income (calculated)", "Gross Diff", "Pass/Fail", "Net Income (calculated)", "Net Diff", "Pass/Fail", "Taxes"];
    const output = [[...TestCantaxData[0], ...calcColums]];
    const EXPECTED_GROSS_COL = TestCantaxData[0].indexOf("Expected Gross Taxable Income");
    const FUTURE_AGE_COL = TestCantaxData[0].indexOf("Age");
    const NET_INCOME_COL = TestCantaxData[0].indexOf("Net Income");
    const YEAR_COL = TestCantaxData[0].indexOf("Tax Year");
    const GAINS_COL = TestCantaxData[0].indexOf("Eligible Capital Gains");
    const ELIG_DIV_COL = TestCantaxData[0].indexOf("Dividends Eligible for Enhanced Tax Credit");
    const OAS_COL = TestCantaxData[0].indexOf("OAS");
    const PENSION_COL = TestCantaxData[0].indexOf("Pension Credit Eligible Income");
    const MEDICAL_COL = TestCantaxData[0].indexOf("Medical Expenses");
    const NON_ELIG_DIV_COL = TestCantaxData[0].indexOf("Dividends (non elibible)");
    const CHARITY_COL = TestCantaxData[0].indexOf("Charitable Donations");
    const INFLATION_COL = TestCantaxData[0].indexOf("Inflation");

    let systemStatus = true;
    for (let i = 1; i < TestCantaxData.length; i++) {
        const testItem = TestCantaxData[i];
        const showDebug = i === 1;

        const grossIncome = GET_GROSS_INCOMES_V2(testItem[NET_INCOME_COL],  // Income
            testItem[FUTURE_AGE_COL],                                       // Future age
            Number(testItem[FUTURE_AGE_COL]),                               // Current age
            Number(testItem[INFLATION_COL]),                                // Inflation
            Number(testItem[YEAR_COL]),                                     // Tax year
            testItem[GAINS_COL],                                            // Capital gains
            testItem[ELIG_DIV_COL],                                         // Eligible Dividends
            testItem[OAS_COL],                                              // OAS
            testItem[PENSION_COL],                                          // Pension credit income 
            testItem[MEDICAL_COL],                                          // Medical expenses
            testItem[NON_ELIG_DIV_COL],                                     // Non eligible dividends
            testItem[CHARITY_COL],                                          // Charitable donations
            showDebug
        );

        const netIncome = GET_NET_INCOMES_V2(testItem[EXPECTED_GROSS_COL],  // Income
            testItem[FUTURE_AGE_COL],                                       // Future age
            Number(testItem[FUTURE_AGE_COL]),                               // Current age
            Number(testItem[INFLATION_COL]),                                // Inflation
            Number(testItem[YEAR_COL]),                                     // Tax year
            testItem[GAINS_COL],                                            // Capital gains
            testItem[ELIG_DIV_COL],                                         // Eligible Dividends
            testItem[OAS_COL],                                              // OAS
            testItem[PENSION_COL],                                          // Pension credit income 
            testItem[MEDICAL_COL],                                          // Medical expenses
            testItem[NON_ELIG_DIV_COL],                                     // Non eligible dividends
            testItem[CHARITY_COL],                                          // Charitable donations
            showDebug
        );

        const taxes = GET_INCOMETAX_V2(testItem[EXPECTED_GROSS_COL],  // Income
            testItem[FUTURE_AGE_COL],                                       // Future age
            Number(testItem[FUTURE_AGE_COL]),                               // Current age
            Number(testItem[INFLATION_COL]),                                // Inflation
            Number(testItem[YEAR_COL]),                                     // Tax year
            testItem[GAINS_COL],                                            // Capital gains
            testItem[ELIG_DIV_COL],                                         // Eligible Dividends
            testItem[OAS_COL],                                              // OAS
            testItem[PENSION_COL],                                          // Pension credit income 
            testItem[MEDICAL_COL],                                          // Medical expenses
            testItem[NON_ELIG_DIV_COL],                                     // Non eligible dividends
            testItem[CHARITY_COL],                                          // Charitable donations
            showDebug
        );

        const grossDiff = Math.round(grossIncome[0][0]) - Number(testItem[EXPECTED_GROSS_COL]);
        const grossStatus = Math.abs(grossDiff) <= 1.0 ? "Pass" : "** FAIL **";

        const netDiff = Math.round(netIncome[0][0]) - Number(testItem[NET_INCOME_COL]);
        const netStatus = Math.abs(netDiff) <= 1.0 ? "Pass" : "** FAIL **";
        const calculatedData = [grossIncome[0][0], grossDiff, grossStatus, netIncome[0][0], netDiff, netStatus, taxes];
        const logStr = calculatedData.join(", ");
        Logger.log(logStr);
        systemStatus = Math.abs(grossDiff) > 1 || Math.abs(netDiff) > 1 ? false : systemStatus;
        // @ts-ignore
        output.push([...testItem, ...calculatedData]);
    }
    Logger.log("-----------------------------------");
    if (systemStatus) {
        Logger.log("SYSTEM TEST -->  SUCCESS");
    }
    else {
        Logger.log("SYSTEM TEST -->  ***  F A I L E D   ***");
    }
    Logger.log("-----------------------------------");

    return output;
}

/**
 * Process a column of yearly NET INCOMES and return a column of GROSS INCOMES.
 * The GROSS INCOME is the total income from taxable sources like:  pension, RRSP, RRIF, LIF, CPP, OAS.
 * The capital gains and dividends are not include in the gross income. They used
 * to find the total tax payable.
 * The 'currentAge' uses the CURRENT TAX RATES, but future years the tax brackets are
 * adjusted by inflation.  The assumption is that if the net income stayed the same
 * over time, the gross income required to process that net amount will DROP.
 * @param {any} income - array of net income
 * @param {any} ageInFuture - array of retireee age for given net income. 
 * @param {Number} currentAge - present day age of retiree
 * @param {Number} projectedInflation - long term projected inflation rate - used to adjust TAX BRACKETS only.
 * We use the TAX RATES for the starting year, but can only guess the tax rates of future years.  The basic
 * personal exeption and tax brackets are adjusted by this inflation amount.
 * @param {Number} taxYear - tax year of present day retireee.  Used to adjust tax brackets.
 * @param {any} projectedGains - amount of assets sold each year subject to capital gains tax
 * @param {any} projectedDividends - amount of dividends received each year
 * @param {any} yearlyOAS - Old Age Security amount.  Used to determine clawback (which is counted as a tax)
 * @param {any} incomeEligibleForPensionCredit - income that qualifies as pension credit eligible income
 * @param {any} medicalExpenses
 * @param {any} nonEligibleDividends
 * @param {any} donations
 * @param {Boolean} debug -  extra Logger output
 * @returns {Number[][]} - GROSS Income from ALL taxable sources EXCLUDING capital gains and dividends, but including RRSP, CPP, OAS, ...(all taxable sources)
 * Basically, we are trying to find how much to withdraw from RRSP so RRSP = gross - (CPP + OAS + other taxable sources)
 * @customfunction
 */
function GET_GROSS_INCOMES_V2(income = 0, ageInFuture = 60, currentAge = null, projectedInflation = null, taxYear = null, projectedGains = null, projectedDividends = null, yearlyOAS = null, incomeEligibleForPensionCredit = null, medicalExpenses = null, nonEligibleDividends = null, donations = null, debug = false) {
    if (debug) Logger.log("GET_GROSS_INCOMES");

    const taxData = CanadianIncomeCalculator.validateIncomeSettings(income,
        ageInFuture,
        currentAge,
        taxYear,
        projectedInflation,
        projectedGains,
        projectedDividends,
        yearlyOAS,
        incomeEligibleForPensionCredit,
        medicalExpenses,
        nonEligibleDividends,
        donations,
        debug);

    return CanadianIncomeCalculator.getGrossIncomes(taxData);
}

/**
 * 
 * @param {any} yearlyGrossIncome 
 * @param {any} ageInFuture 
 * @param {Number} currentAge
 * @param {Number} inflation
 * @param {Number} taxYear
 * @param {any} capitalGains
 * @param {any} dividendIncome
 * @param {any} pension
 * @param {any} medicalExpenses
 * @param {any} nonEligibleDividends
 * @param {any} debug
 * @returns {Number[][]}
 * @customfunction
 */
function GET_NET_INCOMES_V2(yearlyGrossIncome = 0, ageInFuture = 60, currentAge = null, inflation = null, taxYear = null, capitalGains = null, dividendIncome = null, OAS = null, pension = null, medicalExpenses = null, nonEligibleDividends = null, donations = null, debug = false) {
    const taxData = CanadianIncomeCalculator.validateIncomeSettings(yearlyGrossIncome,
        ageInFuture,
        currentAge,
        taxYear,
        inflation,
        capitalGains,
        dividendIncome,
        OAS,
        pension,
        medicalExpenses,
        nonEligibleDividends,
        donations,
        debug);

    return CanadianIncomeCalculator.getNetIncomes(taxData);
}

/**
 * 
 * @param {any} yearlyGrossIncome 
 * @param {any} ageInFuture 
 * @param {Number} currentAge
 * @param {Number} inflation
 * @param {Number} taxYear
 * @param {any} capitalGains
 * @param {any} dividendIncome
 * @param {any} pension
 * @returns {Number}
 * @customfunction
 */
function GET_INCOMETAX_V2(yearlyGrossIncome = 0, ageInFuture = 60, currentAge = null, inflation = null, taxYear = null, capitalGains = null, dividendIncome = null, OAS = null, pension = null, medicalExpenses = null, nonEligibleDividends = null, donations = null, debug = true) {
    const taxData = CanadianIncomeCalculator.validateIncomeSettings(yearlyGrossIncome, ageInFuture, currentAge, taxYear, inflation, capitalGains, dividendIncome, OAS, pension, medicalExpenses, nonEligibleDividends, donations, debug);
    const taxItem = taxData.getTaxItem(0);
    const taxCalc = new CanadianIncomeTax(taxItem.year, taxItem.inflation);
    const taxes = taxCalc.findTotalTax(taxItem, yearlyGrossIncome);
    CanadianIncomeCalculator.logTaxSummary(taxItem);

    return taxes;
}

/** @typedef BracketObject
  * @property {Number[]} brackets
  * @property {Number[]} rates
  * @property {Number[]} base
  */

/**
 * @classdesc - Federal tax rates for 2024.  Add any required functions to this base class.
 * NOTE:  Add each tax year object in order to the constant FEDERAL_TAX_YEARS to FederalTaxes{} class.
 */
class FederalTaxRates2024 {
    constructor() {
        this.taxYear = FederalTaxRates2024.year();
        this._dividendGrossUp = 0.38;
        this.eligibleDividendTaxCreditRate = 0.150198;
        this._nonEligibleDividendGrossUp = 0.15;
        this.nonEligibleDividendTaxCreditRate = 0.090301;
        this.basicPersonAmount = 15705.00;
        this.additionalBasicPersonalAmount = 1549;
        this.additionalBpaThreshold = 173205;
        this.bpaReductionPercent = 0.021061;
        this.ageCreditAge = 65;
        this.ageAmount = 8790.00;
        this.ageThreshold = 44325.00;
        this.ageExcessPercent = 0.15;
        this.maxIncomePensionTaxCredit = 2000;
        this.OASclawbackThreshold = 90997;
        this.OASclawbackRate = 0.15;
        this.medicalExpenseThreshold = 2759;
        this.medicalExpenseThresholdPercent = 0.03;

        /**
         * @type {BracketObject}
         */
        this.capitalGainsInfo = {
            brackets: [0, 250000],
            rates: [0.5, 0.666666],
            base: [0, 125000]
        };

        /**
         * @type {BracketObject}
         */
        this.taxBracketInfo = {
            brackets: [0, 55867, 111733, 173205, 246752],
            rates: [0.15, 0.205, 0.26, 0.29, 0.33],
            //  BASE[i] = BASE[i-1] + RATE[i-1] * (BRACKET[i]- BRACKET[i-1])
            //  eg:   BASE[2] = 8380.05 + .205 * (111733-55867) =  
            base: [0, 8380.05, 19832.58, 35815.30, 57143.93]
        };

        /**
         * @type {BracketObject}
         */
        this.charityBrackets = {
            brackets: [0, 200],
            rates: [0.15, 0.29],
            base: [0, 30]
        }
    }

    get dividendGrossUp() {
        return this._dividendGrossUp + 1;
    }

    get nonEligibleDividendGrossUp() {
        return this._nonEligibleDividendGrossUp + 1;
    }

    /**
     * Object can be queried for tax year supported.
     * @returns {Number}
     */
    static year() {
        return 2024;
    }
}

/**
 * @classdesc - Federal tax rates for 2025
 */
class FederalTaxRates2025 {
    constructor() {
        this.taxYear = FederalTaxRates2025.year();
        this._dividendGrossUp = 0.38;
        this.eligibleDividendTaxCreditRate = 0.150198;
        this._nonEligibleDividendGrossUp = 0.15;
        this.nonEligibleDividendTaxCreditRate = 0.090301;
        this.basicPersonAmount = 16129.00;
        this.additionalBasicPersonalAmount = 1590;
        this.additionalBpaThreshold = 177882;
        this.bpaReductionPercent = 0.021061;
        this.ageCreditAge = 65;
        this.ageAmount = 9028.00;
        this.ageThreshold = 45522.00;
        this.ageExcessPercent = 0.15;
        this.maxIncomePensionTaxCredit = 2000;
        this.OASclawbackThreshold = 90997;
        this.OASclawbackRate = 0.15;
        this.medicalExpenseThreshold = 2833;
        this.medicalExpenseThresholdPercent = 0.03;

        /**
         * @type {BracketObject}
         */
        this.capitalGainsInfo = {
            brackets: [0, 250000],
            rates: [0.5, 0.666666],
            base: [0, 125000]
        };

        /**
         * @type {BracketObject}
         */
        this.taxBracketInfo = {
            brackets: [0, 57375, 114750, 177882, 253414],
            rates: [0.15, 0.205, 0.26, 0.29, 0.33],
            base: [0, 8606.25, 20368.13, 36782.45, 58686.73]
        };

    }

    /**
     * Object can be queried for tax year supported.
     * @returns {Number}
     */
    static year() {
        return 2025;
    }
}

/**
 * @classdesc - All relevant Ontario tax rates for indicated tax year.
 * Add each new year of tax rates to ONTARIO_TAX_YEARS below
 */
class OntarioTaxRates2024 {
    constructor() {

        this.taxYear = OntarioTaxRates2024.year();
        this.provEligibleDividendTaxCreditRate = 0.10;
        this.provNonEligibleDividendTaxCreditRate = 0.029863;
        this.ontBasicPersonAmount = 12399.00;
        this.ageCreditAge = 65;
        this.ontAgeAmount = 6054.00;
        this.ontAgeThreshold = 45068.00;
        this.ageExcessPercent = 0.15;
        this.provMaxIncomePensionTaxCredit = 1714.00;
        this.OASclawbackThreshold = 90997;
        this.OASclawbackRate = 0.15;
        this.medicalExpenseThreshold = 2806;
        this.medicalExpenseThresholdPercent = 0.03;

        /**
         * @type {BracketObject}
         */
        this.ontHealthBracketInfo = {
            brackets: [0, 25000, 38500, 48600, 72600, 200600],
            base: [0, 300, 450, 600, 750, 900],
            rates: [0, 0, 0, 0, 0, 0]
        };

        /**
         * @type {BracketObject}
         */
        this.ontSurtaxBracketInfo = {
            brackets: [0, 5554, 7108],
            rates: [0, 0.2, 0.56],
            base: [0, 0, 310.8],
        };

        /**
         * @type {BracketObject}
         */
        this.ontTaxBracketInfo = {
            brackets: [0, 51446, 102894, 150000, 220000],
            rates: [0.0505, 0.0915, 0.1116, 0.1216, 0.1316],
            base: [0, 2598.023, 7305.515, 12562.54, 21074.54]
        };

        /**
        * @type {BracketObject}
        */
        this.charityBrackets = {
            brackets: [0, 200],
            rates: [0.0505, 0.1116],
            base: [0, 10.1]
        }
    }

    /**
     * Object can be queried for tax year supported.
     * @returns {Number}
     */
    static year() {
        return 2024;
    }
}

/**
 * @classdesc - All relevant Ontario tax rates for indicated tax year.
 */
class OntarioTaxRates2025 {
    constructor() {

        this.taxYear = OntarioTaxRates2025.year();  // Change static when copy/pasta to a new year
        this.provEligibleDividendTaxCreditRate = 0.10;
        this.provNonEligibleDividendTaxCreditRate = 0.029863;
        this.ontBasicPersonAmount = 12747.00;
        this.ageCreditAge = 65;
        this.ontAgeAmount = 6223.00;
        this.ontAgeThreshold = 46330.00;
        this.ageExcessPercent = 0.15;
        this.provMaxIncomePensionTaxCredit = 1762.00;
        this.OASclawbackThreshold = 90997;
        this.OASclawbackRate = 0.15;
        this.medicalExpenseThreshold = 2885;
        this.medicalExpenseThresholdPercent = 0.03;

        /**
         * @type {BracketObject}
         */
        this.ontHealthBracketInfo = {
            brackets: [0, 25000, 38500, 48600, 72600, 200600],
            base: [0, 300, 450, 600, 750, 900],
            rates: [0, 0, 0, 0, 0, 0]
        };

        /**
         * @type {BracketObject}
         */
        this.ontSurtaxBracketInfo = {
            brackets: [0, 5710, 7307],
            rates: [0, 0.2, 0.56],
            base: [0, 0, 319.4],
        };

        /**
        * @type {BracketObject}
        */
        this.ontTaxBracketInfo = {
            brackets: [0, 52886, 105775, 150000, 220000],
            rates: [0.0505, 0.0915, 0.1116, 0.1216, 0.1316],
            base: [0, 2670.74, 7510.08, 12445.59, 20957.59]
        };
    }

    /**
     * Object can be queried for tax year supported.
     * @returns {Number}
     */
    static year() {
        return 2025;        //  Update on new tax year
    }
}

class FederalTaxes extends FederalTaxRates2024 {
    //  Basic personal amounts, tax brackets adjusted for inflation in future years.
    constructor(taxYear, inflation) {
        super();
        this.loadYear(taxYear);
        // @ts-ignore
        const yearsToInflate = taxYear - this.taxYear;

        if (yearsToInflate === 0 || inflation === 0) {
            return;
        }

        this.taxYear = taxYear;
        this.basicPersonAmount = CanadianTaxUtils.futureValue(this.basicPersonAmount, 1, inflation, yearsToInflate);
        this.additionalBasicPersonalAmount = CanadianTaxUtils.futureValue(this.additionalBasicPersonalAmount, 1, inflation, yearsToInflate);
        this.additionalBpaThreshold = CanadianTaxUtils.futureValue(this.additionalBpaThreshold, 1, inflation, yearsToInflate);
        this.ageAmount = CanadianTaxUtils.futureValue(this.ageAmount, 1, inflation, yearsToInflate);
        this.ageThreshold = CanadianTaxUtils.futureValue(this.ageThreshold, 1, inflation, yearsToInflate);
        this.OASclawbackThreshold = CanadianTaxUtils.futureValue(this.OASclawbackThreshold, 1, inflation, yearsToInflate);
        this.taxBracketInfo = CanadianTaxUtils.inflateBracket(this.taxBracketInfo, yearsToInflate, inflation);
        this.medicalExpenseThreshold = CanadianTaxUtils.futureValue(this.medicalExpenseThreshold, 1, inflation, yearsToInflate);
    }

    /**
     * Loads appropriate tax year data
     * @param {Number} year 
     */
    loadYear(year) {
        //  Add each year of tax rates.
        const FEDERAL_TAX_YEARS =
            [
                FederalTaxRates2024,
                FederalTaxRates2025
            ];

        let obj = FEDERAL_TAX_YEARS[FEDERAL_TAX_YEARS.length - 1];
        for (const fedTaxObject of FEDERAL_TAX_YEARS) {
            if (year <= fedTaxObject.year()) {
                obj = fedTaxObject;
                break;
            }
        }

        Object.assign(this, new obj());
    }
}

class OntarioTaxes extends OntarioTaxRates2024 {
    //  Basic personal amounts, tax brackets adjusted for inflation in future years.
    constructor(taxYear, inflation) {
        super();
        this.loadYear(taxYear);
        const yearsToInflate = taxYear - this.taxYear;

        if (yearsToInflate === 0 || inflation === 0) {
            return;
        }

        this.taxYear = taxYear;
        this.ontBasicPersonAmount = CanadianTaxUtils.futureValue(this.ontBasicPersonAmount, 1, inflation, yearsToInflate);
        this.ontAgeAmount = CanadianTaxUtils.futureValue(this.ontAgeAmount, 1, inflation, yearsToInflate);
        this.ontAgeThreshold = CanadianTaxUtils.futureValue(this.ontAgeThreshold, 1, inflation, yearsToInflate);
        this.OASclawbackThreshold = CanadianTaxUtils.futureValue(this.OASclawbackThreshold, 1, inflation, yearsToInflate);
        this.ontTaxBracketInfo = CanadianTaxUtils.inflateBracket(this.ontTaxBracketInfo, yearsToInflate, inflation);
        this.ontSurtaxBracketInfo = CanadianTaxUtils.inflateBracket(this.ontSurtaxBracketInfo, yearsToInflate, inflation);
        this.medicalExpenseThreshold = CanadianTaxUtils.futureValue(this.medicalExpenseThreshold, 1, inflation, yearsToInflate);
    }

    /**
     * Loads appropriate tax year data
     * @param {Number} year 
     */
    loadYear(year) {
        const ONTARIO_TAX_YEARS =
            [
                OntarioTaxRates2024,
                OntarioTaxRates2025
            ];

        let obj = ONTARIO_TAX_YEARS[ONTARIO_TAX_YEARS.length - 1];

        for (const fedTaxObject of ONTARIO_TAX_YEARS) {
            if (year <= fedTaxObject.year()) {
                obj = fedTaxObject;
                break;
            }
        }

        Object.assign(this, new obj());
    }
}

/**
 * @typedef {Object} TaxData
 * @property {any} incomes - array of net income
 * @property {any} ageInFuture - array of retireee age for given net income. (used to calculated total inflation adjustment)
 * @property {Number} currentAge - present day age of retiree
 * @property {Number} year - The currentAge of retiree in this year. (this is all used for inflating tax brackets)
 * @property {Number} inflation - long term projected inflation rate.
 * @property {any} capitalGains - amount of assets sold each year subject to capital gains tax
 * @property {any} eligibleDividends - amount of dividends received each year
 * @property {any} nonEligibleDividends
 * @property {any} OAS - Old Age Security amount.  Used to determine clawback (which is counted as a tax)
 * @property {any} incomeEligibleForPensionCredit
 * @property {any} charitableDonations
 * @property {Number} oasClawback
 * @property {Number} totalIncomeForTaxPurposes
 * @property {Number} netIncomeForTaxPurposes
 * @property {Number} federalTaxBeforeCredits
 * @property {Number} provTaxBeforeCredits
 * @property {Number} provNetTaxBeforeDividendTaxCredit
 * @property {Number} ontSurtax
 * @property {Number} provEligibleDividendCredit
 * @property {Number} provNonEligibleDividendCredit
 * @property {Number} AdjustedBPA
 * @property {Number} provAdjustedBPA
 * @property {Number} totalNonRefundableFedTaxCredits
 * @property {Number} totalNonRefundableProvTaxCredits
 * @property {Number} totalFedNonRefundableTaxCreditsBeforeDividendTaxCredits
 * @property {Number} totalProvNonRefundableTaxCreditsBeforeDividendTaxCredits
 * @property {Number} netFederalTax
 * @property {Number} netProvincialTax
 * @property {Number} subtotalFederalAndProvIncomeTaxes
 * @property {Number} totalTaxesClawbacksAndCPP
 * @property {Number} federalAgeCredit
 * @property {Number} fedEligiblePensionIncome
 * @property {Number} provincialEligiblePensionIncome
 * @property {Number} provAgeCredit
 * @property {Number} ontHealthPremium
 * @property {Number} grossedUpEligibleDividends
 * @property {Number} grossedUpNonEligibleDividends
 * @property {Number} taxableCapitalGains
 * @property {Number} medicalExpenses
 * @property {Number} fedMedicalExpenseCreditAmount
 * @property {Number} provincialMedicalExpenseCredit
 * @property {Number} fedDonationsTaxCredit
 * @property {Number} provDonationsTaxCredit
 * @property {Boolean} debug
 * @property {function} getTaxItem
 */



class CanadianIncomeCalculator {
    /**
     * Find GROSS INCOME from taxable sources.
    * @param {TaxData} taxData - Income parameters.
    * @returns {Number[][]} - Income from taxable sources EXCLUDING capital gains and dividends
    */
    static getGrossIncomes(taxData) {
        const taxCalculator = new CanadianIncomeTax(taxData.year, taxData.inflation);

        const data = [];
        for (let i = 0; i < taxData.incomes.length; i++) {
            const taxItem = taxData.getTaxItem(i);
            const gross = taxCalculator.getGrossIncome(taxItem);
            CanadianIncomeCalculator.logTaxSummary(taxItem);

            data.push([gross]);
        }

        return data;
    }

    /**
     * 
     * @param {TaxData} taxData - Income parameters
     * @returns {Number[][]}
     * @customfunction
     */
    static getNetIncomes(taxData) {
        const taxCalculator = new CanadianIncomeTax(taxData.year, taxData.inflation);
        const netIncomes = [];

        for (let i = 0; i < taxData.incomes.length; i++) {
            const taxItem = taxData.getTaxItem(i);
            const net = taxData.incomes[i] - taxCalculator.findTotalTax(taxItem, taxData.incomes[i]);
            CanadianIncomeCalculator.logTaxSummary(taxItem);

            netIncomes.push([net]);
        }

        return netIncomes;
    }

    /**
     * 
     * @param {any} yearlyIncome - All settings must equal array length of yearlyIncome
     * @param {any} ageOfRetiree 
     * @param {any} age 
     * @param {any} taxYear
     * @param {any} inflationPercent 
     * @param {any} gains 
     * @param {any} dividends 
     * @param {any} yearlyOAS
     * @param {any} pensionIncome
     * @param {any} medicalCosts
     * @param {any} nonEligDividends
     * @param {any} donations
     * @param {Boolean} debug
     * @returns {TaxData}
     */
    static validateIncomeSettings(yearlyIncome, ageOfRetiree, age, taxYear, inflationPercent, gains, dividends, yearlyOAS, pensionIncome, medicalCosts, nonEligDividends, donations, debug) {
        const items = Array.isArray(yearlyIncome) ? yearlyIncome.length : 1;
        const inflation = inflationPercent === null ? 0 : Number(inflationPercent);

        const incomes = CanadianIncomeCalculator.prepTaxInput(items, inflation, yearlyIncome);
        const ageInFuture = CanadianIncomeCalculator.prepTaxInput(items, null, ageOfRetiree);
        const capitalGains = CanadianIncomeCalculator.prepTaxInput(items, inflation, gains);
        const eligibleDividends = CanadianIncomeCalculator.prepTaxInput(items, inflation, dividends);
        const nonEligibleDividends = CanadianIncomeCalculator.prepTaxInput(items, inflation, nonEligDividends);
        const OAS = CanadianIncomeCalculator.prepTaxInput(items, inflation, yearlyOAS);
        const incomeEligibleForPensionCredit = CanadianIncomeCalculator.prepTaxInput(items, inflation, pensionIncome);
        const medicalExpenses = CanadianIncomeCalculator.prepTaxInput(items, inflation, medicalCosts);
        const charitableDonations = CanadianIncomeCalculator.prepTaxInput(items, inflation, donations);
        const guessOfCurrentAge = Array.isArray(ageInFuture) ? ageInFuture[0] : ageInFuture;
        const currentAge = age === null ? guessOfCurrentAge : Number(age);
        const year = taxYear === null || taxYear === '' || typeof taxYear === 'undefined' ? new Date().getFullYear() : Number(taxYear);

        const taxData = { incomes, ageInFuture, currentAge, year, inflation, capitalGains, eligibleDividends, OAS, incomeEligibleForPensionCredit, medicalExpenses, nonEligibleDividends, charitableDonations, debug };

        /**
         * 
         * @param {Number} i 
         * @returns {TaxData}
         */
        taxData.getTaxItem = function (i) {
            // @ts-ignore
            return {
                incomes: this.incomes[i],
                ageInFuture: this.ageInFuture[i],
                currentAge: this.currentAge,
                year: this.year,
                inflation: this.inflation,
                capitalGains: this.capitalGains[i],
                eligibleDividends: this.eligibleDividends[i],
                nonEligibleDividends: this.nonEligibleDividends[i],
                OAS: this.OAS[i],
                incomeEligibleForPensionCredit: this.incomeEligibleForPensionCredit[i],
                medicalExpenses: this.medicalExpenses[i],
                charitableDonations: this.charitableDonations[i],
                debug: this.debug
            };
        }

        // @ts-ignore
        return taxData;
    }

    /**
     * If 'val' is not an array and 'items' > 1, val will be replicated for 'items' length and adjusted
     * for 'inflation'
     * @param {any} items
     * @param {Number} inflation - rate (2% entered as 2). null - increment by one instead of inflate.
     * @param {any} val 
     * @returns {Number[]}
     */
    static prepTaxInput(items, inflation, val) {
        let taxProperty = [];
        if (Array.isArray(val)) {
            taxProperty = CanadianTaxUtils.convertRowsToSingleArray(val).map(inc => Number(inc));
        }
        else {
            let startVal = val === null ? 0 : Number(val);

            for (let i = 0; i < items; i++) {
                taxProperty.push(startVal);

                startVal = inflation === null ? startVal + 1 : startVal * (1 + inflation / 100);
            }
        }

        return taxProperty;
    }

    /**
     * 
     * @param {TaxData} taxData 
     */
    static logTaxSummary(taxData) {
        if (!taxData.debug) {
            return;
        }
        Logger.log("============  T A X   S U M M A R Y  ============");
        Logger.log(`Grossed Up Canadian Dividends. Eligible = ${taxData.grossedUpEligibleDividends}. Non Eligible = ${taxData.grossedUpNonEligibleDividends}`)
        Logger.log(`Taxable Capital Gains = ${taxData.taxableCapitalGains}`)
        Logger.log(`Total income for tax purposes - line 15000 = ${taxData.totalIncomeForTaxPurposes}`);
        Logger.log(`OAS clawback = ${taxData.oasClawback}`);
        Logger.log(`Net income for tax purposes - Line 23600 = ${taxData.netIncomeForTaxPurposes}`);
        Logger.log(`Tax before non-refundable tax credits (A) Line 40400. Fed = ${taxData.federalTaxBeforeCredits}. Prov = ${taxData.provTaxBeforeCredits}`);
        Logger.log(`Basic personal amount Line 30000.  Fed = ${taxData.AdjustedBPA}, Prov = ${taxData.provAdjustedBPA}`);
        Logger.log(`Age amount (reduced above certain income levels) Line 30100. Fed = ${taxData.federalAgeCredit}.  Prov = ${taxData.provAgeCredit}`)
        Logger.log(`Pension amount Line 31400. Fed = ${taxData.fedEligiblePensionIncome}. Prov = ${taxData.provincialEligiblePensionIncome}`);
        Logger.log(`Medical expenses Line 33099.  Fed = ${taxData.fedMedicalExpenseCreditAmount}.  Prov = ${taxData.provincialMedicalExpenseCredit}`);
        Logger.log(`Subtotal for non-refundable tax credits (B) Line 33500.  Fed = ${taxData.totalNonRefundableFedTaxCredits}, Prov = ${taxData.totalNonRefundableProvTaxCredits}`);
        Logger.log(`Donations tax credit Schedule 9 Line 34900. Fed = ${taxData.fedDonationsTaxCredit}. Prov = ${taxData.provDonationsTaxCredit}`);
        Logger.log(`Total non-refundable tax credits before dividend tax credits Line 35000.  Fed = ${taxData.totalFedNonRefundableTaxCreditsBeforeDividendTaxCredits}.  Prov=${taxData.totalProvNonRefundableTaxCreditsBeforeDividendTaxCredits}`);
        Logger.log(`Fed Line 42000 Net federal tax = ${taxData.netFederalTax}`);
        Logger.log(`Tax subtotal before dividend tax credits  = ${Math.round(taxData.provNetTaxBeforeDividendTaxCredit)}`);
        Logger.log(`Ont Surtax = ${Math.round(taxData.ontSurtax)}. Prov Elig. Div. Credit = ${taxData.provEligibleDividendCredit}. Prov NonElig. Div. Credit = ${taxData.provNonEligibleDividendCredit}`);
        Logger.log(`Ontario health premium = ${taxData.ontHealthPremium}`);
        Logger.log(`Provincial or territorial tax (zero if negative) Line 42800 = ${taxData.netProvincialTax}`);
        Logger.log(`Subtotal federal and ON income taxes = ${taxData.subtotalFederalAndProvIncomeTaxes}`);
        Logger.log(`Total taxes, clawbacks & CPP (refundable if negative) = ${taxData.totalTaxesClawbacksAndCPP}`);
        Logger.log("============  T A X   S U M M A R Y   E N D  ============");
    }
}

class CanadianIncomeTax {
    /**
     * 
     * @param {Number} taxYear 
     * @param {Number} inflation 
     */
    constructor(taxYear, inflation) {
        this.fedTaxCalculations = new FederalTaxCalculations(taxYear, inflation);
        this.provTaxCalculations = new ProvincialTaxCalculations(taxYear, inflation);
    }

    /**
     * 
     * @param {TaxData} taxData 
     */
    adjustTaxBrackets(taxData) {
        this.fedTaxCalculations.adjustTaxBrackets(taxData);
        this.provTaxCalculations.adjustTaxBrackets(taxData);
    }

    /**
     *  Finds the total tax owing for a given gross income and age.
     * @param {TaxData} taxData
     * @param {number} grossIncome 
     * @returns {number}
     */
    findTotalTax(taxData, grossIncome) {
        if (grossIncome <= 0.01) {
            grossIncome = 0;
        }

        this.adjustTaxBrackets(taxData);

        //  Some FEDERAL values are set in calculating federal tax, that are then used in provincial tax.
        //  SO - FED must be called first before PROV (sorry mr. immuteability)
        const fedTax = this.fedTaxCalculations.getNetFederalTax(taxData, grossIncome);
        const provTax = this.provTaxCalculations.getNetProvincialTax(taxData, grossIncome);
        taxData.subtotalFederalAndProvIncomeTaxes = fedTax + provTax;
        taxData.totalTaxesClawbacksAndCPP = taxData.subtotalFederalAndProvIncomeTaxes + taxData.oasClawback;

        return taxData.totalTaxesClawbacksAndCPP;
    }

    /**
     * Finds the taxable income to withdraw to receive the specified net income.
     * @param {TaxData} taxData
     * @returns {Number}
     */
    getGrossIncome(taxData) {
        //  Working from last known Canadian/Provincial tax rates, the brackets are adjusted for time/inflation.
        this.adjustTaxBrackets(taxData);

        const fedGrossedUpEligibleDividends = this.fedTaxCalculations.getGrossedUpEligibleDividends(taxData.eligibleDividends);
        const fedGrossedUpNonEligibleDividends = this.fedTaxCalculations.getGrossedUpNonEligibleDividends(taxData.nonEligibleDividends);
        const taxableCapitalGains = this.fedTaxCalculations.getTaxableCapitalGains(taxData.capitalGains);
        const grossEstimate = taxData.incomes + fedGrossedUpEligibleDividends + fedGrossedUpNonEligibleDividends + taxableCapitalGains;
        const marginalFedRate = this.fedTaxCalculations.getMarginalTaxRate(grossEstimate);
        const marginalOntRate = this.provTaxCalculations.getMarginalTaxRate(grossEstimate);
        const ontHealthPremium = this.provTaxCalculations.getOntHealthPremium(grossEstimate);

        //  Estimate of needed GROSS to cover taxes of net expected income.
        let workingGrossIncome = taxData.incomes / (1 - (marginalFedRate + marginalOntRate)) + taxableCapitalGains + ontHealthPremium + taxData.eligibleDividends;

        let totalTax = this.findTotalTax(taxData, workingGrossIncome);

        let failSafe = 0;   //  It's possible some set of inputs will NEVER approach ZERO, so avoid an infinite loop.
        let diff = taxData.incomes - (workingGrossIncome - totalTax);
        while (Math.abs(diff) > 0.25 && failSafe < 999) {
            //  Next guess at gross income      
            const avgTaxRate = totalTax / (workingGrossIncome + fedGrossedUpEligibleDividends + fedGrossedUpNonEligibleDividends + taxableCapitalGains);
            const incomeDelta = diff / (1 - avgTaxRate);
            if (taxData.debug) Logger.log(`totalTax=${totalTax}. avgTax=${avgTaxRate}.  Delta=${incomeDelta}`);
            workingGrossIncome = workingGrossIncome + incomeDelta;

            totalTax = this.findTotalTax(taxData, workingGrossIncome);

            if (workingGrossIncome <= 0.1) {
                workingGrossIncome = totalTax;
                break;
            }

            diff = taxData.incomes - (workingGrossIncome - totalTax);
            failSafe++;
            if (taxData.debug) Logger.log(`Net=${taxData.incomes}. Diff=${diff}. Working Gross=${workingGrossIncome}. Total Tax=${totalTax}. Failsafe=${failSafe}`);
        }

        return workingGrossIncome;
    }
}

/**
 * @classdesc Tax calculations for a Province of Canada
 */
class ProvincialTaxCalculations {
    /**
     * 
     * @param {Number} taxYear 
     * @param {Number} inflation 
     */
    constructor(taxYear, inflation) {
        this.provTaxRates = new OntarioTaxes(taxYear, inflation);
    }

    /**
     * 
     * @param {TaxData} taxData 
     */
    adjustTaxBrackets(taxData) {
        const taxableYear = taxData.ageInFuture - taxData.currentAge + taxData.year;
        if (taxableYear === this.provTaxRates.taxYear) {
            return;
        }

        this.provTaxRates = new OntarioTaxes(taxableYear, taxData.inflation);
    }

    /**
     * @param {TaxData} taxData
     * @param {Number} grossIncome 
     * @returns {Number}
     */
    getNetProvincialTax(taxData, grossIncome) {
        taxData.ontHealthPremium = CanadianTaxUtils.calculateTaxInBracket(this.provTaxRates.ontHealthBracketInfo, taxData.netIncomeForTaxPurposes)
        taxData.provTaxBeforeCredits = CanadianTaxUtils.calculateTaxInBracket(this.provTaxRates.ontTaxBracketInfo, taxData.netIncomeForTaxPurposes);
        taxData.totalProvNonRefundableTaxCreditsBeforeDividendTaxCredits = this.getProvincialTaxCredits(taxData, grossIncome + taxData.taxableCapitalGains)
        taxData.provNetTaxBeforeDividendTaxCredit = taxData.provTaxBeforeCredits - taxData.totalProvNonRefundableTaxCreditsBeforeDividendTaxCredits;
        taxData.ontSurtax = CanadianTaxUtils.calculateTaxInBracket(this.provTaxRates.ontSurtaxBracketInfo, taxData.provNetTaxBeforeDividendTaxCredit);
        taxData.provEligibleDividendCredit = taxData.grossedUpEligibleDividends * this.provTaxRates.provEligibleDividendTaxCreditRate;
        taxData.provNonEligibleDividendCredit = taxData.grossedUpNonEligibleDividends * this.provTaxRates.provNonEligibleDividendTaxCreditRate;

        taxData.netProvincialTax = taxData.provNetTaxBeforeDividendTaxCredit + taxData.ontSurtax - (taxData.provEligibleDividendCredit + taxData.provNonEligibleDividendCredit);
        if (taxData.netProvincialTax < 0) {
            taxData.netProvincialTax = 0;
        }
        taxData.netProvincialTax += taxData.ontHealthPremium;

        return taxData.netProvincialTax;
    }

    /**
     * @param {TaxData} taxData
     * @param {Number} grossIncome 
     * @returns {Number}
     */
    getProvincialTaxCredits(taxData, grossIncome) {
        taxData.provincialEligiblePensionIncome = taxData.incomeEligibleForPensionCredit > this.provTaxRates.provMaxIncomePensionTaxCredit
            ? this.provTaxRates.provMaxIncomePensionTaxCredit
            : taxData.incomeEligibleForPensionCredit;

        taxData.provAgeCredit = this.getAgeCredit(taxData.ageInFuture, grossIncome + taxData.grossedUpEligibleDividends, this.provTaxRates.ontAgeAmount, this.provTaxRates.ontAgeThreshold, this.provTaxRates.ageExcessPercent);
        taxData.provincialMedicalExpenseCredit = this.getProvincialMedicalExpenseCredit(taxData);
        taxData.provAdjustedBPA = this.getProvBasicPersonalAmount(taxData);
        taxData.totalNonRefundableProvTaxCredits = taxData.provAdjustedBPA + taxData.provAgeCredit + taxData.provincialEligiblePensionIncome + taxData.provincialMedicalExpenseCredit;

        const lowestTaxRate = this.getMarginalTaxRate(0);
        taxData.provDonationsTaxCredit = CanadianTaxUtils.calculateTaxInBracket(this.provTaxRates.charityBrackets, taxData.charitableDonations);

        const provincialTaxCredits = taxData.totalNonRefundableProvTaxCredits * lowestTaxRate + taxData.provDonationsTaxCredit;

        if (provincialTaxCredits > taxData.provTaxBeforeCredits) {
            return taxData.provTaxBeforeCredits;
        }

        return provincialTaxCredits;
    }

    /**
     * 
     * @param {TaxData} taxData 
     * @returns 
     */
    getProvBasicPersonalAmount(taxData) {
        return this.provTaxRates.ontBasicPersonAmount;
    }

    /**
     * 
     * @param {Number} gross 
     * @returns {Number}
     */
    getMarginalTaxRate(gross) {
        return CanadianTaxUtils.getMarginalTaxRate(this.provTaxRates.ontTaxBracketInfo, gross);
    }

    /**
     * 
     * @param {Number} gross 
     * @returns {Number}
     */
    getOntHealthPremium(gross) {
        return CanadianTaxUtils.calculateTaxInBracket(this.provTaxRates.ontHealthBracketInfo, gross);
    }

    /**
     * 
     * @param {Number} age 
     * @param {Number} grossIncome 
     * @param {Number} ageAmount 
     * @param {Number} thresholdAmount 
     * @param {Number} deductPercent 
     * @returns {Number}
     */
    getAgeCredit(age, grossIncome, ageAmount, thresholdAmount, deductPercent) {
        if (age < this.provTaxRates.ageCreditAge) {
            return 0.0;
        }
        if (grossIncome < thresholdAmount) {
            return ageAmount;
        }

        const Excess = grossIncome - thresholdAmount;
        const deduct = Excess * deductPercent;
        let ageCredit = ageAmount - deduct;
        if (ageCredit < 0) {
            ageCredit = 0;
        }

        return ageCredit;
    }

    /**
     * 
     * @param {TaxData} taxData 
     * @returns {Number}
     */
    getProvincialMedicalExpenseCredit(taxData) {
        let thresholdValue = taxData.netIncomeForTaxPurposes * this.provTaxRates.medicalExpenseThresholdPercent;
        thresholdValue = this.provTaxRates.medicalExpenseThreshold < thresholdValue
            ? this.provTaxRates.medicalExpenseThreshold
            : thresholdValue;

        const medicalExpenseCreditAmount = taxData.medicalExpenses - thresholdValue;

        return medicalExpenseCreditAmount <= 0 ? 0 : medicalExpenseCreditAmount;
    }

}

/**
 * @classdesc Canadian Federal Tax calculations. 
 */
class FederalTaxCalculations {
    /**
     * 
     * @param {Number} taxYear 
     * @param {Number} inflation 
     */
    constructor(taxYear, inflation) {
        this.fedTaxRates = new FederalTaxes(taxYear, inflation);
    }

    /**
     * 
     * @param {TaxData} taxData 
     */
    adjustTaxBrackets(taxData) {
        const taxableYear = taxData.ageInFuture - taxData.currentAge + taxData.year;
        if (taxableYear === this.fedTaxRates.taxYear) {
            return;
        }

        this.fedTaxRates = new FederalTaxes(taxableYear, taxData.inflation);
    }

    /**
     * @param {TaxData} taxData
     * @param {Number} grossIncome 
     * @returns {Number}
     */
    getNetFederalTax(taxData, grossIncome) {
        taxData.grossedUpEligibleDividends = this.getGrossedUpEligibleDividends(taxData.eligibleDividends);
        taxData.grossedUpNonEligibleDividends = this.getGrossedUpNonEligibleDividends(taxData.nonEligibleDividends);
        taxData.taxableCapitalGains = this.getTaxableCapitalGains(taxData.capitalGains);
        taxData.totalIncomeForTaxPurposes = grossIncome + taxData.grossedUpEligibleDividends + taxData.taxableCapitalGains + taxData.grossedUpNonEligibleDividends;
        taxData.oasClawback = this.getOASclawback(taxData.totalIncomeForTaxPurposes, taxData.OAS);
        taxData.netIncomeForTaxPurposes = taxData.totalIncomeForTaxPurposes - taxData.oasClawback;
        taxData.federalTaxBeforeCredits = CanadianTaxUtils.calculateTaxInBracket(this.fedTaxRates.taxBracketInfo, taxData.netIncomeForTaxPurposes);
        const fedTaxCredits = this.getFederalTaxCredits(taxData, grossIncome + taxData.taxableCapitalGains);
        taxData.netFederalTax = taxData.federalTaxBeforeCredits - fedTaxCredits;

        return taxData.netFederalTax;
    }

    /**
     * 
     * @param {Number} dividends 
     * @returns {Number}
     */
    getGrossedUpEligibleDividends(dividends) {
        return this.fedTaxRates.dividendGrossUp * dividends;
    }

    /**
     * 
     * @param {Number} dividends 
     * @returns {Number}
     */
    getGrossedUpNonEligibleDividends(dividends) {
        return this.fedTaxRates.nonEligibleDividendGrossUp * dividends;
    }

    /**
     * 
     * @param {Number} gains 
     * @returns {Number}
     */
    getTaxableCapitalGains(gains) {
        return CanadianTaxUtils.calculateTaxInBracket(this.fedTaxRates.capitalGainsInfo, gains);
    }

    /**
     * 
     * @param {Number} gross 
     * @returns {Number}
     */
    getMarginalTaxRate(gross) {
        return CanadianTaxUtils.getMarginalTaxRate(this.fedTaxRates.taxBracketInfo, gross);
    }

    /**
     * 
     * @param {Number} income 
     * @param {Number} OAS
     * @returns {Number} 
     */
    getOASclawback(income, OAS) {
        let clawback = 0;

        if (income > this.fedTaxRates.OASclawbackThreshold) {
            clawback = (income - this.fedTaxRates.OASclawbackThreshold) * this.fedTaxRates.OASclawbackRate;
            clawback = clawback >= OAS ? OAS : clawback;
        }
        return clawback;
    }

    /**
     * @param {TaxData} taxData
     * @param {Number} grossIncome 
     * @returns {Number}
     */
    getFederalTaxCredits(taxData, grossIncome) {
        taxData.fedEligiblePensionIncome = taxData.incomeEligibleForPensionCredit > this.fedTaxRates.maxIncomePensionTaxCredit
            ? this.fedTaxRates.maxIncomePensionTaxCredit
            : taxData.incomeEligibleForPensionCredit;

        taxData.federalAgeCredit = this.getAgeCredit(taxData.ageInFuture, grossIncome + taxData.grossedUpEligibleDividends, this.fedTaxRates.ageAmount, this.fedTaxRates.ageThreshold, this.fedTaxRates.ageExcessPercent);
        taxData.AdjustedBPA = this.getFederalBasicPersonalAmount(taxData);
        taxData.fedMedicalExpenseCreditAmount = this.getFederalMedicalExpenseCredit(taxData);
        taxData.totalNonRefundableFedTaxCredits = taxData.AdjustedBPA + taxData.federalAgeCredit + taxData.fedEligiblePensionIncome + taxData.fedMedicalExpenseCreditAmount;
        taxData.fedDonationsTaxCredit = CanadianTaxUtils.calculateTaxInBracket(this.fedTaxRates.charityBrackets, taxData.charitableDonations);
        const lowestTaxRate = this.getMarginalTaxRate(0);
        taxData.totalFedNonRefundableTaxCreditsBeforeDividendTaxCredits = taxData.totalNonRefundableFedTaxCredits * lowestTaxRate + taxData.fedDonationsTaxCredit;
        const dividendTaxCredits = taxData.grossedUpEligibleDividends * this.fedTaxRates.eligibleDividendTaxCreditRate;
        const nonEligibleDividendTaxCredits = taxData.grossedUpNonEligibleDividends * this.fedTaxRates.nonEligibleDividendTaxCreditRate;
        const totalFedCredits = taxData.totalFedNonRefundableTaxCreditsBeforeDividendTaxCredits + dividendTaxCredits + nonEligibleDividendTaxCredits;

        if (totalFedCredits > taxData.federalTaxBeforeCredits) {
            return taxData.federalTaxBeforeCredits;
        }

        return totalFedCredits;
    }

    /**
     * 
     * @param {Number} age 
     * @param {Number} grossIncome 
     * @param {Number} ageAmount 
     * @param {Number} thresholdAmount 
     * @param {Number} deductPercent 
     * @returns {Number}
     */
    getAgeCredit(age, grossIncome, ageAmount, thresholdAmount, deductPercent) {
        if (age < this.fedTaxRates.ageCreditAge) {
            return 0.0;
        }
        if (grossIncome < thresholdAmount) {
            return ageAmount;
        }

        const Excess = grossIncome - thresholdAmount;
        const deduct = Excess * deductPercent;
        let ageCredit = ageAmount - deduct;
        if (ageCredit < 0) {
            ageCredit = 0;
        }

        return ageCredit;
    }

    /**
     * 
     * @param {TaxData} taxData 
     * @returns 
     */
    getFederalBasicPersonalAmount(taxData) {
        let reduction = 0;

        if (taxData.netIncomeForTaxPurposes > this.fedTaxRates.additionalBpaThreshold) {
            reduction = (taxData.netIncomeForTaxPurposes - this.fedTaxRates.additionalBpaThreshold) * this.fedTaxRates.bpaReductionPercent;
            if (reduction > this.fedTaxRates.additionalBasicPersonalAmount) {
                reduction = this.fedTaxRates.additionalBasicPersonalAmount;
            }
        }

        const adjustedBasicPersonalAmount = this.fedTaxRates.basicPersonAmount - reduction;

        return adjustedBasicPersonalAmount;
    }

    /**
     * 
     * @param {TaxData} taxData 
     * @returns {Number}
     */
    getFederalMedicalExpenseCredit(taxData) {
        let thresholdValue = taxData.netIncomeForTaxPurposes * this.fedTaxRates.medicalExpenseThresholdPercent;
        thresholdValue = this.fedTaxRates.medicalExpenseThreshold < thresholdValue
            ? this.fedTaxRates.medicalExpenseThreshold
            : thresholdValue;

        const medicalExpenseCreditAmount = taxData.medicalExpenses - thresholdValue;

        return medicalExpenseCreditAmount <= 0 ? 0 : medicalExpenseCreditAmount;
    }
}

class CanadianTaxUtils {
    /**
     * When you request a single column of data from getRange(), it is still a double array.
     * Convert to single array for reguar array processing.
     * @param {any[][]} doubleArray 
     * @param {Number} columnNumber 
     * @returns {any[]}
     */
    static convertRowsToSingleArray(doubleArray, columnNumber = 0) {
        if (!Array.isArray(doubleArray)) {
            return doubleArray;
        }

        return doubleArray.map(item => item[columnNumber]);
    }

    /**
     * 
     * @param {Number} pv = Present Value
     * @param {Number} freq = compounding frequency
     * @param {Number} rate = interest rate (expressed as %)
     * @param {Number} periods = number of periods until maturity
     * @returns 
     */
    static futureValue(pv, freq, rate, periods) {
        return (pv * Math.pow(1 + (rate / 100 / freq), periods));
    }

    /**
     * 
     * @param {BracketObject} bracketData 
     * @param {Number} yearsToInflate 
     * @param {Number} inflation 
     */
    static inflateBracket(bracketData, yearsToInflate, inflation) {
        const updatedBracket = JSON.parse(JSON.stringify(bracketData));

        for (let i = 0; i < bracketData.brackets.length; i++) {
            updatedBracket.brackets[i] = CanadianTaxUtils.futureValue(bracketData.brackets[i], 1, inflation, yearsToInflate);

            if (i > 0) {
                //  BASE[i] = BASE[i-1] + RATE[i-1] * (BRACKET[i]- BRACKET[i-1])
                updatedBracket.base[i] = updatedBracket.base[i - 1] + updatedBracket.rates[i - 1] * (updatedBracket.brackets[i] - updatedBracket.brackets[i - 1]);
            }
        }

        return updatedBracket;
    }

    /**
      * 
      * @param {BracketObject} bracketInfo 
      * @param {Number} dollarAmount 
      */
    static calculateTaxInBracket(bracketInfo, dollarAmount) {
        const bracketIndex = CanadianTaxUtils.findBracket(dollarAmount, bracketInfo);

        const rate = bracketInfo.rates[bracketIndex];
        const baseTax = bracketInfo.base[bracketIndex];
        const baseBracket = bracketInfo.brackets[bracketIndex];

        return baseTax + rate * (dollarAmount - baseBracket);
    }

    /**
     * 
     * @param {BracketObject} bracketInfo 
     * @param {Number} dollarAmount 
     * @returns 
     */
    static getMarginalTaxRate(bracketInfo, dollarAmount) {
        const bracket = CanadianTaxUtils.findBracket(dollarAmount, bracketInfo);
        return bracketInfo.rates[bracket];
    }

    /**
     * 
     * @param {Number} amount 
     * @param {BracketObject} bracketData 
     * @returns {Number} - Returns index of bracket found.
     */
    static findBracket(amount, bracketData) {
        const items = bracketData.brackets.length - 1;

        for (let i = items; i >= 0; i--) {
            if (amount >= bracketData.brackets[i]) {
                return i;
            }
        }
        return 0;
    }
}

//  *** DEBUG START ***
//  Remove comments for testing in NODE

// getGross();
TEST_CANTAX();
//  *** DEBUG END ***/