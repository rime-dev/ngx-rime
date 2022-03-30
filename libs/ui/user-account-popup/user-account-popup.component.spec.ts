import {ComponentFixture, TestBed} from '@angular/core/testing';
import {UserAccountPopupComponent} from './user-account-popup.component';
import {UserAccountPopupModule} from './user-account-popup.module';
import {RouterTestingModule} from '@angular/router/testing';
describe('UserAccountPopupComponent', () => {
  let component: UserAccountPopupComponent;
  let fixture: ComponentFixture<UserAccountPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserAccountPopupComponent],
      imports: [UserAccountPopupModule, RouterTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAccountPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
