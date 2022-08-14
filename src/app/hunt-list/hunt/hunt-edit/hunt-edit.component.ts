import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {NamedResource, NamedResourceList, PokemonInterface} from '../../../models/pokemon.interface';
import {PokeApiService} from '../../../service/pokeapi.service';
import {map} from 'rxjs/operators';
import {Hunt} from '../../../models/hunt';
import SpriteUtils from '../../../utils/spriteUtils';
import StringUtils from '../../../utils/stringUtils';

@Component({
	selector: 'app-hunt-edit',
	templateUrl: './hunt-edit.component.html',
	styleUrls: ['./hunt-edit.component.css']
})
export class HuntEditComponent implements OnInit {

	@Input() displayStatOptions = false;

	selectedPokemon: PokemonInterface;
	searchingPokemon: boolean;

	pokemonNameFilter: string;
	filteredOptions: Observable<NamedResource[]>;
	pokemonResourceList: NamedResourceList = null;
	form: FormGroup;
	@Input() private hunt: Hunt;

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

	public get isPokemonListComplete(): boolean {
		return !this.pokemonResourceList.next;
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

		// Save Pokémon if there is one
		this.pokeApiService.getPokemonByUri(pokemonResource.url).then(pokemon => {
			this.selectedPokemon = pokemon;
			this.searchingPokemon = false;
		});
	}

	public displayFn(user: NamedResource): string {
		return user && user.name ? user.name : '';
	}

	public scroll(): void {
		this.updateFilteredList(true);
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
		this.pokeApiService.findPokemonList().toPromise().then(resourceList => {
			this.pokemonResourceList = resourceList;
			this.updateFilteredList();
			this.form.get('pokemon').valueChanges.subscribe(value => {
				// When text or nothing is entered
				if (!value || typeof value === 'string') {
					this.updatePokemonResource(null);
					this.pokemonNameFilter = value;
				} else {
					// When value is selected
					this.updatePokemonResource(value);
					this.pokemonNameFilter = value.name;
				}

				this.updateFilteredList();
			});
		});
	}

	private updateFilteredList(loadMore: boolean = false): void {
		this.filteredOptions = this.pokeApiService.findPokemonList(loadMore).pipe(map(pokemonList => {
			this.pokemonResourceList = pokemonList;
			if (StringUtils.isEmpty(this.pokemonNameFilter)) {
				return this.pokemonOptions;
			}

			// Filter list
			const search = this.pokemonNameFilter.toLowerCase();
			const filteredList = this.pokemonOptions.filter(option => option.name.includes(search));

			// load more
			if (filteredList.length === 0 && !this.isPokemonListComplete) {
				this.updateFilteredList(true);
			}

			return filteredList;
		}));
	}
}
