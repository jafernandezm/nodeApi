const { palindrome } = require('../utils/for_testing');


test.skip('palindrome of jhon', () => {
    const result = palindrome('jhon');

    expect(result).toBe('nohj');
});


test.skip('palindrome of empty string', () => {
    const result = palindrome('');

    expect(result).toBe('');
});

test.skip('palindrome of undefined', () => {
    const result = palindrome();

    expect(result).toBeUndefined()
});





