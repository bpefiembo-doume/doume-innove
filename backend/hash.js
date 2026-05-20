const bcrypt = require('bcryptjs')

async function main() {
  const hash = await bcrypt.hash('Admin2026', 12)
  console.log(hash)
}

main()