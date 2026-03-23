import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const NAV_LINKS = [
    { label: 'Home', href: '/' },
    { label: 'Our Services', href: '/dashboard/jobs' },
]

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)
    const navigate = useNavigate()

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo & Links Group */}
                    <div className="flex items-center gap-10">
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200">
                                <span className="text-white font-bold text-sm">G</span>
                            </div>
                            <span className="text-xl font-bold text-gray-900 tracking-tight">GharSeva</span>
                        </Link>

                        {/* Desktop Nav Links */}
                        <div className="hidden md:flex items-center gap-8">
                            {NAV_LINKS.map(link => (
                                <Link
                                    key={link.label}
                                    to={link.href}
                                    className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link to="/login" className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors">
                            Sign in
                        </Link>
                        <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-full transition-all duration-200 shadow-sm hover:shadow-md">
                            Book a Service
                        </Link>
                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        id="mobile-menu-btn"
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        aria-label="Toggle menu"
                    >
                        <div className={`w-5 h-0.5 bg-gray-700 mb-1 transition-all ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                        <div className={`w-5 h-0.5 bg-gray-700 mb-1 transition-all ${menuOpen ? 'opacity-0' : ''}`} />
                        <div className={`w-5 h-0.5 bg-gray-700 transition-all ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
                    </button>
                </div>

                {/* Mobile Menu */}
                {menuOpen && (
                    <div className="md:hidden py-4 border-t border-gray-100 animate-fade-in">
                        {NAV_LINKS.map(link => (
                            <Link
                                key={link.label}
                                to={link.href}
                                className="block py-2 text-gray-600 hover:text-primary-600 font-medium"
                                onClick={() => setMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="flex gap-3 mt-4">
                            <Link to="/login" className="btn-secondary py-2 px-4 text-sm flex-1 text-center" onClick={() => setMenuOpen(false)}>
                                Login
                            </Link>
                            <Link to="/register" className="btn-primary py-2 px-4 text-sm flex-1 text-center" onClick={() => setMenuOpen(false)}>
                                Register
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}
