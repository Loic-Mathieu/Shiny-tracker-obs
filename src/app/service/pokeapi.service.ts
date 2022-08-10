import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {NamedResourceList, PokemonDetails, PokemonInterface} from '../models/pokemon.interface';

@Injectable({
	providedIn: 'root'
})
export class PokeApiService {

	private readonly DEFAULT_OFFSET = 0;
	private readonly DEFAULT_LIMIT = 100;

	private readonly pokeApiUrl = 'https://pokeapi.co/api/v2/';

	constructor(private http: HttpClient) {
	}

	/**
	 * Gets a paginated list of resources
	 * @param offset the starting id
	 * @param limit the number of entries
	 */
	findPokemon(offset: number = this.DEFAULT_OFFSET, limit: number = this.DEFAULT_LIMIT): Promise<NamedResourceList> {
		return this.http.get<NamedResourceList>(`${this.pokeApiUrl}/pokemon?offset=${offset}&limit=${limit}`).toPromise();
	}

	/**
	 * Gets Pokémon by id
	 * @param dexId the pokédex number
	 */
	getPokemonById(dexId: number): Promise<PokemonInterface> {
		return this.http.get<PokemonInterface>(`${this.pokeApiUrl}/pokemon/${dexId}`).toPromise();
	}

	/**
	 * Gets Pokémon by uri
	 * @param uri the uri of the REST endpoint
	 */
	getPokemonByUri(uri: string): Promise<PokemonInterface> {
		return this.http.get<PokemonInterface>(uri).toPromise();
	}

	/**
	 * Gets a paginated list of resources
	 * @param offset the starting id
	 * @param limit the number of entries
	 */
	findPokemonDetails(offset: number = this.DEFAULT_OFFSET, limit: number = this.DEFAULT_LIMIT): Promise<NamedResourceList> {
		return this.http.get<NamedResourceList>(`${this.pokeApiUrl}/pokemon-species?offset=${offset}&limit=${limit}`).toPromise();
	}

	/**
	 * Gets pokémon extra info by id
	 * @param dexId the pokédex number
	 */
	getPokemonDetailsById(dexId: number): Promise<PokemonDetails> {
		return this.http.get<PokemonDetails>(`${this.pokeApiUrl}/pokemon-species/${dexId}`).toPromise();
	}

}
