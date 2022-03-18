const fs = require('fs')
fs.writeFileSync('./src/key.js', `export const MapAPIKey=${process.env.MapAPIKey}\n`)
