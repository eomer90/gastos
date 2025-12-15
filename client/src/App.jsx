import { useState } from "react";

function App() {
  const [valorIncome, setValorIncome] = useState("");
  const [valorExpense, setValorExpense] = useState("");
  const [incomeTotal, setincomeTotal] = useState(0);
  const [valorCategory, setValorCategory] = useState("");
  const [expenses, setExpenses] = useState([]);

  const cambioIncome = (evento) => {
    setValorIncome(Number(evento.target.value));
  };

  const cambioExpense = (evento) => {
    setValorExpense(Number(evento.target.value));
  };

  const sumaIncome = () => {
    setincomeTotal(incomeTotal + valorIncome);
    setValorIncome("");
  };

  const cambioCategory = (evento) => {
    setValorCategory(evento.target.value);
  };

  const addExpense = () => {
    const newExpense = {
      category: valorCategory,
      quantity: valorExpense,
    };
    console.log(newExpense.category);
    setExpenses([...expenses, newExpense]);
    setValorExpense("");
    setValorCategory("");
  };

  return (
    <>
      <div>
        <p>Income: {incomeTotal}</p>
      </div>
      <div>
        <p>Expenses by category</p>
        <table>
          <thead>
            <tr>
              <th>Category</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, index) => (
              <tr key={index}>
                <td>{expense.category}</td>
                <td>{expense.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <label>Add an Income:</label>
        <input type="number" value={valorIncome} onChange={cambioIncome} />
        <button onClick={sumaIncome}>Submit Income</button>
      </div>
      <div>
        <label>Add an Expense:</label>
        <input type="number" value={valorExpense} onChange={cambioExpense} />
        <button onClick={addExpense}>Submit Expense</button>
      </div>
      <div>
        <label>Add a Category:</label>
        <select value={valorCategory} onChange={cambioCategory}>
          <option value="" disabled>
            Select a category
          </option>
          <option value="Alimento para perro">Alimento perro</option>
          <option value="Alimento para gato">Alimento gato</option>
        </select>
      </div>
    </>
  );
}

export default App;
