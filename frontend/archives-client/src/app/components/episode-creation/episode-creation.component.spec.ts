import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpisodeCreationComponent } from './episode-creation.component';

describe('EpisodeCreationComponent', () => {
  let component: EpisodeCreationComponent;
  let fixture: ComponentFixture<EpisodeCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpisodeCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpisodeCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
