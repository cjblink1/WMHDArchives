import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PodcastCreationComponent } from './podcast-creation.component';

describe('PodcastCreationComponent', () => {
  let component: PodcastCreationComponent;
  let fixture: ComponentFixture<PodcastCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PodcastCreationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PodcastCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
