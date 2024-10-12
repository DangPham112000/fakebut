export default {
	// 1xx Informational
	CONTINUE: "Continue",
	SWITCHING_PROTOCOLS: "Switching Protocols",
	PROCESSING: "Processing", // WebDAV; RFC 2518
	EARLY_HINTS: "Early Hints", // RFC 8297

	// 2xx Success
	OK: "OK",
	CREATED: "Created",
	ACCEPTED: "Accepted",
	NON_AUTHORITATIVE_INFORMATION: "Non-Authoritative Information",
	NO_CONTENT: "No Content",
	RESET_CONTENT: "Reset Content",
	PARTIAL_CONTENT: "Partial Content",
	MULTI_STATUS: "Multi-Status", // WebDAV; RFC 4918
	ALREADY_REPORTED: "Already Reported", // WebDAV; RFC 5842
	IM_USED: "IM Used", // RFC 3229

	// 3xx Redirection
	MULTIPLE_CHOICES: "Multiple Choices",
	MOVED_PERMANENTLY: "Moved Permanently",
	FOUND: "Found",
	SEE_OTHER: "See Other",
	NOT_MODIFIED: "Not Modified",
	USE_PROXY: "Use Proxy", // Deprecated
	TEMPORARY_REDIRECT: "Temporary Redirect",
	PERMANENT_REDIRECT: "Permanent Redirect", // RFC 7538

	// 4xx Client Errors
	BAD_REQUEST: "Bad Request",
	UNAUTHORIZED: "Unauthorized",
	PAYMENT_REQUIRED: "Payment Required",
	FORBIDDEN: "Forbidden",
	NOT_FOUND: "Not Found",
	METHOD_NOT_ALLOWED: "Method Not Allowed",
	NOT_ACCEPTABLE: "Not Acceptable",
	PROXY_AUTHENTICATION_REQUIRED: "Proxy Authentication Required",
	REQUEST_TIMEOUT: "Request Timeout",
	CONFLICT: "Conflict",
	GONE: "Gone",
	LENGTH_REQUIRED: "Length Required",
	PRECONDITION_FAILED: "Precondition Failed",
	PAYLOAD_TOO_LARGE: "Payload Too Large",
	URI_TOO_LONG: "URI Too Long",
	UNSUPPORTED_MEDIA_TYPE: "Unsupported Media Type",
	RANGE_NOT_SATISFIABLE: "Range Not Satisfiable",
	EXPECTATION_FAILED: "Expectation Failed",
	IM_A_TEAPOT: "I'm a teapot", // RFC 2324
	MISDIRECTED_REQUEST: "Misdirected Request", // RFC 7540
	UNPROCESSABLE_ENTITY: "Unprocessable Entity", // WebDAV; RFC 4918
	LOCKED: "Locked", // WebDAV; RFC 4918
	FAILED_DEPENDENCY: "Failed Dependency", // WebDAV; RFC 4918
	TOO_EARLY: "Too Early", // RFC 8470
	UPGRADE_REQUIRED: "Upgrade Required",
	PRECONDITION_REQUIRED: "Precondition Required", // RFC 6585
	TOO_MANY_REQUESTS: "Too Many Requests", // RFC 6585
	REQUEST_HEADER_FIELDS_TOO_LARGE: "Request Header Fields Too Large", // RFC 6585
	UNAVAILABLE_FOR_LEGAL_REASONS: "Unavailable For Legal Reasons", // RFC 7725

	// 5xx Server Errors
	INTERNAL_SERVER_ERROR: "Internal Server Error",
	NOT_IMPLEMENTED: "Not Implemented",
	BAD_GATEWAY: "Bad Gateway",
	SERVICE_UNAVAILABLE: "Service Unavailable",
	GATEWAY_TIMEOUT: "Gateway Timeout",
	HTTP_VERSION_NOT_SUPPORTED: "HTTP Version Not Supported",
	VARIANT_ALSO_NEGOTIATES: "Variant Also Negotiates", // RFC 2295
	INSUFFICIENT_STORAGE: "Insufficient Storage", // WebDAV; RFC 4918
	LOOP_DETECTED: "Loop Detected", // WebDAV; RFC 5842
	NOT_EXTENDED: "Not Extended", // RFC 2774
	NETWORK_AUTHENTICATION_REQUIRED: "Network Authentication Required", // RFC 6585
};
