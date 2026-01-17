export const TablaIngresos = ({ ingresos }) => {
  const totalIngresos = ingresos.reduce(
    (acum, { ingreso }) => acum + ingreso,
    0,
  )

  return (
    <table className="table mb-5">
      <thead>
        <tr>
          <th>Descripción</th>
          <th>Ingreso</th>
        </tr>
      </thead>
      <tbody>
        {ingresos.map((ingreso, index) => (
          <tr key={index}>
            <td>{ingreso.descripcionIngreso}</td>
            <td>{ingreso.ingreso}</td>
          </tr>
        ))}
        <tr>
          <td className="fw-bold">Total</td>
          <td>{totalIngresos}</td>
        </tr>
      </tbody>
    </table>
  )
}
