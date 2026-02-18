import React, { useState, useContext } from 'react';
import API from '../api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { FaEnvelope, FaLock, FaUserShield, FaUserPlus } from 'react-icons/fa';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const { data } = await API.post('/auth/login', { email, password, role });
            login(data);
            navigate(data.role === 'owner' ? '/dashboard' : '/');
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gray-50/50 p-6">
            <div className="w-full max-w-5xl bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row border border-gray-100 animate-fade-in">
                {/* Visual Side */}
                <div className="md:w-1/2 bg-blue-600 relative overflow-hidden p-16 flex flex-col justify-between text-white">
                    <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-400 opacity-20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

                    <div className="relative z-10">
                        <div className="bg-white/20 backdrop-blur-xl w-16 h-16 rounded-2xl flex items-center justify-center mb-8 border border-white/30">
                            <FaUserShield size={32} />
                        </div>
                        <h2 className="text-4xl font-black mb-4">Welcome Back</h2>
                        <p className="text-blue-100 font-medium leading-relaxed max-w-xs">Access your personalized StayBook experience with ease and security.</p>
                    </div>

                    <div className="relative z-10 pt-12">
                        <div className="flex -space-x-4">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="w-12 h-12 rounded-full border-4 border-blue-600 bg-gray-200 overflow-hidden shadow-xl">
                                    <img src={`https://i.pravatar.cc/150?u=${i}`} alt="user" className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                        <p className="text-xs font-bold text-blue-200 mt-4 uppercase tracking-[0.2em]">Trusted by 10k+ Residents</p>
                    </div>
                </div>

                {/* Form Side */}
                <div className="md:w-1/2 p-12 lg:p-20">
                    <div className="mb-10 text-center md:text-left">
                        <h1 className="text-3xl font-black text-gray-900 mb-2">Login</h1>
                        <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">Enter your credentials below</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {error && (
                            <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-xs font-black uppercase tracking-widest border-2 border-red-100 text-center animate-shake">
                                {error}
                            </div>
                        )}

                        <div className="flex bg-gray-50 p-2 rounded-2xl border-2 border-gray-100 mb-8">
                            <button
                                type="button"
                                onClick={() => setRole('user')}
                                className={`flex-1 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${role === 'user' ? 'bg-white shadow-xl text-blue-600' : 'text-gray-400'}`}
                            >
                                Resident
                            </button>
                            <button
                                type="button"
                                onClick={() => setRole('owner')}
                                className={`flex-1 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${role === 'owner' ? 'bg-white shadow-xl text-indigo-600' : 'text-gray-400'}`}
                            >
                                Owner
                            </button>
                        </div>

                        <div className="relative group">
                            <FaEnvelope className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-blue-500 transition-colors" />
                            <input
                                type="email"
                                required
                                placeholder="Email Address"
                                className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 pl-14 pr-6 focus:bg-white focus:border-blue-500 outline-none font-bold text-sm transition-all"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className="relative group">
                            <FaLock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-blue-500 transition-colors" />
                            <input
                                type="password"
                                required
                                placeholder="Password"
                                className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 pl-14 pr-6 focus:bg-white focus:border-blue-500 outline-none font-bold text-sm transition-all"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-5 rounded-2xl font-black text-white uppercase tracking-widest transition-all duration-300 shadow-2xl relative overflow-hidden group/btn ${loading ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none' : 'btn-premium'
                                }`}
                        >
                            {loading ? 'Authenticating...' : 'Sign In'}
                        </button>
                    </form>

                    <div className="mt-12 text-center">
                        <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">
                            New to StayBook?{' '}
                            <Link to="/register" className="text-blue-600 hover:underline inline-flex items-center gap-2">
                                Create Account <FaUserPlus />
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
