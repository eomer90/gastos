import { useState } from "react";

export const Forma = ({ guardarGasto, periodoActivo }) => {
  const estadoInicialForma = {
    descripcion: "",
    cantidad: "",
    categoria: "fijo",
    totalMeses: "",
    tipoPago: "credito",
    estatus: "",
    fecha: "",
    periodoGastos: periodoActivo,
    titular: "propio",
    nombreTitular: "",
    saldo: "",
  };
  const [form, setForm] = useState(estadoInicialForma);

  const handleChange = ({ target }) => {
    const { name, value } = target;

    setForm((prev) => {
      const nuevoForm = {
        ...prev,
        [name]: value,
      };

      return {
        ...nuevoForm,
        saldo: nuevoForm.nombreTitular !== "" ? "adeudado" : "",
      };
    });
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
    <form onSubmit={onSubmitGasto} className="card shadow-sm p-4 mb-4">
      <h5 className="fw-bold mb-4 text-center">Nuevo gasto</h5>

      <div className="mb-4">
        <label className="form-label fw-semibold">Descripción</label>
        <input
          required
          type="text"
          value={form.descripcion}
          name="descripcion"
          onChange={handleChange}
          className="form-control form-control-lg"
          placeholder="Ej. Renta, Netflix"
        />
      </div>

      <div className="mb-4">
        <label className="form-label fw-semibold">Cantidad</label>
        <input
          required
          type="number"
          value={form.cantidad}
          name="cantidad"
          onChange={handleChange}
          className="form-control form-control-lg"
          placeholder="$0.00"
        />
      </div>

      <div className="mb-4">
        <label className="form-label fw-semibold">Categoría</label>
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
        <div className="mb-4">
          <label className="form-label fw-semibold">Total de meses</label>
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

      <div className="mb-4">
        <label className="form-label fw-semibold">Fecha de compra</label>
        <input
          required
          type="date"
          value={form.fecha}
          name="fecha"
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <div className="mb-4">
        <label className="form-label fw-semibold">Periodo</label>
        <input
          required
          type="month"
          className="form-control"
          name="periodoGastos"
          value={form.periodoGastos}
          onChange={handleChange}
        />
      </div>

      <div className="mb-4">
        <label className="form-label fw-semibold">Tipo de pago</label>
        <select
          disabled={form.categoria === "pagoAMeses"}
          required
          value={form.tipoPago}
          name="tipoPago"
          onChange={handleChange}
          className="form-select"
        >
          <option value="">Selecciona</option>
          <option value="credito">Crédito</option>
          <option value="contado">Contado</option>
        </select>
      </div>

      {mostrarPendiente && (
        <div className="mb-4">
          <label className="form-label fw-semibold">Estatus</label>
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

      <div className="mb-4">
        <label className="form-label fw-semibold">Titular</label>
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
        <div className="mb-4">
          <label className="form-label fw-semibold">Nombre del titular</label>
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

      <div className="d-grid mt-3">
        <button className="btn btn-danger btn-lg">Guardar gasto</button>
      </div>
    </form>
  );
};
