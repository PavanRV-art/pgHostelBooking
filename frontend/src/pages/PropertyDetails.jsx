import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../api';
import { FaMapMarkerAlt, FaRupeeSign, FaPhone, FaCheckCircle, FaChevronLeft } from 'react-icons/fa';

const PropertyDetails = ({ type }) => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [property, setProperty] = useState(null);
    const [loading, setLoading] = useState(true);
    const [bookingLoading, setBookingLoading] = useState(false);

    useEffect(() => {
        const fetchDetails = async () => {
            try {
                const endpoint = type === 'PG' ? `/pg/${id}` : `/hostels/${id}`;
                const { data } = await API.get(endpoint);
                setProperty(data);
            } catch (err) {
                console.error('Error fetching details', err);
            } finally {
                setLoading(false);
            }
        };
        fetchDetails();
    }, [id, type]);

    const handleBookNow = async () => {
        setBookingLoading(true);
        try {
            await API.post('/bookings', {
                propertyId: id,
                propertyType: type
            });
            navigate('/bookings');
        } catch (err) {
            alert('Booking failed: ' + (err.response?.data?.message || err.message));
        } finally {
            setBookingLoading(false);
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center h-screen bg-gray-50">
            <div className="w-12 h-12 border-4 border-blue-600/10 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
    );

    if (!property) return (
        <div className="min-h-screen flex flex-col items-center justify-center text-gray-500 gap-4">
            <span className="text-6xl">🏚️</span>
            <p className="text-2xl font-black">Property not found.</p>
            <button onClick={() => navigate(-1)} className="text-blue-600 font-bold uppercase tracking-widest text-xs hover:underline">Go Back</button>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50/50 pb-20">
            <div className="container mx-auto px-6 py-12">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-400 hover:text-blue-600 font-bold text-xs uppercase tracking-widest mb-10 transition-colors group"
                >
                    <FaChevronLeft className="group-hover:-translate-x-1 transition-transform" /> Back to Listings
                </button>

                <div className="bg-white rounded-[3rem] shadow-2xl shadow-blue-900/5 overflow-hidden border border-gray-100/50 animate-fade-in">
                    <div className="grid lg:grid-cols-2 gap-0">
                        {/* Image Gallery */}
                        <div className="bg-gray-100 relative group overflow-hidden">
                            <div className="flex h-[400px] lg:h-[600px] overflow-x-auto scrollbar-hide snap-x snap-mandatory">
                                {property.photos && property.photos.length > 0 ? (
                                    property.photos.map((photo, i) => (
                                        <img key={i} src={photo} alt={`${property.name} ${i}`} className="min-w-full h-full object-cover snap-center grayscale-[10%] hover:grayscale-0 transition-all duration-700" />
                                    ))
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400 font-black text-xs uppercase tracking-[0.2em]">Visual Gallery Unavailable</div>
                                )}
                            </div>
                            {property.photos?.length > 1 && (
                                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                                    {property.photos.map((_, i) => (
                                        <div key={i} className="w-2 h-2 rounded-full bg-white/50 border border-white/20"></div>
                                    ))}
                                </div>
                            )}
                            <div className="absolute top-8 left-8 z-10">
                                <span className="bg-white/90 backdrop-blur-xl text-gray-900 px-6 py-2 rounded-2xl text-xs font-black uppercase tracking-[0.2em] shadow-2xl border border-white/20">
                                    {type} STAY
                                </span>
                            </div>
                        </div>

                        {/* Details Content */}
                        <div className="p-10 lg:p-16 flex flex-col">
                            <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-12">
                                <div className="space-y-3">
                                    <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">{property.name}</h1>
                                    <p className="text-gray-500 flex items-center gap-2 text-lg font-medium">
                                        <FaMapMarkerAlt className="text-red-500" /> {property.location}
                                    </p>
                                </div>
                                <div className="bg-blue-50/50 p-6 rounded-[2rem] border border-blue-100/50 min-w-[200px]">
                                    <p className="text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] mb-1">Premium Rate</p>
                                    <p className="text-4xl font-black text-blue-600 flex items-center tracking-tighter">
                                        <FaRupeeSign size={28} /> {property.price}<span className="text-xs text-blue-400 font-bold ml-1 uppercase tracking-widest">/Month</span>
                                    </p>
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-12 mb-12">
                                <div>
                                    <h2 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div> Core Amenities
                                    </h2>
                                    <div className="grid grid-cols-1 gap-4">
                                        {property.amenities?.map((item, index) => (
                                            <div key={index} className="flex items-center gap-3 text-gray-700 bg-gray-50/50 p-3 rounded-xl border border-gray-100/50 hover:bg-white hover:shadow-lg hover:shadow-gray-200/50 transition-all duration-300">
                                                <FaCheckCircle className="text-green-500" />
                                                <span className="font-bold text-sm">{item}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="space-y-8">
                                    <div>
                                        <h2 className="text-xs font-black text-gray-400 uppercase tracking-[0.3em] mb-6 flex items-center gap-2">
                                            <div className="w-2 h-2 bg-indigo-600 rounded-full"></div> Reach Out
                                        </h2>
                                        <div className="bg-indigo-50 border-2 border-indigo-100/50 p-6 rounded-[2rem] flex items-center gap-4 group">
                                            <div className="bg-indigo-600 text-white p-4 rounded-2xl shadow-lg shadow-indigo-200 group-hover:rotate-6 transition-transform">
                                                <FaPhone size={20} />
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Support Line</p>
                                                <p className="text-xl font-black text-indigo-900">{property.contact}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={handleBookNow}
                                        disabled={bookingLoading}
                                        className={`w-full py-6 rounded-[2rem] text-lg font-black tracking-widest uppercase transition-all duration-500 shadow-2xl relative overflow-hidden group/btn ${bookingLoading ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'btn-premium text-white'
                                            }`}
                                    >
                                        <span className="relative z-10 flex items-center justify-center gap-3">
                                            {bookingLoading ? 'Securing Stay...' : 'Reserve Now'}
                                        </span>
                                        <div className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-10 transition-opacity"></div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PropertyDetails;
