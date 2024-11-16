import { useState, useEffect } from 'react'
import Header from '../COMPONENTES/header.jsx';
import { useLogin } from '../hooks/useLogin'
import 'tailwindcss/tailwind.css';
import { Link } from 'react-router-dom';


function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const { login, error, isLoading } = useLogin("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        await login(email, password);

    }

    return (
        <div className="App">
            <Header />
            <div className="flex justify-center items-center p-6">
                <div className="w-96 rounded-lg text-center shadow-lg p-4">
                    <h2 className="text-3xl font-bold mb-4">Iniciar sesión</h2>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
                        <label htmlFor="email"><b>Correo electrónico</b></label>
                        <input
                            className="appearance-none block w-full text-gray-900 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-900" 
                            type="email"
                            placeholder="Correo electónico"
                            name="user"
                            defaultValue={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label htmlFor="password"><b>Contraseña</b></label>
                        <input
                            className="appearance-none block w-full text-gray-700 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-900"
                            type="password"
                            placeholder="Contraseña"
                            name="password"
                            defaultValue={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Link to="/forgotpassword" className="text-red-500 text-center text-sm">¿Olvidaste tu contraseña?</Link>
                    
                        <button
                            className="w-full bg-red-800 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-gray-700"
                            disabled={isLoading}
                        >
                            Iniciar sesión

                        </button>

                        <Link to="/register" className="text-grey-900 text-center text-sm">Crear una cuenta</Link>

                        {error ? (
                            <div className="bg-red-200 rounded p-3 text-red-950">
                                {error}
                            </div>
                        ) : ""}
                    </form>
                </div>
            </div>
        </div>

    )
} 

export default Login
