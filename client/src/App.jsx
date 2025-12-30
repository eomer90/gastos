import { useState, useEffect } from "react";

function App() {
  const [gastos, setGastos] = useState({
    gastosEstimados: [],
    gastosTarjeta: [],
    gastosEfectivo: [],
  });

  const [forma, setForma] = useState({
    ingreso: "",
    gastosEstimados: {
      descripcion: "",
      cantidad: "",
    },
    gastosTarjeta: {
      descripcion: "",
      cantidad: "",
      fecha: "",
    },
    gastosEfectivo: {
      descripcion: "",
      cantidad: "",
    },
    mesSeleccionado: "",
  });

  useEffect(() => {
    const fecha = new Date();
    setForma({
      ...forma,
      mesSeleccionado: fecha.getMonth(),
    });
  }, []);

  const añadirIngreso = (event) => {
    setForma({
      ...forma,
      ingreso: Number(event.target.value),
    });
  };

  const handleChangeGastoEstimado = (event) => {
    const { name, value } = event.target;
    setForma({
      ...forma,
      gastosEstimados: {
        ...forma.gastosEstimados,
        [name]: value,
      },
    });
  };

  const handleChangeGastoTarjeta = (event) => {
    const { name, value } = event.target;
    setForma({
      ...forma,
      gastosTarjeta: {
        ...forma.gastosTarjeta,
        [name]: value,
      },
    });
  };

  const handleChangeGastoEfectivo = (event) => {
    const { name, value } = event.target;
    setForma({
      ...forma,
      gastosEfectivo: {
        ...forma.gastosEfectivo,
        [name]: value,
      },
    });
  };

  const handleChangeMesSeleccionado = (event) => {
    const { value } = event.target;
    setForma({
      ...forma,
      mesSeleccionado: value,
    });
  };

  const añadirGastosEstimados = () => {
    setGastos({
      ...gastos,
      gastosEstimados: [
        ...gastos.gastosEstimados,
        {
          descripcion: forma.gastosEstimados.descripcion,
          cantidad: Number(forma.gastosEstimados.cantidad),
        },
      ],
    });
    setForma({
      ...forma,
      gastosEstimados: {
        descripcion: "",
        cantidad: "",
      },
    });
  };

  const añadirGastoTarjeta = () => {
    setGastos({
      ...gastos,
      gastosTarjeta: [
        ...gastos.gastosTarjeta,
        {
          descripcion: forma.gastosTarjeta.descripcion,
          cantidad: Number(forma.gastosTarjeta.cantidad),
          fecha: new Date(forma.gastosTarjeta.fecha),
        },
      ],
    });

    setForma({
      ...forma,
      gastosTarjeta: {
        descripcion: "",
        cantidad: "",
        fecha: "",
      },
    });
  };

  const añadirGastoEfectivo = (event) => {
    setGastos({
      ...gastos,
      gastosEfectivo: [
        ...gastos.gastosEfectivo,
        {
          descripcion: forma.gastosEfectivo.descripcion,
          cantidad: Number(forma.gastosEfectivo.cantidad),
        },
      ],
    });
    setForma({
      ...forma,
      gastosEfectivo: {
        descripcion: "",
        cantidad: "",
      },
    });
  };

  const filtroMesGastosTarjeta = gastos.gastosTarjeta.filter(
    (g) => g.fecha.getMonth() == forma.mesSeleccionado
  );

  const sumaGastosTotalesTarjeta = filtroMesGastosTarjeta.reduce(
    (accu, actual) => accu + actual.cantidad,
    0
  );

  const sumaGastosEstimadosTotales = gastos.gastosEstimados.reduce(
    (accu, actual) => accu + actual.cantidad,
    0
  );

  const sumaGastosTotalesEfectivo = gastos.gastosEfectivo.reduce(
    (accu, actual) => accu + actual.cantidad,
    0
  );

  const ahorro =
    forma.ingreso - sumaGastosTotalesTarjeta - sumaGastosTotalesEfectivo;

  return (
    <>
      <div>
        <label>Elige un periodo</label>
        <select
          value={forma.mesSeleccionado}
          onChange={handleChangeMesSeleccionado}
        >
          <option value="0">Enero</option>
          <option value="1">Febrero</option>
          <option value="2">Marzo</option>
          <option value="3">Abril</option>
          <option value="4">Mayo</option>
          <option value="5">Junio</option>
          <option value="6">Julio</option>
          <option value="7">Agosto</option>
          <option value="8">Septiembre</option>
          <option value="9">Octubre</option>
          <option value="10">Noviembre</option>
          <option value="11">Diciembre</option>
        </select>

        <label>Ingreso: </label>
        <input
          type="number"
          value={forma.ingreso}
          onChange={añadirIngreso}
        ></input>
        <label>Ahorro: </label>
        <input disabled type="number" value={ahorro}></input>
      </div>
      <div>
        <input
          type="text"
          value={forma.gastosEstimados.descripcion}
          name="descripcion"
          onChange={handleChangeGastoEstimado}
        ></input>
        <input
          type="number"
          value={forma.gastosEstimados.cantidad}
          name="cantidad"
          onChange={handleChangeGastoEstimado}
        ></input>
        <button onClick={añadirGastosEstimados}>Añadir gasto estimado</button>
        <input
          type="text"
          value={forma.gastosTarjeta.descripcion}
          name="descripcion"
          onChange={handleChangeGastoTarjeta}
        ></input>
        <input
          type="number"
          value={forma.gastosTarjeta.cantidad}
          name="cantidad"
          onChange={handleChangeGastoTarjeta}
        ></input>
        <input
          type="date"
          value={forma.gastosTarjeta.fecha}
          name="fecha"
          onChange={handleChangeGastoTarjeta}
        ></input>
        <button onClick={añadirGastoTarjeta}>
          Añadir gasto en tarjeta realizado
        </button>
        <input
          type="text"
          value={forma.gastosEfectivo.descripcion}
          name="descripcion"
          onChange={handleChangeGastoEfectivo}
        ></input>
        <input
          type="number"
          value={forma.gastosEfectivo.cantidad}
          name="cantidad"
          onChange={handleChangeGastoEfectivo}
        ></input>
        <button onClick={añadirGastoEfectivo}>
          Añadir gasto en efectivo realizado
        </button>
      </div>
      <div>
        <h3>Gastos estimados:</h3>
        <table>
          <thead>
            <tr>
              <th>Descripción</th>
              <th>Cantidad</th>
            </tr>
          </thead>
          <tbody>
            {gastos.gastosEstimados.map((gasto) => {
              return (
                <tr>
                  <td>{gasto.descripcion}</td>
                  <td>{gasto.cantidad}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <p> Total: {sumaGastosEstimadosTotales}</p>
      </div>
      <div>
        <h3>Gastos en tarjeta realizado:</h3>
        <table>
          <thead>
            <tr>
              <th>Descripción</th>
              <th>Cantidad</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {filtroMesGastosTarjeta.map((gasto, index) => {
              return (
                <tr key={index}>
                  <td>{gasto.descripcion}</td>
                  <td>{gasto.cantidad}</td>
                  <td>{gasto.fecha.toLocaleDateString()}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <p>Total: {sumaGastosTotalesTarjeta}</p>
      </div>
      <div>
        <h3>Gastos en efectivo realizado:</h3>
        <table>
          <thead>
            <tr>
              <th>Descripción</th>
              <th>Cantidad</th>
            </tr>
          </thead>
          <tbody>
            {gastos.gastosEfectivo.map((gasto) => {
              return (
                <tr>
                  <td>{gasto.descripcion}</td>
                  <td>{gasto.cantidad}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <p>Total: {sumaGastosTotalesEfectivo}</p>
      </div>
    </>
  );
}

export default App;
