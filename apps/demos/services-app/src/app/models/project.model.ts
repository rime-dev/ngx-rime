export interface Project {
  uid: string;
  title: string;
  location: string;
  type: ProjectType;
  state: ProjectState;
  accepted: boolean;
  group: string;
  client: string;
  description: string;
  startDate: string;
  estimatedEndDate: string;
  endingDate: string;
  collaborators: string[];
  cost: number;
  documents: ProjectDocument[];
  activity: ProjectActivity[];
  labels: string[];
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
  titloe: string;
  url: string;
  format: string;
}

export type ProjectState = 'active' | 'inactive' | 'finished';

export type ProjectType = 'paint' | 'construction';
