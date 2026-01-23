import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Forma } from "./components/Forma";
import { TablaCategoria } from "./components/TablaCategoria";
import { TablaIngresos } from "./components/TablaIngresos";
import { TablaBalance } from "./components/TablaBalance";

function App() {
  const [gastos, setGastos] = useState([]);
  const [ingresos, setIngresos] = useState([]);
  const [mesActivo, setMesActivo] = useState("01");

  const guardarIngreso = (formIngresos) => {
    setIngresos((prev) => [
      ...prev,
      {
        ...formIngresos,
        ingreso: Number(formIngresos.ingreso),
      },
    ]);
  };

  const guardarGasto = (form) => {
    if (form.titular === "ajeno") {
      setIngresos((prev) => [
        ...prev,
        {
          ingreso: Number(form.cantidad),
          descripcionIngreso: `${form.nombreTitular} ${form.descripcion}`,
          fechaIngreso: form.fecha,
        },
      ]);
    }
    setGastos((prev) => [
      ...prev,
      {
        ...form,
        id: uuidv4(),
        cantidad: Number(form.cantidad),
      },
    ]);
  };

  const eliminarGasto = (id) => {
    const gastosFiltrados = gastos.filter((gasto) => gasto.id !== id);
    setGastos(gastosFiltrados);
  };

  const handleChangeMes = ({ target }) => {
    setMesActivo(target.value);
  };

  const fechaFormatoMx = (fecha) => {
    const [year, mes, dia] = fecha.split("-");
    return `${dia}/${mes}/${year}`;
  };

  const gastosPorMes = gastos.filter((g) => {
    const [_, mes] = g.fecha.split("-");
    return mes === mesActivo;
  });

  const ingresoPorMes = ingresos.filter((i) => {
    const [_, mes] = i.fechaIngreso.split("-");
    return mes === mesActivo;
  });

  const gastosXCategoria = gastosPorMes.reduce((obj, gasto) => {
    const categoriaGasto = gasto.categoria;

    if (!obj[categoriaGasto]) {
      obj[categoriaGasto] = [];
    }

    obj[categoriaGasto].push({
      ...gasto,
      fecha: fechaFormatoMx(gasto.fecha),
    });

    return obj;
  }, {});

  // console.log(gastosXCategoria)

  return (
    <div className="container">
      <div className="row">
        <div className="col-4">
          <label className="forn-label">Meses</label>
          <select
            className="form-control"
            value={mesActivo}
            onChange={handleChangeMes}
          >
            <option value="01">Enero</option>
            <option value="02">Febrero</option>
            <option value="03">Marzo</option>
            <option value="04">Abril</option>
            <option value="05">Mayo</option>
            <option value="06">Junio</option>
            <option value="07">Julio</option>
            <option value="08">Agosto</option>
            <option value="09">Septiembre</option>
            <option value="10">Octubre</option>
            <option value="11">Noviembre</option>
            <option value="12">Diciembre</option>
          </select>
        </div>
      </div>
      <div className="row gx-5 pt-4">
        <div className="col-4">
          <Forma guardarGasto={guardarGasto} guardarIngreso={guardarIngreso} />
        </div>
        <div className="col">
          <TablaIngresos ingresos={ingresoPorMes} gastos={gastosPorMes} />
          <TablaBalance ingresos={ingresoPorMes} gastos={gastosPorMes} />
          {Object.entries(gastosXCategoria).map(([categoria, gastos]) => (
            <div key={categoria}>
              <h2 className="fs-5">{categoria.toUpperCase()}</h2>
              <TablaCategoria gastos={gastos} eliminarGasto={eliminarGasto} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
