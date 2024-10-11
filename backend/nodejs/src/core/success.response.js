const StatusCode = {
	OK: 200,
	CREATED: 201,
};

const ReasonStatusCode = {
	OK: "Success",
	CREATED: "Created",
};

class SuccessResponse {
	constructor({
		message,
		statusCode = StatusCode.OK,
		reasonStatusCode = ReasonStatusCode.OK,
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
		statusCode = StatusCode.CREATED,
		reasonStatusCode = ReasonStatusCode.CREATED,
	}) {
		super({ message, metatdata, statusCode, reasonStatusCode });
		this.options = options;
	}
}
