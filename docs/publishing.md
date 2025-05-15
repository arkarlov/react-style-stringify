# Manual Package Publishing Flow

1. ✅ Make code changes

Create a branch from `main`, commit and push your changes, then open a Pull Request.  
Merge the PR into `main` after it's reviewed and tests pass.

2. 🔄 Switch to the `main` branch

Ensure you're on the latest `main` branch:

```bash
git checkout main
git pull origin main
```

3. 🔖 Bump the version using npm

Use [semver](https://semver.org/) to choose the correct bump type:

```bash
npm version patch   # or minor / major
```

4. 🚀 Push changes and tags

```bash
git push
git push origin vX.Y.Z
```

5. ✅ Run tests (before build)

```bash
npm test
```

6. 🧱 Build the package

```bush
npm run build
```

7. 📦 Publish to npm

```bush
npm publish
```

8. 📝 (Optional) Add release notes

Create or edit a release on GitHub for the new tag and describe the changes.
