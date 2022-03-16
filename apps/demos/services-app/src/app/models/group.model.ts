import {Location} from './location.model';

export interface Group {
  uid: string;
  name: string;
  email: string;
  phone: string;
  web: string;
  type: string;
  nif?: string;
  dateStart: string;
  location: Location;
  logo?: string;
  activities: string[];
  additionalInfo: string[];
  users: string[];
}
