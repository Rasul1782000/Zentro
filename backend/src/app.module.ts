import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PropertiesModule } from './properties/properties.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ScraperModule } from './scraper/scraper.module';
import { Property } from './properties/entities/property.entity';
import { User } from './users/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: 'localhost',
        port: 3306,
        username: 'root',
        password: '', // Default XAMPP password is empty
        database: 'zentro',
        entities: [Property, User],
        autoLoadEntities: true,
        synchronize: true, // Only for development
      }),
      inject: [ConfigService],
    }),
    PropertiesModule,
    UsersModule,
    AuthModule,
    ScraperModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
