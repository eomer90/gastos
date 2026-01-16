export const TablaCategoria = ({ ingresos }) => {
  const totalIngresos = ingresos.reduce((acum, i) => acum + i.ingreso, 0);

  return (
    <table className="table mb-5">
      <thead>
        <tr>
          <th>Ingreso</th>
        </tr>
      </thead>
      <tbody>
        {ingresos.map((ingreso, index) => (
          <tr key={index}>
            <td>{ingreso.ingreso}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
