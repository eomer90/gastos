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
  );
};
