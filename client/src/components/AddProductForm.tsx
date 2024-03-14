import React, { useEffect, useState } from 'react';
import LabeledInput from './LabeledInput';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const AddProductPage: React.FC = () => {
    const isAuthenticated = useSelector((state: any) => state.isAuthenticated);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("isAuth", isAuthenticated)
        if (!isAuthenticated) {
            console.log("navigation")
            navigate("/signin")
        }
    }, [isAuthenticated, navigate]);
    const [products, setProducts] = useState<any[]>([]);
    const [productName, setProductName] = useState('');
    const [productQty, setProductQty] = useState('');
    const [productRate, setProductRate] = useState('');
    const [pdfUrl, setPdfUrl] = useState<string>('');

    const handleAddProduct = () => {
        const newProduct = {
            name: productName,
            quantity: productQty,
            price: productRate,
        };
        setProducts([...products, newProduct]);
        setProductName('');
        setProductQty('');
        setProductRate('');
    };

    const handleGenerateInvoice = async () => {
        console.log(products)
        try {
            const token = localStorage.getItem('token');
            // console.log('Token:', token);
            const response = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/product/invoice`,
                { products: products },
                {
                    responseType: 'blob',
                    withCredentials: true,
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            )
            console.log(response)

            // Display PDF
            const url = window.URL.createObjectURL(new Blob([response.data], { type: 'application/pdf' }));
            setPdfUrl(url);
        } catch (error: any) {
            console.error(error);
        }
    }

    const handleDownload = () => {
        // Trigger download
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.setAttribute('download', 'invoice.pdf');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    return (
        <div className='flex flex-col  items-center'>
            <div className="p-4 rounded-lg bg-indigo-950 text-white flex flex-col sm:flex-row w-full justify-evenly">
                <div className='p-4 w-full sm:w-5/12 flex flex-col items-center'>
                    <form className="space-y-6 w-full">
                        <LabeledInput
                            label="Product Name"
                            name="productName"
                            type="text"
                            value={productName}
                            onChange={(e) => setProductName(e.target.value)}
                            required
                        />
                        <LabeledInput
                            label="Product Quantity"
                            name="productQty"
                            type="number"
                            value={productQty}
                            onChange={(e) => setProductQty(e.target.value)}
                            required
                        />
                        <LabeledInput
                            label="Product Rate"
                            name="productRate"
                            type="number"
                            value={productRate}
                            onChange={(e) => setProductRate(e.target.value)}
                            required
                        />
                        <div>
                            <button
                                type="button"
                                onClick={handleAddProduct}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Add Product
                            </button>
                        </div>
                        <button
                            type="button"
                            onClick={handleGenerateInvoice}
                            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 my-4"
                        >
                            Generate PDF Invoice
                        </button>
                    </form>
                </div>
                <div className="w-full sm:w-5/12">
                    <h2 className="text-lg font-bold">Added Products</h2>
                    <table className="mt-2 w-full">
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Quantity</th>
                                <th>Rate {` (₹)`}</th>
                                <th>Total {` (₹)`}</th>
                                <th>GST {` (₹)`}</th>
                            </tr>
                        </thead>
                        <tbody className='text-center'>
                            {products.map((product, index) => (
                                <tr key={index}>
                                    <td>{product.name}</td>
                                    <td>{product.quantity}</td>
                                    <td>{product.price}</td>
                                    <td><strong>{product.quantity * product.price}</strong></td>
                                    <td>{(product.quantity * product.price * 0.18).toFixed(2)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            {/* <div> */}
            {pdfUrl && (
                <div className="w-full flex flex-col items-center mt-4 ">
                    <h2 className="text-lg font-bold">PDF Invoice</h2>
                    <embed src={pdfUrl} type="application/pdf" width="100%" height="1000px" />
                    <button
                        className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                        onClick={handleDownload}
                    >
                        Download PDF
                    </button>
                </div>
            )}
            {/* </div> */}
        </div>

    );
};

export default AddProductPage;
