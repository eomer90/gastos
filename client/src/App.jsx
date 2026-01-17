import { useState } from "react"
import { Forma } from "./components/Forma"
import { TablaCategoria } from "./components/TablaCategoria"
import { TablaIngresos } from "./components/TablaIngresos"
import { TablaBalance } from "./components/TablaBalance"

function App() {
  const [gastos, setGastos] = useState([])
  const [ingresos, setIngresos] = useState([])

  const guardarIngreso = (form) => {
    setIngresos((prev) => [
      ...prev,
      {
        ...form,
        ingreso: Number(form.ingreso),
      },
    ])
  }

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
          <Forma guardarGasto={guardarGasto} guardarIngreso={guardarIngreso} />
        </div>
        <div className="col">
          {Object.entries(gastosXCategoria).map(([categoria, gastos]) => (
            <div key={categoria}>
              <h2 className="fs-5">{categoria.toUpperCase()}</h2>
              <TablaCategoria gastos={gastos} />
            </div>
          ))}
        </div>
        <div>
          <TablaIngresos ingresos={ingresos} />
        </div>
        <div>
          <TablaBalance ingresos={ingresos} gastos={gastos} />
        </div>
      </div>
    </div>
  )
}

export default App
