import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger"
import { ValidationPipe } from "@nestjs/common"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const config = new DocumentBuilder().setTitle('Amigo Secreto').
  setDescription("API de Sorteio para Amigo Secreto").setVersion('0.1').addTag('amigosecreto').build()

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api',app, documentFactory)

  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }))
  await app.listen(process.env.PORT || 3000)
}
bootstrap()
