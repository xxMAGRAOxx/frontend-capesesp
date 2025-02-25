// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    hmr: false,
    api_url: 'http://127.0.0.1:8000/api/demandas',
    sso_redirect: 'localhost:4200/sso',
    // api_url: 'https://server.cruzzy.com.br/',
    version: 'DEV2021.1019',
    // file_sas: 'sp=racwdl&st=2021-11-22T14:56:07Z&se=2031-11-22T22:56:07Z&spr=https&sv=2020-08-04&sr=c&sig=sAn6V5HLkE3yg5gIA617lmh91LXqSIXIAomculcz9KE%3D',
    file_sas: 'sp=racwdl&st=2021-11-22T14:56:07Z&se=2031-11-22T22:56:07Z&spr=https&sv=2020-08-04&sr=c&sig=sAn6V5HLkE3yg5gIA617lmh91LXqSIXIAomculcz9KE%3D',
    file_accout: 'sablobdatamalba',
    // file_container: 'cruzz',
    file_container: 'cruzzydev',
    title_tab: 'Dev Plataforma Tutto - '
};