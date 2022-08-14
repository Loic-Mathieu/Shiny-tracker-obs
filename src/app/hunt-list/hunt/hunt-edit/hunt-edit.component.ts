import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {NamedResource, NamedResourceList, PokemonInterface} from '../../../models/pokemon.interface';
import {PokeApiService} from '../../../service/pokeapi.service';
import {map, startWith} from 'rxjs/operators';
import {Hunt} from '../../../models/hunt';
import SpriteUtils from '../../../utils/spriteUtils';

@Component({
	selector: 'app-hunt-edit',
	templateUrl: './hunt-edit.component.html',
	styleUrls: ['./hunt-edit.component.css']
})
export class HuntEditComponent implements OnInit {

	@Input()
	displayStatOptions = false;
	selectedPokemon: PokemonInterface;
	searchingPokemon: boolean;
	form: FormGroup;
	filteredOptions: Observable<NamedResource[]>;
	pokemonResourceList: NamedResourceList = null;
	@Input()
	private hunt: Hunt;

	constructor(private formBuilder: FormBuilder, private pokeApiService: PokeApiService) {
	}

	public get valid(): boolean {
		return this.form.valid && !this.searchingPokemon;
	}

	public get pokemonOptions(): NamedResource[] {
		return this.pokemonResourceList.results;
	}

	public get displaySprite(): string {
		return SpriteUtils.getSprite(this.selectedPokemon);
	}

	public get isPokemonCorrectlySelected(): boolean {
		return this.selectedPokemon != null || !this.form.get('pokemon').touched || this.searchingPokemon;
	}

	ngOnInit(): void {
		this.initForm();
		this.setUpPokemonField();
	}

	public buildHunt(): Hunt {
		const hunt = new Hunt();
		hunt.name = this.form.get('name').value;
		hunt.encounterNumber = (this.form.get('encounters').value && this.form.get('encounters').valid)
			? this.form.get('encounters').value : 0;
		hunt.odds = this.form.get('odds').value;

		if (this.selectedPokemon) {
			// TODO update sprite data
		}

		return hunt;
	}

	public updatePokemonResource(pokemonResource: NamedResource): void {
		if (!pokemonResource) {
			this.selectedPokemon = null;
			return;
		}
		this.searchingPokemon = true;

		// TODO cache value
		// Save Pokémon if there is one
		this.pokeApiService.getPokemonByUri(pokemonResource.url).then(pokemon => {
			this.selectedPokemon = pokemon;
			this.searchingPokemon = false;
		});
	}

	public displayFn(user: NamedResource): string {
		return user && user.name ? user.name : '';
	}

	private initForm(): void {
		if (this.hunt) {

		}

		this.form = this.formBuilder.group({
			name: ['', Validators.required],
			pokemon: [''],
			generation: [''],
			encounters: [null, Validators.required],
			odds: [null, Validators.required],
		});
	}

	private setUpPokemonField(): void {
		this.searchingPokemon = false;
		// TODO Optimize fetching and load more if needed
		this.fetchNextOptions().then(() => {
			this.filteredOptions = this.form.get('pokemon').valueChanges.pipe(
				startWith(''),
				map(value => {
					// When field is empty
					if (!value) {
						this.updatePokemonResource(null);
						return this.pokemonOptions;
					}

					// When text is entered
					if (typeof value === 'string') {
						this.updatePokemonResource(null);
						return this.filter(value);
					}

					// When value is selected
					this.updatePokemonResource(value);
					return this.filter(value.name);
				}),
			);
		});
	}

	private fetchNextOptions(): Promise<void> {
		return new Promise<void>(resolve => {
			if (!this.pokemonResourceList) {
				// Fetch first results
				this.pokeApiService.findPokemon().then(resourceList => {
					this.pokemonResourceList = resourceList;
					resolve();
				});
			} else if (!this.pokemonResourceList.next) {
				// No more results
				resolve();
			} else {
				// Push new results
				this.pokeApiService.findResourceListByUri(this.pokemonResourceList.next).then(resourceList => {
					this.pokemonResourceList.results.push(...resourceList.results);
					resolve();
				});
			}
		});
	}

	private filter(value: string): NamedResource[] {
		const filterValue = value.toLowerCase();
		return this.pokemonOptions.filter(option => option.name.includes(filterValue));
	}
}
