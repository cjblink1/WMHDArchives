import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpisodeManagementComponent } from './episode-management.component';

describe('EpisodeManagementComponent', () => {
  let component: EpisodeManagementComponent;
  let fixture: ComponentFixture<EpisodeManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpisodeManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpisodeManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
