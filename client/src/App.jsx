import { useEffect, useState } from "react";
import { Forma } from "./components/Forma";
import { FormaIngresos } from "./components/FormaIngresos";
import { TablaCategoria } from "./components/TablaCategoria";
import { TablaContado } from "./components/TablaContado";
import { TablaIngresos } from "./components/TablaIngresos";
import { TablaBalance } from "./components/TablaBalance";
import { FormaGastosEditar } from "./components/FormaGastosEditar";

const API_URL = "http://localhost:3000";

const mesActual = String(new Date().getMonth() + 1).padStart(2, "0");

function App() {
  const [gastos, setGastos] = useState([]);
  const [ingresos, setIngresos] = useState([]);
  const [mesActivo, setMesActivo] = useState(mesActual);
  const [ventanaEdicion, setVentanaEdicion] = useState(false);
  const [gastoSeleccionado, setGastoSeleccionado] = useState(null);

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
      const req = await fetch(`${API_URL}/gastos?periodo=${mesActivo}`, {
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

  const editarGasto = async (formGastosEdicion, id) => {
    try {
      await fetch(`${API_URL}/gastos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formGastosEdicion),
      });

      const req = await fetch(`${API_URL}/gastos?periodo=${mesActivo}`);
      const res = await req.json();

      setGastos(res.gastos);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeMes = ({ target }) => {
    setMesActivo(target.value);
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

  const gastosOrdenados = [...gastos].sort(
    (a, b) => new Date(a.fecha) - new Date(b.fecha),
  );

  const gastosXCredito = gastosOrdenados.filter(
    (g) => g.tipoPago === "credito",
  );

  const gastosXContado = gastosOrdenados.filter(
    (g) => g.tipoPago === "contado",
  );

  return (
    <div className="container">
      <div className="pt-4 mb-4 bg-secondary">
        <h1 className="text-white">{"Control de gastos".toUpperCase()}</h1>
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
        <div className="col-3 ">
          <FormaIngresos
            guardarIngreso={guardarIngreso}
            mesActivo={mesActivo}
          />
          <Forma guardarGasto={guardarGasto} mesActivo={mesActivo} />
        </div>

        <div className="col-9">
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
          <div className="row mb-4">
            <div className="col-12">
              <TablaCategoria
                gastosOrdenados={gastosOrdenados}
                gastosXCredito={gastosXCredito}
                eliminarGasto={eliminarGasto}
                setVentanaEdicion={setVentanaEdicion}
                setGastoSeleccionado={setGastoSeleccionado}
              />
            </div>
          </div>
          <div>
            <div>
              <TablaContado
                gastosXContado={gastosXContado}
                eliminarGasto={eliminarGasto}
                setVentanaEdicion={setVentanaEdicion}
                setGastoSeleccionado={setGastoSeleccionado}
              />
            </div>
          </div>
          {ventanaEdicion && (
            <div className="col-7">
              <FormaGastosEditar
                gastoSeleccionado={gastoSeleccionado}
                editarGasto={editarGasto}
                setVentanaEdicion={setVentanaEdicion}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
