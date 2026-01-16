export const TablaCategoria = ({ gastos }) => {
  const total = gastos.reduce((acum, { cantidad }) => acum + cantidad, 0);

  return (
    <table className="table mb-5">
      <thead>
        <tr>
          <th>Descripción</th>
          <th>Fecha</th>
          <th>Tipo de pago</th>
          <th>Cantidad</th>
        </tr>
      </thead>
      <tbody>
        {gastos.map((gasto, index) => (
          <tr key={`${gasto.descripcion}-${index}`}>
            <td>{gasto.descripcion}</td>
            <td>{gasto.fecha}</td>
            <td>{gasto.tipoPago}</td>
            <td>{gasto.cantidad}</td>
          </tr>
        ))}
        <tr>
          <td colSpan={3}>
            <span className="fw-bold">Total</span>
          </td>
          <td>{total}</td>
        </tr>
      </tbody>
    </table>
  );
};
