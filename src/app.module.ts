import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { EnvConfiguration } from './config/env.config';
@Module({
    imports: [
        
        ConfigModule.forRoot({
            load: [EnvConfiguration]
        }),

        ServeStaticModule.forRoot({rootPath: join(__dirname,'..','public'),}),
        
        MongooseModule.forRoot(process.env.MONGODB ||'mongodb://localhost:27017/nest-pokemon'),

        PokemonModule,

        CommonModule,

        SeedModule
    ]
})
export class AppModule { 
    constructor(){
        console.log(process.env, process.env.MONGODB)
    }
}
