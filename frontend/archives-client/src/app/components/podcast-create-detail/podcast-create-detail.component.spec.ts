import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PodcastCreateDetailComponent } from './podcast-create-detail.component';

describe('PodcastCreateDetailComponent', () => {
  let component: PodcastCreateDetailComponent;
  let fixture: ComponentFixture<PodcastCreateDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PodcastCreateDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PodcastCreateDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
