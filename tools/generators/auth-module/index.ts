import { chain, externalSchematic, Rule } from '@angular-devkit/schematics';
import * as path from 'path';

export default function (schema: any): Rule {
  if (!schema.name.startsWith('rng-')) {
    throw new Error(`rng modules must be prefixed with 'rng-'`);
  }

  return chain([
    externalSchematic('@schematics/angular', 'module', {
      project: schema.project,
      name: schema.name,
      routing: true,
      module: 'app.module.ts',
    }),
    externalSchematic('@schematics/angular', 'service', {
      project: schema.project,
      name: schema.name,
      path: path.join(
        'apps',
        schema.project,
        'src',
        'app',
        schema.name,
        'services'
      ),
    }),
    externalSchematic('@schematics/angular', 'guard', {
      project: schema.project,
      name: schema.name,
      path: path.join(
        'apps',
        schema.project,
        'src',
        'app',
        schema.name,
        'services'
      ),
    }),
  ]);
}
