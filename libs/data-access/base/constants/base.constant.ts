import {InjectionToken} from '@angular/core';
import {RimeStateEntityConfig} from '../models/base.model';

export const ENTITY_CONFIG = new InjectionToken<RimeStateEntityConfig>('entityConfig');
export const ENTITY_NAME = new InjectionToken<string>('entityName');
