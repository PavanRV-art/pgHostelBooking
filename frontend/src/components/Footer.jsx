import React from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaLinkedin, FaTwitter, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-gray-300 pt-20 pb-10 border-t border-gray-800">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Section */}
                    <div className="space-y-6">
                        <Link to="/" className="text-2xl font-black text-white tracking-tighter flex items-center gap-2">
                            StayBanglore<span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                        </Link>
                        <p className="text-sm leading-relaxed text-gray-400">
                            The ultimate destination for premium urban living. We curate high-end PGs and community-driven hostels designed for the modern professional and student.
                        </p>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                                <FaInstagram size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                                <FaLinkedin size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all">
                                <FaTwitter size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Platform Links */}
                    <div className="space-y-6">
                        <h4 className="text-white font-black text-xs uppercase tracking-[0.2em]">Platform</h4>
                        <ul className="space-y-4 text-sm font-bold">
                            <li><Link to="/pg" className="hover:text-blue-500 transition-colors">Private PGs</Link></li>
                            <li><Link to="/hostels" className="hover:text-blue-500 transition-colors">Community Hostels</Link></li>
                            <li><Link to="/dashboard" className="hover:text-blue-500 transition-colors">Elite Dashboard</Link></li>
                            <li><Link to="/bookings" className="hover:text-blue-500 transition-colors">My Bookings</Link></li>
                        </ul>
                    </div>

                    {/* Support Links */}
                    <div className="space-y-6">
                        <h4 className="text-white font-black text-xs uppercase tracking-[0.2em]">Resources</h4>
                        <ul className="space-y-4 text-sm font-bold">
                            <li><a href="#" className="hover:text-blue-500 transition-colors">Help Center</a></li>
                            <li><a href="#" className="hover:text-blue-500 transition-colors">Safety Guidelines</a></li>
                            <li><a href="#" className="hover:text-blue-500 transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-blue-500 transition-colors">Terms of Service</a></li>
                        </ul>
                    </div>

                    {/* Contact Section */}
                    <div className="space-y-6">
                        <h4 className="text-white font-black text-xs uppercase tracking-[0.2em]">Headquarters</h4>
                        <ul className="space-y-4 text-sm font-bold">
                            <li className="flex items-start gap-3">
                                <FaMapMarkerAlt className="text-blue-500 mt-1 shrink-0" />
                                <span className="text-gray-400">Indiranagar, 100 Feet Rd <br /> Bangalore, KA 560038</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <FaEnvelope className="text-blue-500 shrink-0" />
                                <span className="text-gray-400">concierge@staybanglore.com</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <FaPhoneAlt className="text-blue-500 shrink-0" />
                                <span className="text-gray-400">+91 80 4567 8900</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-10 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                        &copy; {new Date().getFullYear()} StayBanglore Digital Assets. All rights reserved.
                    </p>
                    <div className="flex gap-8 text-[10px] font-black uppercase tracking-widest text-gray-500">
                        <a href="#" className="hover:text-white transition-colors underline underline-offset-4 decoration-blue-600/30">Privacy</a>
                        <a href="#" className="hover:text-white transition-colors underline underline-offset-4 decoration-blue-600/30">Terms</a>
                        <a href="#" className="hover:text-white transition-colors underline underline-offset-4 decoration-blue-600/30">Access</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
