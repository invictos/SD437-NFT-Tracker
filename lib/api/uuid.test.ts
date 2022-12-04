import { randomUUID } from "./uuid";
import { expect } from '@jest/globals';

test('uuid has the correct format', () => {
    const uuid = randomUUID();
    expect(uuid).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/);
})

test('uuid is unique', () => {
    const uuid1 = randomUUID();
    const uuid2 = randomUUID();
    expect(uuid1).not.toEqual(uuid2);
});