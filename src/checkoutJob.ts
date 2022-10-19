import { Job, JobConfig, StepsProps } from './job';

/**
 * A special Job that includes a checkout step automatically.
 */
export class CheckoutJob extends Job {
  public constructor(id: string, config: JobConfig) {
    const steps: StepsProps[] = ([{ uses: 'actions/checkout@v3' }] as StepsProps[]).concat(
      config.steps
    );
    super(id, { ...config, steps });
  }
}
