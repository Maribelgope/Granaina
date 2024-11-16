/* ProductCard simulado */


import React from "react";

const ProductCard = ({ ProductInfoSimulado }) => {
    return (
        <div className="flex flex-col bg-white rounded-lg shadow-md overflow-hidden text-center h-64">
            <img
                src={ProductInfoSimulado.image}
                alt={ProductInfoSimulado.name}
                className="h-48 w-full object-cover"
            />
            <div className="flex flex-col gap-2 p-2">
                <h2 className="text-lg font-semibold">{ProductInfoSimulado.name}</h2>
                <p className="text-sm text-gray-500">{ProductInfoSimulado.description}</p>
            </div>
        </div>
    );
}

export default ProductCard;
