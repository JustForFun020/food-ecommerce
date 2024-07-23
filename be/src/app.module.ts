import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';

import { DatabaseModule } from './database/database.module';
import { GqlAuthGuard } from './common/guard/gql-auth.guard';
import { CategoriesModule } from './modules/categories/categories.module';
import { ProductModule } from './modules/product/product.module';
import { CartModule } from './modules/cart/cart.module';
import { RateModule } from './modules/rate/rate.module';
import { StaticModule } from './modules/serve-static/serve-static.module';
import { UserModule } from './modules/user/user.module';
import { InvoiceModule } from './modules/invoice/invoice.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req }) => ({ req }),
    }),
    StaticModule,
    AuthModule,
    DatabaseModule,
    CategoriesModule,
    ProductModule,
    CartModule,
    RateModule,
    UserModule,
    InvoiceModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: GqlAuthGuard,
    },
  ],
})
export class AppModule {}
