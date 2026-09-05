// const apiURL = "http://localhost:3000";
const apiURL = import.meta.env.VITE_API_URL;

export class Api {
  static async get(url) {
    const req = await fetch(`${apiURL}/${url}`);
    return req.json();
  }

  static async post(url, body) {
    const req = await fetch(`${apiURL}/${url}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return req.json();
  }

  static async patch(url, body) {
    const req = await fetch(`${apiURL}/${url}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return req.json();
  }

  static async delete(url, body) {
    const req = await fetch(`${apiURL}/${url}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return req.json();
  }
}
