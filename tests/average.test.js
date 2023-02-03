const { avarage } = require('../utils/for_testing');

//test average.js file
describe.skip('average', () => {
    test('of one value is the value itself', () => {
        expect(avarage([1])).toBe(1);
    });

    test('of many is calculated right', () => {
        expect(avarage([1, 2, 3, 4, 5, 6])).toBe(3.5);
    });

    test('of empty array is zero', () => {
        expect(avarage([])).toBe(0);
    });
});