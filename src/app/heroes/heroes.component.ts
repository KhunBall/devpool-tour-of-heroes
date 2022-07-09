import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {



  heroes: Hero[]=[];

  message = '';

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    // this.heroes = this.heroService.getHeroes();

    // subscribe (next: fn) 
    // subscribe ({next: fn, error: fn, complete: fn}) 

    this.heroService.getHeroes()
      // .subscribe(hs => this.heroes = hs);
      .subscribe({
        next: hs => this.heroes = hs,
        error: err => this.message = err.message
      });
  }

  onDeleteHero(id: number) {
    this.heroService
      .deleteHero(id)
      .subscribe(
        () => this.heroes = this.heroes.filter(hero => hero.id !== id)
      );
  }

}
