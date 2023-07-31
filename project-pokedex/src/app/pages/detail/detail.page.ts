import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pokemon } from 'src/app/models/Pokemon';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { PokeapiService } from '../../services/pokeapi.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detail.page.html',
  styleUrls: ['./detail.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, HttpClientModule],
  providers: [PokeapiService]
})
export class DetailPage implements OnInit {

  pokemon: Pokemon | undefined;
  about = true;
  stats = false;
  evolution = false;

  constructor(private route: ActivatedRoute, private PokeapiService: PokeapiService) { }

  ngOnInit() {
    const pokemonId = this.route.snapshot.paramMap.get('id');
    if (pokemonId) {
      this.getPokemonById(pokemonId);
    }
  }

  getPokemonById(id: string) {
    this.PokeapiService.getPokemonById(id).subscribe(pokemon => {
      this.pokemon = pokemon;
    });
  }

  volver() {
    window.history.back();
  }
showAbout() {
  this.about = true;
  this.stats = false;
  this.evolution = false;
}
showStats() {
  this.about = false;
  this.stats = true;
  this.evolution = false;
}
showEvolution() {
  this.about = false;
  this.stats = false;
  this.evolution = true;
}



}