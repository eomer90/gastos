export const TablaIngresos = ({ ingresosPorMes, gastos, eliminarIngreso }) => {
  const totalIngresos = ingresosPorMes.reduce(
    (acum, { ingreso }) => acum + ingreso,
    0,
  );

  const fechaFormatoMx = (fecha) => {
    const [year, mes, dia] = fecha.split("-");
    return `${dia}/${mes}/${year}`;
  };

  return (
    <table className="table mb-5">
      <thead>
        <tr>
          <th>Descripción</th>
          <th>Fecha</th>
          <th>Ingreso</th>
        </tr>
      </thead>
      <tbody>
        {ingresosPorMes.map((ingreso) => (
          <tr key={ingreso.id}>
            <td>{ingreso.descripcionIngreso}</td>
            <td>{fechaFormatoMx(ingreso.fechaIngreso)}</td>
            <td>{ingreso.ingreso}</td>
            <td>
              <button
                className="btn btn-outline-secondary w-100"
                onClick={() => eliminarIngreso(ingreso.id)}
              >
                X
              </button>
            </td>
          </tr>
        ))}
        <tr>
          <td colSpan={2} className="fw-bold">
            Total
          </td>
          <td>{totalIngresos}</td>
        </tr>
      </tbody>
    </table>
  );
};
