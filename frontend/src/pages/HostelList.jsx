import React, { useState, useEffect } from 'react';
import API from '../api';
import PropertyCard from '../components/PropertyCard';
import { FaSearch, FaSlidersH } from 'react-icons/fa';

const HostelList = () => {
    const [hostels, setHostels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        location: '',
        price: '',
        amenities: ''
    });

    const fetchHostels = async () => {
        setLoading(true);
        try {
            const query = new URLSearchParams(filters).toString();
            const { data } = await API.get(`/hostels?${query}`);
            setHostels(data);
        } catch (err) {
            console.error('Error fetching hostels', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHostels();
    }, [filters]);

    const handleFilterChange = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    };

    return (
        <div className="min-h-screen bg-[#f8fafc]/50">
            <div className="container mx-auto px-6 py-12">
                {/* Header & Filter Bar */}
                <div className="flex flex-col lg:flex-row justify-between items-end mb-16 gap-8 animate-fade-in">
                    <div className="max-w-xl">
                        <span className="text-indigo-600 font-black text-[10px] uppercase tracking-[0.3em] mb-3 block">Premium Hostels</span>
                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">
                            Elite Community <br />
                            <span className="gradient-text">Stays Await</span>
                        </h1>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                        <div className="relative flex-1 sm:w-80 group">
                            <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-indigo-500 transition-colors" />
                            <input
                                name="location"
                                type="text"
                                placeholder="Search hostels..."
                                className="w-full bg-white border-2 border-gray-100 rounded-2xl py-4 pl-14 pr-6 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 outline-none font-bold text-sm transition-all shadow-sm"
                                value={filters.location}
                                onChange={handleFilterChange}
                            />
                        </div>
                        <div className="relative flex-1 sm:w-56 group">
                            <FaSlidersH className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                            <select
                                name="price"
                                className="w-full bg-white border-2 border-gray-100 rounded-2xl py-4 pl-14 pr-6 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/5 outline-none font-bold text-sm transition-all shadow-sm appearance-none cursor-pointer"
                                value={filters.price}
                                onChange={handleFilterChange}
                            >
                                <option value="">Max Price (All)</option>
                                <option value="5000">Below ₹5,000</option>
                                <option value="10000">Below ₹10,000</option>
                                <option value="15000">Below ₹15,000</option>
                            </select>
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className="flex flex-col justify-center items-center h-96 gap-4">
                        <div className="w-16 h-16 border-4 border-indigo-600/10 border-t-indigo-600 rounded-full animate-spin"></div>
                        <span className="text-gray-400 font-bold text-xs uppercase tracking-widest">Searching hostels...</span>
                    </div>
                ) : hostels.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-10">
                        {hostels.map((hostel, idx) => (
                            <div key={hostel._id} className="animate-fade-in" style={{ animationDelay: `${idx * 0.1}s` }}>
                                <PropertyCard property={hostel} type="Hostel" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-32 bg-white rounded-[3rem] shadow-sm border-2 border-dashed border-gray-100">
                        <div className="text-6xl mb-6">🏢</div>
                        <p className="text-gray-400 text-xl font-bold">No exclusive hostels found.</p>
                        <p className="text-gray-400 text-sm mt-2 font-medium">Try broadening your search criteria.</p>
                        <button
                            onClick={() => setFilters({ location: '', price: '', amenities: '' })}
                            className="mt-8 text-indigo-600 font-black text-xs uppercase tracking-widest hover:underline"
                        >Reset Discovery</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default HostelList;
