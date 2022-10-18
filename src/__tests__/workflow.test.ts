import { describe, it, expect } from 'vitest';

import { Job } from '../job';
import { Workflow } from './workflow';

describe('Workflow', () => {
  it('toGHAction', () => {
    const workflow = Workflow({
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
      }
    });
    expect(workflow.toGHAction()).toMatchSnapshot();
  });

  it('on: string snake conversion', () => {
    const workflow = Workflow();
    expect(workflow.toGHAction().on).toBe('pull_request');
  });

  it('on: string[] snake conversion', () => {
    const workflow = Workflow({
      on: ['pullRequest', 'push', 'issueComment']
    });
    const expected = ['pull_request', 'push', 'issue_comment'];
    expect(workflow.toGHAction().on).toEqual(expected);
  });

  it('2 jobs with same key -> error', () => {
    const workflow = Workflow();
    new Job({
      runsOn: 'ubuntu-latest',
      steps: []
    });
    expect(
      () =>
        new Job({
          runsOn: 'ubuntu-latest',
          steps: []
        })
    ).toThrowError("There is already a Construct with name 'job' in Workflow [test]");
  });

  it('jobs kept in insertion order', () => {
    const workflow = Workflow();
    const job_one = 'job_one';
    const job_two = 'job_two';
    const job_three = 'job_three';
    new Job(workflow, job_one, {
      runsOn: 'ubuntu-latest',
      steps: []
    });
    new Job(workflow, job_two, {
      runsOn: 'ubuntu-latest',
      steps: []
    });
    new Job(workflow, job_three, {
      runsOn: 'ubuntu-latest',
      steps: []
    });
    const jobs = Object.keys(workflow.toGHAction().jobs);
    const expected = [job_one, job_two, job_three];
    expect(jobs).toEqual(expected);
  });

  it('non-job children are ignored', () => {
    const workflow = Workflow();
    new Construct(workflow, 'not_job');
    expect(workflow.toGHAction().jobs).toEqual({});
  });
});
