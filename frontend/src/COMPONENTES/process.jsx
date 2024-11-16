import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faCreditCard, faTruck, faCheck } from '@fortawesome/free-solid-svg-icons';

const PurchaseTimeline = () => {
    const steps = [
        { number: '1', title: 'Haga su pedido', description: 'Seleccione los productos que desea comprar.', icon: faShoppingCart },
        { number: '2', title: 'Confime su pedido', description: 'Confirme su compra y seleccione el método de pago.', icon: faCreditCard },
        { number: '3', title: 'Para el envio', description: 'Realice el pago de su compra.', icon: faTruck },
        { number: '4', title: 'La entrega', description: 'Su pedido ha sido enviado.', icon: faCheck }
    ];

    return (
        <div className=" max-w-4xl mx-auto py-6 px-4 text-center">
            
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Proceso de compra.</h2>
            <br></br>
            <div className="relative">
                {/* Steps */}
                {steps.map((step, index) => (
                    <div key={index} className={`flex items-start mb-6 ${index === 0 ? 'justify-end' : index === 1 ? 'justify-start' : index === steps.length - 1 ? 'justify-start' : 'justify-end'}`}>
                        {/* Step Number with Icon */}
                        <div className="flex items-center justify-center w-8 h-8 bg-red-800 text-white rounded-full mr-4">
                            <FontAwesomeIcon icon={step.icon} />
                        </div>
                        {/* Step Content */}
                        <div className="w-64 bg-white rounded-lg p-4 shadow-md">
                            <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                            <p className="text-sm">{step.description}</p>
                        </div>
                    </div>
                ))}
                {/* Timeline */}
                <div className="border-l-2 border-gray-300 absolute h-full top-0 left-1/2 transform -translate-x-1/2"></div>
            </div>
        </div>
    );
}

export default PurchaseTimeline;
