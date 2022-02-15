import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProjectDocumentDialogComponent} from './project-document-dialog.component';

describe('ProjectDocumentDialogComponent', () => {
  let component: ProjectDocumentDialogComponent;
  let fixture: ComponentFixture<ProjectDocumentDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectDocumentDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDocumentDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
