import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'pokedex';
  apiURL: string = 'https://pokeapi.co/api/v2';
  lista: any = [];
  pokemon: any;
  pagina = 0
  proximo: string = `${this.apiURL}/pokemon?offset=${this.pagina * 20}`;
  
  constructor(private http: HttpClient) { }

  listarTudo() {
    this.http.get(`${this.apiURL}/pokemon?offset=${this.pagina * 20}`).subscribe((resultado: any) => {
      this.lista = resultado.results;
      
      console.log(resultado);
      
      for (let index = 0; index < this.lista.length; index++) {
        this.http.get(this.lista[index].url).subscribe((imagem: any) => {
          this.lista[index].imagem = imagem.sprites.front_default
          
        });
      }

    });
  }

  proximapagina(){
    this.pagina++
    this.listarTudo();
  }
  paginaanterior(){
    this.pagina--
    this.listarTudo();
  }
  pegarpokemon(nomepokemon:string){
    this.http.get(`${this.apiURL}/pokemon/${nomepokemon}`).subscribe((name: any) => {
      console.log(name);
      this.pokemon=name;
    });
  }
}

