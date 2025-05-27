import { describe, expect, it } from "vitest";

import { getRandomVerbsOrder, getSortedVerbsOrder } from "../utils/utils.ts";
import data from "../data.json";

describe("Test utils", () => {
    it("test getRandomVerbsOrder", () => {
        const verbsOrder = getRandomVerbsOrder(500);
        const verbsOrderSet = new Set(verbsOrder);
        expect(verbsOrderSet.size).toEqual(500);
    });
    it("test getSortedVerbsOrder", () => {
        const verbsOrder = getSortedVerbsOrder(data);
        expect(verbsOrder?.length).toEqual(data.length);
    });
});
