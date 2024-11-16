import React from "react";
import { Link } from "react-router-dom";

const ProductCardLoading = ({ productInfo }) => {
    return (

        <div className="flex flex-col bg-gray-100 rounded-lg h-64">
            <div className="h-48 w-full bg-gray-200 rounded-t-md animate-pulse"></div>
            <div className="flex flex-col gap-2 p-2 animate-pulse">
                <h2 className="h-7 flex items-center gap-1">
                    <span className="rounded-full bg-gray-200 w-10 h-4"></span>
                    <span className="rounded-full bg-gray-200 w-8 h-4"></span>
                    <span className="rounded-full bg-gray-200 w-16 h-4"></span>
                </h2>
                {/* <p className="text-gray-600">{productInfo.content}</p> */}
                {/* <p className="text-sm text-gray-500 mt-2">{productInfo.description}</p> */}
                <div className="bg-blue-200 text-white rounded transition duration-300 text-center h-8" disabled={true}>
                </div>
            </div>
        </div>
    );
}

export default ProductCardLoading;
