// require('../secrets') // only include when seeding cloud database
// console.log('Secret has been included, seeding cloud db...')
console.log('Secret has not been required, seeding local file...')
require('./seed-local') // supply local seed file with cloud URI and schema.js will check if cloud URI is available
