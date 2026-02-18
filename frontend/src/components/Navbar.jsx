import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { FaHotel, FaSignOutAlt, FaClipboardList, FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
    const { userInfo, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="glass-nav sticky top-0 z-50 py-4 transition-all duration-300">
            <div className="container mx-auto px-6 flex justify-between items-center">
                <Link to="/" className="text-2xl font-extrabold flex items-center gap-3 group">
                    <div className="bg-blue-600 text-white p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-blue-200">
                        <FaHotel size={24} />
                    </div>
                    <span className="gradient-text tracking-tight">StayBanglore</span>
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    <Link to="/" className="text-gray-600 hover:text-blue-600 font-semibold transition-colors">Home</Link>
                    <Link to="/pg" className="text-gray-600 hover:text-blue-600 font-semibold transition-colors">PGs</Link>
                    <Link to="/hostels" className="text-gray-600 hover:text-blue-600 font-semibold transition-colors">Hostels</Link>
                    {userInfo && (
                        <>
                            <Link to="/bookings" className="text-gray-600 hover:text-blue-600 font-semibold transition-colors">My Bookings</Link>
                            {(userInfo.role === 'owner' || userInfo.role === 'admin') && (
                                <Link to="/dashboard" className="text-gray-600 hover:text-indigo-600 font-bold transition-colors bg-indigo-50 px-3 py-1 rounded-lg">Elite Dashboard</Link>
                            )}
                        </>
                    )}
                </div>

                <div className="flex items-center gap-6">
                    {userInfo ? (
                        <div className="flex items-center gap-4 group">
                            <div className="flex flex-col items-end mr-1">
                                <span className="text-sm font-bold text-gray-800 leading-tight">{userInfo.name}</span>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full">{userInfo.role}</span>
                            </div>
                            <div className="relative">
                                <FaUserCircle size={32} className="text-gray-300 group-hover:text-blue-500 transition-colors cursor-pointer" />
                                {userInfo.role === 'owner' && (
                                    <Link
                                        to="/dashboard"
                                        className="absolute -top-1 -right-1 bg-blue-600 text-white p-1 rounded-full border-2 border-white"
                                        title="Dashboard"
                                    >
                                        <FaClipboardList size={10} />
                                    </Link>
                                )}
                            </div>
                            <button
                                onClick={handleLogout}
                                className="text-gray-400 hover:text-red-500 transition-colors p-2 bg-gray-50 hover:bg-red-50 rounded-lg"
                                title="Logout"
                            >
                                <FaSignOutAlt size={18} />
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="btn-premium text-white px-8 py-2.5 rounded-xl font-bold text-sm tracking-wide">
                            Get Started
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
