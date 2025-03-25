import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { HiArrowLeft } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom';
import { createButton } from '../../services/buttonsSerivce';
import Layout from '../Layout';

const AddButton = () => {
    const { order } = useParams();
    const navigate = useNavigate();
    const [button, setButton] = useState({
        title: '',
        link: '',
        color: '',
        order: order ? parseInt(order) : 1,
    });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setButton({ ...button, [e.target.name]: e.target.value });
    }

    const validateForm = () => {
        const newErrors = {};
        if (!button.title.trim()) {
            newErrors.title = 'Title is required';
        }
        if (!button.link.trim()) {
            newErrors.link = 'Link is required';
        } else if (!/^https?:\/\/.+/.test(button.link)) {
            newErrors.link = 'Link must be a valid URL starting with http:// or https://';
        }
        if (!button.color) {
            newErrors.color = 'Color is required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await createButton(button);                
                navigate(-1);
            } catch (error) {                
                if (error.errors) {
                    setErrors(error.errors);
                }
            }
        }
    }

    return (
        <Layout>
            <div className="flex flex-col w-full p-4 md:p-6">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
                >
                    <HiArrowLeft className="text-xl" />
                    <span>Back</span>
                </button>
                <h1 className="text-2xl font-bold mb-6 md:mb-8 text-left md:text-left">AddButton {order}</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md">
                    {errors.order && <p className="text-red-500 text-sm">{errors.order}</p>}
                    <div className="flex flex-col">
                        <label htmlFor="title" className="text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input 
                            type="text" 
                            name="title" 
                            id="title"
                            value={button.title} 
                            onChange={handleChange}
                            className={`px-3 py-2 border rounded-md shadow-sm ${
                                errors.title ? 'border-red-500' : 'border-gray-300'
                            }`}
                        />
                        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="link" className="text-sm font-medium text-gray-700 mb-1">Link</label>
                        <input 
                            type="text" 
                            name="link" 
                            id="link"
                            value={button.link} 
                            onChange={handleChange}
                            className={`px-3 py-2 border rounded-md shadow-sm ${
                                errors.link ? 'border-red-500' : 'border-gray-300'
                            }`}
                        />
                        {errors.link && <p className="text-red-500 text-sm mt-1">{errors.link}</p>}
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="color" className="text-sm font-medium text-gray-700 mb-1">Color</label>
                        <div className="flex items-center gap-4">
                            <input 
                                type="color" 
                                name="color" 
                                id="color"
                                value={button.color} 
                                onChange={handleChange}
                                className={`w-12 h-10 p-1 border rounded-md cursor-pointer ${
                                    errors.color ? 'border-red-500' : 'border-gray-300'
                                }`}
                            />
                            <span className="text-sm text-gray-500">{button.color || 'No color selected'}</span>
                        </div>
                        {errors.color && <p className="text-red-500 text-sm mt-1">{errors.color}</p>}
                    </div>
                    <button 
                        type="submit" 
                        className="mt-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                    >
                        Add Button
                    </button>
                </form>
            </div>
        </Layout>
    )
}

export default AddButton;