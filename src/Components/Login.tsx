import { useState, useRef  } from 'react'
import { useLogin } from '../Hooks/useLogin'
import { AuthContext } from '../Context/AuthContext'
import { useContext } from 'react'

export default function Login() {

    // 3. Consumir el contexto
    const { setUser } = useContext(AuthContext)
    
    const emailRef = useRef()
    const passwordRef = useRef()
    const [error, setError] = useState('')
    
    
    const { login } = useLogin()
    
   

    const handleLogin = () => {
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const isSuccess = login(email, password);
        if(!isSuccess)   
        {
            setError("Credenciales incorrectas");
        }
        else
        {  
            setUser(email)        
        }
    }


    return (
        <>        
              <h2 className="text-3xl font-bold text-center mb-6">Login</h2>
<div className="flex flex-col items-center bg-white p-8 rounded-2xl shadow-lg w-80 mx-auto space-y-4">
  <input 
    type="email"
    placeholder="Correo"
    ref={emailRef}
    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
  />
  <input 
    type="password"
    placeholder="Contraseña"
    ref={passwordRef}
    className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
  />
  <button 
    onClick={handleLogin}
    className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors"
  >
    Ingresar
  </button>
  {error && (
    <p className="text-red-500 text-sm">{error}</p>
  )}
</div>
       
        </>
    )
}