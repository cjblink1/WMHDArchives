import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PodcastManagementComponent } from './podcast-management.component';

describe('PodcastManagementComponent', () => {
  let component: PodcastManagementComponent;
  let fixture: ComponentFixture<PodcastManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PodcastManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PodcastManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
