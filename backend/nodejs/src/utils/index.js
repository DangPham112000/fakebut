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
