import { ReasonPhrases, StatusCodes } from "../utils/httpStatusCode.js";

class SuccessResponse {
	constructor({
		message,
		statusCode = StatusCodes.OK,
		reasonStatusCode = ReasonPhrases.OK,
		metatdata = {},
	}) {
		this.message = message || reasonStatusCode;
		this.statusCode = statusCode;
		this.metatdata = metatdata;
	}

	send(res, headers = {}) {
		return res.status(this.statusCode).json(this);
	}
}

export class OK extends SuccessResponse {
	constructor({ message, metatdata }) {
		super({ message, metatdata });
	}
}

export class CREATED extends SuccessResponse {
	constructor({
		options = {},
		message,
		metatdata,
		statusCode = StatusCodes.CREATED,
		reasonStatusCode = ReasonPhrases.CREATED,
	}) {
		super({ message, metatdata, statusCode, reasonStatusCode });
		this.options = options;
	}
}
