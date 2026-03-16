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
import { ModalEliminarIngreso } from "./components/ModalEliminarIngreso";

const API_URL = "http://localhost:3000";

const periodoActual = new Date().toISOString().slice(0, 7);

function App() {
  const [gastos, setGastos] = useState([]);
  const [ingresos, setIngresos] = useState([]);
  const [periodoActivo, setPeriodoActivo] = useState(periodoActual);
  const [ventanaEdicion, setVentanaEdicion] = useState(false);
  const [ventanaEdicionIngresos, setVentanaEdicionIngresos] = useState(false);
  const [gastoSeleccionado, setGastoSeleccionado] = useState(null);
  const [ingresoSeleccionado, setIngresoSeleccionado] = useState(null);
  const [mensajeError, setMensajeError] = useState("");
  const [ventanaError, setVentanaError] = useState(false);
  const [ventanaEliminarGasto, setVentanaEliminarGasto] = useState(false);
  const [gastoAEliminar, setGastoAEliminar] = useState(null);
  const [ventanaEliminarIngreso, setVentanaEliminarIngreso] = useState(false);
  const [ingresoAEliminar, setIngresoAEliminar] = useState(null);

  const traerIngreso = async () => {
    try {
      const res = await Api.get(`ingresos?periodo=${periodoActivo}`);
      setIngresos(res.ingresos);
    } catch (error) {
      console.error(error);
    }
  };

  const traerGasto = async () => {
    try {
      const res = await Api.get(`gastos?periodo=${periodoActivo}`);
      setGastos(res.gastos);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    traerIngreso();
    traerGasto();
  }, [periodoActivo]);

  const guardarIngreso = async (formIngresos) => {
    try {
      const res = await Api.post("ingresos", formIngresos);
      if (res.error) {
        setMensajeError(res.mensaje);
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
      const res = await Api.patch(`ingresos/${id}`, formIngresosEdicion);

      if (res.error) {
        // mostrar error
      } else {
        traerIngreso();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const eliminarIngreso = async (id) => {
    try {
      const res = await Api.delete(`ingresos/${id}`);
      if (!res.error) {
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

      const req = await fetch(`${API_URL}/gastos?periodo=${periodoActivo}`);
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

      const req = await fetch(`${API_URL}/gastos?periodo=${periodoActivo}`);
      const res = await req.json();

      setGastos(res.gastos);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChangeMes = ({ target }) => {
    setPeriodoActivo(target.value);
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
          <div className="col-12">
            <input
              type="month"
              value={periodoActivo}
              onChange={handleChangeMes}
              className="form-control shadow-sm text-center text-capitalize"
            />
          </div>
        </div>
      </div>

      <div className="row gx-4">
        <div className="col-md-3">
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <FormaIngresos
                guardarIngreso={guardarIngreso}
                periodoActivo={periodoActivo}
              />
            </div>
          </div>

          <div className="card shadow-sm">
            <div className="card-body">
              <Forma
                guardarGasto={guardarGasto}
                periodoActivo={periodoActivo}
              />
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
                    periodoActivo={periodoActivo}
                    gastosOrdenados={gastosOrdenados}
                    setVentanaEliminarIngreso={setVentanaEliminarIngreso}
                    setIngresoAEliminar={setIngresoAEliminar}
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
                setVentanaEliminarGasto={setVentanaEliminarGasto}
                setGastoAEliminar={setGastoAEliminar}
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
                  periodoActivo={periodoActivo}
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
                  periodoActual={periodoActual}
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

          {ventanaEliminarIngreso && (
            <ModalEliminarIngreso
              setVentanaEliminarIngreso={setVentanaEliminarIngreso}
              ingresoAEliminar={ingresoAEliminar}
              eliminarIngreso={eliminarIngreso}
            />
          )}

          {ventanaError && (
            <ModalError
              setVentanaError={setVentanaError}
              mensajeError={mensajeError}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
