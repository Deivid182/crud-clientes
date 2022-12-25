import {Form, useNavigate, useLoaderData, useActionData, redirect } from "react-router-dom"
import { obtenerCliente, editarCliente } from '../data/clientes'
import Formulario from "../components/Formulario"
import Error from "../components/Error"

export async function loader({params}) {
  const cliente = await obtenerCliente(params.clienteId)
  if(Object.values(cliente).length ===0) {
    throw new Response('', {
      status: 404,
      statusText: 'No hay resultados'
    })
  }
  console.log(cliente)
  return cliente
}

export async function action({request, params}) {
  const formData = await request.formData() 
  const datos = Object.fromEntries(formData)
  const email = formData.get('email')

  const errores = []

  if(Object.values(datos).includes('')) {
    errores.push('Todos los campos son obligatorios')
  }

  let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");

  if(!regex.test(email)) {
    errores.push('Email no válido')
  }

  if(Object.keys(errores).length) {
    return errores
  }

  await editarCliente(params.clienteId, datos)
  return redirect('/')
}

const EditarCliente = () => {

  const navigate = useNavigate()
  const cliente = useLoaderData()
  const errores = useActionData()
  console.log(cliente);

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Editar cliente</h1>
      <div className="flex justify-between">
        <p className="mt-5 text-xl">A continuacion selecciona los campos que deseas editar</p>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-800 text-white px-3 py-1 font-bold uppercase"
        >
          Volver
        </button>
      </div>

      <div className="bg-white shadow rounded md:w-3/4 mx-auto mt-5 px-5 py-10 ">

       { errores?.length && errores.map( (error, i) => (
        <Error key={i}>
          {error}
        </Error>
      ) ) }

        <Form 
          method="post"
          >
          <Formulario 
            cliente={cliente}
          />

          <input 
            type="submit" 
            value={'Guardar Cambios'}
            className="mt-5 w-full bg-blue-600 hover:bg-blue-800 p-3 uppercase font-bold text-white rounded-md "
          />
        </Form>
      </div>
    </>
  )
}

export default EditarCliente