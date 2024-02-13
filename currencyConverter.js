import inquirer from 'inquirer';
const currencies = [
    { name: 'US Dollar', code: 'USD', rate: 279.25 },
    { name: 'Euro', code: 'EUR', rate: 298.26 },
    { name: 'British Pound', code: 'GBP', rate: 351.45 },
    { name: 'Source Currency: Pakistani Rupees', code: 'PKR', rate: 1.0 },
    { name: 'Indian Rupees', code: 'INR', rate: 3.36 },
    { name: 'Turkish Lira', code: 'TL', rate: 9.09 },
    { name: 'Saudi Arabia Riyal', code: 'SAR', rate: 74.46 },
    { name: 'UAE Dirham', code: 'AED', rate: 76.06 },
    { name: 'Kuwait Dinar', code: 'KWD', rate: 906.20 },
];
async function convertCurrency() {
    const conversionData = await inquirer.prompt([
        {
            name: 'fromCurrency',
            type: 'list',
            message: 'Select the source currency:',
            choices: currencies.map((currency) => `${currency.name} (${currency.code})`),
        },
        {
            name: 'toCurrency',
            type: 'list',
            message: 'Select the target currency:',
            choices: currencies.map((currency) => `${currency.name} (${currency.code})`),
        },
        {
            name: 'amount',
            type: 'input',
            message: 'Enter the amount to convert:',
            validate(input) {
                const amount = parseFloat(input);
                return !isNaN(amount) && amount > 0 ? true : 'Invalid amount';
            },
        },
    ]);
    const fromCurrencyCode = conversionData.fromCurrency.split('(')[1].slice(0, -1);
    const toCurrencyCode = conversionData.toCurrency.split('(')[1].slice(0, -1);
    const amountToConvert = parseFloat(conversionData.amount);
    const fromCurrency = currencies.find((currency) => currency.code === fromCurrencyCode);
    const toCurrency = currencies.find((currency) => currency.code === toCurrencyCode);
    if (fromCurrency && toCurrency) {
        const convertedAmount = (amountToConvert / fromCurrency.rate) * toCurrency.rate;
        console.log(`Converted amount: ${convertedAmount.toFixed(2)} ${toCurrency.code}`);
    }
    else {
        console.log('Invalid currency selection.');
    }
}
convertCurrency();
