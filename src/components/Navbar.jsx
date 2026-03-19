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
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shadow-sm">
                            <span className="text-white font-bold text-xs">W</span>
                        </div>
                        <span className="text-xl font-bold text-gray-900">GharSeva</span>
                    </Link>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center gap-10">
                        {NAV_LINKS.map(link => (
                            <Link
                                key={link.label}
                                to={link.href}
                                className="text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden md:flex items-center gap-6">
                        <Link to="/login" className="text-sm font-medium text-gray-700 hover:text-gray-900">
                            Sign in
                        </Link>
                        <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-2.5 rounded-full shadow-sm hover:shadow transition-all">
                            Get started today
                        </Link>
                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        id="mobile-menu-btn"
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-gray-50 transition-colors"
                        aria-label="Toggle menu"
                    >
                        <div className={`w-5 h-0.5 bg-gray-600 mb-1 transition-all ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
                        <div className={`w-5 h-0.5 bg-gray-600 mb-1 transition-all ${menuOpen ? 'opacity-0' : ''}`} />
                        <div className={`w-5 h-0.5 bg-gray-600 transition-all ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
                    </button>
                </div>

                {/* Mobile Menu */}
                {menuOpen && (
                    <div className="md:hidden py-6 border-t border-gray-100 animate-fade-in">
                        {NAV_LINKS.map(link => (
                            <Link
                                key={link.label}
                                to={link.href}
                                className="block py-3 text-gray-600 hover:text-gray-900 font-medium"
                                onClick={() => setMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="flex flex-col gap-3 mt-6">
                            <Link to="/login" className="w-full text-center py-3 text-gray-700 font-medium border border-gray-200 rounded-xl" onClick={() => setMenuOpen(false)}>
                                Sign in
                            </Link>
                            <Link to="/register" className="w-full text-center py-3 bg-blue-600 text-white font-semibold rounded-xl" onClick={() => setMenuOpen(false)}>
                                Get started today
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}
