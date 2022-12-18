import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuggestPokemonComponent } from './suggest-pokemon.component';

describe('SuggestPokemonComponent', () => {
  let component: SuggestPokemonComponent;
  let fixture: ComponentFixture<SuggestPokemonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuggestPokemonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuggestPokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
