import { describe, expect, it } from "vitest";

import {
  getRandomVerbsOrder,
  getSortedVerbsOrder,
  searchVerbs,
} from "../utils/utils.ts";
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
  it("test searchVerbs when search in russian and search string length > 1", () => {
    const [results, lang] = searchVerbs(data, "де");
    expect(results?.length).toBeGreaterThan(0);
  });
  it("test searchVerbs when search in russian and search string length = 1", () => {
    const [results, lang] = searchVerbs(data, "д");
    expect(results?.length).toBeGreaterThan(0);
  });
  it("test searchVerbs when search in romanian and search string length > 1", () => {
    const [results, lang] = searchVerbs(data, "îm");
    expect(results?.length).toBeGreaterThan(0);
  });
  it("test searchVerbs when search in romanian and search string length = 1", () => {
    const [results, lang] = searchVerbs(data, "î");
    expect(results?.length).toBeGreaterThan(0);
  });
  it("test searchVerbs when search string is empty", () => {
    const [results, lang] = searchVerbs(data, "");
    expect(results?.length).toEqual(0);
  });
  it("test searchVerbs when search results equals zero", () => {
    const [results, lang] = searchVerbs(data, "uytueyterutyeuity");
    expect(results?.length).toEqual(0);
  });
});
