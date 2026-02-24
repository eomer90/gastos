import { useState } from "react";

export const FormaGastosEditar = ({
  editarGasto,
  setVentanaEdicion,
  gastoSeleccionado,
  mesActivo,
}) => {
  const estadoInicialFormaEdicion = {
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
    saldo: "",
  };
  const [formGastosEdicion, setFormGastosEdicion] = useState(gastoSeleccionado);

  const handleChange = ({ target }) => {
    const { name, value } = target;

    if (name === "tipoPago" && value !== "contado") {
      setFormGastosEdicion((prev) => ({
        ...prev,
        [name]: value,
        estatus: "",
      }));
    } else if (name === "titular" && value !== "ajeno") {
      setFormGastosEdicion((prev) => ({
        ...prev,
        [name]: value,
        nombreTitular: "",
        saldo: "",
      }));
    } else if (name === "titular" && value === "ajeno") {
      setFormGastosEdicion((prev) => ({
        ...prev,
        [name]: value,
        nombreTitular: "",
        saldo: "adeudado",
      }));
    } else if (name === "categoria" && value !== "pagoAMeses") {
      setFormGastosEdicion((prev) => ({
        ...prev,
        [name]: value,
        numeroPago: "",
        totalMeses: "",
      }));
    } else {
      setFormGastosEdicion((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const mostrarNumeroPago = formGastosEdicion.categoria === "pagoAMeses";

  const mostrarTitular = formGastosEdicion.titular === "ajeno";

  const mostrarPendiente = formGastosEdicion.tipoPago === "contado";

  const cerrarVentanaEdicion = () => {
    setVentanaEdicion(false);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    editarGasto(formGastosEdicion, gastoSeleccionado.id);
    setFormGastosEdicion(estadoInicialFormaEdicion);
    setVentanaEdicion(false);
  };

  return (
    <>
      <div className="modal fade show d-block">
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content shadow-lg border-0 rounded-4">
            <div className="modal-header bg-light">
              <h5 className="modal-title fw-bold">Editar gasto</h5>
              <button
                type="button"
                className="btn-close"
                onClick={cerrarVentanaEdicion}
              ></button>
            </div>

            <form onSubmit={handleSubmit}>
              <div
                className="modal-body px-4"
                style={{ maxHeight: "70vh", overflowY: "auto" }}
              >
                <p className="text-muted small mb-4">
                  Modifica únicamente los campos necesarios.
                </p>

                <h6 className="fw-bold border-bottom pb-2 mb-4">
                  Información del gasto
                </h6>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Descripción</label>
                  <input
                    type="text"
                    value={formGastosEdicion.descripcion}
                    name="descripcion"
                    onChange={handleChange}
                    className="form-control"
                    placeholder="Ej. Renta, Netflix"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Cantidad</label>
                  <input
                    type="number"
                    value={formGastosEdicion.cantidad}
                    name="cantidad"
                    onChange={handleChange}
                    className="form-control"
                    placeholder="$0.00"
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Fecha</label>
                  <input
                    type="date"
                    value={formGastosEdicion.fecha}
                    name="fecha"
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label fw-semibold">Periodo</label>
                  <select
                    className="form-select"
                    name="periodoGastos"
                    value={formGastosEdicion.periodoGastos}
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
                  <label className="form-label fw-semibold">Tipo de pago</label>
                  <select
                    value={formGastosEdicion.tipoPago}
                    name="tipoPago"
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="">Selecciona</option>
                    <option value="credito">Crédito</option>
                    <option value="contado">Contado</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Categoría</label>
                  <select
                    value={formGastosEdicion.categoria}
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

                {mostrarPendiente && (
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Estatus</label>
                    <select
                      value={formGastosEdicion.estatus}
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

                {mostrarNumeroPago && (
                  <div className="mb-3">
                    <label className="form-label fw-semibold">
                      Total de meses
                    </label>
                    <input
                      type="number"
                      value={formGastosEdicion.totalMeses}
                      name="totalMeses"
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                )}

                <div className="mb-3">
                  <label className="form-label fw-semibold">Titular</label>
                  <select
                    value={formGastosEdicion.titular}
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
                    <label className="form-label fw-semibold">
                      Nombre del titular
                    </label>
                    <input
                      type="text"
                      value={formGastosEdicion.nombreTitular}
                      name="nombreTitular"
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                )}

                <div className="mb-3">
                  <label className="form-label fw-semibold">Saldo</label>
                  <select
                    value={formGastosEdicion.saldo}
                    name="saldo"
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="">Selecciona</option>
                    <option value="adeudado">Adeudado</option>
                    <option value="abonado">Abonado</option>
                  </select>
                </div>
              </div>

              <div className="modal-footer border-0 px-4 pb-4">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={cerrarVentanaEdicion}
                >
                  Cancelar
                </button>
                <button className="btn btn-primary px-4 rounded-pill">
                  Guardar cambios
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
