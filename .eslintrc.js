module.exports = {
  root: true,
  extends: [
    '@d3banking/eslint-config/typescript-with-typechecking',
    '@d3banking/eslint-config/prettier'
  ],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.eslint.json']
  }
};
