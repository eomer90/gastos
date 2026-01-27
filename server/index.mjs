import express from "express"
import cors from "cors"
import { leerArchivoAjson, crearArchivo } from "./file.mjs"

const app = express()
const PORT = 3000
const rutaDB = "./db/ingresos.json"

app.use(cors())
app.use(express.json())

app.get("/ingresos", async (req, res) => {
  const mesQuery = req.query.mes
  const ingresos = await leerArchivoAjson(rutaDB)
  const ingresosPorMes = ingresos.filter((g) => {
    const [_, mes] = g.fechaIngreso.split("-")
    return mes === mesQuery
  })

  res.json({ ingresos: ingresosPorMes })
})

app.post("/ingresos", async (req, res) => {
  try {
    const data = req.body
    const ingresos = await leerArchivoAjson(rutaDB)
    ingresos.push({
      ...data,
      ingreso: Number(data.ingreso),
    })
    await crearArchivo(rutaDB, ingresos)
    res.status(201).json({ mensaje: "ingreso registrado", ingresos })
  } catch (error) {
    res.json({ mensaje: "error al registrar ingreso" })
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
