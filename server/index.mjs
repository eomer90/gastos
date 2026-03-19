import express from "express";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";
import mongo from "./db/connection.mjs";
import { ObjectId } from "mongodb";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/ingresos", async (req, res) => {
  const periodoQuery = req.query.periodo;

  const ingresos = await mongo.ingresos
    .find({ periodoIngresos: periodoQuery })
    .toArray();

  res.json({ ingresos });
});

app.post("/ingresos", async (req, res) => {
  try {
    // throw new Error("Error forzado");
    const data = req.body;
    await mongo.ingresos.insertOne({
      ...data,
      ingreso: Number(data.ingreso),
    });
    res.status(201).json({ mensaje: "Ingreso registrado", error: false });
  } catch (error) {
    res.json({ mensaje: "Error al registrar ingreso", error: true });
  }
});

app.patch("/ingresos/:id", async (req, res) => {
  try {
    // throw new Error("Error forzado");
    const { id } = req.params;
    const { _id, ...dataActualizada } = req.body;
    const resultado = await mongo.ingresos.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...dataActualizada,
          ingreso: Number(dataActualizada.ingreso),
        },
      },
    );
    if (!resultado.matchedCount) {
      return res.status(404).json({
        mensaje: "Ingreso no encontrado",
        error: true,
      });
    }
    res.status(200).json({
      mensaje: "Ingreso actualizado correctamente",
      error: false,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      mensaje: "Error al actualizar ingreso",
      error: true,
    });
  }
});

app.delete("/ingresos/:id", async (req, res) => {
  try {
    // throw new Error("Error forzado");
    const { id } = req.params;
    const resultado = await mongo.ingresos.deleteOne({
      _id: new ObjectId(id),
    });
    if (!resultado.deletedCount) {
      return res.status(404).json({
        mensaje: "Ingreso no encontrado",
        error: true,
      });
    }
    res.status(200).json({
      mensaje: "ingreso eliminado",
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "Error al eliminar ingreso",
      error: true,
    });
  }
});

app.get("/gastos", async (req, res) => {
  const periodoQuery = req.query.periodo;
  const gastos = await mongo.gastos
    .find({ periodoGastos: periodoQuery })
    .toArray();
  res.json({ gastos });
});

app.post("/gastos", async (req, res) => {
  try {
    const data = req.body;
    const [year, month] = data.periodoGastos.split("-").map(Number);
    if (data.categoria === "pagoAMeses") {
      const cantidadTotal = Number(data.cantidad);
      const totalMeses = Number(data.totalMeses);
      const mensualidad = Math.round((cantidadTotal / totalMeses) * 100) / 100;
      const idCadena = uuidv4();
      const gastosParaInsertar = [];
      for (let i = 0; i < totalMeses; i++) {
        const fecha = new Date(year, month - 1 + i);
        const periodoFormateado = `${fecha.getFullYear()}-${String(
          fecha.getMonth() + 1,
        ).padStart(2, "0")}`;
        gastosParaInsertar.push({
          ...data,
          cantidad: mensualidad,
          restante: cantidadTotal - (i + 1) * mensualidad,
          numeroPago: `${i + 1} de ${totalMeses}`,
          periodoGastos: periodoFormateado,
          idCadena,
        });
      }
      await mongo.gastos.insertMany(gastosParaInsertar);
    } else {
      await mongo.gastos.insertOne({
        ...data,
        cantidad: Number(data.cantidad),
      });
    }
    res.status(201).json({
      mensaje: "gasto registrado",
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "error al registrar gasto",
      error: true,
    });
  }
});

app.delete("/gastos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { isCadena } = req.body;
    let resultado;
    if (isCadena) {
      resultado = await mongo.gastos.deleteMany({
        idCadena: id,
      });
    } else {
      resultado = await mongo.gastos.deleteOne({
        _id: new ObjectId(id),
      });
    }
    if (!resultado.deletedCount) {
      return res.status(404).json({
        mensaje: "Gasto no encontrado",
        error: true,
      });
    }
    res.status(200).json({
      mensaje: "gasto eliminado",
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      mensaje: "error al eliminar gasto",
      error: true,
    });
  }
});

app.patch("/gastos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { _id, ...dataSinId } = req.body;
    const resultado = await mongo.gastos.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          ...dataSinId,
          cantidad: Number(dataSinId.cantidad),
        },
      },
    );
    if (!resultado.matchedCount) {
      return res.status(404).json({
        mensaje: "Gasto no encontrado",
        error: true,
      });
    }
    res.status(200).json({
      mensaje: "Gasto actualizado correctamente",
      error: false,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      mensaje: "Error al actualizar gasto",
      error: true,
    });
  }
});

async function startServer() {
  try {
    await mongo.connect();

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("Fallo conexión a MongoDB", err);
    process.exit(1); // termina el proceso si no se puede conectar
  }
}

startServer();

process.on("SIGINT", async () => {
  console.log("Cerrando conexión a MongoDB...");
  await mongoConnection.close();
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("Cerrando conexión a MongoDB...");
  await mongoConnection.close();
  process.exit(0);
});
