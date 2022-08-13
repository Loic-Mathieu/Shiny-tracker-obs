import {Hunt} from '../models/hunt';

export default class StatisticUtils {
	/**
	 * Shiny Pokémon = {1}
	 * Non shiny Pokémon = {2, 3, 4, ..., <hunt.odds>}
	 * P[Shiny] = 1 / <hunt.odds>
	 * P[Non Shiny] = (1 - P[shiny])
	 *
	 * N = <hunt.encounterNumber>
	 * P[Shiny] after N tries = 1 - (P[Non Shiny] ^ N)
	 *
	 * @return P[Shiny] after N tries, string format
	 */
	public static calculateProbability(hunt: Hunt): string {
		const baseRate = (1 / hunt.odds);
		const shinyChances = (1 - Math.pow((1 - baseRate), hunt.encounterNumber));
		return (shinyChances * 100).toFixed(2);
	}
}
