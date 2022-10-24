import { Composer } from '../../lib/index';
import { pullRequestWorkflow } from './pullRequestWorkflow';
import { releaseWorkflow } from './releaseWorkflow';

export default new Composer({
  workflows: [pullRequestWorkflow, releaseWorkflow]
});
