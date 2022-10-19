import { describe, it, expect } from 'vitest';

import { Job } from '../job';
import { Workflow } from '../workflow';

describe('Workflow', () => {
  it('should map properties to correct action syntax', () => {
    const workflow = new Workflow({
      name: 'Test',
      on: {
        pullRequest: {
          types: ['opened'],
          paths: ['test/'],
          pathsIgnore: ['ignore-path/']
        },
        issueComment: { types: ['created'] }
      },
      defaults: {
        run: {
          workingDirectory: '~/'
        }
      },
      jobs: []
    });
    expect(workflow.toAction()).toMatchSnapshot();
  });

  it('on: string snake conversion', () => {
    const workflow = new Workflow({ name: 'Test', on: 'pullRequest', jobs: [] });
    expect(workflow.toAction().on).toBe('pull_request');
  });

  it('on: string[] snake conversion', () => {
    const workflow = new Workflow({
      name: 'Test',
      on: ['pullRequest', 'push', 'issueComment'],
      jobs: []
    });
    const expected = ['pull_request', 'push', 'issue_comment'];
    expect(workflow.toAction().on).toEqual(expected);
  });

  it('should not allow duplicate job keys', () => {
    const jobKey = 'duplicatKey';
    const workflow = new Workflow({
      name: 'Test',
      on: [],
      jobs: [
        new Job(jobKey, {
          name: 'First Instance',
          runsOn: 'ubuntu-latest',
          steps: []
        }),
        new Job(jobKey, {
          name: 'Second Instance',
          runsOn: 'ubuntu-latest',
          steps: []
        })
      ]
    });

    expect(workflow.toAction().jobs[jobKey]).toEqual({
      name: 'Second Instance',
      'runs-on': 'ubuntu-latest',
      steps: []
    });
  });

  it('should keep jobs in insertion order', () => {
    const jobOne = 'job_one';
    const jobTwo = 'job_two';
    const jobThree = 'job_three';

    const workflow = new Workflow({
      name: 'Test',
      on: [],
      jobs: [
        new Job(jobOne, {
          runsOn: 'ubuntu-latest',
          steps: []
        }),
        new Job(jobTwo, {
          runsOn: 'ubuntu-latest',
          steps: []
        }),
        new Job(jobThree, {
          runsOn: 'ubuntu-latest',
          steps: []
        })
      ]
    });

    const jobs = Object.keys(workflow.toAction().jobs);
    const expected = [jobOne, jobTwo, jobThree];
    expect(jobs).toEqual(expected);
  });

  it('should ignore jobs that are note propery created', () => {
    const workflow = new Workflow({
      name: 'Test',
      on: [],
      // @ts-expect-error - intentional for test
      jobs: [{ test: 'random' }]
    });
    expect(workflow.toAction().jobs).toEqual({});
  });
});
