import { useState } from "react";

export const Forma = ({ guardarGasto, mesActivo }) => {
  const estadoInicialForma = {
    descripcion: "",
    cantidad: "",
    categoria: "fijo",
    totalMeses: "",
    tipoPago: "credito",
    estatus: "",
    fecha: "",
    periodoGastos: mesActivo,
    titular: "propio",
    nombreTitular: "",
  };
  const [form, setForm] = useState(estadoInicialForma);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmitGasto = (ev) => {
    ev.preventDefault();
    guardarGasto(form);
    setForm(estadoInicialForma);
  };

  const mostrarNumeroPago = form.categoria === "pagoAMeses";

  const mostrarTitular = form.titular === "ajeno";

  const mostrarPendiente = form.tipoPago === "contado";

  return (
    <form onSubmit={onSubmitGasto} className="border rounded p-3 mb-4 bg-info">
      <h5 className="mb-3">Nuevo gasto</h5>

      <div className="mb-3">
        <label className="form-label fw-bold">Descripción</label>
        <input
          required
          type="text"
          value={form.descripcion}
          name="descripcion"
          onChange={handleChange}
          className="form-control"
          placeholder="Ej. Renta, Netflix"
        />
      </div>

      <div className="mb-3">
        <label className="form-label fw-bold">Cantidad</label>
        <input
          required
          type="number"
          value={form.cantidad}
          name="cantidad"
          onChange={handleChange}
          className="form-control"
          placeholder="$0.00"
        />
      </div>

      <div className="mb-3">
        <label className="form-label fw-bold">Categoría</label>
        <select
          required
          value={form.categoria}
          name="categoria"
          onChange={handleChange}
          className="form-select"
        >
          <option value="fijo">Fijo</option>
          <option value="suscripcion">Suscripción</option>
          <option value="pagoAMeses">Pagos a meses</option>
          <option value="despensa">Alimentación y despensa</option>
          <option value="transporte">Transporte</option>
          <option value="variables">Variables</option>
        </select>
      </div>

      {mostrarNumeroPago && (
        <div className="mb-3">
          <label className="form-label fw-bold">Total de meses</label>
          <input
            required
            type="number"
            value={form.totalMeses}
            name="totalMeses"
            onChange={handleChange}
            className="form-control"
          />
        </div>
      )}

      <div className="mb-3">
        <label className="form-label fw-bold">Tipo de pago</label>
        <select
          disabled={form.categoria === "pagoAMeses"}
          required
          value={form.tipoPago}
          name="tipoPago"
          onChange={handleChange}
          className={`form-select ${
            form.categoria === "pagoAMeses" ? "disabled" : ""
          }`}
        >
          <option value="">Selecciona una opción</option>
          <option value="credito">Crédito</option>
          <option value="contado">Contado</option>
        </select>
      </div>

      {mostrarPendiente && (
        <div className="mb-3">
          <label className="form-label fw-bold">Estatus</label>
          <select
            required
            value={form.estatus}
            name="estatus"
            onChange={handleChange}
            className="form-select"
          >
            <option value="">Selecciona</option>
            <option value="pendiente">Pendiente</option>
            <option value="liberado">Liberado</option>
          </select>
        </div>
      )}

      <div className="mb-3">
        <label className="form-label fw-bold">Fecha de Compra</label>
        <input
          required
          type="date"
          value={form.fecha}
          name="fecha"
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <div className="mb-3">
        <label className="form-label fw-bold">Periodo</label>
        <select
          className="form-control"
          name="periodoGastos"
          value={form.periodoGastos}
          onChange={handleChange}
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

      <div className="mb-3">
        <label className="form-label fw-bold">Titular</label>
        <select
          required
          value={form.titular}
          name="titular"
          onChange={handleChange}
          className="form-select"
        >
          <option value="">Selecciona</option>
          <option value="propio">Propio</option>
          <option value="ajeno">Ajeno</option>
        </select>
      </div>

      {mostrarTitular && (
        <div className="mb-3">
          <label className="form-label fw-bold">Nombre del titular</label>
          <input
            required
            type="text"
            value={form.nombreTitular}
            name="nombreTitular"
            onChange={handleChange}
            className="form-control"
          />
        </div>
      )}

      <button className="btn btn-outline-secondary w-100">Guardar</button>
    </form>
  );
};
