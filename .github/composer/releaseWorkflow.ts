import { Workflow, CheckoutJob } from '../../lib/index';
import { setupAndInstallDeps } from './setupAndInstallDeps';

export const releaseWorkflow = new Workflow('release', {
  name: 'Release',
  on: 'workflowDispatch',
  jobs: [
    new CheckoutJob('release', {
      runsOn: 'ubuntu-latest',
      steps: [
        ...setupAndInstallDeps,
        {
          name: 'Release',
          run: 'yarn release'
        }
      ]
    })
  ]
});
