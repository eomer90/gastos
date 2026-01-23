import { useState } from "react";

const estadoInicialFormaIngresos = {
  ingreso: "",
  descripcionIngreso: "",
  fechaIngreso: "",
};

const estadoInicialForma = {
  descripcion: "",
  cantidad: "",
  fecha: "",
  tipoPago: "credito",
  categoria: "fijo",
  numeroPago: "",
  totalMeses: "",
  titular: "propio",
  nombreTitular: "",
};

export const Forma = ({ guardarGasto, guardarIngreso }) => {
  const [formIngresos, setFormIngresos] = useState(estadoInicialFormaIngresos);
  const [form, setForm] = useState(estadoInicialForma);

  const handleChangeIngresos = ({ target }) => {
    const { name, value } = target;
    setFormIngresos((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmitIngreso = (ev) => {
    ev.preventDefault();
    guardarIngreso(formIngresos);
    setFormIngresos(estadoInicialFormaIngresos);
  };

  const onSubmitGasto = (ev) => {
    ev.preventDefault();
    guardarGasto(form);
    setForm(estadoInicialForma);
  };

  const mostrarNumeroPago = form.categoria === "pago a meses";

  const mostrarTitular = form.titular === "ajeno";

  return (
    <>
      <form onSubmit={onSubmitIngreso} className="p-3 border">
        <div className="mb-3">
          <label className="forn-label">Descripción</label>
          <input
            required
            type="text"
            value={formIngresos.descripcionIngreso}
            name="descripcionIngreso"
            onChange={handleChangeIngresos}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="forn-label">Ingreso</label>
          <input
            required
            type="text"
            value={formIngresos.ingreso}
            name="ingreso"
            onChange={handleChangeIngresos}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="forn-label">Fecha</label>
          <input
            required
            type="date"
            value={formIngresos.fechaIngreso}
            name="fechaIngreso"
            onChange={handleChangeIngresos}
            className="form-control"
          />
        </div>
        <div>
          <button className="btn btn-outline-secondary w-100">Guardar</button>
        </div>
      </form>
      <form onSubmit={onSubmitGasto} className="p-3 border">
        <div className="mb-3">
          <label className="forn-label">Descripción</label>
          <input
            required
            type="text"
            value={form.descripcion}
            name="descripcion"
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="forn-label">Cantidad</label>
          <input
            required
            type="number"
            value={form.cantidad}
            name="cantidad"
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label className="forn-label">Fecha</label>
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
          <label className="forn-label">Tipo de pago</label>
          <select
            required
            value={form.tipoPago}
            name="tipoPago"
            onChange={handleChange}
            className="form-control"
          >
            <option value="credito">Crédito</option>
            <option value="contado">Contado</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="forn-label">Categoría</label>
          <select
            required
            value={form.categoria}
            name="categoria"
            onChange={handleChange}
            className="form-control"
          >
            <option value="fijo">Fijo</option>
            <option value="suscripcion">Suscripción</option>
            <option value="pago a meses">Pagos a meses</option>
            <option value="despensa">Alimentación y despensa</option>
            <option value="transporte">Transporte</option>
            <option value="variables">Variables</option>
          </select>
        </div>
        {mostrarNumeroPago && (
          <>
            <div className="mb-3">
              <label className="forn-label">No° de Pago</label>
              <input
                required
                type="number"
                value={form.numeroPago}
                name="numeroPago"
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label className="forn-label">Total de Meses</label>
              <input
                required
                type="number"
                value={form.totalMeses}
                name="totalMeses"
                onChange={handleChange}
                className="form-control"
              />
            </div>
          </>
        )}
        <div className="mb-3">
          <label className="forn-label">Titular</label>
          <select
            required
            value={form.titular}
            name="titular"
            onChange={handleChange}
            className="form-control"
          >
            <option value="propio">Propio</option>
            <option value="ajeno">Ajeno</option>
          </select>
        </div>
        {mostrarTitular && (
          <div className="mb-3">
            <label className="forn-label">Nombre del Titular</label>
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
        <div>
          <button className="btn btn-outline-secondary w-100">Guardar</button>
        </div>
      </form>
    </>
  );
};
