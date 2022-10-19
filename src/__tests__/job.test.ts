import { describe, it, expect } from 'vitest';

import { Job } from '../job';

describe('Job', () => {
  it('should create a job', () => {
    const job = new Job('jobKey', {
      runsOn: 'ubuntu-latest',
      continueOnError: true,
      timeoutMinutes: 10,
      strategy: {
        fastFail: true,
        maxParallel: 11
      },
      steps: [
        {
          name: 'step',
          continueOnError: false,
          timeoutMinutes: 5,
          workingDirectory: '~/'
        },
        {
          name: 'External action',
          uses: 'actions/checkout@v2',
          with: {
            stringValue: 'string',
            numberValue: 10,
            booleanValue: false
          }
        }
      ]
    });
    expect(job.toAction()).toMatchSnapshot();
  });
});
