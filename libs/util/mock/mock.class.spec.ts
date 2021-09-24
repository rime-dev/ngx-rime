import {Component} from '@angular/core';
import {ComponentFixture, getTestBed, TestBed, waitForAsync} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';

import {Mock} from './mock.class';
import {CommonModule} from '@angular/common';
import {HttpClient} from '@angular/common/http';

const items: any[] = [
  {
    name: 'name',
  },
  {
    name: 'name',
  },
];

@Component({
  template: `<div *ngFor="let item of items"></div>`,
})
class ItemsMockedComponent {
  public items: any[] = [];
  constructor(private httpClient: HttpClient) {}
  getItems() {
    return this.httpClient.get('items');
  }
}

describe('Mock', () => {
  let fixture: ComponentFixture<ItemsMockedComponent>;
  let componentEl: HTMLElement;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ItemsMockedComponent],
        imports: [CommonModule, HttpClientTestingModule],
        providers: [Mock.provider(items)],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsMockedComponent);
    componentEl = fixture.nativeElement;
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });
  it('should compile', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
  describe('GET', () => {
    it('should get all items', (done) => {
      httpClient.get('items').subscribe((data) => {
        expect(data).toEqual(items);
        done();
      });
    });
  });
});
