import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RaidPokemonComponent } from './raid-pokemon.component';

describe('RaidPokemonComponent', () => {
  let component: RaidPokemonComponent;
  let fixture: ComponentFixture<RaidPokemonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RaidPokemonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RaidPokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
