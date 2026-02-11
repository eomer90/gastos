import { useEffect, useState } from "react";
import { Forma } from "./components/Forma";
import { FormaIngresos } from "./components/FormaIngresos";
import { TablaCategoria } from "./components/TablaCategoria";
import { TablaIngresos } from "./components/TablaIngresos";
import { TablaBalance } from "./components/TablaBalance";

const API_URL = "http://localhost:3000";

function App() {
  const mesActual = String(new Date().getMonth() + 1).padStart(2, "0");

  const [gastos, setGastos] = useState([]);
  const [ingresos, setIngresos] = useState([]);
  const [mesActivo, setMesActivo] = useState(mesActual);

  const guardarIngreso = async (formIngresos) => {
    try {
      const req = await fetch(`${API_URL}/ingresos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formIngresos),
      });

      const res = await req.json();
      setIngresos(res.ingresos);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const traerIngreso = async () => {
      try {
        const req = await fetch(`${API_URL}/ingresos?mes=${mesActivo}`);
        const res = await req.json();
        setIngresos(res.ingresos);
      } catch (error) {
        console.error(error);
      }
    };

    const traerGasto = async () => {
      try {
        const req = await fetch(`${API_URL}/gastos?mes=${mesActivo}`);
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
      const req = await fetch(`${API_URL}/gastos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formGastos),
      });

      const res = await req.json();
      setGastos(res.gastos);
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarGasto = async (id) => {
    try {
      const req = await fetch(`${API_URL}/gastos`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

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

  const gastosPorMes = gastos.filter((g) => {
    const [_, mes] = g.fecha.split("-");
    return mes === mesActivo;
  });

  gastosPorMes.sort(
    (a, b) => Number(a.fecha.split("-")[2]) - Number(b.fecha.split("-")[2]),
  );

  const ingresosPorMes = ingresos.filter((i) => {
    const [_, mes] = i.fechaIngreso.split("-");
    return mes === mesActivo;
  });

  ingresosPorMes.sort(
    (a, b) =>
      Number(a.fechaIngreso.split("-")[2]) -
      Number(b.fechaIngreso.split("-")[2]),
  );

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

  return (
    <div className="container">
      <div className="pt-4 mb-4">
        <h1>{"Control de gastos".toUpperCase()}</h1>
      </div>

      <div className="row mb-4">
        <div className="col-2">
          <label className="form-label fw-bold text-dark">Mes</label>

          <div className="input-group shadow-sm">
            <span className="input-group-text bg-light">📅</span>
            <select
              className="form-select"
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
      </div>

      <div className="row gx-5">
        <div className="col-4">
          <FormaIngresos guardarIngreso={guardarIngreso} />
          <Forma guardarGasto={guardarGasto} />
        </div>

        <div className="col-8">
          <div className="row">
            <div className="col-5">
              <TablaBalance ingresos={ingresos} gastos={gastosPorMes} />
            </div>

            <div className="col-7">
              <TablaIngresos
                ingresosPorMes={ingresosPorMes}
                gastos={gastosPorMes}
                eliminarIngreso={eliminarIngreso}
              />
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              {Object.entries(gastosXCategoria).map(([categoria, gastos]) => (
                <div key={categoria}>
                  <p className="form-label fw-bold text-dark">
                    {categoria.toUpperCase()}
                  </p>
                  <TablaCategoria
                    gastos={gastos}
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
