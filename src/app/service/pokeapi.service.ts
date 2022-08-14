import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NamedResourceList, PokemonDetails, PokemonInterface} from '../models/pokemon.interface';
import {Observable} from 'rxjs';
import {flatMap} from 'rxjs/internal/operators';
import {map} from 'rxjs/operators';

// REST options
const DEFAULT_LIMIT = 100;

// Cache keys
const POKEMON_LIST = 'POKEMON_LIST';
const POKEMON_DETAILS_LIST = 'POKEMON_DETAILS_LIST';
const POKEMON = 'POKEMON';
const POKEMON_DETAILS = 'POKEMON_DETAILS';

@Injectable({
	providedIn: 'root'
})
export class PokeApiService {

	private readonly POKE_API_URL = 'https://pokeapi.co/api/v2/';

	private cache: Map<string, Observable<any>> = new Map();

	constructor(private http: HttpClient) {
	}

	/* ==== Pokémon ==== */
	/**
	 * Gets a list of Pokémon ref
	 * @param fetchNext will search for the next results if there is one
	 */
	findPokemonList(fetchNext: boolean = false): Observable<NamedResourceList> {
		if (!this.cache.has(POKEMON_LIST)) {
			console.log('I do not have data');
			this.cache.set(POKEMON_LIST, this.http.get<NamedResourceList>(`${this.POKE_API_URL}/pokemon?limit=${DEFAULT_LIMIT}`));
		} else if (fetchNext) {
			console.log('Fetching next...');
			this.cache.set(POKEMON_LIST, this.findNextResults(POKEMON_LIST));
		}
		return this.cache.get(POKEMON_LIST);
	}

	/**
	 * Gets Pokémon by id
	 * @param dexId the pokédex number
	 */
	getPokemonById(dexId: number): Promise<PokemonInterface> {
		return this.http.get<PokemonInterface>(`${this.POKE_API_URL}/pokemon/${dexId}`).toPromise();
	}

	/**
	 * Gets Pokémon by uri
	 * @param uri the uri of the REST endpoint
	 */
	getPokemonByUri(uri: string): Promise<PokemonInterface> {
		return this.http.get<PokemonInterface>(uri).toPromise();
	}

	/* ==== Pokémon details ==== */
	/**
	 * Gets a list of Pokémon details ref
	 * @param fetchNext will search for the next results if there is one
	 */
	findPokemonDetailsList(fetchNext: boolean = false): Observable<NamedResourceList> {
		if (!this.cache.has(POKEMON_DETAILS_LIST)) {
			this.cache.set(POKEMON_DETAILS_LIST, this.http.get<NamedResourceList>(`${this.POKE_API_URL}/pokemon-species?limit=${DEFAULT_LIMIT}`));
		} else if (fetchNext) {
			this.cache.set(POKEMON_DETAILS_LIST, this.findNextResults(POKEMON_DETAILS_LIST));
		}
		return this.cache.get(POKEMON_DETAILS_LIST);
	}

	/**
	 * Gets pokémon extra info by id
	 * @param dexId the pokédex number
	 */
	getPokemonDetailsById(dexId: number): Promise<PokemonDetails> {
		return this.http.get<PokemonDetails>(`${this.POKE_API_URL}/pokemon-species/${dexId}`).toPromise();
	}

	/* ==== Find next ==== */
	private findNextResults(key: string): Observable<NamedResourceList> {
		return this.cache.get(key).pipe(flatMap((cachedList: NamedResourceList) => {
			// If there is no more data to fetch
			if (!cachedList.next) {
				return this.cache.get(key);
			}
			// Keep existing data
			return this.http.get(cachedList.next).pipe(map((nextList: NamedResourceList) => {
				nextList.results = [...cachedList.results, ...nextList.results];
				return nextList;
			}));
		}));
	}

}
