export async function obtenerClientes() {
  const url = import.meta.env.VITE_API_URL
  const data = await fetch(url)
  const resultado = await data.json()
  return resultado
}

export async function obtenerCliente(id) {

  const url = import.meta.env.VITE_API_URL
  const data = await fetch(`${url}/${id}`)
  const resultado = await data.json()

  return resultado
}

export async function agregarCliente(datos) {
  try {
    const data = await fetch(import.meta.env.VITE_API_URL, {
      method: 'post',
      body: JSON.stringify(datos),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    await data.json()
  } catch (error) {
      console.log(error);
  }
}

export async function editarCliente(id, datos) {
   try {
    const data = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
      method: 'put',
      body: JSON.stringify(datos),
      headers: {
        'Content-Type': 'application/json'
      }
    })

    await data.json()
  } catch (error) {
      console.log(error);
  }
}

export async function eliminarCliente(id) {
  try {
    
    const data = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
      method: 'delete',
    })

    await data.json()

  } catch (error) {
      console.log(error);
  }
}