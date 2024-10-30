import { describe, expect, it } from "vitest";
import {
	getInfoData,
	getSelectData,
	getUnselectData,
	parseNestedObject,
	removeNullFromObject,
} from "../../src/utils/index.js";

describe("Utils", () => {
	describe("getInfoData", () => {
		it("should get correctly picked fields from object", () => {
			const obj = {
					a: 1,
					b: 2,
					c: 3,
					d: 4,
				},
				picked = ["b", "d"],
				expected = { b: 2, d: 4 };
			const result = getInfoData(picked, obj);
			expect(result).toEqual(expected);
		});
		it("should not pick not exist field", () => {
			const obj = {
					a: 1,
					b: 2,
				},
				picked = ["a", "c"],
				expected = { a: 1 };
			const result = getInfoData(picked, obj);
			expect(result).toEqual(expected);
		});
		it("should return empty obj when empty params", () => {
			const expected = {};
			const result = getInfoData();
			expect(result).toEqual(expected);
		});
		it("should return empty obj if not pick anything", () => {
			const obj = {
					a: 1,
					b: 2,
				},
				expected = {};
			const result = getInfoData(null, obj);
			expect(result).toEqual(expected);
		});
	});
	describe("getSelectData", () => {
		it("should return expected result", () => {
			const selected = ["a", "d"],
				expected = {
					a: 1,
					d: 1,
				};
			const result = getSelectData(selected);

			expect(result).toEqual(expected);
		});
		it("should return empty obj when selected is empty", () => {
			const expected = {};
			const result = getSelectData();

			expect(result).toEqual(expected);
		});
	});
	describe("getUnselectData", () => {
		it("should return expected result", () => {
			const unselected = ["a", "d"],
				expected = {
					a: 0,
					d: 0,
				};
			const result = getUnselectData(unselected);

			expect(result).toEqual(expected);
		});
		it("should return empty obj when unselected is empty", () => {
			const expected = {};
			const result = getUnselectData();

			expect(result).toEqual(expected);
		});
	});
	describe("removeNullFromObject", () => {
		it("should remove null attribute from object", () => {
			const obj = {
					a: null,
					b: 1,
					c: 0,
					d: undefined,
				},
				expected = {
					b: 1,
					c: 0,
					d: undefined,
				};
			const result = removeNullFromObject(obj);
			expect(result).toEqual(expected);
		});
		it("should not remove null of nested obj", () => {
			const obj = {
					a: null,
					b: 1,
					c: {
						d: 1,
						e: null,
					},
				},
				expected = {
					b: 1,
					c: {
						d: 1,
						e: null,
					},
				};
			const result = removeNullFromObject(obj);
			expect(result).toEqual(expected);
		});
	});
	describe("parseNestedObject", () => {
		it("should parse 3lv nested obj to 1lv obj", () => {
			const obj = {
					parentK: {
						childK1: 1,
						childK2: 2,
						childK3: {
							cck: 4,
							cck2: 5,
						},
					},
					parentK2: 3,
				},
				expected = {
					"parentK.childK1": 1,
					"parentK.childK2": 2,
					"parentK.childK3.cck": 4,
					"parentK.childK3.cck2": 5,
					parentK2: 3,
				};
			const result = parseNestedObject(obj);
			expect(result).toEqual(expected);
		});
	});
});
