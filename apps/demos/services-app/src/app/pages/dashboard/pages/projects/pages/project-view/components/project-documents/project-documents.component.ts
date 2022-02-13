import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {UploaderComponent} from '@rng/data-access/storage/components/uploader/uploader.component';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
@Component({
  selector: 'rng-project-documents',
  templateUrl: './project-documents.component.html',
  styleUrls: ['./project-documents.component.scss'],
})
export class ProjectDocumentsComponent implements OnInit {
  public filteredDocuments!: Observable<any[]>;
  public documentsFormControl = new FormControl([]);

  @Input()
  get project() {
    return this.internalProject;
  }
  set project(value: any) {
    this.internalProject = value;
  }
  private internalProject: any = {};

  constructor(private matDialog: MatDialog) {}

  ngOnInit(): void {
    this.filteredDocuments = this.documentsFormControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }

  addDocument() {
    this.matDialog.open(UploaderComponent, {data: {path: 'projects'}});
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.project.data.documents.filter((option: any) =>
      option.title.toLowerCase().includes(filterValue)
    );
  }
}
