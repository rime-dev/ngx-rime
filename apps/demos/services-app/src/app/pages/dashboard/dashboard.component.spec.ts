import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatToolbarModule} from '@angular/material/toolbar';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {AuthTestingModule} from '@rng/data-access/auth';
import {BaseTestingModule} from '@rng/data-access/base';
import {ShellModule} from '@rng/ui/shell';
import {UserAccountPopupModule} from '@rng/ui/user-account-popup';
import {environment} from '../../../environments/environment';
import {firebaseConfig} from '../../app.module';
import {SearchInputModule} from '../../components/search-input/search-input.module';
import {ThemeSwitcherModule} from '../../components/theme-switcher/theme-switcher.module';
import {getTranslocoModule} from '../../transloco-root.module';
import {DashboardComponent} from './dashboard.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let authTestingModule: AuthTestingModule;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashboardComponent],
      imports: [
        RouterTestingModule,
        NoopAnimationsModule,
        AuthTestingModule,
        BaseTestingModule.firebase(firebaseConfig),
        MatButtonModule,
        MatToolbarModule,
        MatCardModule,
        MatSnackBarModule,
        getTranslocoModule(),
        UserAccountPopupModule,
        SearchInputModule,
        ThemeSwitcherModule,
        ShellModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    authTestingModule = TestBed.inject(AuthTestingModule);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
