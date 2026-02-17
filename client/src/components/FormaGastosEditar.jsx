import { useState } from "react";

const estadoInicialFormaEdicion = {
  descripcion: "",
  cantidad: "",
  fecha: "",
  periodoGastos: "01",
  tipoPago: "credito",
  estatus: "",
  categoria: "fijo",
  numeroPago: "",
  totalMeses: "",
  titular: "propio",
  nombreTitular: "",
};

export const FormaGastosEditar = ({
  editarGasto,
  setVentanaEdicion,
  gastoSeleccionado,
}) => {
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
        <div className="modal-dialog modal-dialog-centered ">
          <div className="modal-content ">
            <div className="modal-header">
              <h5 className="modal-title">Editar gasto</h5>
            </div>
            <form onSubmit={handleSubmit}>
              <div
                className="modal-body"
                style={{
                  maxHeight: "65vh",
                  overflowY: "auto",
                }}
              >
                <p>Cambia solo los campos que necesitas editar</p>
                <div className="mb-3">
                  <label className="form-label fw-bold">Descripción</label>
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
                  <label className="form-label fw-bold">Cantidad</label>
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
                  <label className="form-label fw-bold">Fecha</label>
                  <input
                    type="date"
                    value={formGastosEdicion.fecha}
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
                  <label className="form-label fw-bold">Tipo de pago</label>
                  <select
                    value={formGastosEdicion.tipoPago}
                    name="tipoPago"
                    onChange={handleChange}
                    className="form-select"
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
                      value={formGastosEdicion.estatus}
                      name="estatus"
                      onChange={handleChange}
                      className="form-select"
                    >
                      <option value="">Selecciona una opción</option>
                      <option value="pendiente">Pendiente</option>
                      <option value="liberado">Liberado</option>
                    </select>
                  </div>
                )}

                <div className="mb-3">
                  <label className="form-label fw-bold">Categoría</label>
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

                {mostrarNumeroPago && (
                  <div className="row">
                    <div className="col-6 mb-3">
                      <label className="form-label fw-bold">No. de pago</label>
                      <input
                        type="number"
                        value={formGastosEdicion.numeroPago}
                        name="numeroPago"
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>

                    <div className="col-6 mb-3">
                      <label className="form-label fw-bold">
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
                  </div>
                )}

                <div className="mb-3">
                  <label className="form-label fw-bold">Titular</label>
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
                    <label className="form-label fw-bold">
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
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={cerrarVentanaEdicion}
                >
                  Cancelar
                </button>
                <button className="btn btn-primary">Guardar cambios</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
