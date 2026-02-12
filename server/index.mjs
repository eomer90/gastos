import express from "express"
import cors from "cors"
import { v4 as uuidv4 } from 'uuid'
import { leerArchivoAjson, crearArchivo } from "./file.mjs"

const app = express()
const PORT = 3000
const rutaDB = "./db/ingresos.json"
const gastosDB = "./db/gastos.json"

app.use(cors())
app.use(express.json())

// app.get("/ingresos", async (req, res) => {
//   const mesQuery = req.query.mes
//   const ingresos = await leerArchivoAjson(rutaDB)
//   const ingresosPorMes = ingresos.filter((i) => {
//     const [_, mes] = i.fechaIngreso.split("-")
//     return mes === mesQuery
//   })

//   res.json({ ingresos: ingresosPorMes })
// })

app.get("/ingresos", async (req, res) => {
  const periodoQuery = req.query.periodo
  const ingresos = await leerArchivoAjson(rutaDB)

  const ingresosPorPeriodo = ingresos.filter(
    (i) => i.periodoIngresos === periodoQuery
  )

  res.json({ ingresos: ingresosPorPeriodo })
})


app.post("/ingresos", async (req, res) => {
  try {
    const data = req.body
    const ingresos = await leerArchivoAjson(rutaDB)
    ingresos.push({
      ...data,
      id: uuidv4(),
      ingreso: Number(data.ingreso),
    })
    await crearArchivo(rutaDB, ingresos)
    res.status(201).json({ mensaje: "ingreso registrado", ingresos })
  } catch (error) {
    res.json({ mensaje: "error al registrar ingreso" })
  }
})

app.get("/gastos", async (req, res) => {
  const mesQuery = req.query.mes
  const gastos = await leerArchivoAjson(gastosDB)
  const gastosPorMes = gastos.filter((g) => {
    const [_, mes] = g.fecha.split("-")
    return mes === mesQuery
  })

  res.json({ gastos: gastosPorMes })
})

app.post("/gastos", async (req, res) => {
  try {
    const data = req.body
    const gastos = await leerArchivoAjson(gastosDB)
    gastos.push({
      ...data,
      id: uuidv4(),
      cantidad: Number(data.cantidad),
    })
    await crearArchivo(gastosDB, gastos)
    res.status(201).json({ mensaje: "gasto registrado", gastos })
  } catch (error) {
    res.json({ mensaje: "error al registrar gasto" })
  }
})

app.delete("/gastos", async (req, res) => {
  try {
    const id = req.body.id
    const gastos = await leerArchivoAjson(gastosDB)
    const gastosFiltrados = gastos.filter((g) => g.id !== id)
    await crearArchivo(gastosDB, gastosFiltrados)
    res.status(200).json({ mensaje: "gasto eliminado", gastos:gastosFiltrados })
  }
  catch (error) {
    res.json({ mensaje: "error al eliminar gasto" })
  }
})

app.delete("/ingresos", async (req, res) => {
  try {
    const id = req.body.id
    const ingresos = await leerArchivoAjson(rutaDB)
    const ingresosFiltrados = ingresos.filter((i) => i.id !== id)
    await crearArchivo(rutaDB, ingresosFiltrados)
    res.status(200).json({ mensaje: "ingreso eliminado", ingresos:ingresosFiltrados })
  }
  catch (error) {
    res.json({ mensaje: "error al eliminar ingreso" })
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
