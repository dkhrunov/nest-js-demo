import { ArgumentMetadata, Injectable, PipeTransform, Type } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';
import { ValidationException } from 'src/common/exceptions/validation.exception';

@Injectable()
export class CustomValidationPipe implements PipeTransform<any> {

	public async transform(value: any, { metatype }: ArgumentMetadata): Promise<any> {
		if (!metatype || !this.toValidate(metatype)) {
			return value;
		}

		const errors = await this.validate(value, metatype);

		if (errors.length) {
			let message = this.generateMessage(errors);
			throw new ValidationException(message);
		}

		return value;
	}

	private toValidate(metatype: Function): boolean {
		const types: Function[] = [String, Boolean, Number, Array, Object];

		return !types.includes(metatype);
	}

	private async validate(value: any, metatype: Type<any>): Promise<ValidationError[]> {
		const obj = plainToClass(metatype, value);
		const errors = await validate(obj);

		return errors;
	}

	private generateMessage(errors: ValidationError[]): Record<string, any> {
		return errors.reduce((obj, error) => {
			obj[error.property] = Object.values(error.constraints);

			return obj;
		}, {});
	}
}
