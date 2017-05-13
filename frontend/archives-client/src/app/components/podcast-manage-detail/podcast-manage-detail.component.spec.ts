import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PodcastManageDetailComponent } from './podcast-manage-detail.component';

describe('PodcastManageDetailComponent', () => {
  let component: PodcastManageDetailComponent;
  let fixture: ComponentFixture<PodcastManageDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PodcastManageDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PodcastManageDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
