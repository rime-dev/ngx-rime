import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {DataService} from '@rng/data-access/base';
import {EntityState} from '@rng/data-access/base/models/base.model';
import {Observable} from 'rxjs';
import {Activity} from '../../models/activity.model';
import {UserInfo} from '@rng/ui/user-account-popup';
import {AuthService, User as UserAuth} from '@rng/data-access/auth';
import {log$} from '../../decorators/log.decorator';

@Component({
  selector: 'rng-services-web',
  templateUrl: './services-web.component.html',
  styleUrls: ['./services-web.component.scss'],
})
export class ServicesWebComponent implements OnInit {
  public appName = 'E-LARES';
  public logo = {
    src: 'assets/rng-logo.png',
    alt: 'E-LARES',
  };
  public topRoutes = [];
  public activities$!: Observable<EntityState<Activity>[] | null>;
  public requestServiceForm: FormGroup;
  public userRoutes = [
    {
      click: async () => {
        await this.authService.signOut();
      },
      text: 'Logout',
      icon: 'logout',
    },
  ];
  public user$!: Observable<UserInfo | null>;
  @log$ public userAuth$: Observable<UserAuth | null>;

  constructor(private dataService: DataService, private authService: AuthService) {
    this.requestServiceForm = new FormGroup({
      activity: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
    this.userAuth$ = this.authService.user$;
  }

  ngOnInit(): void {
    this.activities$ = this.dataService.select<Activity>('Activity').entities$;
    this.dataService.select<Activity>('Activity').getAll();
  }
}
