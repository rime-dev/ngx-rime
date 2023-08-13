import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/__docusaurus/debug',
    component: ComponentCreator('/__docusaurus/debug', 'ddc'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/config',
    component: ComponentCreator('/__docusaurus/debug/config', 'c32'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/content',
    component: ComponentCreator('/__docusaurus/debug/content', 'e55'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/globalData',
    component: ComponentCreator('/__docusaurus/debug/globalData', 'a9b'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/metadata',
    component: ComponentCreator('/__docusaurus/debug/metadata', 'da5'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/registry',
    component: ComponentCreator('/__docusaurus/debug/registry', '6d4'),
    exact: true
  },
  {
    path: '/__docusaurus/debug/routes',
    component: ComponentCreator('/__docusaurus/debug/routes', '656'),
    exact: true
  },
  {
    path: '/markdown-page',
    component: ComponentCreator('/markdown-page', '5d8'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', '2f6'),
    routes: [
      {
        path: '/docs/',
        component: ComponentCreator('/docs/', 'c83'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/docs/api/config',
        component: ComponentCreator('/docs/api/config', 'c01'),
        exact: true,
        sidebar: "api"
      },
      {
        path: '/docs/api/createStorageRef',
        component: ComponentCreator('/docs/api/createStorageRef', 'a9b'),
        exact: true,
        sidebar: "api"
      },
      {
        path: '/docs/api/createUploadTask',
        component: ComponentCreator('/docs/api/createUploadTask', '9fc'),
        exact: true,
        sidebar: "api"
      },
      {
        path: '/docs/api/FireEntityCollectionDataService',
        component: ComponentCreator('/docs/api/FireEntityCollectionDataService', '2d7'),
        exact: true,
        sidebar: "api"
      },
      {
        path: '/docs/api/OrderByDirection',
        component: ComponentCreator('/docs/api/OrderByDirection', '759'),
        exact: true,
        sidebar: "api"
      },
      {
        path: '/docs/api/RimeBaseMockModule',
        component: ComponentCreator('/docs/api/RimeBaseMockModule', '742'),
        exact: true,
        sidebar: "api"
      },
      {
        path: '/docs/api/RimeBaseModule',
        component: ComponentCreator('/docs/api/RimeBaseModule', 'aa3'),
        exact: true,
        sidebar: "api"
      },
      {
        path: '/docs/api/RimeBaseTestingModule',
        component: ComponentCreator('/docs/api/RimeBaseTestingModule', '1cb'),
        exact: true,
        sidebar: "api"
      },
      {
        path: '/docs/api/RimeStorageMockModule',
        component: ComponentCreator('/docs/api/RimeStorageMockModule', 'a5c'),
        exact: true,
        sidebar: "api"
      },
      {
        path: '/docs/api/sidebars',
        component: ComponentCreator('/docs/api/sidebars', '7ca'),
        exact: true,
        sidebar: "api"
      },
      {
        path: '/docs/api/User',
        component: ComponentCreator('/docs/api/User', 'eb4'),
        exact: true,
        sidebar: "api"
      },
      {
        path: '/docs/api/VERSION',
        component: ComponentCreator('/docs/api/VERSION', 'b2e'),
        exact: true,
        sidebar: "api"
      },
      {
        path: '/docs/api/WhereFilterOp',
        component: ComponentCreator('/docs/api/WhereFilterOp', 'f65'),
        exact: true,
        sidebar: "api"
      },
      {
        path: '/docs/category/developer-guides',
        component: ComponentCreator('/docs/category/developer-guides', '285'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/docs/category/getting-started',
        component: ComponentCreator('/docs/category/getting-started', '90d'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/docs/changelog/',
        component: ComponentCreator('/docs/changelog/', 'ce9'),
        exact: true
      },
      {
        path: '/docs/docs/developer_guides/data-access',
        component: ComponentCreator('/docs/docs/developer_guides/data-access', '103'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/docs/docs/developer_guides/feature',
        component: ComponentCreator('/docs/docs/developer_guides/feature', '0cd'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/docs/docs/developer_guides/ui',
        component: ComponentCreator('/docs/docs/developer_guides/ui', '308'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/docs/docs/developer_guides/util',
        component: ComponentCreator('/docs/docs/developer_guides/util', '4a2'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/docs/docs/getting_started/manage-docs-versions',
        component: ComponentCreator('/docs/docs/getting_started/manage-docs-versions', '0ef'),
        exact: true,
        sidebar: "sidebar"
      },
      {
        path: '/docs/docs/getting_started/translate-your-site',
        component: ComponentCreator('/docs/docs/getting_started/translate-your-site', '76c'),
        exact: true,
        sidebar: "sidebar"
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', 'd4a'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
