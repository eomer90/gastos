import { useState } from "react";

export const FormaIngresosEditar = ({
  setVentanaEdicionIngresos,
  ingresoSeleccionado,
  editarIngreso,
  periodoActual,
}) => {
  const estadoInicialIngresosEdicion = {
    ingreso: "",
    descripcionIngreso: "",
    tipoIngreso: "",
    fechaIngreso: "",
    periodoIngresos: periodoActual,
  };
  const [formIngresosEdicion, setFormingresosEdicion] =
    useState(ingresoSeleccionado);

  const cerrarVentanaIngreso = () => {
    setVentanaEdicionIngresos(false);
  };

  const handleChangeIngresos = ({ target }) => {
    const { name, value } = target;
    setFormingresosEdicion((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmitIngreso = (ev) => {
    ev.preventDefault();
    editarIngreso(formIngresosEdicion, ingresoSeleccionado._id);
    setFormingresosEdicion(estadoInicialIngresosEdicion);
    setVentanaEdicionIngresos(false);
  };

  return (
    <>
      <div className="modal fade show d-block">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content shadow-lg border-0 rounded-4">
            <div className="modal-header bg-light">
              <h5 className="modal-title fw-bold">Editar ingreso</h5>
              <button
                type="button"
                className="btn-close"
                onClick={cerrarVentanaIngreso}
              ></button>
            </div>

            <form onSubmit={onSubmitIngreso}>
              <div
                className="modal-body px-4"
                style={{ maxHeight: "70vh", overflowY: "auto" }}
              >
                <p className="text-muted small mb-4">
                  Modifica únicamente los campos necesarios.
                </p>
                <h6 className="fw-bold border-bottom pb-2 mb-4">
                  Información del ingreso
                </h6>

                <div className="mb-4">
                  <label className="form-label fw-semibold">Descripción</label>
                  <input
                    required
                    type="text"
                    value={formIngresosEdicion.descripcionIngreso}
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
                    value={formIngresosEdicion.ingreso}
                    name="ingreso"
                    onChange={handleChangeIngresos}
                    className="form-control form-control-lg"
                    placeholder="$0.00"
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">
                    Tipo de ingreso
                  </label>
                  <select
                    className="form-select"
                    name="tipoIngreso"
                    value={formIngresosEdicion.tipoIngreso}
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
                    value={formIngresosEdicion.fechaIngreso}
                    name="fechaIngreso"
                    onChange={handleChangeIngresos}
                    className="form-control"
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">Periodo</label>
                  <input
                    type="month"
                    className="form-control text-capitalize"
                    name="periodoIngresos"
                    value={formIngresosEdicion.periodoIngresos}
                    onChange={handleChangeIngresos}
                  />
                </div>
              </div>

              <div className="modal-footer border-0 px-4 pb-4">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={cerrarVentanaIngreso}
                >
                  Cancelar
                </button>

                <button className="btn btn-success px-4 rounded-pill">
                  Guardar ingreso
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <div className="modal-backdrop fade show"></div>
    </>
  );
};
