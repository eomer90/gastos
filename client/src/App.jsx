import { useState, useEffect } from "react";

function App() {
  const [gastos, setGastos] = useState({
    gastosFijos: [],
    gastosRecurrentes: [],
    gastosAlimentacion: [],
    gastosTransporte: [],
    gastosVariables: [],
  });

  const [forma, setForma] = useState({
    ingreso: "",
    gastosFijos: {
      descripcion: "",
      cantidad: "",
      fecha: "",
      tipoPago: "",
    },
    gastosRecurrentes: {
      descripcion: "",
      cantidad: "",
      fecha: "",
      tipoPago: "",
    },
    gastosAlimentacion: {
      descripcion: "",
      cantidad: "",
      fecha: "",
      tipoPago: "",
    },
    gastosTransporte: {
      descripcion: "",
      cantidad: "",
      fecha: "",
      tipoPago: "",
    },
    gastosVariables: {
      descripcion: "",
      cantidad: "",
      fecha: "",
      tipoPago: "",
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

  const handleChangeGastoFijo = (event) => {
    const { name, value } = event.target;
    setForma({
      ...forma,
      gastosFijos: {
        ...forma.gastosFijos,
        [name]: value,
      },
    });
  };

  const handleChangeGastoRecurrente = (event) => {
    const { name, value } = event.target;
    setForma({
      ...forma,
      gastosRecurrentes: {
        ...forma.gastosRecurrentes,
        [name]: value,
      },
    });
  };

  const handleChangeGastoAlimentacion = (event) => {
    const { name, value } = event.target;
    setForma({
      ...forma,
      gastosAlimentacion: {
        ...forma.gastosAlimentacion,
        [name]: value,
      },
    });
  };

  const handleChangeGastoTransporte = (event) => {
    const { name, value } = event.target;
    setForma({
      ...forma,
      gastosTransporte: {
        ...forma.gastosTransporte,
        [name]: value,
      },
    });
  };

  const handleChangeGastoVariable = (event) => {
    const { name, value } = event.target;
    setForma({
      ...forma,
      gastosVariables: {
        ...forma.gastosVariables,
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

  const añadirGastoFijo = () => {
    setGastos({
      ...gastos,
      gastosFijos: [
        ...gastos.gastosFijos,
        {
          descripcion: forma.gastosFijos.descripcion,
          cantidad: Number(forma.gastosFijos.cantidad),
          fecha: new Date(forma.gastosFijos.fecha),
          tipoPago: forma.gastosFijos.tipoPago,
        },
      ],
    });

    setForma({
      ...forma,
      gastosFijos: {
        descripcion: "",
        cantidad: "",
        fecha: "",
        tipoPago: "",
      },
    });
  };

  const añadirGastoRecurrente = (event) => {
    setGastos({
      ...gastos,
      gastosRecurrentes: [
        ...gastos.gastosRecurrentes,
        {
          descripcion: forma.gastosRecurrentes.descripcion,
          cantidad: Number(forma.gastosRecurrentes.cantidad),
          fecha: new Date(forma.gastosRecurrentes.fecha),
          tipoPago: forma.gastosRecurrentes.tipoPago,
        },
      ],
    });
    setForma({
      ...forma,
      gastosRecurrentes: {
        descripcion: "",
        cantidad: "",
        fecha: "",
        tipoPago: "",
      },
    });
  };

  const añadirGastoAlimentacion = () => {
    setGastos({
      ...gastos,
      gastosAlimentacion: [
        ...gastos.gastosAlimentacion,
        {
          descripcion: forma.gastosAlimentacion.descripcion,
          cantidad: Number(forma.gastosAlimentacion.cantidad),
          fecha: new Date(forma.gastosAlimentacion.fecha),
          tipoPago: forma.gastosAlimentacion.tipoPago,
        },
      ],
    });

    setForma({
      ...forma,
      gastosAlimentacion: {
        descripcion: "",
        cantidad: "",
        fecha: "",
        tipoPago: "",
      },
    });
  };

  const añadirGastoTransporte = () => {
    setGastos({
      ...gastos,
      gastosTransporte: [
        ...gastos.gastosTransporte,
        {
          descripcion: forma.gastosTransporte.descripcion,
          cantidad: Number(forma.gastosTransporte.cantidad),
          fecha: new Date(forma.gastosTransporte.fecha),
          tipoPago: forma.gastosTransporte.tipoPago,
        },
      ],
    });

    setForma({
      ...forma,
      gastosTransporte: {
        descripcion: "",
        cantidad: "",
        fecha: "",
        tipoPago: "",
      },
    });
  };

  const añadirGastoVariable = () => {
    setGastos({
      ...gastos,
      gastosVariables: [
        ...gastos.gastosVariables,
        {
          descripcion: forma.gastosVariables.descripcion,
          cantidad: Number(forma.gastosVariables.cantidad),
          fecha: new Date(forma.gastosVariables.fecha),
          tipoPago: forma.gastosVariables.tipoPago,
        },
      ],
    });

    setForma({
      ...forma,
      gastosVariables: {
        descripcion: "",
        cantidad: "",
        fecha: "",
        tipoPago: "",
      },
    });
  };

  const filtroMesGastosFijos = gastos.gastosFijos.filter(
    (g) => g.fecha.getMonth() == forma.mesSeleccionado
  );

  const filtroMesGastosRecurrentes = gastos.gastosRecurrentes.filter(
    (g) => g.fecha.getMonth() == forma.mesSeleccionado
  );

  const filtroMesGastosAlimentacion = gastos.gastosAlimentacion.filter(
    (g) => g.fecha.getMonth() == forma.mesSeleccionado
  );

  const filtroMesGastosTransporte = gastos.gastosTransporte.filter(
    (g) => g.fecha.getMonth() == forma.mesSeleccionado
  );

  const filtroMesGastosVariables = gastos.gastosVariables.filter(
    (g) => g.fecha.getMonth() == forma.mesSeleccionado
  );

  const sumaGastosTotalesFijos = filtroMesGastosFijos.reduce(
    (accu, actual) => accu + actual.cantidad,
    0
  );

  const sumaGastosTotalesRecurrentes = gastos.gastosRecurrentes.reduce(
    (accu, actual) => accu + actual.cantidad,
    0
  );

  const sumaGastosTotalesAlimentacion = filtroMesGastosAlimentacion.reduce(
    (accu, actual) => accu + actual.cantidad,
    0
  );

  const sumaGastosTotalesTransporte = filtroMesGastosTransporte.reduce(
    (accu, actual) => accu + actual.cantidad,
    0
  );

  const sumaGastosTotalesVariables = filtroMesGastosVariables.reduce(
    (accu, actual) => accu + actual.cantidad,
    0
  );

  const filtroCreditoPagosFijos = filtroMesGastosFijos.filter(
    (g) => g.tipoPago === "credito"
  );

  const filtroCreditoPagosRecurrentes = filtroMesGastosRecurrentes.filter(
    (g) => g.tipoPago === "credito"
  );

  const filtroCreditoPagosAlimentacion = filtroMesGastosAlimentacion.filter(
    (g) => g.tipoPago === "credito"
  );

  const filtroCreditoPagosTransporte = filtroMesGastosTransporte.filter(
    (g) => g.tipoPago === "credito"
  );

  const filtroCreditoPagosVariables = filtroMesGastosVariables.filter(
    (g) => g.tipoPago === "credito"
  );

  const sumaCreditoPagosFijos = filtroCreditoPagosFijos.reduce(
    (acc, actual) => acc + actual.cantidad,
    0
  );

  const sumaCreditoPagosRecurrentes = filtroCreditoPagosRecurrentes.reduce(
    (acc, actual) => acc + actual.cantidad,
    0
  );

  const sumaCreditoPagosAlimentacion = filtroCreditoPagosAlimentacion.reduce(
    (acc, actual) => acc + actual.cantidad,
    0
  );

  const sumaCreditoPagosTransporte = filtroCreditoPagosTransporte.reduce(
    (acc, actual) => acc + actual.cantidad,
    0
  );

  const sumaCreditoPagosVariables = filtroCreditoPagosVariables.reduce(
    (acc, actual) => acc + actual.cantidad,
    0
  );

  const sumaTotalCredito =
    sumaCreditoPagosFijos +
    sumaCreditoPagosRecurrentes +
    sumaCreditoPagosAlimentacion +
    sumaCreditoPagosTransporte +
    sumaCreditoPagosVariables;

  const ahorro =
    forma.ingreso -
    sumaGastosTotalesFijos -
    sumaGastosTotalesRecurrentes -
    sumaGastosTotalesAlimentacion -
    sumaGastosTotalesTransporte -
    sumaGastosTotalesVariables;

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
        <label>Total Crédito: </label>
        <p>{sumaTotalCredito}</p>
        <label>Ahorro: </label>
        <p>{ahorro}</p>
      </div>
      <div>
        <h3>Fijos:</h3>
        <div>
          <input
            type="text"
            value={forma.gastosFijos.descripcion}
            name="descripcion"
            onChange={handleChangeGastoFijo}
          ></input>
          <input
            type="number"
            value={forma.gastosFijos.cantidad}
            name="cantidad"
            onChange={handleChangeGastoFijo}
          ></input>
          <input
            type="date"
            value={forma.gastosFijos.fecha}
            name="fecha"
            onChange={handleChangeGastoFijo}
          ></input>
          <select
            value={forma.gastosFijos.tipoPago}
            name="tipoPago"
            onChange={handleChangeGastoFijo}
          >
            <option value="">Selecciona una opcion de pago</option>
            <option value="credito">Crédito</option>
            <option value="contado">Contado</option>
          </select>
          <button onClick={añadirGastoFijo}>Añadir gasto</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Descripción</th>
              <th>Cantidad</th>
              <th>Fecha</th>
              <th>Tipo de pago</th>
            </tr>
          </thead>
          <tbody>
            {filtroMesGastosFijos.map((gasto, index) => {
              return (
                <tr key={index}>
                  <td>{gasto.descripcion}</td>
                  <td>{gasto.cantidad}</td>
                  <td>{gasto.fecha.toLocaleDateString()}</td>
                  <td>{gasto.tipoPago}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <p>Total: {sumaGastosTotalesFijos}</p>
      </div>
      <div>
        <h3>Recurrentes (suscripciones y pagos a meses):</h3>
        <div>
          <input
            type="text"
            value={forma.gastosRecurrentes.descripcion}
            name="descripcion"
            onChange={handleChangeGastoRecurrente}
          ></input>
          <input
            type="number"
            value={forma.gastosRecurrentes.cantidad}
            name="cantidad"
            onChange={handleChangeGastoRecurrente}
          ></input>
          <input
            type="date"
            value={forma.gastosRecurrentes.fecha}
            name="fecha"
            onChange={handleChangeGastoRecurrente}
          ></input>
          <select
            value={forma.gastosRecurrentes.tipoPago}
            name="tipoPago"
            onChange={handleChangeGastoRecurrente}
          >
            <option value="">Selecciona una opcion de pago</option>
            <option value="credito">Crédito</option>
            <option value="contado">Contado</option>
          </select>
          <button onClick={añadirGastoRecurrente}>Añadir gasto</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Descripción</th>
              <th>Cantidad</th>
              <th>Fecha</th>
              <th>Tipo de Pago</th>
            </tr>
          </thead>
          <tbody>
            {gastos.gastosRecurrentes.map((gasto) => {
              return (
                <tr>
                  <td>{gasto.descripcion}</td>
                  <td>{gasto.cantidad}</td>
                  <td>{gasto.fecha.toLocaleDateString()}</td>
                  <td>{gasto.tipoPago}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <p>Total: {sumaGastosTotalesRecurrentes}</p>
      </div>
      <div>
        <h3>Alimentación y Despensa:</h3>
        <input
          type="text"
          value={forma.gastosAlimentacion.descripcion}
          name="descripcion"
          onChange={handleChangeGastoAlimentacion}
        ></input>
        <input
          type="number"
          value={forma.gastosAlimentacion.cantidad}
          name="cantidad"
          onChange={handleChangeGastoAlimentacion}
        ></input>
        <input
          type="date"
          value={forma.gastosAlimentacion.fecha}
          name="fecha"
          onChange={handleChangeGastoAlimentacion}
        ></input>
        <select
          value={forma.gastosAlimentacion.tipoPago}
          name="tipoPago"
          onChange={handleChangeGastoAlimentacion}
        >
          <option value="">Selecciona una opcion de pago</option>
          <option value="credito">Crédito</option>
          <option value="contado">Contado</option>
        </select>
        <button onClick={añadirGastoAlimentacion}>Añadir gasto</button>
        <table>
          <thead>
            <tr>
              <th>Descripción</th>
              <th>Cantidad</th>
              <th>Fecha</th>
              <th>Tipo de Pago</th>
            </tr>
          </thead>
          <tbody>
            {filtroMesGastosAlimentacion.map((gasto, index) => {
              return (
                <tr key={index}>
                  <td>{gasto.descripcion}</td>
                  <td>{gasto.cantidad}</td>
                  <td>{gasto.fecha.toLocaleDateString()}</td>
                  <td>{gasto.tipoPago}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <p>Total: {sumaGastosTotalesAlimentacion}</p>
      </div>
      <div>
        <h3>Trasporte:</h3>
        <input
          type="text"
          value={forma.gastosTransporte.descripcion}
          name="descripcion"
          onChange={handleChangeGastoTransporte}
        ></input>
        <input
          type="number"
          value={forma.gastosTransporte.cantidad}
          name="cantidad"
          onChange={handleChangeGastoTransporte}
        ></input>
        <input
          type="date"
          value={forma.gastosTransporte.fecha}
          name="fecha"
          onChange={handleChangeGastoTransporte}
        ></input>
        <select
          value={forma.gastosTransporte.tipoPago}
          name="tipoPago"
          onChange={handleChangeGastoTransporte}
        >
          <option value="">Selecciona una opcion de pago</option>
          <option value="credito">Crédito</option>
          <option value="contado">Contado</option>
        </select>
        <button onClick={añadirGastoTransporte}>Añadir gasto</button>
        <table>
          <thead>
            <tr>
              <th>Descripción</th>
              <th>Cantidad</th>
              <th>Fecha</th>
              <th>Tipo de Pago</th>
            </tr>
          </thead>
          <tbody>
            {filtroMesGastosTransporte.map((gasto, index) => {
              return (
                <tr key={index}>
                  <td>{gasto.descripcion}</td>
                  <td>{gasto.cantidad}</td>
                  <td>{gasto.fecha.toLocaleDateString()}</td>
                  <td>{gasto.tipoPago}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <p>Total: {sumaGastosTotalesTransporte}</p>
      </div>
      <div>
        <h3>Variables:</h3>
        <input
          type="text"
          value={forma.gastosVariables.descripcion}
          name="descripcion"
          onChange={handleChangeGastoVariable}
        ></input>
        <input
          type="number"
          value={forma.gastosVariables.cantidad}
          name="cantidad"
          onChange={handleChangeGastoVariable}
        ></input>
        <input
          type="date"
          value={forma.gastosVariables.fecha}
          name="fecha"
          onChange={handleChangeGastoVariable}
        ></input>
        <select
          value={forma.gastosVariables.tipoPago}
          name="tipoPago"
          onChange={handleChangeGastoVariable}
        >
          <option value="">Selecciona una opcion de pago</option>
          <option value="credito">Crédito</option>
          <option value="contado">Contado</option>
        </select>
        <button onClick={añadirGastoVariable}>Añadir gasto</button>
        <table>
          <thead>
            <tr>
              <th>Descripción</th>
              <th>Cantidad</th>
              <th>Fecha</th>
              <th>Tipo de Pago</th>
            </tr>
          </thead>
          <tbody>
            {filtroMesGastosVariables.map((gasto, index) => {
              return (
                <tr key={index}>
                  <td>{gasto.descripcion}</td>
                  <td>{gasto.cantidad}</td>
                  <td>{gasto.fecha.toLocaleDateString()}</td>
                  <td>{gasto.tipoPago}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <p>Total: {sumaGastosTotalesVariables}</p>
      </div>
    </>
  );
}

export default App;
