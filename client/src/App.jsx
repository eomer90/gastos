import { useState } from "react"
import { Forma } from "./components/Forma"
import { TablaCategoria } from "./components/TablaCategoria"

const estadoInicialForma = {
  descripcion: "",
  cantidad: "",
  fecha: "",
  tipoPago: "credito",
  categoria: "fijo",
}

function App() {
  const [form, setForm] = useState(estadoInicialForma)

  const [gastos, setGastos] = useState([])

  const handleChange = ({ target }) => {
    const { name, value } = target
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const guardarGasto = (ev) => {
    ev.preventDefault()
    setGastos((prev) => [
      ...prev,
      {
        ...form,
        cantidad: Number(form.cantidad),
      },
    ])

    setForm(estadoInicialForma)
  }

  const fechaFormatoMx = (fecha) => {
    const [year, mes, dia] = fecha.split("-")
    return `${dia}/${mes}/${year}`
  }

  const gastosXCategoria = gastos.reduce((obj, gasto) => {
    const categoriaGasto = gasto.categoria

    if (!obj[categoriaGasto]) {
      obj[categoriaGasto] = []
    }

    obj[categoriaGasto].push({
      ...gasto,
      fecha: fechaFormatoMx(gasto.fecha),
    })

    return obj
  }, {})

  // console.log(gastosXCategoria)

  return (
    <div className="container">
      <div className="row gx-5 pt-4">
        <div className="col-4">
          <Forma
            form={form}
            guardarGasto={guardarGasto}
            handleChange={handleChange}
          />
        </div>
        <div className="col">
          {Object.entries(gastosXCategoria).map(([categoria, gastos]) => (
            <TablaCategoria
              key={categoria}
              categoria={categoria}
              gastos={gastos}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
