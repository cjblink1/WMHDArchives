import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpisodeCreateDetailComponent } from './episode-create-detail.component';

describe('EpisodeCreateDetailComponent', () => {
  let component: EpisodeCreateDetailComponent;
  let fixture: ComponentFixture<EpisodeCreateDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpisodeCreateDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpisodeCreateDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
