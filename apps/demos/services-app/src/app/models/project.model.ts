import {Location} from './location.model';

export interface Project {
  uid: string;
  title: string;
  location: Location;
  type: ProjectType;
  state: ProjectState;
  accepted: boolean;
  group?: string;
  client: string;
  description: string;
  startDate: string;
  estimatedEndDate: string;
  endingDate?: string;
  collaborators: string[];
  cost: number;
  documents: ProjectDocument[];
  activity: ProjectActivity[];
  labels: string[];
  comments: ProjectComment[];
}

export interface ProjectComment {
  user: string;
  title: string;
  description: string;
}
export interface ProjectActivity {
  date: string;
  user: string;
  action: string;
  affected: string;
  result: string;
}

export interface ProjectDocument {
  id: string;
  title: string;
  subtitle?: string;
  url: string;
  format: string;
  icon: string;
}

export type ProjectState = 'active' | 'inactive' | 'finished';

export type ProjectType = 'painting' | 'construction';

export type Label = 'painting' | 'construction';

export interface ProjectLabel {
  name: string;
  color: string;
}

export abstract class Labels {
  static labels = ['urgent', 'critical', 'documentation', 'support', 'deferrable'];
  static getColor(label: string): string {
    const labels: Record<string, string> = {
      urgent: '#d9534f',
      critical: '#d9534f',
      documentation: '#f0ad4e',
      support: '#e96fed',
      deferrable: '#428bca',
    };
    return labels[label];
  }
}
