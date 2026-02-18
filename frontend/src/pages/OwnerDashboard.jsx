import React, { useState, useEffect } from 'react';
import API from '../api';
import { FaPlus, FaEdit, FaTrash, FaMapMarkerAlt, FaRupeeSign, FaBuilding, FaUserCircle, FaTimes } from 'react-icons/fa';

const OwnerDashboard = () => {
    const [properties, setProperties] = useState({ pgs: [], hostels: [] });
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [currentProp, setCurrentProp] = useState(null);
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        contact: '',
        price: '',
        features: '',
        amenities: '',
        type: 'PG'
    });
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [submitting, setSubmitting] = useState(false);

    const fetchProperties = async () => {
        setLoading(true);
        try {
            const [pgRes, hostelRes] = await Promise.all([
                API.get('/pg'),
                API.get('/hostels')
            ]);
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            setProperties({
                pgs: pgRes.data.filter(p => p.owner?._id === userInfo._id),
                hostels: hostelRes.data.filter(h => h.owner?._id === userInfo._id)
            });
        } catch (err) {
            console.error('Error fetching owner properties', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProperties();
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const newFiles = Array.from(e.target.files);
        const combinedFiles = [...selectedFiles, ...newFiles];

        if (combinedFiles.length > 4) {
            alert("Maximum 4 images allowed");
            return;
        }

        setSelectedFiles(combinedFiles);

        // Generate Previews
        const filePreviews = combinedFiles.map(file => URL.createObjectURL(file));
        setPreviews(filePreviews);
    };

    const resetForm = () => {
        setFormData({ name: '', location: '', contact: '', price: '', features: '', amenities: '', photos: '', type: 'PG' });
        setSelectedFiles([]);
        setPreviews([]);
        setEditMode(false);
        setCurrentProp(null);
    };

    const handleAddClick = () => { resetForm(); setShowModal(true); };

    const handleEditClick = (prop, type) => {
        setFormData({
            ...prop,
            features: prop.features?.join(', ') || '',
            amenities: prop.amenities?.join(', ') || '',
            type: type
        });
        setPreviews(prop.photos || []);
        setCurrentProp(prop);
        setEditMode(true);
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        console.log('Submitting asset...', formData);

        const data = new FormData();
        data.append('name', formData.name);
        data.append('location', formData.location);
        data.append('contact', formData.contact);
        data.append('price', formData.price);
        data.append('type', formData.type);
        data.append('features', formData.features);
        data.append('amenities', formData.amenities);

        selectedFiles.forEach(file => {
            console.log('Appending file:', file.name);
            data.append('photos', file);
        });

        try {
            const endpoint = formData.type === 'PG' ? '/pg' : '/hostels';
            console.log('Target endpoint:', endpoint);

            if (editMode) {
                await API.put(`${endpoint}/${currentProp._id}`, data);
            } else {
                await API.post(endpoint, data);
            }
            console.log('Submission successful!');
            setShowModal(false);
            fetchProperties();
        } catch (err) {
            console.error('Submission error:', err);
            alert('Operation failed: ' + (err.response?.data?.message || err.message));
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id, type) => {
        if (!window.confirm('Confirm permanent deletion?')) return;
        try {
            const endpoint = type === 'PG' ? '/pg' : '/hostels';
            await API.delete(`${endpoint}/${id}`);
            fetchProperties();
        } catch (err) {
            alert('Delete failed');
        }
    };

    const allMyProperties = [...properties.pgs.map(p => ({ ...p, type: 'PG' })), ...properties.hostels.map(h => ({ ...h, type: 'Hostel' }))];

    if (loading) return (
        <div className="flex justify-center items-center h-screen bg-gray-50/50">
            <div className="w-12 h-12 border-4 border-indigo-600/10 border-t-indigo-600 rounded-full animate-spin"></div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50/50 pb-20">
            <div className="container mx-auto px-6 py-12">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 animate-fade-in">
                    <div>
                        <span className="text-indigo-600 font-black text-[10px] uppercase tracking-[0.3em] mb-3 block">Property Management</span>
                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight leading-tight">Elite <span className="gradient-text">Dashboard</span></h1>
                    </div>
                    <button
                        onClick={handleAddClick}
                        className="bg-gray-900 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-3 hover:bg-blue-600 transition-all shadow-2xl shadow-gray-200 transform hover:-translate-y-1"
                    >
                        <FaPlus /> Add New Asset
                    </button>
                </div>

                {allMyProperties.length > 0 ? (
                    <div className="bg-white rounded-[3rem] shadow-2xl shadow-blue-900/5 overflow-hidden border border-gray-100/50 animate-fade-in">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-100">
                                <thead className="bg-gray-50/50">
                                    <tr>
                                        <th className="px-10 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Asset Details</th>
                                        <th className="px-10 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Category</th>
                                        <th className="px-10 py-6 text-left text-[10px] font-black text-gray-400 uppercase tracking-widest">Monthly Yield</th>
                                        <th className="px-10 py-6 text-right text-[10px] font-black text-gray-400 uppercase tracking-widest">Control Center</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-50">
                                    {allMyProperties.map((prop, idx) => (
                                        <tr key={prop._id} className="hover:bg-blue-50/30 transition-colors group">
                                            <td className="px-10 py-8 whitespace-nowrap">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-gray-100 rounded-2xl flex items-center justify-center text-gray-400 group-hover:bg-blue-600 group-hover:text-white transition-all overflow-hidden">
                                                        {prop.photos && prop.photos.length > 0 ? (
                                                            <img src={prop.photos[0]} alt={prop.name} className="w-full h-full object-cover" />
                                                        ) : (
                                                            <FaBuilding />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <div className="text-lg font-black text-gray-900 leading-tight">{prop.name}</div>
                                                        <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1 mt-1">
                                                            <FaMapMarkerAlt className="text-red-400" /> {prop.location}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-10 py-8 whitespace-nowrap">
                                                <span className="bg-gray-100 text-gray-500 px-4 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-widest border border-gray-200 group-hover:bg-white group-hover:text-blue-600 group-hover:border-blue-100 transition-all">
                                                    {prop.type}
                                                </span>
                                            </td>
                                            <td className="px-10 py-8 whitespace-nowrap text-blue-600 font-black text-xl tracking-tighter">
                                                <FaRupeeSign size={14} className="inline mb-1 pr-0.5" />{prop.price}
                                            </td>
                                            <td className="px-10 py-8 whitespace-nowrap text-right">
                                                <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <button onClick={() => handleEditClick(prop, prop.type)} className="w-10 h-10 border-2 border-gray-100 text-gray-400 hover:text-blue-600 hover:border-blue-600 flex items-center justify-center rounded-xl transition-all shadow-sm">
                                                        <FaEdit size={14} />
                                                    </button>
                                                    <button onClick={() => handleDelete(prop._id, prop.type)} className="w-10 h-10 border-2 border-gray-100 text-gray-400 hover:text-red-600 hover:border-red-600 flex items-center justify-center rounded-xl transition-all shadow-sm">
                                                        <FaTrash size={14} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                ) : (
                    <div className="text-center py-40 bg-white rounded-[4rem] shadow-sm border-2 border-dashed border-gray-100 animate-fade-in">
                        <div className="text-7xl mb-8">🏗️</div>
                        <p className="text-gray-400 text-2xl font-black">Ready to scale your portfolio?</p>
                        <p className="text-gray-400 text-sm mt-2 font-bold uppercase tracking-widest opacity-60">Add your first property to begin managing your assets.</p>
                        <button onClick={handleAddClick} className="mt-10 btn-premium text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-2xl shadow-blue-100">Initialize Asset</button>
                    </div>
                )}

                {/* Modern Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-md flex items-center justify-center p-6 z-[100] animate-fade-in overflow-y-auto">
                        <div className="bg-white rounded-[3rem] p-10 lg:p-12 max-w-3xl w-full my-8 relative shadow-2xl shadow-black/20">
                            <button onClick={() => setShowModal(false)} className="absolute top-8 right-8 text-gray-300 hover:text-red-500 transition-colors">
                                <FaTimes size={24} />
                            </button>

                            <h2 className="text-3xl font-black text-gray-900 mb-8 tracking-tight">
                                {editMode ? 'Edit Asset Parameters' : 'Register New Asset'}
                            </h2>

                            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                                <div className="space-y-1 col-span-2 lg:col-span-1">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Display Name</label>
                                    <input name="name" required className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:bg-white p-4 rounded-2xl outline-none font-bold text-gray-900 transition-all" value={formData.name} onChange={handleChange} />
                                </div>
                                <div className="space-y-1 col-span-2 lg:col-span-1">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Category Selection</label>
                                    <select name="type" className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:bg-white p-4 rounded-2xl outline-none font-bold text-gray-900 appearance-none cursor-pointer" value={formData.type} onChange={handleChange} disabled={editMode}>
                                        <option value="PG">Private PG</option>
                                        <option value="Hostel">Community Hostel</option>
                                    </select>
                                </div>
                                <div className="space-y-1 col-span-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Precise Location</label>
                                    <input name="location" required className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:bg-white p-4 rounded-2xl outline-none font-bold text-gray-900 transition-all" value={formData.location} onChange={handleChange} />
                                </div>
                                <div className="space-y-1 col-span-2 lg:col-span-1">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Support Contact</label>
                                    <input name="contact" required className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:bg-white p-4 rounded-2xl outline-none font-bold text-gray-900 transition-all" value={formData.contact} onChange={handleChange} />
                                </div>
                                <div className="space-y-1 col-span-2 lg:col-span-1">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Market Yield (₹/mo)</label>
                                    <input name="price" type="number" required className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:bg-white p-4 rounded-2xl outline-none font-bold text-gray-900 transition-all" value={formData.price} onChange={handleChange} />
                                </div>
                                <div className="space-y-1 col-span-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Key Amenities (Comma Separated)</label>
                                    <input name="amenities" placeholder="Wifi, Security, Catering, AC" className="w-full bg-gray-50 border-2 border-transparent focus:border-blue-500 focus:bg-white p-4 rounded-2xl outline-none font-bold text-gray-900 transition-all" value={formData.amenities} onChange={handleChange} />
                                </div>
                                <div className="space-y-1 col-span-2">
                                    <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-2">Visual Portfolio (Max 4 images)</label>
                                    <div className="flex flex-wrap gap-4 mb-4">
                                        {previews.map((url, i) => (
                                            <div key={i} className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-gray-100 shadow-sm animate-fade-in">
                                                <img src={url} alt="preview" className="w-full h-full object-cover" />
                                            </div>
                                        ))}
                                        {previews.length < 4 && (
                                            <label className="w-24 h-24 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400 hover:border-blue-500 hover:text-blue-500 transition-all cursor-pointer bg-gray-50">
                                                <FaPlus size={20} />
                                                <span className="text-[8px] font-black uppercase tracking-widest mt-2">Add</span>
                                                <input type="file" multiple accept="image/*" className="hidden" onChange={handleFileChange} />
                                            </label>
                                        )}
                                    </div>
                                </div>
                                <div className="col-span-2 flex justify-end gap-3 mt-10">
                                    <button type="button" onClick={() => setShowModal(false)} className="px-10 py-4 text-gray-400 font-black text-[10px] uppercase tracking-widest hover:text-red-500 transition-colors">Discard</button>
                                    <button
                                        type="submit"
                                        disabled={submitting}
                                        className={`px-10 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-2xl transition-all ${submitting ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'btn-premium text-white shadow-blue-100'}`}
                                    >
                                        {submitting ? 'Securing Asset...' : (editMode ? 'Update Asset' : 'Commit Asset')}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OwnerDashboard;
