import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';

import { Workflow } from './workflow';

export type ComposerConfig = Omit<Composer, 'build'>;

export class Composer {
  /**
   * The directory to place generated github actions
   */
  public readonly outdir?: string;

  /**
   * Workflows to be generated
   */
  public readonly workflows: Workflow[];

  constructor(config: ComposerConfig) {
    this.outdir = config.outdir || '.github/workflows';
    this.workflows = config.workflows;
  }

  build() {
    if (!fs.existsSync(this.outdir)) {
      fs.mkdirSync(this.outdir);
    }
    this.workflows.forEach(workflow => {
      const workflowOutput = path.join(this.outdir, `${workflow.id}.yml`);

      // Get raw yaml of workflow
      const rawYaml = yaml.dump(workflow.toAction(), {
        lineWidth: -1,
        noCompatMode: true,
        quotingType: '"'
      });

      // Save the formatted yaml
      fs.writeFileSync(workflowOutput, `# Generated by actions-composer. Do not modify.\n`);
      fs.writeFileSync(workflowOutput, rawYaml, { flag: 'a' });
    });
  }
}
