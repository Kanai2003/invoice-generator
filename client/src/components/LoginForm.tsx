import { useEffect, useState } from 'react';
import LabeledInput from './LabeledInput';
import {  useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { login } from '../redux/reducer/userReducer';



interface LoginFormValues {
    email: string;
    password: string;
}

const LoginForm: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    const isAuthenticated = useSelector((state: any) => state.isAuthenticated);

    useEffect(() => {
        console.log("isAuth", isAuthenticated)
        if (isAuthenticated) {
            console.log("navigation")
            navigate("/product")
        }
    }, [isAuthenticated, navigate]);

    const [formData, setFormData] = useState<LoginFormValues>({
        email: '',
        password: '',
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

        try {
            const response = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/login`,
                { email: formData.email, password: formData.password },
                { withCredentials: true }
            )
            console.log(response)

            dispatch(login(response.data))
            if(response.status === 200){
                console.log('Login success')
                toast.success('Login success')
                navigate('/product')
            }

            
        } catch (error: any) {
            console.error('Login error:', error);
            toast.error('Login failed')
        }
    };

    return (
        <div className="p-4 rounded-lg bg-indigo-950 text-white max-w-md mx-auto mt-8 sm:w-full shadow-md">
            <form onSubmit={handleSubmit} className="space-y-6">
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
                <div>
                    <button
                        type="submit"
                        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Sign in
                    </button>
                </div>
            </form>
            <div className='mt-2'>
            <p>Don't have any accout?</p>
            <button onClick={()=>navigate('/')} className="text-indigo-400">
                Sign up
            </button>
            </div>
        </div>
    );
};

export default LoginForm;
