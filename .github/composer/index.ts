import { Composer } from '../../lib/index';
import { pullRequestWorkflow } from './pullRequestWorkflow';

export default new Composer({
  workflows: [pullRequestWorkflow]
});
