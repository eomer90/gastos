import { useState } from "react";

const estadoInicialFormaIngresos = {
  ingreso: "",
  descripcionIngreso: "",
  fechaIngreso: "",
};

export const FormaIngresos = ({ guardarIngreso }) => {
  const [formIngresos, setFormIngresos] = useState(estadoInicialFormaIngresos);

  const handleChangeIngresos = ({ target }) => {
    const { name, value } = target;
    setFormIngresos((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmitIngreso = (ev) => {
    ev.preventDefault();
    guardarIngreso(formIngresos);
    setFormIngresos(estadoInicialFormaIngresos);
  };

  return (
    <form onSubmit={onSubmitIngreso} className="border rounded p-3 mb-4">
      <h5 className="mb-3">Nuevo ingreso</h5>

      <div className="mb-3">
        <label className="form-label fw-bold">Descripción</label>
        <input
          required
          type="text"
          value={formIngresos.descripcionIngreso}
          name="descripcionIngreso"
          onChange={handleChangeIngresos}
          className="form-control"
          placeholder="Ej. Sueldo"
        />
      </div>

      <div className="mb-3">
        <label className="form-label fw-bold">Ingreso</label>
        <input
          required
          type="number"
          value={formIngresos.ingreso}
          name="ingreso"
          onChange={handleChangeIngresos}
          className="form-control"
          placeholder="$0.00"
        />
      </div>

      <div className="mb-3">
        <label className="form-label fw-bold">Fecha</label>
        <input
          required
          type="date"
          value={formIngresos.fechaIngreso}
          name="fechaIngreso"
          onChange={handleChangeIngresos}
          className="form-control"
        />
      </div>

      <button className="btn btn-outline-secondary w-100">Guardar</button>
    </form>
  );
};
