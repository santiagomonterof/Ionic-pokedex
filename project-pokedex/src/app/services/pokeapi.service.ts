import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokedex } from '../models/Pokedex';
import { Pokemon } from '../models/Pokemon';
import { PokemonWeaknesses } from '../models/PokemonWeakness';
import { Observable, map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {
  
  constructor(private https: HttpClient) { }

  getListPokemon() {
    return this.https.get<Pokedex>('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0');
  }

  getPokemonIndividual(url: string) {
    return this.https.get<Pokemon>(url);
  }

  getWeaknesses(url: string) {
    return this.https.get<PokemonWeaknesses>(url);
  }

  getPokemonGeneration(pokemon: Pokemon): Observable<string> {
    return this.https.get(pokemon.species.url).pipe(
      switchMap((species: any) => {
        return this.https.get(species.generation.url).pipe(
          map((generation: any) => {
            return generation.name;
          }));
      }));
  }

  getPokemonById(pokemonId: string) {
    return this.https.get<Pokemon>('httpss://pokeapi.co/api/v2/pokemon/' + pokemonId);
  }

  getPokemonData(id: string) {
    return this.https.get<Pokemon>('httpss://pokeapi.co/api/v2/pokemon/' + id);
  }

  getPokemonSpeciesData(speciesUrl: string) {
    return this.https.get(speciesUrl);
  }

  getEvolutionChainData(evolutionChainUrl: string) {
    return this.https.get(evolutionChainUrl);
  }

  getPokemonEvolutionChain(pokemon: Pokemon): Observable<any> {
    return this.https.get(pokemon.species.url).pipe(
      switchMap((species: any) => {
        return this.https.get(species.evolution_chain.url);
      }));
  }







}
