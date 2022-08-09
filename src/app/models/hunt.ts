import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity({name: 'hunt'})
export class Hunt extends BaseEntity {
	/**
	 * Id
	 */
	@PrimaryGeneratedColumn('uuid')
	id: number;

	/**
	 * Name of the hunt
	 */
	@Column()
	name: string;

	/**
	 * Number of time the pokémon was encountered
	 */
	@Column()
	encounterNumber: number;

	/**
	 * Chance of getting a shiny
	 */
	@Column()
	odds: number;

	/**
	 * Whether the hunt is displayed or not
	 */
	@Column()
	enabled: boolean;
}
