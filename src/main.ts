import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { CustomValidationPipe } from "./common/pipes/custom-validation.pipe";

async function start() {
	const PORT = process.env.PORT || 5000;
	const app = await NestFactory.create(AppModule);
	
	app.setGlobalPrefix('/v1/api');
	app.useGlobalPipes(new CustomValidationPipe());

	const config = new DocumentBuilder()
		.setTitle('Первое приложение на Nest.Js')
		.setDescription('Документация API методов')
		.setVersion('1.0.0')
		.setBasePath('/v1/api')
		.addBearerAuth()
		.build();

	const document = SwaggerModule.createDocument(app, config);
	
	SwaggerModule.setup('/v1/api', app, document);
	

	await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}

start();