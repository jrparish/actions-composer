# actions-composer

Create github actions workflows using Typescript.

The main drivers for this project are

1. Workflows, jobs, and steps are not very reusable
2. [Composite actions](https://docs.github.com/en/free-pro-team@latest/actions/creating-actions/creating-a-composite-run-steps-action) are too restrictive
3. Being able to write actions with Typescript is nice

This was created specifically to address the needs of my projects and as a result is not very configurable.
It is designed simply to assist in creating strongly typed, composable github actions.

If there are any suggestions for imporovements, please feel free to open an issue or PR with changes.

## Usage

- Generated workflows will be placed in the standard `.github/workflows` directory.

- To begin, create the entry file at `.github/composer/index.ts`

```ts
import { Composer, Workflow, Job, CheckoutJob } from 'actions-composer';

// export a composer instance as the default export
export default new Composer({
  workflows: [
    new Workflow(
      'workflowId', // will be used as the filename - ex: workflowId.yml
      {
        // standard actions fields
        name: 'Workflow Name',
        on: 'pullRequest',
        jobs: [
          new Job('job-id', {
            runsOn: 'unbuntu-latest',
            steps: [
              {
                name: 'Setup Node',
                uses: 'actions/setup-node@v3',
                with: {
                  'node-version': 16,
                  cache: 'yarn'
                }
              },
              {
                name: 'Build',
                run: 'yarn build'
              }
            ]
          }),

          // same as "Job" but automatically adds a checkout step
          new CheckoutJob('job-id-2', {
            runsOn: 'unbuntu-latest',
            steps: [
              {
                name: 'Build',
                run: 'yarn build'
              }
            ]
          })
        ]
      }
    )
  ]
});
```

- Run `actions-composer`

```sh
yarn actions-composer
npx actions-composer

# or add to an npm script
```

## Advanced

This repo has workflows created by `actions-composer` cli.

You can view the source in [.github/composer](https://github.com/jrparish/actions-composer/tree/main/.github/composer) for some examples on how one might use this tool.

## Inspiration

This project is inspired by and the typings were first sourced from a project called [cdkactions](https://github.com/ArmaanT/cdkactions)

cdkactions hasn't been updated in awhile and is missing the newest functionality that Github actions has to offer.

The complexity around constructs and passing around the scopes by reference has been removed.
