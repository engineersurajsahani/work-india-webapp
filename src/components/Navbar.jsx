import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const NAV_LINKS = [
    { label: 'Home', href: '/' },
    { label: 'Our Services', href: '/dashboard/jobs' },
]

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [user, setUser] = useState({ name: '', phone: '' })
    const navigate = useNavigate()

    useEffect(() => {
        const checkAuth = () => {
            const userName = localStorage.getItem('userName')
            const userPhone = localStorage.getItem('userPhone')
            if (userName && userPhone) {
                setIsLoggedIn(true)
                setUser({ name: userName, phone: userPhone })
            } else {
                setIsLoggedIn(false)
            }
        }
        checkAuth()
        window.addEventListener('storage', checkAuth)
        return () => window.removeEventListener('storage', checkAuth)
    }, [])

    const handleLogoClick = () => {
        if (isLoggedIn) navigate('/dashboard')
        else navigate('/')
    }

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo & Links Group */}
                    <div className="flex items-center gap-10">
                        <Link to="/" onClick={handleLogoClick} className="flex items-center gap-2 group">
                            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200">
                                <span className="text-white font-bold text-base">W</span>
                            </div>
                            <span className="text-2xl font-bold text-gray-900 tracking-tight">WorkIndia</span>
                        </Link>

                        {/* Desktop Nav Links */}
                        <div className="hidden md:flex items-center gap-8">
                            {NAV_LINKS.map(link => (
                                <Link
                                    key={link.label}
                                    to={link.href}
                                    className="text-base text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Auth Group */}
                    <div className="hidden md:flex items-center gap-6">
                        {!isLoggedIn ? (
                            <>
                                <Link to="/login" className="text-base text-gray-600 hover:text-gray-900 font-medium transition-colors">
                                    Sign in
                                </Link>
                                <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold px-6 py-2.5 rounded-full transition-all duration-200 shadow-sm hover:shadow-md">
                                    Register
                                </Link>
                            </>
                        ) : (
                            <Link to="/dashboard/profile" className="group relative flex items-center gap-3">
                                <div className="absolute right-full mr-4 px-3 py-1.5 bg-gray-900 text-white text-xs font-bold rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap translate-x-2 group-hover:translate-x-0">
                                    Logged in as {user.name}
                                    <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45" />
                                </div>
                                <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-md border-2 border-white ring-2 ring-blue-50 hover:scale-105 transition-transform">
                                    {user.name.charAt(0).toUpperCase()}
                                </div>
                            </Link>
                        )}
                    </div>

                    {/* Mobile Hamburger */}
                    <button
                        id="mobile-menu-btn"
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        aria-label="Toggle menu"
                    >
                        <div className={`w-6 h-0.5 bg-gray-700 mb-1.5 transition-all ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                        <div className={`w-6 h-0.5 bg-gray-700 mb-1.5 transition-all ${menuOpen ? 'opacity-0' : ''}`} />
                        <div className={`w-6 h-0.5 bg-gray-700 transition-all ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                    </button>
                </div>

                {/* Mobile Menu */}
                {menuOpen && (
                    <div className="md:hidden py-6 border-t border-gray-100 animate-fade-in">
                        {NAV_LINKS.map(link => (
                            <Link
                                key={link.label}
                                to={link.href}
                                className="block py-3 text-gray-700 hover:text-blue-600 font-semibold text-lg"
                                onClick={() => setMenuOpen(false)}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <div className="flex flex-col gap-4 mt-6">
                            {!isLoggedIn ? (
                                <>
                                    <Link to="/login" className="py-3 px-4 text-center font-bold text-gray-700 bg-gray-100 rounded-xl" onClick={() => setMenuOpen(false)}>
                                        Sign In
                                    </Link>
                                    <Link to="/register" className="py-3 px-4 text-center font-bold text-white bg-blue-600 rounded-xl" onClick={() => setMenuOpen(false)}>
                                        Register
                                    </Link>
                                </>
                            ) : (
                                <Link to="/dashboard" className="py-3 px-4 text-center font-bold text-white bg-blue-600 rounded-xl" onClick={() => setMenuOpen(false)}>
                                    Go to Dashboard ({user.name})
                                </Link>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    )
}
