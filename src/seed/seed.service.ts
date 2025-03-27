import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios, { AxiosAdapter, AxiosInstance } from 'axios';
import { Model } from 'mongoose';
import { PokeResponse } from './interfaces/poke-response.interface';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';

@Injectable()
export class SeedService {

    // constructor(
    //   @InjectModel( Pokemon.name )
    //   private readonly pokemonModel: Model<Pokemon>,

    //   private readonly http: AxiosAdapter,
    // ) {}
    private readonly axios: AxiosInstance = axios
    constructor(
        @InjectModel(Pokemon.name)
        private readonly pokemonModel: Model<Pokemon>,
    ) { }

    async executedSeed() {
        await this.pokemonModel.deleteMany({});
        const { data } = await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=500');
        const pokemonToInsert: { name: string, no: number }[] = [];
        // data.results.forEach(async ({ name, url }) => {
        //     const segments = url.split('/');
        //     const no = +segments[segments.length - 2];
        //     console.log({ name, no })
        //     const pokemon = await this.pokemonModel.create({ name, no });
        // });
        data.results.forEach(({ name, url }) => {
            const segments = url.split('/');
            const no = +segments[segments.length - 2];
            pokemonToInsert.push({ name, no });
        });
        await this.pokemonModel.insertMany(pokemonToInsert);
        return "Seed executed";
    }
}
