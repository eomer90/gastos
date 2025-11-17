const express = require("express")
const cors = require("cors")

const app = express()
const PORT = process.env.PORT || 3000

const gastos = []

app.use(cors())
app.use(express.json())

app.get("/gastos", (req, res) => {
  res.json({ gastos })
})

app.post("/registrar", (req, res) => {
  const datos = req.body
  gastos.push(datos)

  res.status(201).json({ mensaje: "Gasto registrado con éxito" })
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
