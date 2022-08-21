import {PokemonInterface} from '../models/pokemon.interface';

export default class SpriteUtils {
	// TODO this is temporary: !! I DO NOT OWN THIS ART !!
	public static readonly DEFAULT_SPRITE = 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/61fa90af-1869-47ec-a309-1d7ba72ef8fa/ddxeljk-32035ba6-b399-46f0-a98d-1c7ace1fe57f.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzYxZmE5MGFmLTE4NjktNDdlYy1hMzA5LTFkN2JhNzJlZjhmYVwvZGR4ZWxqay0zMjAzNWJhNi1iMzk5LTQ2ZjAtYTk4ZC0xYzdhY2UxZmU1N2YucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.PbUjV1ubvlK-Lu5_I-9JfqfnJ0TQzLMp-TjKPboIqEg';

	/**
	 * Gets the sprite to display
	 * @param pokemon the target Pokémon
	 * @param useFemaleSprite use the female sprite
	 */
	public static getSprite(pokemon: PokemonInterface, useFemaleSprite: boolean = false): string {
		if (!pokemon || !pokemon.sprites) {
			return SpriteUtils.DEFAULT_SPRITE;
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
