import {InjectionToken} from '@angular/core';
import {StateEntityConfig} from '../models/base.model';

export const ENTITY_CONFIG = new InjectionToken<StateEntityConfig>('entityConfig');
export const ENTITY_NAME = new InjectionToken<string>('entityName');
