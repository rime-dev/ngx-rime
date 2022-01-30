import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoProjectsComponent } from './info-projects.component';

describe('InfoProjectsComponent', () => {
  let component: InfoProjectsComponent;
  let fixture: ComponentFixture<InfoProjectsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoProjectsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
