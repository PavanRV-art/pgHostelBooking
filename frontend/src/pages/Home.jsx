import React from 'react';
import { Link } from 'react-router-dom';
import { FaShieldAlt, FaTag, FaBolt, FaArrowRight } from 'react-icons/fa';
import heroImage from '../assets/heroImage.png';

const Home = () => {
    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <header className="relative py-24 md:py-32 overflow-hidden bg-white">
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/3 w-[800px] h-[800px] bg-blue-50 rounded-full blur-3xl opacity-50"></div>
                <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[600px] h-[600px] bg-indigo-50 rounded-full blur-3xl opacity-50"></div>

                <div className="container mx-auto px-6 relative z-10 text-center md:text-left flex flex-col md:flex-row items-center justify-between">
                    <div className="md:w-1/2 animate-fade-in">
                        <span className="inline-block px-4 py-1.5 bg-blue-100 text-blue-600 rounded-full text-xs font-bold tracking-widest uppercase mb-6 shadow-sm">
                            Next Generation Booking
                        </span>
                        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 leading-tight mb-8">
                            Luxury Living <br />
                            <span className="gradient-text">Redefined for You</span>
                        </h1>
                        <p className="text-lg text-gray-600 mb-10 max-w-lg leading-relaxed">
                            Discover premium Hostels and PGs curated for comfort, security, and community. Experience seamless booking with our state-of-the-art platform.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                            <Link to="/pg" className="btn-premium text-white px-10 py-4 rounded-2xl font-bold flex items-center justify-center gap-3">
                                Explore PGs <FaArrowRight size={14} />
                            </Link>
                            <Link to="/hostels" className="bg-white text-gray-900 border-2 border-gray-100 px-10 py-4 rounded-2xl font-bold hover:border-blue-600 hover:text-blue-600 transition-all shadow-sm flex items-center justify-center gap-3">
                                Find Hostels
                            </Link>
                        </div>
                    </div>
                    <div className="md:w-1/2 mt-16 md:mt-0 relative group">
                        <div className="absolute -inset-4 bg-gradient-to-tr from-blue-400 to-indigo-400 rounded-[2.5rem] blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                        <img
                            src={heroImage}
                            alt="Luxury Stay"
                            className="w-full h-[400px] md:h-[500px] object-cover rounded-[2rem] shadow-2xl relative z-10 grayscale-[20%] hover:grayscale-0 transition-all duration-500"
                        />
                    </div>
                </div>
            </header>

            {/* Features Section */}
            <section className="bg-gray-50 py-24">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4">Why StayBanglore?</h2>
                        <p className="text-gray-500 max-w-2xl mx-auto">We provide the best-in-class features to ensure your stay is comfortable and hassle-free.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-10">
                        <div className="bg-white p-10 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 group">
                            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-8 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                <FaShieldAlt size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Verified & Secure</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Every property on our platform undergoes a rigorous manual verification process to guarantee your safety.
                            </p>
                        </div>
                        <div className="bg-white p-10 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 group">
                            <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                                <FaTag size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Unmatched Value</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Transparent pricing with no hidden fees. We negotiate the best rates directly with owners for our community.
                            </p>
                        </div>
                        <div className="bg-white p-10 rounded-[2rem] shadow-sm hover:shadow-xl transition-all duration-300 group">
                            <div className="w-16 h-16 bg-cyan-50 rounded-2xl flex items-center justify-center text-cyan-600 mb-8 group-hover:bg-cyan-600 group-hover:text-white transition-colors duration-300">
                                <FaBolt size={28} />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">Instant Booking</h3>
                            <p className="text-gray-600 leading-relaxed">
                                No more long waits or complex paperwork. Reserve your perfect room with just a few clicks in real-time.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
