import { useEffect, useState } from "react";
import { Forma } from "./components/Forma";
import { FormaIngresos } from "./components/FormaIngresos";
import { TablaCategoria } from "./components/TablaCategoria";
import { TablaContado } from "./components/TablaContado";
import { TablaIngresos } from "./components/TablaIngresos";
import { TablaBalance } from "./components/TablaBalance";
import { FormaGastosEditar } from "./components/FormaGastosEditar";
import { FormaIngresosEditar } from "./components/FormaIngresosEditar";
import { ModalError } from "./components/ModalError";
import { Api } from "./utils/ApiCalls";
import { ModalEliminarGasto } from "./components/ModalEliminarGasto";

const API_URL = "http://localhost:3000";

const mesActual = String(new Date().getMonth() + 1).padStart(2, "0");

function App() {
  const [gastos, setGastos] = useState([]);
  const [ingresos, setIngresos] = useState([]);
  const [mesActivo, setMesActivo] = useState(mesActual);
  const [ventanaEdicion, setVentanaEdicion] = useState(false);
  const [ventanaEdicionIngresos, setVentanaEdicionIngresos] = useState(false);
  const [gastoSeleccionado, setGastoSeleccionado] = useState(null);
  const [ingresoSeleccionado, setIngresoSeleccionado] = useState(null);
  const [ventanaError, setVentanaError] = useState(false);
  const [ventanaEliminarGasto, setVentanaEliminarGasto] = useState(false);
  const [gastoAEliminar, setGastoAEliminar] = useState(null);

  const traerIngreso = async () => {
    try {
      const res = await Api.get(`ingresos?periodo=${mesActivo}`);
      setIngresos(res.ingresos);
    } catch (error) {
      console.error(error);
    }
  };

  const traerGasto = async () => {
    try {
      const res = await Api.get(`gastos?periodo=${mesActivo}`);
      setGastos(res.gastos);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    traerIngreso();
    traerGasto();
  }, [mesActivo]);

  const guardarIngreso = async (formIngresos) => {
    try {
      const res = await Api.post("ingresos", formIngresos);
      if (res.error) {
        setVentanaError(true);
      } else {
        traerIngreso();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const editarIngreso = async (formIngresosEdicion, id) => {
    try {
      const req = await fetch(`${API_URL}/ingresos/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formIngresosEdicion),
      });
      const res = await req.json();
      if (res.error) {
        // mensaje
      } else {
        traerIngreso();
      }
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
      if (res.error) {
        // mensaje
      } else {
        traerIngreso();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const guardarGasto = async (formGastos) => {
    try {
      const res = await Api.post("gastos", formGastos);
      if (res.error) {
        //mostrar un modal de error
      } else {
        traerGasto();
      }
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

  const eliminarGasto = async (id, isCadena = false) => {
    try {
      await fetch(`${API_URL}/gastos`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, isCadena }),
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

  const ingresosOrdenados = [...ingresos].sort(
    (a, b) => new Date(a.fechaIngreso) - new Date(b.fechaIngreso),
  );

  const gastosOrdenados = [...gastos].sort(
    (a, b) => new Date(a.fecha) - new Date(b.fecha),
  );

  return (
    <div className="container-fluid px-4">
      <div className="py-4 mb-4 bg-dark text-white text-center rounded">
        <h1 className="fw-bold m-0">CONTROL DE GASTOS</h1>
      </div>

      <div className="row mb-4 align-items-end">
        <div className="col-md-3">
          <label className="form-label fw-bold">
            <h2>PERIODO</h2>
          </label>
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

      <div className="row gx-4">
        <div className="col-md-3">
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <FormaIngresos
                guardarIngreso={guardarIngreso}
                mesActivo={mesActivo}
              />
            </div>
          </div>

          <div className="card shadow-sm">
            <div className="card-body">
              <Forma guardarGasto={guardarGasto} mesActivo={mesActivo} />
            </div>
          </div>
        </div>

        <div className="col-md-9">
          <div className="row mb-4">
            <div className="col-md-5">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <TablaBalance
                    ingresosOrdenados={ingresosOrdenados}
                    gastosOrdenados={gastosOrdenados}
                  />
                </div>
              </div>
            </div>

            <div className="col-md-7">
              <div className="card shadow-sm h-100">
                <div className="card-body">
                  <TablaIngresos
                    ingresosOrdenados={ingresosOrdenados}
                    eliminarIngreso={eliminarIngreso}
                    setVentanaEdicionIngresos={setVentanaEdicionIngresos}
                    setIngresoSeleccionado={setIngresoSeleccionado}
                    mesActivo={mesActivo}
                    gastosOrdenados={gastosOrdenados}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <TablaCategoria
                gastosOrdenados={gastosOrdenados}
                eliminarGasto={eliminarGasto}
                setVentanaEdicion={setVentanaEdicion}
                setGastoSeleccionado={setGastoSeleccionado}
                setVentanaEliminarGasto={setVentanaEliminarGasto}
                setGastoAEliminar={setGastoAEliminar}
              />
            </div>
          </div>

          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <TablaContado
                gastosOrdenados={gastosOrdenados}
                eliminarGasto={eliminarGasto}
                setVentanaEdicion={setVentanaEdicion}
                setGastoSeleccionado={setGastoSeleccionado}
              />
            </div>
          </div>

          {ventanaEdicion && (
            <div className="card shadow-sm">
              <div className="card-body">
                <FormaGastosEditar
                  gastoSeleccionado={gastoSeleccionado}
                  editarGasto={editarGasto}
                  setVentanaEdicion={setVentanaEdicion}
                  mesActivo={mesActivo}
                />
              </div>
            </div>
          )}

          {ventanaEdicionIngresos && (
            <div className="card shadow-sm">
              <div className="card-body">
                <FormaIngresosEditar
                  setVentanaEdicionIngresos={setVentanaEdicionIngresos}
                  ingresoSeleccionado={ingresoSeleccionado}
                  editarIngreso={editarIngreso}
                />
              </div>
            </div>
          )}

          {ventanaEliminarGasto && (
            <ModalEliminarGasto
              setVentanaEliminarGasto={setVentanaEliminarGasto}
              gastoAEliminar={gastoAEliminar}
              eliminarGasto={eliminarGasto}
            />
          )}

          {ventanaError && <ModalError setVentanaError={setVentanaError} />}
        </div>
      </div>
    </div>
  );
}

export default App;
