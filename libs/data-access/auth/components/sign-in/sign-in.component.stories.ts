import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {Meta, moduleMetadata, Story} from '@storybook/angular';
import {RimeAuthComponentsModule, RimeAuthConfig} from '../../auth.module';
import {RIME_AUTH_CONFIG} from '../../models/auth.token';
import {RimeAuthTestingService} from '../../services/auth.mock.service';
import {RimeAuthService} from '../../services/auth.service';
import {RimeSignInComponent} from './sing-in.component';
import {TranslocoModule} from '@ngneat/transloco';
import {TranslocoRootModule} from '../../../../common/transloco-root.module';

const authConfig: RimeAuthConfig = {
  disableRegister: true,
};

export default {
  component: RimeSignInComponent,
  decorators: [
    moduleMetadata({
      imports: [
        RimeAuthComponentsModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        TranslocoModule,
        TranslocoRootModule,
      ],
      providers: [
        {
          provide: RIME_AUTH_CONFIG,
          useValue: authConfig,
        },
        {
          provide: RimeAuthService,
          useClass: RimeAuthTestingService,
        },
      ],
    }),
  ],
  title: 'Sign In',
  excludeStories: /.*Data$/,
} as Meta;

const Template: Story = (args) => ({
  props: {
    ...args,
  },
});

export const Default = Template.bind({});
Default.args = {
  task: {
    id: '1',
    title: 'Default state',
    state: 'DEFAULT',
    updatedAt: new Date(2022, 5, 22),
  },
};
