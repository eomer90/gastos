import fs from "fs/promises"

export const leerArchivoAjson = async (ruta) => {
  try {
    const file = await fs.readFile(ruta, "utf8")
    return JSON.parse(file)
  } catch (error) {
    console.log(error)
  }
}

export const crearArchivo = async (ruta, data) => {
  try {
    await fs.writeFile(ruta, JSON.stringify(data, null, 2), "utf8")
  } catch (error) {
    console.log(error)
  }
}
