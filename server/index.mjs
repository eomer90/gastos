import express from "express"
import cors from "cors"
import fs from "fs/promises"

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.get("/ingresos", async (req, res) => {
  const file = await fs.readFile("./db/ingresos.json", "utf8")
  const ingresos = JSON.parse(file)
  res.json({ ingresos })
})

app.post("/registrar", async (req, res) => {
  const ing = req.body
  const file = await fs.readFile("./db/ingresos.json", "utf8")
  const data = JSON.parse(file)
  data.push({
    ...ing,
    ingreso: Number(ing.ingreso),
  })
  await fs.writeFile(
    "./db/ingresos.json",
    JSON.stringify(data, null, 2),
    "utf8",
  )
  res.status(201).json({ mensaje: "Gasto registrado con éxito" })
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
