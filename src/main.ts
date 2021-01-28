import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RedocModule, RedocOptions } from 'nestjs-redoc';
import * as hood from 'hood';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const options = new DocumentBuilder().setTitle('NSBE | KNUST').setVersion('1.0').build();
  const document = SwaggerModule.createDocument(app, options);
  const redocOptions: RedocOptions = {
    title: 'NSBE | KNUST api docs',
    sortPropsAlphabetically: true,
    hideDownloadButton: false,
    hideHostname: false,
  };
  await RedocModule.setup('/api', app, document, redocOptions);
  const corsOptions = {
    'origin': '*',
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false,
    'optionsSuccessStatus': 204,
    'credentials': true,
    'Access-Control-Allow-Origin': '*',
  };
  // app.use(helmet());
  app.use(hood());
  app.use(hood.header({}));
  app.enableCors(corsOptions);

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT, '0.0.0.0');
}

bootstrap();
