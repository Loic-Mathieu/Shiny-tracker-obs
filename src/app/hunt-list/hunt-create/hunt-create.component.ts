import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Hunt} from '../../models/hunt';
import {NamedResource, NamedResourceList} from '../../models/pokemon.interface';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {PokeApiService} from '../../service/pokeapi.service';

@Component({
    selector: 'app-hunt-create',
    templateUrl: './hunt-create.component.html',
    styleUrls: ['./hunt-create.component.css']
})
export class HuntCreateComponent implements OnInit {

    form: FormGroup;

    filteredOptions: Observable<NamedResource[]>;
    pokemonResourceList: NamedResourceList = null;

    constructor(private formBuilder: FormBuilder,
                private pokeApiService: PokeApiService,
                private dialogRef: MatDialogRef<HuntCreateComponent>,
                @Inject(MAT_DIALOG_DATA) private data) {
    }

    public get pokemonOptions(): NamedResource[] {
        return this.pokemonResourceList.results;
    }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            pokemon: [''],
            generation: [''],
            encounters: [0, Validators.required],
            odds: [0, Validators.required],
        });

        // TODO Optimize fetching and load more if needed
        this.fetchNextOptions().then(() => {
            // TODO rework filter to make it cleaner
            this.filteredOptions = this.form.get('pokemon').valueChanges.pipe(
                startWith(''),
                map(value => {
                    if (!value) {
                        return this.pokemonOptions;
                    }

                    const searchValue = typeof value === 'string' ? value : value.name;
                    return this.filter(searchValue);
                }),
            );
        });
    }

    public save(): void {
        if (this.form.dirty && !this.form.valid) {
            return;
        }

        const hunt = new Hunt();
        hunt.name = this.form.get('name').value;
        hunt.encounterNumber = (this.form.get('encounters').value && this.form.get('encounters').valid)
            ? this.form.get('encounters').value
            : 0;
        hunt.odds = this.form.get('odds').value;

        const selectedPokemonResource: NamedResource = this.form.get('pokemon').value as NamedResource;
        if (!selectedPokemonResource) {
            this.dialogRef.close({data: hunt});
        }

        // Save Pokémon if there is one
        this.pokeApiService.getPokemonByUri(selectedPokemonResource.url).then(pokemon => {
            hunt.pokemonId = pokemon.id;
            hunt.pokemonName = pokemon.name;
            hunt.pokemonSprite = pokemon.sprites.front_shiny;

            this.dialogRef.close({data: hunt});
        });
    }

    public cancel(): void {
        this.form.reset();
        this.dialogRef.close();
    }

    displayFn(user: NamedResource): string {
        return user && user.name ? user.name : '';
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
