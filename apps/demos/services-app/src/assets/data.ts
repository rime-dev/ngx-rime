import {EntityState} from '@rng/data-access/base/models/base.model';
import {Collaborator} from '../app/models/collaborator.model';
import {Project} from '../app/models/project.model';

export const projects: EntityState<Project>[] = [
  {
    id: 'GFT7',
    data: {
      uid: 'GFT7',
      title: 'Cambio de azulejos',
      location: {
        text: 'Av. Malvarrosa, Valencia',
        coordinates: [-0.3280813599117059, 39.4794693227284],
      },
      type: 'construction',
      state: 'finished',
      accepted: true,
      group: 'GS1',
      client: 'C1',
      description: `Azulejos nuevos azules`,
      startDate: '2022-01-21T15:22:05.643Z',
      estimatedEndDate: '2022-01-27T15:22:05.643Z',
      endingDate: '2022-01-27T15:22:05.643Z',
      collaborators: ['GFT6'],
      cost: 250,
      documents: [
        {
          id: 'FTG1',
          title: 'Tienda',
          url: `https://images.unsplash.com/photo-1523275335684-37898b6baf30?
          ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=989&q=80`,
          format: 'image',
        },
      ],
      activity: [
        {
          date: '2022-01-21T08:22:05.643Z',
          user: 'GFT7',
          action: 'change',
          affected: 'state',
          result: 'active',
        },
      ],
      labels: ['urgent'],
    },
  },
  {
    id: 'GFT8',
    data: {
      uid: 'GFT8',
      title: 'Cambio de lámparas',
      location: {
        text: 'Av. Malvarrosa, Valencia',
        coordinates: [-0.3280813599117059, 39.4794693227284],
      },
      type: 'paint',
      state: 'finished',
      accepted: true,
      group: 'GS1',
      client: 'C1',
      description: `Azulejos nuevos azules`,
      startDate: '2021-11-21T15:22:05.643Z',
      estimatedEndDate: '2021-12-27T15:22:05.643Z',
      endingDate: '2021-12-27T15:22:05.643Z',
      collaborators: ['GFT6'],
      cost: 250,
      documents: [
        {
          id: 'FTG1',
          title: 'Tienda',
          url: `https://images.unsplash.com/photo-1523275335684-37898b6baf30?
          ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=989&q=80`,
          format: 'image',
        },
      ],
      activity: [
        {
          date: '2022-01-21T08:22:05.643Z',
          user: 'GFT7',
          action: 'change',
          affected: 'state',
          result: 'active',
        },
      ],
      labels: ['urgent'],
    },
  },
  {
    id: 'GFT3',
    data: {
      uid: 'GFT3',
      title: 'Pintura de 4 habitaciones',
      location: {
        text: 'Av. Malvarrosa, Valencia',
        coordinates: [-0.3280813599117059, 39.4794693227284],
      },
      type: 'paint',
      state: 'active',
      accepted: true,
      group: 'GS1',
      client: 'C1',
      description: `La propiedad tiene 4 habitaciones, dos con 20m^2 y otras dos de 35m^2.
      Las primeras se solitita que se pinten de color beige, y las otras dos blancas.`,
      startDate: '2022-01-21T15:22:05.643Z',
      estimatedEndDate: '2022-01-27T15:22:05.643Z',
      collaborators: ['GFT6', 'GFT7'],
      cost: 2000,
      documents: [
        {
          id: 'FTG1',
          title: 'Documento 1',
          subtitle: 'Documentos importantes',
          url: `https://images.unsplash.com/photo-1523275335684-37898b6baf30?
          ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=989&q=80`,
          format: 'image',
        },
        {
          id: 'FTG2',
          title: 'Documento 2',
          url: `https://images.unsplash.com/photo-1640622657236-e83b28df8e01?
          ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2072&q=80`,
          format: 'image',
        },
        {
          id: 'FTG3',
          title: 'Documento 3',
          url: `https://images.unsplash.com/photo-1644333192098-75573dacbb0c?
          ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2071&q=80`,
          format: 'image',
        },
      ],
      activity: [
        {
          date: '2022-01-21T05:22:05.643Z',
          user: 'GFT6',
          action: 'change',
          affected: 'description',
          result: `La propiedad tiene 4 habitaciones, dos con 20m^2 y otras dos de 35m^2.
          Las primeras se solitita que se pinten de color beige, y las otras dos blancas.`,
        },
        {
          date: '2022-01-21T06:22:05.643Z',
          user: 'GFT6',
          action: 'add',
          affected: 'collaborators',
          result: 'GFT7',
        },
        {
          date: '2022-01-21T08:22:05.643Z',
          user: 'GFT7',
          action: 'change',
          affected: 'state',
          result: 'active',
        },
        {
          date: '2022-01-21T08:22:05.643Z',
          user: 'GFT7',
          action: 'change',
          affected: 'title',
          result: 'Pintura',
        },
        {
          date: '2022-01-21T08:22:05.643Z',
          user: 'GFT7',
          action: 'add',
          affected: 'documents',
          result: 'Tienda',
        },
        {
          date: '2022-01-21T08:22:05.643Z',
          user: 'GFT7',
          action: 'add',
          affected: 'labels',
          result: 'urgent',
        },
        {
          date: '2022-01-21T08:22:05.643Z',
          user: 'GFT7',
          action: 'change',
          affected: 'startDate',
          result: '2022-01-21T06:22:05.643Z',
        },
        {
          date: '2022-01-21T08:22:05.643Z',
          user: 'GFT7',
          action: 'change',
          affected: 'estimatedEndDate',
          result: '2022-01-21T06:22:05.643Z',
        },
      ],
      labels: ['urgent'],
    },
  },
];

export const otherProjects: EntityState<Project>[] = [
  {
    id: 'GFT4',
    data: {
      uid: 'GFT4',
      title: 'Rehabilitación de muebles de exterior',
      location: {
        text: 'C. Coronel Pérez, Torrent',
        coordinates: [-0.4729078334928575, 39.431874010962424],
      },
      type: 'construction',
      state: 'inactive',
      accepted: false,
      group: undefined,
      client: 'C2',
      description: `La parcela de la casa tiene 7 muebles que necesitan ser rehabilitados.`,
      startDate: '2022-02-21T15:22:05.643Z',
      estimatedEndDate: '2022-03-21T15:22:05.643Z',
      collaborators: [],
      cost: 750,
      documents: [],
      activity: [],
      labels: ['deferrable'],
    },
  },
  {
    id: 'GFT5',
    data: {
      uid: 'GFT5',
      title: 'Cambio de bañera',
      location: {
        text: 'C. Coronel Pérez, Torrent',
        coordinates: [-0.4729078334928575, 39.431874010962424],
      },
      type: 'construction',
      state: 'inactive',
      accepted: false,
      group: undefined,
      client: 'C2',
      description: `Hay que cambiar la bañera por una ducha`,
      startDate: '2022-02-21T15:22:05.643Z',
      estimatedEndDate: '2022-03-21T15:22:05.643Z',
      collaborators: [],
      cost: 500,
      documents: [],
      activity: [],
      labels: ['deferrable'],
    },
  },
  {
    id: 'GFT6',
    data: {
      uid: 'GFT6',
      title: 'Pintura de piscina',
      location: {
        text: 'C. Coronel Pérez, Torrent',
        coordinates: [-0.4729078334928575, 39.431874010962424],
      },
      type: 'paint',
      state: 'inactive',
      accepted: false,
      group: undefined,
      client: 'C2',
      description: `La piscina necesita unas capas de pintura`,
      startDate: '2022-02-21T15:22:05.643Z',
      estimatedEndDate: '2022-03-21T15:22:05.643Z',
      collaborators: [],
      cost: 300,
      documents: [],
      activity: [],
      labels: ['deferrable'],
    },
  },
];

export const collaborators: EntityState<Collaborator>[] = [
  {
    id: 'GFT6',
    data: {
      uid: 'GFT6',
      name: 'Juan',
      group: 'GS1',
      avatar:
        'https://i.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U',
    },
  },
  {
    id: 'GFT7',
    data: {
      uid: 'GFT7',
      name: 'Sergio',
      group: 'GS1',
      avatar: `https://i.picsum.photos/id/1084/536/354.jpg?grayscale&hmac=Ux7nzg19e1q35mlUVZjhCLxqkR30cC-CarVg-nlIf60`,
    },
  },
  {
    id: 'GFT8',
    data: {
      uid: 'GFT8',
      name: 'Alex',
      group: 'GS2',
      avatar: `https://i.picsum.photos/id/1084/536/354.jpg?grayscale&hmac=Ux7nzg19e1q35mlUVZjhCLxqkR30cC-CarVg-nlIf60`,
    },
  },
  {
    id: 'HgdTVUOGmgZ7XdPQhKCUZIZx6fT2',
    data: {
      uid: 'HgdTVUOGmgZ7XdPQhKCUZIZx6fT2',
      name: 'Carlos',
      group: 'GS1',
      avatar: 'https://avatars.githubusercontent.com/u/31616221?v=4',
    },
  },
];

const user = {
  id: 'HgdTVUOGmgZ7XdPQhKCUZIZx6fT2',
  data: {
    displayName: 'Carlos Bayarri',
    email: 'carlobr7@gmail.com',
    emailVerified: true,
    photoURL: 'https://avatars.githubusercontent.com/u/31616221?v=4',
    uid: 'HgdTVUOGmgZ7XdPQhKCUZIZx6fT2',
  },
};
export const mockData = {
  projects: [...projects, ...otherProjects],
  collaborators,
  users: [user],
};
