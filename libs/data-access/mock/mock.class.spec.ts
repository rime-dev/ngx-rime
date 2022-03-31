import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RimeMock } from './mock.class';


const items: any[] = [
  {
    name: 'name1',
  },
  {
    name: 'name2',
  },
];

@Component({
  template: `<div *ngFor="let item of items"></div>`,
})
class ItemsMockedComponent {
  public items: any[] = [];
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
        providers: [RimeMock.provider(items)],
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
      httpClient.get('items').subscribe((data: any) => {
        expect(data).toEqual(items);
        done();
      });
    });
    it('should get an item', (done) => {
      httpClient.get('items/0').subscribe((data: any) => {
        expect(data[0]).toEqual(items[0]);
        done();
      });
    });
    it('should not get an unknown item', (done) => {
      httpClient.get('items/9').subscribe((data: any) => {
        expect(data.length).toEqual(0);
        done();
      });
    });
  });
  describe('POST', () => {
    it('should create an item', (done) => {
      httpClient.post('items', {name: 'name3'}).subscribe((data: any) => {
        expect(data.length).toBe(3);
        done();
      });
    });
    it('should update an item', (done) => {
      httpClient.post('items/0', {name: 'name11'}).subscribe((data: any) => {
        expect(data[0].name).toBe('name11');
        done();
      });
    });
    it('should not update any item if index not exists', (done) => {
      httpClient.post('items/9', {name: 'name99'}).subscribe((data: any) => {
        expect(data[9]).toBeUndefined();
        done();
      });
    });
  });
  describe('DELETE', () => {
    it('should delete an item', (done) => {
      httpClient.delete('items/1').subscribe((data: any) => {
        expect(data.length).toBe(2);
        done();
      });
    });
    it('should not delete an unknown item', (done) => {
      httpClient.delete('items/9').subscribe((data: any) => {
        expect(data.length).toBe(3);
        done();
      });
    });
  });
});
