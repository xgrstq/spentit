const fs = require('fs')

if (!fs.existsSync('.env')) {
  fs.copyFileSync('.env.example', '.env')
  console.log('✅ .env dibuat')
} else {
  console.log('⚠️ .env sudah ada')
}