/**
 * Interfaces are based on PokéAPI rest api, it allows to retrieve information about Pokémon
 * https://pokeapi.co
 */

/**
 * https://pokeapi.co/docs/v2#pokemon
 */
export interface PokemonInterface {
	/**
	 * Pokédex number
	 */
	id: number;
	/**
	 * Default name (english)
	 */
	name: string;
	/**
	 * The sprites data
	 */
	sprites: Sprite;
}

/**
 * https://pokeapi.co/docs/v2#pokemon-species
 */
export interface PokemonDetails {
	/**
	 * Pokédex number
	 * ref to PokemonInterface
	 */
	id: number;
	/**
	 * Default name (english)
	 */
	name: string;
	/**
	 * Translated names
	 */
	names: {
		name: string;
		/**
		 * Link to the language
		 */
		language: NamedResource;
	}[];
}

/**
 * https://pokeapi.co/docs/v2#pokemonsprites
 */
export interface Sprite {
	/**
	 * Default shiny sprite
	 */
	front_shiny: string;
	/**
	 * Default female shiny sprite
	 */
	front_shiny_female: string | null;
	/**
	 * Other shiny sprites
	 */
	other: {
		/**
		 * Pokémon Home
		 * https://home.pokemon.com
		 */
		home: {
			front_shiny: string;
		}
	};
}

/**
 * https://pokeapi.co/docs/v2#named
 */
export interface NamedResourceList {
	count: number;
	next: string;
	previous: string;
	/**
	 * A list of shorted resources
	 */
	results: NamedResource[];
}

/**
 * https://pokeapi.co/docs/v2#namedapiresource
 */
export interface NamedResource {
	name: string;
	/**
	 * REST API url to fetch the complete resource
	 */
	url: string;
}
