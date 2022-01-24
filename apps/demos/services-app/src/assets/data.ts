export const projects = [
  {
    id: 'GFT3',
    data: {
      uid: 'GFT3',
      title: 'Pintura de 4 habitaciones',
      location: 'Av. Malvarrosa, Valencia',
      type: 'paint',
      state: 'active',
      accepted: true,
      group: 'TZ',
      client: 'C1',
      description: `La propiedad tiene 4 habitaciones, dos con 20m^2 y otras dos de 35m^2.
      Las primeras se solitita que se pinten de color beige, y las otras dos blancas.`,
      startDate: '2022-01-21T15:22:05.643Z',
      estimatedEndDate: '2022-01-27T15:22:05.643Z',
      collaborators: ['1', '2'],
      cost: 2000,
      documents: [
        {
          title: 'Tienda',
          url: `https://images.unsplash.com/photo-1523275335684-37898b6baf30?
          ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=989&q=80`,
          format: 'image',
        },
        {
          title: 'Reloj',
          url: `https://images.unsplash.com/photo-1523275335684-37898b6baf30?
          ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=989&q=80`,
          format: 'image',
        },
        {
          title: 'Armario',
          url: `https://images.unsplash.com/photo-1523275335684-37898b6baf30?
          ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=989&q=80`,
          format: 'image',
        },
      ],
      activity: [
        {
          date: '2022-01-21T05:22:05.643Z',
          user: '1',
          action: 'change',
          affected: 'description',
          result: `La propiedad tiene 4 habitaciones, dos con 20m^2 y otras dos de 35m^2.
          Las primeras se solitita que se pinten de color beige, y las otras dos blancas.`,
        },
        {
          date: '2022-01-21T06:22:05.643Z',
          user: '1',
          action: 'add',
          affected: 'collaborators',
          result: '2',
        },
        {
          date: '2022-01-21T08:22:05.643Z',
          user: '2',
          action: 'change',
          affected: 'state',
          result: 'active',
        },
      ],
      labels: ['urgent'],
    },
  },
];

export const otherProjects = [
  {
    id: 'GFT4',
    data: {
      uid: 'GFT4',
      title: 'Rehabilitación de muebles de exterior',
      location: 'C. Coronel Pérez, Torrent',
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
];

export const collaborators = [
  {
    uid: '1',
    name: 'Juan',
    avatar:
      'https://i.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U',
  },
  {
    uid: '2',
    name: 'Sergio',
    avatar:
      'https://i.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U',
  },
];

export const mockData = {
  projects: [...projects, ...otherProjects],
  collaborators,
};
