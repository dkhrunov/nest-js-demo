import { HttpException, HttpStatus } from "@nestjs/common";

export class ValidationException extends HttpException {
	public readonly message;

	constructor(message: string | Record<string, any>) {
		const response = {
			statusCode: HttpStatus.BAD_REQUEST,
			message,
		};

		super(response, HttpStatus.BAD_REQUEST);

		this.message = message;
	}
}