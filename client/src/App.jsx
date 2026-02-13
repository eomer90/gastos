import { useEffect, useState } from "react";
import { Forma } from "./components/Forma";
import { FormaIngresos } from "./components/FormaIngresos";
import { TablaCategoria } from "./components/TablaCategoria";
import { TablaIngresos } from "./components/TablaIngresos";
import { TablaBalance } from "./components/TablaBalance";

const API_URL = "http://localhost:3000";

function App() {
  // const mesActual = String(new Date().getMonth() + 1).padStart(2, "0");

  const [gastos, setGastos] = useState([]);
  const [ingresos, setIngresos] = useState([]);
  const [mesActivo, setMesActivo] = useState("01");

  const guardarIngreso = async (formIngresos) => {
    try {
      await fetch(`${API_URL}/ingresos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formIngresos),
      });

      const req = await fetch(`${API_URL}/ingresos?periodo=${mesActivo}`);
      const res = await req.json();

      setIngresos(res.ingresos);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const traerIngreso = async () => {
      try {
        const req = await fetch(`${API_URL}/ingresos?periodo=${mesActivo}`);
        const res = await req.json();
        setIngresos(res.ingresos);
      } catch (error) {
        console.error(error);
      }
    };

    const traerGasto = async () => {
      try {
        const req = await fetch(`${API_URL}/gastos?periodo=${mesActivo}`);
        const res = await req.json();

        setGastos(res.gastos);
      } catch (error) {
        console.error(error);
      }
    };
    traerIngreso();
    traerGasto();
  }, [mesActivo]);

  const guardarGasto = async (formGastos) => {
    try {
      await fetch(`${API_URL}/gastos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formGastos),
      });

      const req = await fetch(`${API_URL}/gastos?periodo=${mesActivo}`);
      const res = await req.json();

      setGastos(res.gastos);
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarGasto = async (id) => {
    try {
      await fetch(`${API_URL}/gastos`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const req = await fetch(`${API_URL}/gastos?periodo=${mesActivo}`);
      const res = await req.json();

      setGastos(res.gastos);
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarIngreso = async (id) => {
    try {
      const req = await fetch(`${API_URL}/ingresos`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      const res = await req.json();
      setIngresos(res.ingresos);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeMes = ({ target }) => {
    setMesActivo(target.value);
  };

  const fechaFormatoMx = (fecha) => {
    const [year, mes, dia] = fecha.split("-");
    return `${dia}/${mes}/${year}`;
  };

  const ingresosPorPeriodo = ingresos.sort(
    (a, b) =>
      Number(a.fechaIngreso.split("-")[1]) -
      Number(b.fechaIngreso.split("-")[1]),
  );

  const ingresosOrdenados = ingresosPorPeriodo.sort(
    (a, b) =>
      Number(a.fechaIngreso.split("-")[2]) -
      Number(b.fechaIngreso.split("-")[2]),
  );

  const gastosPorPeriodo = gastos.sort(
    (a, b) => Number(a.fecha.split("-")[1]) - Number(b.fecha.split("-")[1]),
  );

  const gastosOrdenados = gastosPorPeriodo.sort(
    (a, b) => Number(a.fecha.split("-")[2]) - Number(b.fecha.split("-")[2]),
  );

  const gastosXTipo = gastos.reduce(
    (obj, gasto) => {
      const tipoGasto = gasto.tipoPago;

      obj[tipoGasto].push({
        ...gasto,
        fecha: fechaFormatoMx(gasto.fecha),
      });

      return obj;
    },
    {
      credito: [],
      contado: [],
    },
  );

  return (
    <div className="container">
      <div className="pt-4 mb-4">
        <h1>{"Control de gastos".toUpperCase()}</h1>
      </div>

      <div className="row mb-4">
        <div className="col-3">
          <label className="form-label fw-bold text-dark">Periodo</label>

          <div className="input-group shadow-sm">
            <span className="input-group-text bg-light">📅</span>
            <select
              className="form-select"
              value={mesActivo}
              onChange={handleChangeMes}
            >
              <option value="01">Diciembre-Enero</option>
              <option value="02">Enero-Febrero</option>
              <option value="03">Febrero-Marzo</option>
              <option value="04">Marzo-Abril</option>
              <option value="05">Abril-Mayo</option>
              <option value="06">Mayo-Junio</option>
              <option value="07">Junio-Julio</option>
              <option value="08">Julio-Agosto</option>
              <option value="09">Agosto-Septiembre</option>
              <option value="10">Septiembre-Octubre</option>
              <option value="11">Octubre-Noviembre</option>
              <option value="12">Noviembre-Diciembre</option>
            </select>
          </div>
        </div>
      </div>

      <div className="row gx-5">
        <div className="col-4">
          <FormaIngresos
            guardarIngreso={guardarIngreso}
            mesActivo={mesActivo}
          />
          <Forma guardarGasto={guardarGasto} />
        </div>

        <div className="col-8">
          <div className="row">
            <div className="col-5">
              <TablaBalance
                ingresosOrdenados={ingresosOrdenados}
                gastosOrdenados={gastosOrdenados}
              />
            </div>

            <div className="col-7">
              <TablaIngresos
                ingresosOrdenados={ingresosOrdenados}
                eliminarIngreso={eliminarIngreso}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              {Object.entries(gastosXTipo).map(([tipo, gastosOrdenados]) => (
                <div key={tipo}>
                  <p className="form-label fw-bold text-dark">
                    {tipo.toUpperCase()}
                  </p>
                  <TablaCategoria
                    gastosOrdenados={gastosOrdenados}
                    eliminarGasto={eliminarGasto}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
