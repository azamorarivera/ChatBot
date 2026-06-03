
const BASE_URL = "http://localhost:5000"; 

const BASE_PREG = "/api/preguntas";
const BASE_AUTH ="/api/auth"

let authToken=null

export function setAuthToken(token){
  authToken = token || null;
  if(token){
    localStorage.setItem("chatbot_token", token)
  }else{
    localStorage.removeItem("chatbot_token")
  }
}
function getAuthToken(){
  if(authToken) return authToken
  const saved = localStorage.getItem("chatbot_token")
  if (saved) authToken = saved
  return authToken
}

async function jsonFetch(path, { method = "GET", body } = {}) {
  const url = `${BASE_URL}${path}`;
  const token = getAuthToken()
  const headers = { "Content-Type": "application/json"}
  if(token){
    headers.Authorization = `Bearer ${token}`
  }

  const res = await fetch(url, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    const msg = text || `HTTP ${res.status} al llamar ${url}`;
    throw new Error(msg);
  }
  const ct = res.headers.get("content-type") || "";
  return ct.includes("application/json") ? res.json() : res.text();
}

export const api = {

  //Auth
  registrar :(data) =>
    jsonFetch(`${BASE_AUTH}/registrar`, {method: "POST", body: data  }),
  login:(data)=>
    jsonFetch(`${BASE_AUTH}/login`, {method: "POST", body: data  }),
  //Listar todas laS PREGUNTAS
  listarPreguntas: () => jsonFetch(`${BASE_PREG}`),

  // Crear una nueva pregunta
  crearPregunta: (data) =>
    jsonFetch(`${BASE_PREG}`, { method: "POST", body: data }),

  // Actualizar una pregunta existente
  actualizarPregunta:(id, data)=>
    jsonFetch(`${BASE_PREG}/${id}`, { method: "PUT", body: data }),

  //Eliminar una pregunta existente
  eliminarPregunta: (id) =>
    jsonFetch(`${BASE_PREG}/${id}`, { method: "DELETE"}),

  //Envio el mesnaje
  enviarMensaje: (texto) =>
    jsonFetch(`${BASE_PREG}/responder`, {
      method: "POST",
      body: { pregunta: texto, mensaje: texto, texto },
    }),
};
