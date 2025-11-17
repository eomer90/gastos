import { useState } from "react"

function App() {
  const [form, setForm] = useState({
    descripcion: "",
    cantidad: "",
  })

  async function enviarFormulario(event) {
    event.preventDefault()

    const resultado = await fetch("http://localhost:3000/registrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    })
    const resJon = await resultado.json()
    console.log(resJon)
  }

  function handleChange(event) {
    const { name, value } = event.target
    setForm({
      ...form,
      [name]: value,
    })
  }

  return (
    <>
      <form onSubmit={enviarFormulario}>
        <label>Descripcion</label>
        <textarea
          onChange={handleChange}
          value={form.descripcion}
          name="descripcion"
        ></textarea>
        <label>Cantidad</label>
        <input
          type="text"
          value={form.cantidad}
          onChange={handleChange}
          name="cantidad"
        />
        <button>Enviar</button>
      </form>
    </>
  )
}

export default App
