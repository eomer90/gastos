export const Forma = ({ form, guardarGasto, handleChange }) => {
  return (
    <form onSubmit={guardarGasto} className="p-3 border">
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
          <option value="recurrente">
            Recurrente (suscripciones y pagos a meses)
          </option>
          <option value="despensa">Alimentación y despensa</option>
          <option value="transporte">Transporte</option>
          <option value="variables">Variables</option>
        </select>
      </div>
      <div>
        <button className="btn btn-outline-secondary w-100">Guardar</button>
      </div>
    </form>
  )
}
