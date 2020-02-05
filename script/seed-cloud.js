require('../secrets') // only include when seeding cloud database
console.log('Secret has been included')
require('./seed-local') // supply local seed file with cloud URI and schema.js will check if cloud URI is available
