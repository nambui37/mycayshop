import { execSync } from 'node:child_process';

console.log('Building project...');
execSync('node tools/build.mjs', { stdio: 'inherit' });

console.log('Packaging dist to gh-pages branch...');
execSync('git add -f dist', { stdio: 'inherit' });

const treeId = execSync('git write-tree --prefix=dist').toString().trim();
const commitId = execSync(`git commit-tree ${treeId} -m "Deploy Tiệm Mì Cay to GitHub Pages"`).toString().trim();

execSync(`git branch -f gh-pages ${commitId}`, { stdio: 'inherit' });
execSync('git push -f origin gh-pages', { stdio: 'inherit' });
execSync('git reset HEAD dist', { stdio: 'inherit' });

console.log('Deployed successfully to https://nambui37.github.io/mycayshop/');
