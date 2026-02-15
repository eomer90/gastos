export const TablaIngresos = ({ ingresosOrdenados, eliminarIngreso }) => {
  const totalIngresos = ingresosOrdenados.reduce(
    (acum, { ingreso }) => acum + ingreso,
    0,
  );

  const fechaFormatoMx = (fecha) => {
    const [year, mes, dia] = fecha.split("-");
    return `${dia}/${mes}/${year}`;
  };

  return (
    <table className="table table-sm table-bordered mb-5 align-middle">
      <thead>
        <tr className="text-center">
          <th>Descripción</th>
          <th>Fecha</th>
          <th>Ingreso</th>
          <th>Acción</th>
        </tr>
      </thead>

      <tbody>
        {ingresosOrdenados.map((ingreso) => (
          <tr className="text-center" key={ingreso.id}>
            <td>{ingreso.descripcionIngreso}</td>
            <td>{fechaFormatoMx(ingreso.fechaIngreso)}</td>
            <td>${Number(ingreso.ingreso).toLocaleString("es-MX")}</td>
            <td>
              <button
                className="btn btn-outline-danger btn-sm me-2"
                onClick={() => eliminarIngreso(ingreso.id)}
              >
                <i className="bi bi-trash"></i>
              </button>
              <button
                className="btn btn-outline-primary btn-sm"
                // onClick={() => editarGasto(gasto.id)}
              >
                <i className="bi bi-pencil"></i>
              </button>
            </td>
          </tr>
        ))}

        <tr>
          <td colSpan={2} className="fw-bold text-center">
            Subtotal
          </td>
          <td className="fw-bold text-center">
            ${Number(totalIngresos).toLocaleString("es-MX")}
          </td>
          <td></td>
        </tr>
      </tbody>
    </table>
  );
};
