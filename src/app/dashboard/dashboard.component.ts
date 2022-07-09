import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  heroes: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit(): void {
    // this.heroes = this.heroService.getHeroes().slice(1, 5);
    this.heroService.getHeroes()
      .subscribe(hs => this.heroes = hs.slice(1, 5));
  }

}
