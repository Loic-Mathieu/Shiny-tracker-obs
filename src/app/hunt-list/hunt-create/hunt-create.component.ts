import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Hunt} from '../../models/hunt';
import {NamedResource} from '../../models/pokemon.interface';
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
    pokemonOptions: NamedResource[] = [
        {name: 'suicune', url: 'https://pokeapi.co/api/v2/pokemon/237'},
        {name: 'celebi', url: 'https://pokeapi.co/api/v2/pokemon/251'},
        {name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/30'}
    ];

    constructor(private formBuilder: FormBuilder,
                private pokeApiService: PokeApiService,
                private dialogRef: MatDialogRef<HuntCreateComponent>,
                @Inject(MAT_DIALOG_DATA) private data) {
    }

    ngOnInit(): void {
        this.form = this.formBuilder.group({
            name: ['', Validators.required],
            pokemon: [''],
            generation: [''],
            encounters: [0, Validators.required],
            odds: [0, Validators.required],
        });

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

    private filter(value: string): NamedResource[] {
        const filterValue = value.toLowerCase();
        return this.pokemonOptions.filter(option => option.name.includes(filterValue));
    }

}
