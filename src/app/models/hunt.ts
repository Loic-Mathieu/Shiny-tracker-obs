import {BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn} from 'typeorm';

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
	@Column({unique: true})
	name: string;

	/**
	 * Number of time the pokémon was encountered
	 */
	@Column({default: 0})
	encounterNumber: number;

	/**
	 * Chance of getting a shiny
	 */
	@Column()
	odds: number;

	/**
	 * Whether the hunt is displayed or not
	 */
	@Column('boolean', {default: true})
	enabled: boolean;

	/**
	 * Creation date
	 */
	@CreateDateColumn()
	startDate: Date;

	/* ===== Saved PokeAPI data ===== */
	/**
	 * Reference to the Pokémon data
	 */
	@Column({nullable: true})
	pokemonId: number;

	/**
	 * The Pokémon name
	 */
	@Column({nullable: true})
	pokemonName: string;

	/**
	 * Shiny sprite
	 */
	@Column({nullable: true})
	pokemonSprite: string;
}
