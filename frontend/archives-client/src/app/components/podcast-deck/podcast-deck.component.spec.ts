import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PodcastDeckComponent } from './podcast-deck.component';

describe('PodcastDeckComponent', () => {
  let component: PodcastDeckComponent;
  let fixture: ComponentFixture<PodcastDeckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PodcastDeckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PodcastDeckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
