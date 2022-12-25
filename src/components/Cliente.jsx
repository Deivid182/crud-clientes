import { useNavigate, Form, redirect } from "react-router-dom"
import { eliminarCliente } from '../data/clientes'

export async function action({params}) {

  eliminarCliente(params.clienteId)

  return redirect('/')
}


const Cliente = ({ cliente }) => {

  const { nombre, empresa, email, telefono, id } = cliente
  const navigate = useNavigate()

  return (
    <tr className='border-b'>
      <td className='p-6 space-y-2'>
        <p className='text-gray-800 text-2xl'>{nombre} </p>
        <p className='text-gray-800 text-2xl'>{empresa} </p>
      </td>

      <td className='p-6'>
        <p className='text-gray-600'><span className='text-gray-800 uppercase font-bold'>EMAIL: </span>{email}</p>
        <p className='text-gray-600'><span className='text-gray-800 uppercase font-bold'>TELEFONO:</span>{telefono}</p>
      </td>

      <td className='p-6 flex gap-3 justify-end'>
        <button 
          type='button'
          className='bg-blue-600 hover:bg-blue-800 font-bold text-sm text-slate-100 p-2 uppercase rounded-md shadow'
          onClick={() => navigate(`/clientes/${id}/editar`) }
        >
          Editar
        </button>

      <Form
        method="post"
        action={`/clientes/${id}/eliminar`}
        onSubmit={ e => {
          if(!confirm('Deseas eliminar este registro?')) {
            e.preventDefault()
          }
        } }
      >
        <button
          type='submit'
          className='bg-red-600 hover:bg-red-800 font-bold text-sm text-slate-100 p-2 uppercase rounded-md shadow'
        >
          Eliminar
        </button>
      </Form>
      </td>
    </tr>
  )
}

export default Cliente