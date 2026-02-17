import express from "express";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";
import { leerArchivoAjson, crearArchivo } from "./file.mjs";

const app = express();
const PORT = 3000;
const rutaDB = "./db/ingresos.json";
const gastosDB = "./db/gastos.json";

app.use(cors());
app.use(express.json());

app.get("/ingresos", async (req, res) => {
  const periodoQuery = req.query.periodo;
  const ingresos = await leerArchivoAjson(rutaDB);

  const ingresosPorPeriodo = ingresos.filter(
    (i) => i.periodoIngresos === periodoQuery,
  );

  res.json({ ingresos: ingresosPorPeriodo });
});

app.post("/ingresos", async (req, res) => {
  try {
    const data = req.body;
    const ingresos = await leerArchivoAjson(rutaDB);
    ingresos.push({
      ...data,
      id: uuidv4(),
      ingreso: Number(data.ingreso),
    });
    await crearArchivo(rutaDB, ingresos);
    res.status(201).json({ mensaje: "ingreso registrado", ingresos });
  } catch (error) {
    res.json({ mensaje: "error al registrar ingreso" });
  }
});

app.get("/gastos", async (req, res) => {
  const periodoQuery = req.query.periodo;
  const gastos = await leerArchivoAjson(gastosDB);
  const gastosPorPeriodo = gastos.filter(
    (g) => g.periodoGastos === periodoQuery,
  );

  res.json({ gastos: gastosPorPeriodo });
});

app.post("/gastos", async (req, res) => {
  try {
    const periodoQuery = req.query.periodo;
    const data = req.body;
    const gastos = await leerArchivoAjson(gastosDB);
    if (data.categoria === "pagoAMeses") {
      const cantidadTotal = Number(data.cantidad);
      const totalMeses = Number(data.totalMeses);
      const mensualidad = cantidadTotal / totalMeses;
      for (let i = 0; i < totalMeses; i++) {
        gastos.push({
          ...data,
          id: uuidv4(),
          cantidad: mensualidad,
          restante: cantidadTotal - (i + 1) * mensualidad,
          numeroPago: `${i + 1} de ${totalMeses}`,
          periodoGastos: String(i + Number(data.periodoGastos)).padStart(
            2,
            "0",
          ),
        });
      }
    } else {
      gastos.push({
        ...data,
        id: uuidv4(),
        cantidad: Number(data.cantidad),
      });
    }

    const gastosFiltrados = gastos.filter(
      (g) => g.periodoGastos === periodoQuery,
    );

    await crearArchivo(gastosDB, gastos);
    res
      .status(201)
      .json({ mensaje: "gasto registrado", gastos: gastosFiltrados });
  } catch (error) {
    res.json({ mensaje: "error al registrar gasto" });
  }
});

app.delete("/gastos", async (req, res) => {
  try {
    const id = req.body.id;
    const gastos = await leerArchivoAjson(gastosDB);
    const gastosFiltrados = gastos.filter((g) => g.id !== id);
    await crearArchivo(gastosDB, gastosFiltrados);
    res
      .status(200)
      .json({ mensaje: "gasto eliminado", gastos: gastosFiltrados });
  } catch (error) {
    res.json({ mensaje: "error al eliminar gasto" });
  }
});

app.delete("/ingresos", async (req, res) => {
  try {
    const id = req.body.id;
    const ingresos = await leerArchivoAjson(rutaDB);
    const ingresosFiltrados = ingresos.filter((i) => i.id !== id);
    await crearArchivo(rutaDB, ingresosFiltrados);
    res
      .status(200)
      .json({ mensaje: "ingreso eliminado", ingresos: ingresosFiltrados });
  } catch (error) {
    res.json({ mensaje: "error al eliminar ingreso" });
  }
});

app.patch("/gastos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const dataActualizada = req.body;

    const gastos = await leerArchivoAjson(gastosDB);

    const index = gastos.findIndex((g) => g.id === id);

    if (index === -1) {
      return res.status(404).json({ mensaje: "Gasto no encontrado" });
    }

    gastos[index] = {
      ...gastos[index],
      ...dataActualizada,
      cantidad: Number(dataActualizada.cantidad ?? gastos[index].cantidad),
    };

    await crearArchivo(gastosDB, gastos);

    res.status(200).json({ mensaje: "Gasto actualizado correctamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al actualizar gasto" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
