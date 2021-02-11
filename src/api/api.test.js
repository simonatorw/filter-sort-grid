import { sortDesc, sortAsc, filterList } from './api';

describe('api test', () => {
    test('sortDesc', () => {
        const result = sortDesc([{ population: 1 }, { population: 3 }, { population: 2 }]);
        const expected = [{ population: 3 }, { population: 2 }, { population: 1 }];

        expect(result).toEqual(expected);
    });

    test('sortAsc', () => {
        const result = sortAsc([{ population: 1 }, { population: 3 }, { population: 2 }]);
        const expected = [{ population: 1 }, { population: 2 }, { population: 3 }];

        expect(result).toEqual(expected);
    });

    test('filterList', () => {
        const result = filterList([{ population: 1 }, { population: 2 }, { population: 2 }], 2, 'population');
        const expected = [{ population: 2 }, { population: 2 }];

        expect(result).toEqual(expected);
    });
});