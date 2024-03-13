
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'; // Assuming use of React Router
import { logout} from '../redux/reducer/userReducer';
import axios from 'axios';
import toast from 'react-hot-toast';


const HeaderNavbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const  user = useSelector((state: any) => state.user);
    console.log("Header User",user)   
    useEffect(() => {
        
        if (user) {
            navigate("/product")
        }
    }, [user, navigate]);


    const handleLogout = () => {
        axios.get(`${import.meta.env.VITE_SERVER_URL}/api/v1/user/logout`, { withCredentials: true })
        dispatch(logout());
        toast.success('Logout success')
        navigate("/signin");    
    }

    return (
        <header className="header bg-black shadow-md py-4 px-4 md:px-8 flex justify-between items-center">
            
            <Link to="/" className='flex'>
                <img
                    src="https://levitation.in/wp-content/uploads/2023/12/Frame-39624.svg"
                    alt="Levitation Infotech Logo"
                    className="h-10 w-auto text-black"
                />
                <p className='text-white text-xs flex  p-4 justify-center items-center' >Not real Levitation website</p>
            </Link>
            

        {!user && (
            <div className='text-white gap-4'>
                <Link to="/signin" className='mx-4'>SignIn</Link>
                <button onClick={()=>navigate('/')} className='mx-4'>SignUp</button>
            </div>
        )}
        {user && (
            <div className='text-white'>
            <span>Welcome {user.user.name} </span>
            <button className='ml-4' onClick={handleLogout}>Logout</button>
        </div>
        )}
            

        </header>
    );
};

export default HeaderNavbar;
