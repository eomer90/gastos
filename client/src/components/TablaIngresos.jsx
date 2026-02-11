export const TablaIngresos = ({ ingresosPorMes, eliminarIngreso }) => {
  const totalIngresos = ingresosPorMes.reduce(
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
        {ingresosPorMes.map((ingreso) => (
          <tr className="text-center" key={ingreso.id}>
            <td>{ingreso.descripcionIngreso}</td>
            <td>{fechaFormatoMx(ingreso.fechaIngreso)}</td>
            <td>${Number(ingreso.ingreso).toLocaleString("es-MX")}</td>
            <td>
              <button
                className="btn btn-outline-danger btn-sm"
                onClick={() => eliminarIngreso(ingreso.id)}
              >
                <i className="bi bi-trash"></i>
              </button>
            </td>
          </tr>
        ))}

        <tr>
          <td colSpan={2} className="fw-bold text-center">
            Total
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
