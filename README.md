# Letrans api

Backend application with api to app to use as translation app which additionally can help in study and remembering translation phrases.

## Installation and usage guide for development

Before start: 
- Setup postgres database: [Postgres Docs](https://www.postgresql.org/docs/current/tutorial-start.html)
- Clone this repository: `git clone https://gitlab.com/letrans-r0ndi/letrans-api`

```sh
# cd into project
$ cd letrans-api
# change .env.development file for yourself
# install dependencies
$ npm install
# build TS to JS in watching mode
$ npm run build-watch
# run nodemon server in dev mode
$ npm run dev -- start-watch
```

## Npm scripts

`npm run dev -- {{ script name }}` - run scripts in dev mode\
`npm run start` - start server\
`npm run start-watch` - start server in watching mode\
`npm run build` - compile *.ts files to *.js files into `/dist`\
`npm run build-watch` - start compile files in watching mode\
`npm run lint` - checking code structure\
`npm run test` - run tests

## Licence

MIT @ Konrad Sądel