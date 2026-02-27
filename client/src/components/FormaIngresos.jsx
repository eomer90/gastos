import { useState } from "react";

export const FormaIngresos = ({ guardarIngreso, periodoActivo }) => {
  const estadoInicialFormaIngresos = {
    ingreso: "",
    descripcionIngreso: "",
    tipoIngreso: "",
    fechaIngreso: "",
    periodoIngresos: periodoActivo,
  };
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
    <form onSubmit={onSubmitIngreso} className="card shadow-sm p-4 mb-4">
      <h5 className="fw-bold mb-4 text-center">Nuevo ingreso</h5>

      <div className="mb-4">
        <label className="form-label fw-semibold">Descripción</label>
        <input
          required
          type="text"
          value={formIngresos.descripcionIngreso}
          name="descripcionIngreso"
          onChange={handleChangeIngresos}
          className="form-control form-control-lg"
          placeholder="Ej. Sueldo"
        />
      </div>

      <div className="mb-4">
        <label className="form-label fw-semibold">Monto</label>
        <input
          required
          type="number"
          value={formIngresos.ingreso}
          name="ingreso"
          onChange={handleChangeIngresos}
          className="form-control form-control-lg"
          placeholder="$0.00"
        />
      </div>

      <div className="mb-4">
        <label className="form-label fw-semibold">Tipo de ingreso</label>
        <select
          className="form-select"
          name="tipoIngreso"
          value={formIngresos.tipoIngreso}
          onChange={handleChangeIngresos}
        >
          <option value="">Selecciona</option>
          <option value="efectivo">Efectivo</option>
          <option value="proyectado">Proyectado</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="form-label fw-semibold">Fecha</label>
        <input
          required
          type="date"
          value={formIngresos.fechaIngreso}
          name="fechaIngreso"
          onChange={handleChangeIngresos}
          className="form-control"
        />
      </div>

      <div className="mb-4">
        <label className="form-label fw-semibold">Periodo</label>
        <input
          required
          type="month"
          className="form-control"
          name="periodoIngresos"
          value={formIngresos.periodoIngresos}
          onChange={handleChangeIngresos}
        />
        {/* <select
          className="form-select"
          name="periodoIngresos"
          value={formperiodoIngresosIngresos.}
          onChange={handleChangeIngresos}
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
        </select> */}
      </div>

      <div className="d-grid mt-3">
        <button className="btn btn-success btn-lg">Guardar ingreso</button>
      </div>
    </form>
  );
};
