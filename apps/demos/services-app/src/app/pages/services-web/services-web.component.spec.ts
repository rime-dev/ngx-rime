import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthTestingModule} from '@rng/data-access/auth';
import {BaseTestingModule} from '@rng/data-access/base';
import {ShellModule} from '@rng/ui/shell';
import {UserAccountPopupModule} from '@rng/ui/user-account-popup';
import {firebaseConfig} from '../../app.module';
import {FooterModule} from '../../components/footer/footer.module';
import {ThemeSwitcherModule} from '../../components/theme-switcher/theme-switcher.module';
import {getTranslocoModule} from '../../transloco-root.module';
import {ServicesWebComponent} from './services-web.component';

describe('ServicesWebComponent', () => {
  let component: ServicesWebComponent;
  let fixture: ComponentFixture<ServicesWebComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ServicesWebComponent],
      imports: [
        NoopAnimationsModule,
        BaseTestingModule.firebase(firebaseConfig),
        AuthTestingModule,
        RouterTestingModule,
        ShellModule,
        MatButtonModule,
        MatIconModule,
        MatRippleModule,
        MatCardModule,
        MatSelectModule,
        getTranslocoModule(),
        ReactiveFormsModule,
        MatInputModule,
        MatFormFieldModule,
        FormsModule,
        UserAccountPopupModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,
        FooterModule,
        ThemeSwitcherModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ServicesWebComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
