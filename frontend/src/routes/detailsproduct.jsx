function SlideOver({ isOpen, onClose, handleAddToCart }) {
  return (
    <div className={`relative z-10 ${isOpen ? '' : 'hidden'}`} aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <div className="pointer-events-auto relative w-screen max-w-md">
              <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4">
                <button type="button" className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white" onClick={onClose}>
                  <span className="absolute -inset-2.5"></span>
                  <span className="sr-only">Close panel</span>
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                <div className="px-4 sm:px-6">
                  <h2 className="text-base font-semibold leading-6 text-gray-900" id="slide-over-title">Nombre del Producto</h2>
                </div>
                <div className="relative mt-6 flex-1 px-4 sm:px-6">
                  {/* Contenido del detalle del producto */}
                  <div className="space-y-6">
                    {/* Detalle del producto */}
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Precio</h3>
                      <p className="mt-2 text-xl text-gray-900">$99.99</p>
                    </div>
                    
                    <div>
                      <h4 className="text-sm text-gray-900 font-bold">Las opciones serán modificadas según especificaciones del cliente.</h4>
                      <p className="mt-2 text-sm text-gray-600">Descripción del producto aquí...</p>
                    </div>

                    <div>
                      <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">Cantidad</label>
                      <input 
                        type="number" 
                        id="quantity" 
                        name="quantity" 
                        min="1" 
                        defaultValue="1" 
                        className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-50 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" 
                      />
                    </div>

                    <div>
                      <label htmlFor="payment-method" className="block text-sm font-medium text-gray-700">Métodos de Pago</label>
                      <select 
                        id="payment-method" 
                        name="payment-method" 
                        className="mt-1 block w-full rounded-lg border-gray-300 bg-gray-50 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      >
                        <option>Seleccione un método de pago</option>
                        <option>Visa</option>
                        <option>MasterCard</option>
                        <option>PayPal</option>
                        <option>American Express</option>
                      </select>
                    </div>

                    <a
                      className="group inline-block w-full rounded-full bg-gradient-to-r from-green-400 via-green-400 to-green-400 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75"
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleAddToCart();
                      }}
                    >
                      <span
                        className="text-center block rounded-full bg-white px-8 py-3 text-sm font-medium group-hover:bg-transparent"
                      >
                        Añadir al Carrito
                      </span>
                    </a>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SlideOver;
