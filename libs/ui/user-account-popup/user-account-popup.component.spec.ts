import {ComponentFixture, TestBed} from '@angular/core/testing';
import {RimeUserAccountPopupComponent} from './user-account-popup.component';
import {RimeUserAccountPopupModule} from './user-account-popup.module';
import {RouterTestingModule} from '@angular/router/testing';
describe('RimeUserAccountPopupComponent', () => {
  let component: RimeUserAccountPopupComponent;
  let fixture: ComponentFixture<RimeUserAccountPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RimeUserAccountPopupComponent],
      imports: [RimeUserAccountPopupModule, RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RimeUserAccountPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
