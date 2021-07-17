export const luhnCheck = (cardNumber: string): boolean => {
    if (!cardNumber.length) {
        return false; // TODO
    }

    // Remove all whitespaces from card number.
    cardNumber = cardNumber.replace(/\s/g, '');

    // 1. Remove last digit;
    const lastDigit = Number(cardNumber[cardNumber.length - 1]);

    // 2. Reverse card number
    const reverseCardNumber = cardNumber.slice(0, cardNumber.length - 1).split('').reverse().map(x => Number(x));
    let sum = 0;

    // 3. + 4. Multiply by 2 every digit on odd position. Subtract 9 if digit > 9
    for (let i = 0; i <= reverseCardNumber.length - 1; i += 2) {
        reverseCardNumber[i] = reverseCardNumber[i] * 2;
        if (reverseCardNumber[i] > 9) {
            reverseCardNumber[i] = reverseCardNumber[i] - 9;
        }
    }

    // 5. Make the sum of obtained values from step 4.
    sum = reverseCardNumber.reduce((acc, currValue) => (acc + currValue), 0);

    // 6. Calculate modulo 10 of the sum from step 5. and the last digit. If it's 0, you have a valid card number :)
    return ((sum + lastDigit) % 10 === 0);
};
