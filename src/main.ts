import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule); // return a express instance
    await app.listen(3000);
}
bootstrap();
