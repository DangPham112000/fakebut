import _ from "lodash";

export const getInfoData = (fields = [], object = {}) => {
	return _.pick(object, fields);
};

export const getSelectData = (select = []) => {
	return Object.fromEntries(select.map((each) => [each, 1]));
};

export const getUnselectData = (select = []) => {
	return Object.fromEntries(select.map((each) => [each, 0]));
};

export const removeNullFromObject = (obj) => {
	const result = {};
	Object.keys(obj).map((key) => {
		if (obj[key] !== null) {
			result[key] = obj[key];
		}
	});

	return result;
};

/**
 *
 * @param {*} obj = {
 *  c: {
 *      e: 1,
 *      f: 2
 *  }
 * }
 * @returns {
 *  'c.e': 1,
 *  'c.f': 2
 * };
 */
export const parseNestedObject = (obj, parentKey = "", result = {}) => {
	for (let key in obj) {
		if (obj.hasOwnProperty(key)) {
			const newKey = parentKey ? `${parentKey}.${key}` : key;

			if (typeof obj[key] === "object" && obj[key] !== null) {
				parseNestedObject(obj[key], newKey, result);
			} else {
				result[newKey] = obj[key];
			}
		}
	}
	return result;
};
