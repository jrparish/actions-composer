import { Workflow, CheckoutJob } from '../../lib/index';
import { setupAndInstallDeps } from './setupAndInstallDeps';

export const pullRequestWorkflow = new Workflow('pullRequest', {
  name: 'Pull Request',
  on: 'pullRequest',
  jobs: [
    new CheckoutJob('checks', {
      runsOn: 'ubuntu-latest',
      steps: [
        ...setupAndInstallDeps,
        {
          name: 'Lint',
          run: 'yarn lint'
        },
        {
          name: 'Typecheck',
          run: 'yarn typecheck'
        },
        {
          name: 'Build',
          run: 'yarn build'
        },
        {
          name: 'Test',
          run: 'yarn test'
        }
      ]
    })
  ]
});
