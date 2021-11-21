import {Component} from '@angular/core';

@Component({
  selector: 'rng-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'rng-app';
  logo = {
    src: 'assets/rng-logo.png',
    alt: 'RNG APP',
  };
  topRoutes = [
    {
      path: '/home',
      text: 'Home',
    },
  ];
  sideRoutes = [
    {
      path: '/home',
      text: 'Home',
      icon: 'home',
      divider: true,
    },
    {
      text: 'Tools',
      children: [
        {
          path: '/tools/1',
          text: 'Tool 1',
          icon: 'build',
        },
        {
          path: '/tools/2',
          text: 'Tool 2',
          icon: 'build',
        },
      ],
    },
    {
      divider: true,
    },
  ];
  userRoutes = [
    {
      click: () => {
        alert('logout');
      },
      text: 'Logout',
      icon: 'logout',
    },
  ];
  userInfo = {
    name: 'Name',
    lastname: 'Lastname',
    // eslint-disable-next-line max-len
    avatar: `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80`,
    email: 'email.email.com',
  };
}
