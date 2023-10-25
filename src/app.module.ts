import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './module/auth/auth.module';
import { JwtAuthService } from './services/jwt.service';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: '12345',
      signOptions: { expiresIn: '3d' },
    }),
    MongooseModule.forRoot('mongodb+srv://1102lequoctuan:pass@cluster0.ic0tt4u.mongodb.net/'),AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
