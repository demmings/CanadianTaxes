/*  *** DEBUG START ***
//  Remove comments for testing in NODE

function getGross() {
    const val = GET_GROSS_INCOMES_V2([[62237], [50000]], 65, 65, 2, 2024, 0, 0, 8732, 2000, 0);
    Logger.log("Gross=" + val);
}

function getTax() {
    const val = GET_INCOMETAX_V2(126016, 68, 13000);
    Logger.log(126016 - val);
}

function getNet() {
    const val = GET_NET_INCOMES_V2(0, 62, 62, 0, null, 50000, 0, 0, 0);
    Logger.log("Net=" + val);
}

class Logger {
    static log(msg) {
        console.log(msg);
    }
}

//  *** DEBUG END ***/

const TestCantaxData =
    [
        [59, 180000.00, 300244.00, 5000.00, 0.00, 0.00, 0.00, 300243.70, 180000.35, -0.30, 0.35],
        [60, 57000.00, 70272.00, 0.00, 0.00, 0.00, 0.00, 70271.74, 57000.22, -0.26, 0.22],
        [61, 58000.00, 72833.00, 10200.00, 0.00, 0.00, 0.00, 72833.04, 58000.14, 0.04, 0.14],
        [62, 59000.00, 74277.00, 10450.00, 0.00, 0.00, 0.00, 74277.23, 59000.02, 0.23, 0.02],
        [63, 60000.00, 75712.00, 10600.00, 0.00, 0.00, 0.00, 75712.35, 59999.96, 0.35, -0.04],
        [64, 61000.00, 77191.00, 10800.00, 0.00, 0.00, 0.00, 77190.78, 61000.20, -0.22, 0.20],
        [65, 62000.00, 78368.00, 11000.00, 0.00, 0.00, 0.00, 78368.48, 61999.84, 0.48, -0.16],
        [66, 70000.00, 90663.00, 12000.00, 0.00, 0.00, 0.00, 90662.85, 70000.21, -0.15, 0.21],
        [67, 80000.00, 108254.00, 12800.00, 0.00, 0.00, 0.00, 108254.04, 80000.05, 0.04, 0.05],
        [68, 90000.00, 126016.00, 13000.00, 0.00, 0.00, 0.00, 126014.68, 90000.88, -1.32, 0.88],
        [69, 90000.00, 120185.00, 0.00, 0.00, 0.00, 0.00, 120185.01, 90000.23, 0.01, 0.23],
        [70, 120000.00, 173897.00, 0.00, 0.00, 0.00, 0.00, 173896.61, 120000.33, -0.39, 0.33],
        [70, 120000.00, 178565.00, 0.00, 10000.00, 0.00, 0.00, 178565.03, 120000.09, 0.03, 0.09],
        [70, 120000.00, 224492.00, 0.00, 100000.00, 0.00, 0.00, 224491.27, 120000.47, -0.73, 0.47],
        [70, 120000.00, 502868.00, 0.00, 500000.00, 0.00, 0.00, 502868.57, 119999.80, 0.57, -0.20],
        [70, 120000.00, 511335.00, 10000.00, 500000.00, 0.00, 0.00, 511334.99, 120000.10, -0.01, 0.10],
        [70, 120000.00, 319350.00, 10000.00, 249999.00, 0.00, 0.00, 319350.03, 120000.08, 0.03, 0.08],
        [70, 50000.00, 71924.00, 50000.00, 0.00, 0.00, 0.00, 71923.93, 50000.17, -0.07, 0.17],
        [70, 10000.00, 10796.00, 50000.00, 0.00, 0.00, 0.00, 10795.85, 10000.32, -0.15, 0.32],
        [70, 0.00, 600.00, 50000.00, 0.00, 0.00, 0.00, 600.01, 0.00, 0.01, 0.00],
        //  Known fails. Low income tax credits not calculated.
        //[70, 0.00, 621.00, 0.00, 50000.00, 0.00, 0.00, 883.58, -209.88, 262.58, -209.88],
        //[70, 0.00, 621.00, 0.00, 49999.00, 0.00, 0.00, 883.46, -209.78, 262.46, -209.78],
        //[70, 0.00, 621.00, 0.00, 50001.00, 0.00, 0.00, 883.71, -209.98, 262.71, -209.98],
        [70, 180000.00, 309659.00, 5000.00, 0.00, 9416.00, 0.00, 320505.23, 179999.72, 0.23, -0.28],
        [70, 80000.00, 108410.00, 5000.00, 0.00, 9416.00, 0.00, 118561.07, 80000.07, 0.07, 0.07],
        [70, 50000.00, 59398.00, 5000.00, 0.00, 9416.00, 0.00, 64187.34, 49999.90, 0.34, -0.10],
        [70, 50000.00, 58824.00, 5000.00, 0.00, 9416.00, 2000.00, 63613.38, 49999.91, 0.38, -0.09],
        [70, 50000.00, 59309.00, 5000.00, 2000.00, 9416.00, 2000.00, 63613.38, 49999.91, 0.38, -0.09]
    ];

/**
 * Basic sanity check.
 * @returns {any[]}
 * @customfunction
 */
function TEST_CANTAX() {
    const output = [["Age", "Net Income", "Dividends", "Eligible Capital Gains", "OAS", "Pension Credit Eligible Income", "Gross Income (calculated)", "Expected Gross", "Gross Diff. (calc-expected)", "Pass/Fail", "Net Income (calculated)", "Gross Diff. (calc-expected)", "Pass/Fail"]];
    for (const testItem of TestCantaxData) {
        const grossIncome = GET_GROSS_INCOMES_V2(testItem[1], testItem[0], 59, 0, 2024, testItem[4], testItem[3], testItem[5], testItem[6], 0);
        const netIncome = GET_NET_INCOMES_V2(testItem[2], testItem[0], 59, 0, 2024, testItem[4], testItem[3], testItem[5], testItem[6]);

        const grossDiff = Math.round(grossIncome[0][0]) - testItem[2];
        const netDiff = Math.round(netIncome[0][0]) - testItem[1];
        // @ts-ignore
        output.push([testItem[0], testItem[1], testItem[3], testItem[4], testItem[5], testItem[6], Math.round(grossIncome[0][0]), testItem[2], grossDiff, Math.abs(grossDiff) <= 1.0 ? "Pass" : "** FAIL **", Math.round(netIncome[0][0]), netDiff, Math.abs(netDiff) <= 1.0 ? "Pass" : "** FAIL **"]);
    }

    return output;
}

/** @typedef BracketObject
  * @property {Number[]} brackets
  * @property {Number[]} rates
  * @property {Number[]} base
  */
class CanadianTaxRates {

    constructor() {
        this.taxYear = 2024;
        this._fedDividendGrossUp = 0.38;
        this.eligibleDividendTaxCreditRate = 0.150198;
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
            base: [0, 8380.05, 19832.58, 35815.30, 57143.93]
        };

    }

    get fedDividendGrossUp() {
        return this._fedDividendGrossUp + 1;
    }

}

/**
 * @classdesc - All relevant Ontario tax rates for indicated tax year.
 */
class OntarioTaxRates {
    constructor() {

        this.taxYear = 2024;
        this.provEligibleDividendTaxCreditRate = 0.10;
        this.ontBasicPersonAmount = 12399.00;
        this.ageCreditAge = 65;
        this.ontAgeAmount = 6054.00;
        this.ontAgeThreshold = 45068.00;
        this.ageExcessPercent = 0.15;
        this.provMaxIncomePensionTaxCredit = 1714.00;
        this.OASclawbackThreshold = 90997;
        this.OASclawbackRate = 0.15;

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
    }
}

class FederalTaxes extends CanadianTaxRates {
    //  Basic personal amounts, tax brackets adjusted for inflation in future years.
    constructor(taxYear, inflation) {
        super();
        const yearsToInflate = taxYear - this.taxYear;

        if (yearsToInflate === 0 || inflation === 0) {
            return;
        }

        this.taxYear = taxYear;
        this.basicPersonAmount = CanadianIncomeCalculator.futureValue(this.basicPersonAmount, 1, inflation, yearsToInflate);
        this.additionalBasicPersonalAmount = CanadianIncomeCalculator.futureValue(this.additionalBasicPersonalAmount, 1, inflation, yearsToInflate);
        this.additionalBpaThreshold = CanadianIncomeCalculator.futureValue(this.additionalBpaThreshold, 1, inflation, yearsToInflate);
        this.ageAmount = CanadianIncomeCalculator.futureValue(this.ageAmount, 1, inflation, yearsToInflate);
        this.ageThreshold = CanadianIncomeCalculator.futureValue(this.ageThreshold, 1, inflation, yearsToInflate);
        this.OASclawbackThreshold = CanadianIncomeCalculator.futureValue(this.OASclawbackThreshold, 1, inflation, yearsToInflate);
        this.taxBracketInfo = CanadianIncomeCalculator.inflateBracket(this.taxBracketInfo, yearsToInflate, inflation);
        this.medicalExpenseThreshold = CanadianIncomeCalculator.futureValue(this.medicalExpenseThreshold, 1, inflation, yearsToInflate);
    }
}

class OntarioTaxes extends OntarioTaxRates {
    //  Basic personal amounts, tax brackets adjusted for inflation in future years.
    constructor(taxYear, inflation) {
        super();
        const yearsToInflate = taxYear - this.taxYear;

        if (yearsToInflate === 0 || inflation === 0) {
            return;
        }

        this.ontBasicPersonAmount = CanadianIncomeCalculator.futureValue(this.ontBasicPersonAmount, 1, inflation, yearsToInflate);
        this.ontAgeAmount = CanadianIncomeCalculator.futureValue(this.ontAgeAmount, 1, inflation, yearsToInflate);
        this.ontAgeThreshold = CanadianIncomeCalculator.futureValue(this.ontAgeThreshold, 1, inflation, yearsToInflate);
        this.OASclawbackThreshold = CanadianIncomeCalculator.futureValue(this.OASclawbackThreshold, 1, inflation, yearsToInflate);
        this.ontTaxBracketInfo = CanadianIncomeCalculator.inflateBracket(this.ontTaxBracketInfo, yearsToInflate, inflation);
        this.ontSurtaxBracketInfo = CanadianIncomeCalculator.inflateBracket(this.ontSurtaxBracketInfo, yearsToInflate, inflation);
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
 * @property {any} OAS - Old Age Security amount.  Used to determine clawback (which is counted as a tax)
 * @property {any} incomeEligibleForPensionCredit
 * @property {Number} oasClawback
 * @property {Number} totalIncomeForTaxPurposes
 * @property {Number} netIncomeForTaxPurposes
 * @property {Number} federalTaxBeforeCredits
 * @property {Number} ontTaxBeforeCredits
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
 * @property {Number} taxableCapitalGains
 * @property {Number} medicalExpenses
 * @property {Number} fedMedicalExpenseCreditAmount
 * @property {Number} provincialMedicalExpenseCredit
 * @property {Boolean} debug
 * @property {function} getTaxItem
 */

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
 * @returns {Number[][]} - GROSS Income from ALL taxable sources EXCLUDING capital gains and dividends, but including RRSP, CPP, OAS, ...(all taxable sources)
 * Basically, we are trying to find how much to withdraw from RRSP so RRSP = gross - (CPP + OAS + other taxable sources)
 * @customfunction
 */
function GET_GROSS_INCOMES_V2(income = 0, ageInFuture = 60, currentAge = null, projectedInflation = null, taxYear = null, projectedGains = null, projectedDividends = null, yearlyOAS = null, incomeEligibleForPensionCredit = null, medicalExpenses = null, debug = true) {
    if (debug) Logger.log("GET_GROSS_INCOMES");

    const taxData = CanadianIncomeCalculator.validateIncomeSettings(income, ageInFuture, currentAge, taxYear, projectedInflation, projectedGains, projectedDividends, yearlyOAS, incomeEligibleForPensionCredit, medicalExpenses, debug);

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
 * @param {any} debug
 * @returns {Number[][]}
 * @customfunction
 */
function GET_NET_INCOMES_V2(yearlyGrossIncome = 0, ageInFuture = 60, currentAge = null, inflation = null, taxYear = null, capitalGains = null, dividendIncome = null, OAS = null, pension = null, medicalExpenses = null, debug = true) {
    const taxData = CanadianIncomeCalculator.validateIncomeSettings(yearlyGrossIncome, ageInFuture, currentAge, taxYear, inflation, capitalGains, dividendIncome, OAS, pension, medicalExpenses, debug);

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
function GET_INCOMETAX_V2(yearlyGrossIncome = 0, ageInFuture = 60, currentAge = null, inflation = null, taxYear = null, capitalGains = null, dividendIncome = null, OAS = null, pension = null) {
    const taxData = CanadianIncomeCalculator.validateIncomeSettings(yearlyGrossIncome, ageInFuture, currentAge, taxYear, inflation, capitalGains, dividendIncome, OAS, pension);
    const taxItem = taxData.getTaxItem(0);
    const taxCalc = new CanadianIncomeTax(taxItem.year, taxItem.inflation);
    const taxes = taxCalc.findTotalTax(taxItem, yearlyGrossIncome);
    CanadianIncomeCalculator.logTaxSummary(taxItem);

    return taxes;
}

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

            const grossIncome = [];
            grossIncome.push(gross);
            data[i] = grossIncome;
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
            Logger.log(`Gross Income=${taxData.incomes[i]}. Capital Gains=${taxData.capitalGains[i]}.`)

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
     * @returns {TaxData}
     */
    static validateIncomeSettings(yearlyIncome, ageOfRetiree, age, taxYear, inflationPercent, gains, dividends, yearlyOAS, pensionIncome, medicalCosts, debug) {
        const items = Array.isArray(yearlyIncome) ? yearlyIncome.length : 1;
        const inflation = inflationPercent === null ? 0 : Number(inflationPercent);
    
        const incomes = CanadianIncomeCalculator.prepTaxInput(items, inflation, yearlyIncome);
        const ageInFuture = CanadianIncomeCalculator.prepTaxInput(items, null, ageOfRetiree);
        const capitalGains = CanadianIncomeCalculator.prepTaxInput(items, inflation, gains);
        const eligibleDividends = CanadianIncomeCalculator.prepTaxInput(items, inflation, dividends);
        const OAS = CanadianIncomeCalculator.prepTaxInput(items, inflation, yearlyOAS);
        const incomeEligibleForPensionCredit = CanadianIncomeCalculator.prepTaxInput(items, inflation, pensionIncome);
        const medicalExpenses = CanadianIncomeCalculator.prepTaxInput(items, inflation, medicalCosts);
    
        const currentAge = age === null ? (Array.isArray(ageInFuture) ? ageInFuture[0] : ageInFuture) : Number(age);
        const year = taxYear === null || taxYear === '' || typeof taxYear === 'undefined' ? new Date().getFullYear() : Number(taxYear);

        const taxData = { incomes, ageInFuture, currentAge, year, inflation, capitalGains, eligibleDividends, OAS, incomeEligibleForPensionCredit, medicalExpenses, debug };

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
                OAS: this.OAS[i],
                incomeEligibleForPensionCredit: this.incomeEligibleForPensionCredit[i],
                medicalExpenses: this.medicalExpenses[i],
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
            taxProperty = CanadianIncomeCalculator.convertRowsToSingleArray(val).map(inc => Number(inc));
        }
        else {
            let startVal = val === null ? 0 : Number(val);

            for (let i = 0; i < items; i++) {
                taxProperty.push(startVal);

                startVal = inflation === null ? startVal+1 :  startVal * (1 + inflation / 100);
            }
        }

        return taxProperty;
    }

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

    /***********************************************
      *              Present Value                  *
      * pv = fv / (1 + (rate / freq))^periods       *
      * pv = Present Value                          *
      * fv = Future Value                           *
      * rate = interest rate (expressed as %)       *
      * freq = compounding frequency                *
      * periods = number of periods until maturity  *
      ***********************************************/
    static presentValue(fv, freq, rate, periods) {
        return (fv / Math.pow((1 + (rate / 100 / freq)), periods));
    }

    /************************************************
     *                Future Value                  *
     * fv = pv * (1 + (rate / freq))^periods        *
     * fv = Future Value                            *
     * pv = Present Value                           *
     * rate = interest rate (expressed as %)        *
     * freq = compounding frequency                 *
     * periods = number of periods until maturity   *
     ************************************************/
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
            updatedBracket.brackets[i] = CanadianIncomeCalculator.futureValue(bracketData.brackets[i], 1, inflation, yearsToInflate);

            if (i > 0) {
                updatedBracket.base[i] = updatedBracket.brackets[i] * bracketData.rates[i - 1];
            }
        }

        return updatedBracket;
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
        Logger.log(`Grossed Up Eligible Canadian Dividends = ${taxData.grossedUpEligibleDividends}`)
        Logger.log(`Taxable Capital Gains = ${taxData.taxableCapitalGains}`)
        Logger.log(`Total income for tax purposes - line 15000 = ${taxData.totalIncomeForTaxPurposes}`);
        Logger.log(`OAS clawback = ${taxData.oasClawback}`);
        Logger.log(`Net income for tax purposes - Line 23600 = ${taxData.netIncomeForTaxPurposes}`);
        Logger.log(`Tax before non-refundable tax credits (A) Line 40400. Fed = ${taxData.federalTaxBeforeCredits}. Prov = ${taxData.ontTaxBeforeCredits}`);
        Logger.log(`Basic personal amount Line 30000.  Fed = ${taxData.AdjustedBPA}, Prov = ${taxData.provAdjustedBPA}`);
        Logger.log(`Age amount (reduced above certain income levels) Line 30100. Fed = ${taxData.federalAgeCredit}.  Prov = ${taxData.provAgeCredit}`)
        Logger.log(`Pension amount Line 31400. Fed = ${taxData.fedEligiblePensionIncome}. Prov = ${taxData.provincialEligiblePensionIncome}`);
        Logger.log(`Medical expenses Line 33099.  Fed = ${taxData.fedMedicalExpenseCreditAmount}.  Prov = ${taxData.provincialMedicalExpenseCredit}`);
        Logger.log(`Subtotal for non-refundable tax credits (B) Line 33500.  Fed = ${taxData.totalNonRefundableFedTaxCredits}, Prov = ${taxData.totalNonRefundableProvTaxCredits}`);
        Logger.log(`Total non-refundable tax credits before dividend tax credits Line 35000.  Fed = ${taxData.totalFedNonRefundableTaxCreditsBeforeDividendTaxCredits}.  Prov=${taxData.totalProvNonRefundableTaxCreditsBeforeDividendTaxCredits}`);
        Logger.log(`Fed Line 42000 Net federal tax = ${taxData.netFederalTax}`);
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
        this.fedTaxRates = new FederalTaxes(taxYear, inflation);
        this.provTaxRates = new OntarioTaxes(taxYear, inflation);
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
        this.provTaxRates = new OntarioTaxes(taxableYear, taxData.inflation);
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
        const fedTax = this.getNetFederalTax(taxData, grossIncome);
        const provTax = this.getNetProvincialTax(taxData, grossIncome);
        taxData.subtotalFederalAndProvIncomeTaxes = fedTax + provTax;
        taxData.totalTaxesClawbacksAndCPP = taxData.subtotalFederalAndProvIncomeTaxes + taxData.oasClawback;

        return taxData.totalTaxesClawbacksAndCPP;
    }

    /**
     * @param {TaxData} taxData
     * @param {Number} grossIncome 
     * @returns {Number}
     */
    getNetFederalTax(taxData, grossIncome) {
        taxData.grossedUpEligibleDividends = this.fedTaxRates.fedDividendGrossUp * taxData.eligibleDividends;
        taxData.taxableCapitalGains = CanadianIncomeTax.calculateTaxInBracket(this.fedTaxRates.capitalGainsInfo, taxData.capitalGains);
        taxData.totalIncomeForTaxPurposes = grossIncome + taxData.grossedUpEligibleDividends + taxData.taxableCapitalGains;
        taxData.oasClawback = this.getOASclawback(taxData.totalIncomeForTaxPurposes, taxData.OAS);
        taxData.netIncomeForTaxPurposes = taxData.totalIncomeForTaxPurposes - taxData.oasClawback;
        taxData.federalTaxBeforeCredits = CanadianIncomeTax.calculateTaxInBracket(this.fedTaxRates.taxBracketInfo, taxData.netIncomeForTaxPurposes);

        let fedTaxCredits = this.getFederalTaxCredits(taxData, grossIncome + taxData.taxableCapitalGains, taxData.ageInFuture, taxData.incomeEligibleForPensionCredit, taxData.grossedUpEligibleDividends);
        if (fedTaxCredits > taxData.federalTaxBeforeCredits) {
            fedTaxCredits = taxData.federalTaxBeforeCredits;
        }

        taxData.netFederalTax = taxData.federalTaxBeforeCredits - fedTaxCredits;

        return taxData.netFederalTax;
    }

    /**
     * @param {TaxData} taxData
     * @param {Number} grossIncome 
 
     * @returns {Number}
     */
    getNetProvincialTax(taxData, grossIncome) {
        taxData.ontHealthPremium = CanadianIncomeTax.calculateTaxInBracket(this.provTaxRates.ontHealthBracketInfo, taxData.totalIncomeForTaxPurposes)
        taxData.ontTaxBeforeCredits = CanadianIncomeTax.calculateTaxInBracket(this.provTaxRates.ontTaxBracketInfo, taxData.netIncomeForTaxPurposes);
        taxData.totalProvNonRefundableTaxCreditsBeforeDividendTaxCredits = this.getProvincialTaxCredits(taxData, grossIncome + taxData.taxableCapitalGains)
        if (taxData.totalProvNonRefundableTaxCreditsBeforeDividendTaxCredits > taxData.ontTaxBeforeCredits) {
            taxData.totalProvNonRefundableTaxCreditsBeforeDividendTaxCredits = taxData.ontTaxBeforeCredits;
        }

        const netOntTax = taxData.ontTaxBeforeCredits - taxData.totalProvNonRefundableTaxCreditsBeforeDividendTaxCredits;
        const ontSurtax = CanadianIncomeTax.calculateTaxInBracket(this.provTaxRates.ontSurtaxBracketInfo, netOntTax);
        const dividendCredit = taxData.grossedUpEligibleDividends * this.provTaxRates.provEligibleDividendTaxCreditRate;
        taxData.netProvincialTax = netOntTax + ontSurtax - dividendCredit;
        if (taxData.netProvincialTax < 0) {
            taxData.netProvincialTax = 0;
        }
        taxData.netProvincialTax += taxData.ontHealthPremium;

        return taxData.netProvincialTax;
    }

    /**
     * @param {TaxData} taxData
     * @param {Number} grossIncome 
     * @param {Number} age 
     * @param {Number} incomeEligibleForPensionCredit 
     * @param {Number} grossedUpDividends
     * @returns {Number}
     */
    getFederalTaxCredits(taxData, grossIncome, age, incomeEligibleForPensionCredit, grossedUpDividends) {
        taxData.fedEligiblePensionIncome = incomeEligibleForPensionCredit > this.fedTaxRates.maxIncomePensionTaxCredit
            ? this.fedTaxRates.maxIncomePensionTaxCredit
            : incomeEligibleForPensionCredit;

        taxData.federalAgeCredit = this.getAgeCredit(age, grossIncome + grossedUpDividends, this.fedTaxRates.ageAmount, this.fedTaxRates.ageThreshold, this.fedTaxRates.ageExcessPercent);
        taxData.AdjustedBPA = this.getFederalBasicPersonalAmount(taxData, grossIncome + grossedUpDividends);
        taxData.fedMedicalExpenseCreditAmount = this.getFederalMedicalExpenseCredit(taxData);
        taxData.totalNonRefundableFedTaxCredits = taxData.AdjustedBPA + taxData.federalAgeCredit + taxData.fedEligiblePensionIncome + taxData.fedMedicalExpenseCreditAmount;

        const lowestTaxRate = CanadianIncomeTax.getMarginalTaxRate(this.fedTaxRates.taxBracketInfo, 0);
        taxData.totalFedNonRefundableTaxCreditsBeforeDividendTaxCredits = taxData.totalNonRefundableFedTaxCredits * lowestTaxRate;
        const dividendTaxCredits = grossedUpDividends * this.fedTaxRates.eligibleDividendTaxCreditRate;
        const totalFedCredits = taxData.totalFedNonRefundableTaxCreditsBeforeDividendTaxCredits + dividendTaxCredits;

        return totalFedCredits;
    }

    /**
     * 
     * @param {TaxData} taxData 
     * @param {Number} income 
     * @returns 
     */
    getFederalBasicPersonalAmount(taxData, income) {
        let reduction = 0;

        if (income > this.fedTaxRates.additionalBpaThreshold) {
            reduction = (income - this.fedTaxRates.additionalBpaThreshold) * this.fedTaxRates.bpaReductionPercent;
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

    /**
     * @param {TaxData} taxData
     * @param {Number} grossIncome 
     * @returns {Number}
     */
    getProvincialTaxCredits(taxData, grossIncome) {
        taxData.provincialEligiblePensionIncome = taxData.incomeEligibleForPensionCredit > this.provTaxRates.provMaxIncomePensionTaxCredit
            ? this.provTaxRates.provMaxIncomePensionTaxCredit
            : taxData.incomeEligibleForPensionCredit;

        taxData.provAgeCredit = this.getAgeCredit(taxData.ageInFuture, grossIncome + taxData.grossedUpEligibleDividends, this.provTaxRates.ontAgeAmount, this.provTaxRates.ontAgeThreshold, this.fedTaxRates.ageExcessPercent);
        taxData.provincialMedicalExpenseCredit = CanadianIncomeTax.getProvincialMedicalExpenseCredit(taxData);
        taxData.provAdjustedBPA = this.getProvBasicPersonalAmount(taxData);
        taxData.totalNonRefundableProvTaxCredits = taxData.provAdjustedBPA + taxData.provAgeCredit + taxData.provincialEligiblePensionIncome + taxData.provincialMedicalExpenseCredit;
        const lowestTaxRate = CanadianIncomeTax.getMarginalTaxRate(this.provTaxRates.ontTaxBracketInfo, 0);

        const provincialTaxCredits = taxData.totalNonRefundableProvTaxCredits * lowestTaxRate;

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
     * @returns {Number}
     */
    static getProvincialMedicalExpenseCredit(taxData) {
        //  Same as federal for now.
        return taxData.fedMedicalExpenseCreditAmount;
    }

    /**
     * Finds the taxable income to withdraw to receive the specified net income.
     * @param {TaxData} taxData
     * @returns {Number}
     */
    getGrossIncome(taxData) {
        //  Working from last known Canadian/Provincial tax rates, the brackets are adjusted for time/inflation.
        this.adjustTaxBrackets(taxData);

        const fedGrossedUpDividends = this.fedTaxRates.fedDividendGrossUp * taxData.eligibleDividends;
        const taxableCapitalGains = CanadianIncomeTax.calculateTaxInBracket(this.fedTaxRates.capitalGainsInfo, taxData.capitalGains);
        const grossEstimate = taxData.incomes + fedGrossedUpDividends + taxableCapitalGains;
        const marginalFedRate = CanadianIncomeTax.getMarginalTaxRate(this.fedTaxRates.taxBracketInfo, grossEstimate);
        const marginalOntRate = CanadianIncomeTax.getMarginalTaxRate(this.provTaxRates.ontTaxBracketInfo, grossEstimate);
        const ontHealthPremium = CanadianIncomeTax.calculateTaxInBracket(this.provTaxRates.ontHealthBracketInfo, grossEstimate);

        //  Estimate of needed GROSS to cover taxes of net expected income.
        let workingGrossIncome = taxData.incomes / (1 - (marginalFedRate + marginalOntRate)) + taxableCapitalGains + ontHealthPremium + taxData.eligibleDividends;

        let totalTax = this.findTotalTax(taxData, workingGrossIncome);

        let failSafe = 0;   //  It's possible some set of inputs will NEVER approach ZERO, so avoid an infinite loop.
        let diff = taxData.incomes - (workingGrossIncome - totalTax);
        while (Math.abs(diff) > 0.25 && failSafe < 999) {
            //  Next guess at gross income      
            const avgTaxRate = totalTax / (workingGrossIncome + fedGrossedUpDividends + taxableCapitalGains);
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
     * 
     * @param {BracketObject} bracketInfo 
     * @param {Number} dollarAmount 
     */
    static calculateTaxInBracket(bracketInfo, dollarAmount) {
        const bracketIndex = CanadianIncomeTax.findBracket(dollarAmount, bracketInfo);

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
        const bracket = CanadianIncomeTax.findBracket(dollarAmount, bracketInfo);
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

/*  *** DEBUG START ***
//  Remove comments for testing in NODE
function taxTester() {
    console.log("Starting Canadian Tax Test");
    for (const testItem of TestCantaxData) {
        const grossIncome = GET_GROSS_INCOMES_V2(testItem[1], testItem[0], 59, 0, 2024, testItem[4], testItem[3], testItem[5], testItem[6], 0, false);
        const grossRounded = Math.round(grossIncome[0][0]);
        const grossDiff = grossRounded - testItem[2];
        const successMsg = grossDiff <= 1.0 ? "Success" : "Fail";

        Logger.log(`GROSS INCOME = ${grossRounded}.  STATUS = ${successMsg}.   Net Income =${testItem[1]}. Age=${testItem[0]}. Capital Gains=${testItem[4]}. Dividends=${testItem[3]}. OAS=${testItem[5]}. Pension=${testItem[6]} `);
    }
}

taxTester();
//  *** DEBUG END ***/