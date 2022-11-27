async function asyncForEach<T>(array: T[], callback: (item: T, number: number, array: T[]) => Promise<void>)  {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}
function split<T>(arr: T[], n: number) {
    const res = [];
    while (arr.length) {
        res.push(arr.splice(0, n));
    }
    return res;
}
const delayMS = (t = 200) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve(t);
        }, t);
    });
};
export function throttledPromises<T, U>(
    asyncFunction: (item: T) => Promise<U>,
    items: T[] = [],
    batchSize = 1,
    delay = 0
): Promise<U[]>{
    return new Promise(async (resolve, reject) => { // eslint-disable-line no-async-promise-executor
        const output: U[] = [];
        const batches = split(items, batchSize);
        await asyncForEach(batches, async (batch) => {
            const promises = batch.map(asyncFunction).map(p => p.catch(reject));
            const results = await Promise.all(promises);
            output.push(...results as U[]);
            await delayMS(delay);
        });
        resolve(output);
    });
}

export const test_split = split;