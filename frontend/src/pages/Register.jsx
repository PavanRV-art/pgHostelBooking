import React, { useState, useContext } from 'react';
import API from '../api';
import { AuthContext } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaRocket, FaSignInAlt } from 'react-icons/fa';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'user'
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const { data } = await API.post('/auth/register', formData);
            login(data);
            navigate(data.role === 'owner' ? '/dashboard' : '/');
        } catch (err) {
            setError(err.response?.data?.message || err.message || 'Registration failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gray-50/50 p-6">
            <div className="w-full max-w-5xl bg-white rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row-reverse border border-gray-100 animate-fade-in">
                {/* Visual Side */}
                <div className="md:w-1/2 bg-indigo-600 relative overflow-hidden p-16 flex flex-col justify-between text-white">
                    <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-white opacity-10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-blue-400 opacity-20 rounded-full blur-3xl translate-y-1/2 translate-x-1/2"></div>

                    <div className="relative z-10">
                        <div className="bg-white/20 backdrop-blur-xl w-16 h-16 rounded-2xl flex items-center justify-center mb-8 border border-white/30">
                            <FaRocket size={32} />
                        </div>
                        <h2 className="text-4xl font-black mb-4">Join Elite Community</h2>
                        <p className="text-indigo-100 font-medium leading-relaxed max-w-xs">Start your premium living journey today. Setup your profile in seconds.</p>
                    </div>

                    <div className="relative z-10 bg-white/10 backdrop-blur-md p-6 rounded-3xl border border-white/10">
                        <p className="text-xs font-black uppercase tracking-widest mb-4 opacity-60">Success Story</p>
                        <p className="italic text-lg text-white font-medium">"Finding a PG was so stressful until I used StayBook. The process was incredibly smooth!"</p>
                        <p className="mt-4 font-black uppercase tracking-widest text-[10px]">— Sarah J., Resident</p>
                    </div>
                </div>

                {/* Form Side */}
                <div className="md:w-1/2 p-12 lg:p-20">
                    <div className="mb-10 text-center md:text-left">
                        <h1 className="text-3xl font-black text-gray-900 mb-2">Create Account</h1>
                        <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">Join thousands of residents today</p>
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
                                onClick={() => setFormData({ ...formData, role: 'user' })}
                                className={`flex-1 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${formData.role === 'user' ? 'bg-white shadow-xl text-indigo-600' : 'text-gray-400'}`}
                            >
                                Resident
                            </button>
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, role: 'owner' })}
                                className={`flex-1 py-3 rounded-xl font-black text-xs uppercase tracking-widest transition-all ${formData.role === 'owner' ? 'bg-white shadow-xl text-blue-600' : 'text-gray-400'}`}
                            >
                                Owner
                            </button>
                        </div>

                        <div className="relative group">
                            <FaUser className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-indigo-500 transition-colors" />
                            <input
                                name="name"
                                type="text"
                                required
                                placeholder="Full Name"
                                className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 pl-14 pr-6 focus:bg-white focus:border-indigo-500 outline-none font-bold text-sm transition-all"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="relative group">
                            <FaEnvelope className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-indigo-500 transition-colors" />
                            <input
                                name="email"
                                type="email"
                                required
                                placeholder="Email Address"
                                className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 pl-14 pr-6 focus:bg-white focus:border-indigo-500 outline-none font-bold text-sm transition-all"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="relative group">
                            <FaLock className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-300 group-focus-within:text-indigo-500 transition-colors" />
                            <input
                                name="password"
                                type="password"
                                required
                                placeholder="Create Password"
                                className="w-full bg-gray-50 border-2 border-transparent rounded-2xl py-4 pl-14 pr-6 focus:bg-white focus:border-indigo-500 outline-none font-bold text-sm transition-all"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`w-full py-5 rounded-2xl font-black text-white uppercase tracking-widest transition-all duration-300 shadow-2xl relative overflow-hidden group/btn ${loading ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none' : 'btn-premium'
                                }`}
                        >
                            {loading ? 'Creating Profile...' : 'Sign Up'}
                        </button>
                    </form>

                    <div className="mt-12 text-center">
                        <p className="text-gray-400 font-bold text-xs uppercase tracking-widest">
                            Already have an account?{' '}
                            <Link to="/login" className="text-indigo-600 hover:underline inline-flex items-center gap-2">
                                Login Here <FaSignInAlt />
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;
