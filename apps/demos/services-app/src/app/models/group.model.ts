import {Location} from './location.model';

export interface Group {
  uid: string;
  name: string;
  email: string;
  phone: string;
  web: string;
  type: string;
  dateStart: string;
  location: Location;
  logo: string;
  background: string;
  activities: string[];
  additionalInfo: string[];
  users: string[];
}
