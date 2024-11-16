import React, { useState } from 'react';

const Login = ({ onClose }) => {
  const [isRegistering, setIsRegistering] = useState(false);

  const handleToggleMode = () => {
    setIsRegistering(!isRegistering);
  };

  return (
    <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full relative">
        <button className="absolute top-4 right-4" onClick={() => onClose()}>X</button>
        <h2 className="text-3xl font-bold mb-4">{isRegistering ? 'Register' : 'Login'}</h2>
        <h3 className="text-sm text-gray-500 mb-8">{isRegistering ? 'Enter your details to register' : 'Enter your credentials'}</h3>
        <form className="space-y-4">
          {isRegistering && (
            <div>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="text"
                placeholder="Full Name"
              />
            </div>
          )}
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="text"
            placeholder="Username"
          />
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            type="password"
            placeholder="Password"
          />
          {isRegistering && (
            <div>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                type="password"
                placeholder="Confirm Password"
              />
            </div>
          )}
          <a href="#" className="text-blue-500 text-sm">Forgot your password?</a>
          <button
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {isRegistering ? 'Register' : 'Login'}
          </button>
          <button className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleToggleMode}>
            {isRegistering ? 'Already have an account? Login' : 'Don\'t have an account? Register'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
