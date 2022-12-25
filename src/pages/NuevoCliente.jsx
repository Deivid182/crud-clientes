import { useNavigate, Form, useActionData, redirect } from "react-router-dom"
import Error from "../components/Error"
import Formulario from "../components/Formulario"
import { agregarCliente } from '../data//clientes'

export async function action({request}) {
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

  await agregarCliente(datos)

  return redirect('/')
}

const NuevoCliente = () => {

  const errores = useActionData()
  const navigate = useNavigate()


  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Nuevo cliente</h1>
      <div className="flex justify-between">
        <p className="mt-5 text-xl">Llena todos los campos</p>
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
          <Formulario />

          <input 
            type="submit" 
            value={'Registrar'}
            className="mt-5 w-full bg-blue-600 hover:bg-blue-800 p-3 uppercase font-bold text-white rounded-md "
          />
        </Form>
      </div>
    </>
  )
}

export default NuevoCliente