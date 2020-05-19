module.exports = {
  '*.js': 'eslint --fix',
  '*.{md,mdx,css,yaml,yml}': ['prettier --write', 'prettier --check'],
};
