import React, { useState, useEffect } from 'react';
import API from '../api';
import { FaCalendarAlt, FaCheckCircle, FaRupeeSign, FaHourglassHalf, FaExternalLinkAlt } from 'react-icons/fa';

const BookingPage = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchBookings = async () => {
        try {
            const { data } = await API.get('/bookings/mybookings');
            setBookings(data);
        } catch (err) {
            console.error('Error fetching bookings', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBookings();
    }, []);

    const handlePayment = async (bookingId) => {
        try {
            await API.put(`/bookings/${bookingId}/pay`);
            alert('Payment Successful!');
            fetchBookings();
        } catch (err) {
            alert('Payment failed: ' + (err.response?.data?.message || err.message));
        }
    };

    if (loading) return (
        <div className="flex justify-center items-center h-screen bg-gray-50/50">
            <div className="w-12 h-12 border-4 border-blue-600/10 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50/50 pb-20">
            <div className="container mx-auto px-6 py-12">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 animate-fade-in">
                    <div>
                        <span className="text-blue-600 font-black text-[10px] uppercase tracking-[0.3em] mb-3 block">Travel History</span>
                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">My <span className="gradient-text">Bookings</span></h1>
                    </div>
                    <p className="text-gray-400 font-bold text-sm">Manage your stays and payments</p>
                </div>

                {bookings.length > 0 ? (
                    <div className="space-y-10">
                        {bookings.map((booking, idx) => (
                            <div key={booking._id} className="bg-white rounded-[3rem] shadow-2xl shadow-blue-900/5 overflow-hidden flex flex-col lg:flex-row border border-gray-100/50 animate-fade-in card-hover" style={{ animationDelay: `${idx * 0.1}s` }}>
                                <div className="lg:w-1/3 bg-gray-100 h-64 lg:h-auto relative group">
                                    {booking.propertyId?.photos?.[0] ? (
                                        <img src={booking.propertyId.photos[0]} alt={booking.propertyId.name} className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 transition-all duration-500" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400 font-black text-[10px] uppercase tracking-widest">Image Unavailable</div>
                                    )}
                                    <div className="absolute top-6 left-6">
                                        <span className="bg-white/90 backdrop-blur-xl text-gray-900 px-4 py-1.5 rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-xl border border-white/20">
                                            {booking.propertyType}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-10 lg:p-12 lg:w-2/3 flex flex-col justify-between">
                                    <div>
                                        <div className="flex flex-wrap justify-between items-start gap-4 mb-6">
                                            <div>
                                                <h2 className="text-3xl font-black text-gray-900 mb-2 truncate max-w-md">{booking.propertyId?.name || 'Archived Stay'}</h2>
                                                <p className="text-gray-400 flex items-center gap-2 text-sm font-bold uppercase tracking-widest">
                                                    <FaCalendarAlt className="text-blue-500" /> Booked On: {new Date(booking.createdAt).toLocaleDateString()}
                                                </p>
                                            </div>
                                            <div className={`px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-lg border ${booking.paymentStatus === 'Paid' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                                                }`}>
                                                {booking.paymentStatus}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-8 p-6 bg-gray-50/50 rounded-[2rem] border border-gray-100/50">
                                            <div>
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Status</p>
                                                <p className="flex items-center gap-1 font-black text-gray-700">
                                                    {booking.status === 'Confirmed' ? <FaCheckCircle className="text-green-500" /> : <FaHourglassHalf className="text-amber-500" />}
                                                    {booking.status}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Monthly Cost</p>
                                                <p className="font-black text-blue-600 flex items-center"><FaRupeeSign size={14} />{booking.propertyId?.price || 0}</p>
                                            </div>
                                            <div className="hidden lg:block">
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Location</p>
                                                <p className="font-bold text-gray-700 truncate">{booking.propertyId?.location || 'N/A'}</p>
                                            </div>
                                            <div className="hidden lg:block">
                                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Booking ID</p>
                                                <p className="font-bold text-gray-400 text-[10px] truncate">#{booking._id.slice(-8).toUpperCase()}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex gap-4">
                                        {booking.paymentStatus === 'Not Paid' && (
                                            <button
                                                onClick={() => handlePayment(booking._id)}
                                                className="bg-blue-600 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition shadow-xl shadow-blue-200"
                                            >
                                                Pay Securely
                                            </button>
                                        )}
                                        <button className="bg-white border-2 border-gray-100 text-gray-400 hover:text-blue-600 hover:border-blue-600 p-4 rounded-2xl transition shadow-sm flex items-center gap-2 font-bold text-xs uppercase tracking-widest">
                                            View Details <FaExternalLinkAlt size={12} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-40 bg-white rounded-[4rem] shadow-sm border-2 border-dashed border-gray-100 animate-fade-in">
                        <div className="text-7xl mb-8">🧳</div>
                        <p className="text-gray-400 text-2xl font-black">Your journey starts here.</p>
                        <p className="text-gray-400 text-sm mt-2 font-bold uppercase tracking-widest opacity-60">You have no active bookings at the moment.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BookingPage;
