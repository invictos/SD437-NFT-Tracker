import { test_split, throttledPromises } from "./throttle";

test('throttledPromises returns a coherent result', async () => {
    const sum = (obj: number[]): Promise<number> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(obj.reduce((a: number, b: number) => a + b, 0));
            }, 50);
        }); 
    }
    
    const items = [[1, 2], [3, 4], [5, 6], [7, 8], [9, 10]];

    const results = await throttledPromises(sum, items, 2, 50);

    expect(results).toEqual([3, 7, 11, 15, 19]);

})

test('array split works', () => {
    const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const results = test_split(items, 3);

    expect(results).toEqual([[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]]);
})