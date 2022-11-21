import {Component} from '@angular/core';
import {RimeRoutes, RimeShellLogo} from '@ngx-rime/ui/shell';

@Component({
  selector: 'rime-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Task APP';
  logo: RimeShellLogo = {
    src: 'assets/ngx-rime-logo.png',
    alt: 'NGX-RIME APP',
  };
  topRoutes: RimeRoutes[] = [];
  sideRoutes: RimeRoutes[] = [
    {
      path: '/tasks',
      text: 'Tasks',
      icon: 'task',
      divider: true,
    },
    {
      path: '/events',
      text: 'Events',
      icon: 'event',
      divider: true,
    },
  ];
}
