import { Link } from 'react-router-dom';
import { FaMapMarkerAlt, FaRupeeSign, FaStar } from 'react-icons/fa';

const PropertyCard = ({ property, type }) => {
    return (
        <div className="bg-white rounded-[2rem] shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden group border border-gray-100/50 card-hover">
            <div className="h-64 bg-gray-100 relative overflow-hidden">
                {property.photos && property.photos.length > 0 ? (
                    <img
                        src={property.photos[0]}
                        alt={property.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400 font-bold uppercase tracking-widest text-xs">No Image Available</div>
                )}
                <div className="absolute top-4 left-4 z-10">
                    <span className="bg-white/90 backdrop-blur-md text-gray-900 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl border border-white/20">
                        {type}
                    </span>
                </div>
                <div className="absolute top-4 right-4 z-10">
                    <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1 shadow-lg">
                        <FaStar size={10} /> 4.8
                    </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            <div className="p-8">
                <div className="flex justify-between items-start mb-3">
                    <h3 className="text-xl font-extrabold text-gray-900 truncate pr-2 group-hover:text-blue-600 transition-colors">{property.name}</h3>
                </div>

                <p className="text-gray-500 flex items-center gap-2 mb-6 text-sm font-medium">
                    <FaMapMarkerAlt className="text-red-400" /> {property.location}
                </p>

                <div className="flex flex-wrap gap-2 mb-8">
                    {property.amenities?.slice(0, 3).map((amenity, index) => (
                        <div key={index} className="bg-gray-50 text-gray-600 px-3 py-1.5 rounded-xl text-[11px] font-bold border border-gray-100 group-hover:bg-blue-50 group-hover:text-blue-600 group-hover:border-blue-100 transition-colors">
                            {amenity}
                        </div>
                    ))}
                    {property.amenities?.length > 3 && (
                        <div className="text-[11px] font-bold text-gray-400 pt-1">+{property.amenities.length - 3} more</div>
                    )}
                </div>

                <div className="flex justify-between items-center bg-gray-50/50 p-4 rounded-2xl group-hover:bg-blue-50/50 transition-colors">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Pricing</span>
                        <div className="text-blue-600 font-extrabold text-2xl flex items-center tracking-tighter">
                            <FaRupeeSign size={18} /> {property.price}<span className="text-xs text-blue-400 font-bold ml-1">/mo</span>
                        </div>
                    </div>
                    <Link
                        to={`/${type.toLowerCase() === 'pg' ? 'pg' : 'hostels'}/${property._id}`}
                        className="bg-gray-900 text-white w-12 h-12 flex items-center justify-center rounded-2xl hover:bg-blue-600 transition-all duration-300 shadow-xl shadow-gray-200"
                    >
                        <FaArrowRight />
                    </Link>
                </div>
            </div>
        </div>
    );
};

// Re-importing missing icons
import { FaArrowRight } from 'react-icons/fa';

export default PropertyCard;
