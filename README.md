## fastlendly

a fast way to see someone's (or your) Calendly page and your Google Calendar side by side!

### how to run/deploy

- install:

```
npm install
# configure husky so that building can be automated
npm run prepare
```

- dev:

```
npm run dev
```

- deploy -- git committing should build a new version (this is done using husky)
  - make sure that you ran `npm run prepare` - this will install the husky git pre-commit hook

```
git add/commit/push
```

### huh

this was made while I was at the [Recurse Center](https://www.recurse.com/)
