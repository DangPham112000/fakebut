const StatusCode = {
	FORBIDDEN: 403,
	CONFLICT: 409,
};

const ReasonStatusCode = {
	FORBIDDEN: "Bad request error",
	CONFLICT: "Conflict request error",
};

class ErrorResponse extends Error {
	constructor(message, statusCode) {
		super(message);
		this.statusCode = statusCode;
	}
}

export class ConflictRequestError extends ErrorResponse {
	constructor(
		message = ReasonStatusCode.CONFLICT,
		statusCode = StatusCode.CONFLICT
	) {
		super(message, statusCode);
	}
}

export class BadRequestError extends ErrorResponse {
	constructor(
		message = ReasonStatusCode.FORBIDDEN,
		statusCode = StatusCode.FORBIDDEN
	) {
		super(message, statusCode);
	}
}
