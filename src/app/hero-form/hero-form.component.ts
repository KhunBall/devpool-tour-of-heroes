import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.scss']
})
export class HeroFormComponent implements OnInit {

  heroFormGroup = new UntypedFormGroup({
    id: new UntypedFormControl(),
    name: new UntypedFormControl()
  })

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')!);
    
    if (id) {
      this.heroService.getHero(id)
        .subscribe(hero => this.heroFormGroup.setValue(hero));
    }

  }

  onBack() {
    this.location.back();
  }

  onSave() {
    if (this.heroFormGroup.get('id')?.value) {
      this.heroService
        .updateHero(this.heroFormGroup.value)
        .subscribe(() => this.onBack());
    } else {
      this.heroService
        .addNewHero(this.heroFormGroup.value)
        .subscribe(() => this.onBack());
    }
  }
}
