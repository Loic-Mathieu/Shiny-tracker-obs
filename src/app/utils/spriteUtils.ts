import {PokemonInterface} from '../models/pokemon.interface';

export default class SpriteUtils {
	/**
	 * Gets the sprite to display
	 * @param pokemon the target Pokémon
	 * @param useFemaleSprite use the female sprite
	 */
	public static getSprite(pokemon: PokemonInterface, useFemaleSprite: boolean = false): string {
		if (!pokemon || !pokemon.sprites) {
			return null;
		}

		if (useFemaleSprite && SpriteUtils.hasFemaleSprite(pokemon)) {
			return pokemon.sprites.front_shiny_female;
		}

		return pokemon.sprites.front_shiny;
	}

	/**
	 * Check if there is a female sprite
	 * @param pokemon the target Pokémon
	 */
	public static hasFemaleSprite(pokemon: PokemonInterface): boolean {
		return pokemon != null && pokemon.sprites.front_shiny_female != null;
	}
}
