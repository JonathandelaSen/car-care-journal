const { execSync } = require("child_process")
const fs = require("fs")
const path = require("path")

const MIGRATION_NAME = process.argv[2]
if (!MIGRATION_NAME) {
  console.error("❌ Debes proporcionar un nombre para la migración.")
  process.exit(1)
}

// 1. Crear la migración
const output = execSync(
  `npx supabase migration new ${MIGRATION_NAME}`,
).toString()
const match = output.match(/supabase\/migrations\/([\d\w_-]+\.sql)/)
if (!match) {
  console.error("❌ No se pudo encontrar el archivo generado.")
  process.exit(1)
}

const newMigrationFile = path.join("supabase/migrations", match[1])

// 2. Leer todos los archivos setup-*.sql
const setupDir = path.join("utils", "supabase", "db")
const setupFiles = fs
  .readdirSync(setupDir)
  .filter((f) => f.startsWith("setup-") && f.endsWith(".sql"))

let combinedSql = ""
for (const file of setupFiles) {
  const content = fs.readFileSync(path.join(setupDir, file), "utf-8")
  combinedSql += `-- ${file}\n${content}\n\n`
}

// 3. Escribir en la migración
fs.appendFileSync(newMigrationFile, combinedSql)

// 4. Ejecutar db push automáticamente
console.log(
  "✅ Migración creada, ahora aplicando cambios a la base de datos...",
)
execSync("npx supabase db push", { stdio: "inherit" })

console.log(`✅ Migración completada y aplicada: ${newMigrationFile}`)
