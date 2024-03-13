import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LabeledInput from './LabeledInput';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';


interface RegistrationFormValues {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

const SignupForm: React.FC = () => {
    const navigate = useNavigate();

    const isAuthenticated = useSelector((state: any) => state.isAuthenticated);

    useEffect(() => {
        if (isAuthenticated) {
            // console.log("navigation")
            navigate("/product")
        }
    }, [isAuthenticated, navigate]);

    const [formData, setFormData] = useState<RegistrationFormValues>({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            toast.error('Invalid email format');
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            toast.error('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_SERVER_URL}/api/v1/user/register`,
                {
                    name: formData.name,
                    email: formData.email,
                    password: formData.password,
                },
                { withCredentials: true }
            );
            console.log(response);

            if (response.status === 200) {
                console.log('Registration success');
                toast.success('Registration success');
                navigate('/signin');
            }
        } catch (error: any) {
            console.error('Registration error:', error);
            toast.error('Registration failed');
        }
    };

    return (
        <div className="p-4 rounded-lg bg-indigo-950 text-white max-w-md mx-auto mt-8 sm:w-full shadow-md">
            <form onSubmit={handleSubmit} className="space-y-6">
                <LabeledInput
                    label="Name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <LabeledInput
                    label="Email address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <LabeledInput
                    label="Password"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <LabeledInput
                    label="Confirm Password"
                    name="confirmPassword"
                    type="password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                />
                <div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Register
                    </button>
                </div>
            </form>
            <div className='mt-2'>
            <p>Already have an account?</p>
            <Link to="/signin" className="text-indigo-400">
                Sign in
            </Link>
            </div>
        </div>
    );
};

export default SignupForm;
