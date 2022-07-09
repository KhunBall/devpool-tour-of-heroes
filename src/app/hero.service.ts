import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, of, throwError } from 'rxjs';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  baseUrl = 'http://localhost:8080/heroes'

  constructor(private httpClient: HttpClient) { }

  // void => Hero[]
  // getHeroes(): Hero[] {
  //   return HEROES;
  // }

  // void => Observable<Hero[]>
  getHeroes(): Observable<Hero[]> {
    // return of(HEROES).pipe(delay(500));
    // return throwError(() => ({ status: 404, message: 'Not found' }));
    return this.httpClient
      .get<Hero[]>(this.baseUrl)
  }

  // id: number => hero: Observable<Hero>
  getHero(id: number): Observable<Hero> {
    // const hero = HEROES.find(hero => hero.id === id)!;
    // return of(hero);
    return this.httpClient
      .get<Hero>(this.baseUrl + '/' + id)
  }

  updateHero(hero: Hero): Observable<Hero> {
    return this.httpClient
      .put<Hero>(this.baseUrl + '/' + hero.id, hero);
  }

  addNewHero(hero: Hero): Observable<Hero> {
    return this.httpClient
      .post<Hero>(this.baseUrl, hero);
  }

  deleteHero(id: number): Observable<void> {
    return this.httpClient
      .delete<void>(this.baseUrl + '/' + id);
  }

  searchHero(term: string): Observable<Hero[]> {
    return this.httpClient
      .get<Hero[]>(this.baseUrl + '?q=' + term)
  }

}
