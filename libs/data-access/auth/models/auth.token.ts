import {InjectionToken} from '@angular/core';

import {RimeAuthConfig} from '../auth.module';

export const RIME_AUTH_CONFIG: InjectionToken<RimeAuthConfig> = new InjectionToken<RimeAuthConfig>(
  'RimeAuthConfig'
);
