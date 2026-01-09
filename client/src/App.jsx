import { useState } from "react"
import { Forma } from "./components/Forma"
import { TablaCategoria } from "./components/TablaCategoria"

function App() {
  const [gastos, setGastos] = useState([])

  const guardarGasto = (form) => {
    setGastos((prev) => [
      ...prev,
      {
        ...form,
        cantidad: Number(form.cantidad),
      },
    ])
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
          <Forma guardarGasto={guardarGasto} />
        </div>
        <div className="col">
          {Object.entries(gastosXCategoria).map(([categoria, gastos]) => (
            <div key={categoria}>
              <h2 className="fs-5">{categoria.toUpperCase()}</h2>
              <TablaCategoria gastos={gastos} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
