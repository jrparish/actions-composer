import { nodeVersion } from './constants';

export const setupAndInstallDeps = [
  {
    name: 'Setup Node',
    uses: 'actions/setup-node@v3',
    with: {
      'node-version': nodeVersion,
      cache: 'yarn'
    }
  },
  {
    name: 'Install Dependencies',
    run: 'yarn --immutable'
  }
];
