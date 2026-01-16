import { useState } from "react";

const estadoInicialForma = {
  ingreso: "",
  descripcionIngreso: "",
  descripcion: "",
  cantidad: "",
  fecha: "",
  tipoPago: "credito",
  categoria: "fijo",
};

export const Forma = ({ guardarGasto, guardarIngreso }) => {
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

  const onSubmitIngreso = (ev) => {
    ev.preventDefault();
    guardarIngreso(form);
    setForm(estadoInicialForma);
  };

  //const mostrarNumeroPago =

  return (
    <form className="p-3 border">
      <div className="mb-3">
        <label className="forn-label">Descripción</label>
        <input
          type="text"
          value={form.descripcionIngreso}
          name="descripcionIngreso"
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label className="forn-label">Ingreso</label>
        <input
          type="text"
          value={form.ingreso}
          name="ingreso"
          onChange={handleChange}
          className="form-control"
        />
      </div>
      <div>
        <button
          onClick={onSubmitIngreso}
          className="btn btn-outline-secondary w-100"
        >
          Guardar
        </button>
      </div>
      <div className="mb-3">
        <label className="forn-label">Descripción</label>
        <input
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
      <div className="mb-3">
        <label className="forn-label">No° de Pago</label>
        <input type="number" className="form-control" />
      </div>
      <div>
        <button
          onClick={onSubmitGasto}
          className="btn btn-outline-secondary w-100"
        >
          Guardar
        </button>
      </div>
    </form>
  );
};
