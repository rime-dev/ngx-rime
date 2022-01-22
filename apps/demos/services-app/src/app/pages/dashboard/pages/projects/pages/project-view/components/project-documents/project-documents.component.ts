import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
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

  constructor() {}

  ngOnInit(): void {
    this.filteredDocuments = this.documentsFormControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value))
    );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.project.documents.filter((option: any) =>
      option.title.toLowerCase().includes(filterValue)
    );
  }
}
