import {PokemonInterface} from '../models/pokemon.interface';

export default class SpriteUtils {
	/**
	 * Gets the sprite to display
	 * @param pokemon the target Pokémon
	 */
	public static getSprite(pokemon: PokemonInterface): string {
		if (!pokemon || !pokemon.sprites) {
			return null;
		}

		return pokemon.sprites.front_shiny;
	}
}
