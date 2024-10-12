import { ReasonPhrases, StatusCodes } from "../utils/httpStatusCode.js";

class ErrorResponse extends Error {
	constructor(message, statusCode) {
		super(message);
		this.statusCode = statusCode;
	}
}

export class ConflictRequestError extends ErrorResponse {
	constructor(
		message = ReasonPhrases.CONFLICT,
		statusCode = StatusCodes.CONFLICT
	) {
		super(message, statusCode);
	}
}

export class BadRequestError extends ErrorResponse {
	constructor(
		message = ReasonPhrases.FORBIDDEN,
		statusCode = StatusCodes.FORBIDDEN
	) {
		super(message, statusCode);
	}
}

export class AuthFailureError extends ErrorResponse {
	constructor(
		message = ReasonPhrases.UNAUTHORIZED,
		statusCode = StatusCodes.UNAUTHORIZED
	) {
		super(message, statusCode);
	}
}
