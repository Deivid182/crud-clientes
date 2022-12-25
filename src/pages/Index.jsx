import { useLoaderData } from "react-router-dom";
import Cliente from "../components/Cliente";
import { obtenerClientes } from '../data/clientes'

export async function loader() {
	const clientes = await obtenerClientes()
  return clientes 
}

const Index = () => {
	const clientes = useLoaderData();

	return (
		<>
			<h1 className="font-black text-4xl text-blue-900">Clientes</h1>
			<p className="mt-5 text-xl">Administra Tus Clientes</p>

      { clientes.length ? 
      (
        <table className="w-full bg-white shadow mt-5 table-auto">
          <thead className="bg-blue-800 text-white">
            <tr>
              <th className="p-2">Cliente</th>
              <th className="p-2">Contacto</th>
              <th className="p-2">Accioness</th>
            </tr>
          </thead>
          <tbody>
            { clientes.map( cliente => (
              <Cliente 
                key={cliente.id}
                cliente={cliente}
              />
            ) ) }
          </tbody>
        </table>
      ) 
        : 
      (
        <p className="text-center mt-10">No hay Clientes aún </p>
      ) }
		</>
	);
};

export default Index;
