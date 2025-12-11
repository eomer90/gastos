import { useState } from "react";

function App() {
  const [form, setForm] = useState({
    income: "",
    expenses: "",
    categories: "",
    balance: ""
  });

  const [ExpenseBreakdown, setExpenseBreakdown] = useState({});

  function handleChange(event) {
    const { name, value } = event.target;

    setForm(prev => ({
      ...prev,
      [name]: value,
    }));
  }

  async function submitForm(event) {
    event.preventDefault();

    if (form.categories !== "") {
      const newBalance = Number(form.balance) + Number(form.income) - Number(form.expenses);

      const formWithBalance = {
        ...form,
        balance: newBalance
      };

      setExpenseBreakdown(prev => ({
        ...prev,
        [form.categories]: (prev[form.categories] || 0) + Number(form.expenses)
      }));

      const resultado = await fetch("http://localhost:3000/registrar", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formWithBalance),
      });

      const resJson = await resultado.json();
      console.log(resJson);

      setForm(formWithBalance);

    } else {
      alert("Select a category")
    }
    
  }

  return (
    <>
      <form onSubmit={submitForm}>
        <label>Expenses</label>
        <input
          type="text"
          name="expenses"
          value={form.expenses}
          onChange={handleChange}
        />

        <label>Income</label>
        <input
          type="text"
          name="income"
          value={form.income}
          onChange={handleChange}
        />

        <label>Categories</label>
        <select
          name="categories"
          value={form.categories}
          onChange={handleChange}
        >
          <option value="">Select a category</option>
          <option value="food">Food</option>
          <option value="transport">Transport</option>
        </select>

        <label>Balance</label>
        <input
          type="text"
          name="balance"
          value={form.balance}
          disabled
        />
        <div>
        <h2>Expense breakdown</h2>
          {Object.entries(ExpenseBreakdown).map(([cat, total]) => (
          <p key={cat}>{cat}: {total}</p>
          ))}
        </div>
        <button>Submit</button>
      </form>
    </>
  );
}

export default App;
