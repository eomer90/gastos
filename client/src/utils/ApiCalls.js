const apiURL = "http://localhost:3000"

export class Api {
  static async get(url) {
    const req = await fetch(`${apiURL}/${url}`)
    return req.json()
  }

  static async post(url, body) {
    const req = await fetch(`${apiURL}/${url}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
    return req.json()
  }
}
