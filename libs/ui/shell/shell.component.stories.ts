import {Component} from '@angular/core';
import {RouterTestingModule} from '@angular/router/testing';
import {RimeRoutes, RimeShellLogo} from '@ngx-rime/ui/shell';
import {Meta, moduleMetadata, Story} from '@storybook/angular';
import {RimeShellModule} from './shell.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RimeUserAccountPopupModule} from '../user-account-popup/user-account-popup.module';

const logoTemplate = {
  src: 'https://raw.githubusercontent.com/rime-dev/ngx-rime/main/images/ngx-rime-logo.png',
  alt: 'NGX-RIME APP'
};

const topRoutes = [
  {
    path: '/home',
    text: 'Home'
  },
  {
    path: '/tasks',
    text: 'Tasks'
  }
];


const sideRoutes = [
  {
    path: '/home',
    text: 'Home',
    icon: 'home',
    divider: true
  },
  {
    text: 'Tools',
    children: [
      {
        path: '/tasks',
        text: 'Tasks',
        icon: 'build'
      },
    ],
  },
  {
    divider: true,
  }
];

@Component({
  selector: 'rime-home-component',
  template: `
    <div class="container mx-auto">
      <span
        >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
        ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
        voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</span
      >
    </div>
  `,
})
class HomeComponent {}

@Component({
  selector: 'rime-tasks-component',
  template: `
    <div class="container mx-auto">
      <span
        >Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque
        laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi
        architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
        aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione
        voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
        consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et
        dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum
        exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi
        consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil
        molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?</span
      >
    </div>
  `,
})
class TasksComponent {}

@Component({
  selector: 'rime-shell-default',
  template: `<rime-shell
    [topRoutes]="topRoutes"
    [sideRoutes]="sideRoutes"
    [logo]="logo"
    [hasSidenav]="hasSidenav"
    [appName]="appName"
  >
    <button
      mat-button
      topBarItem
      color="primary"
      class="text-gray-700 dark:text-gray-200"
      *ngIf="showButton"
    >
      Home
    </button>
    <rime-user-account-popup
      *ngIf="showUserPopup"
      [userInfo]="user$ | async"
      [routes]="userRoutes"
    ></rime-user-account-popup>
    <router-outlet> </router-outlet>
  </rime-shell>`,
  styleUrls: ['../.storybook/styles.scss'],
})
class RimeShellDefaultComponent {
  appName = 'ngx-rime-app';
  topRoutes: RimeRoutes[] = [];
  sideRoutes: RimeRoutes[] = [];
  hasSidenav = false;
  showUserPopup = false;
  showButton = false;
}

export default {
  component: RimeShellDefaultComponent,
  decorators: [
    moduleMetadata({
      imports: [
        RimeShellModule,
        RouterTestingModule.withRoutes([
          {path: '', pathMatch: 'full', redirectTo: 'home'},
          {path: 'home', component: HomeComponent},
          {path: 'tasks', component: TasksComponent},
        ]),
        BrowserAnimationsModule,
        RimeUserAccountPopupModule,
      ],
    }),
  ],
  title: 'Shell',
  excludeStories: /.*Data$/,
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
    logo: logoTemplate,
  },
});

export const Default = Template.bind({});
Default.args = {
  task: {
    id: '1',
    title: 'Default state',
    state: 'DEFAULT',
    updatedAt: new Date(2022, 5, 22),
    logo: logoTemplate,
  },
};

export const TopMenu = Template.bind({});
TopMenu.args = {
  task: {
    id: '2',
    title: 'Default state',
    state: 'TopMenu',
    updatedAt: new Date(2022, 5, 22),
    logo: logoTemplate,
  },
  topRoutes: topRoutes,
  hasSidenav: false,
};

export const TopMenuWithButtons = Template.bind({});
TopMenuWithButtons.args = {
  task: {
    id: '3',
    title: 'Default state',
    state: 'TopMenu with buttons',
    updatedAt: new Date(2022, 5, 22),
    logo: logoTemplate,
  },
  topRoutes: topRoutes,
  hasSidenav: false,
  showUserPopup: true,
  showButton: false,
};

export const SideMenu = Template.bind({});
SideMenu.args = {
  task: {
    id: '4',
    title: 'Default state',
    state: 'SideMenu',
    updatedAt: new Date(2022, 5, 22),
    logo: logoTemplate,
  },
  sideRoutes: sideRoutes,
  hasSidenav: true,
};

export const SideMenuWithButtons = Template.bind({});
SideMenuWithButtons.args = {
  task: {
    id: '4',
    title: 'Default state',
    state: 'SideMenu',
    updatedAt: new Date(2022, 5, 22),
    logo: logoTemplate,
  },
  sideRoutes: sideRoutes,
  hasSidenav: true,
  showButton: true,
  showUserPopup: true,
};
