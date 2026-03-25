import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const FEATURES = [
    {
        id: 'find-jobs',
        icon: '🔧',
        title: 'Book a Service',
        desc: 'Choose from trusted plumbers, electricians, carpenters, painters, AC repair, and home cleaning services near your area.',
        color: 'from-primary-400 to-primary-600',
    },
    {
        id: 'post-jobs',
        icon: '🏠',
        title: 'Verified Professionals',
        desc: 'All our service providers are background-checked, trained, and rated by real customers across India.',
        color: 'from-primary-300 to-accent-600',
    },
    {
        id: 'ai-assistant',
        icon: '⭐',
        title: 'Smart Booking Assistant',
        desc: 'Get instant service recommendations, fair price estimates, and slot bookings powered by our smart assistant.',
        color: 'from-accent-400 to-primary-700',
    },
]

const STEPS = [
    { step: '01', title: 'Choose Your Service', desc: 'Select the service you need — plumber, electrician, carpenter, painter, AC repair, or home cleaning.' },
    { step: '02', title: 'Pick a Time Slot', desc: 'Choose a convenient date and time. Our professionals arrive on schedule, right at your doorstep.' },
    { step: '03', title: 'Relax & Get It Done', desc: 'Sit back while our verified expert handles the job. Pay only after you are fully satisfied.' },
]

const STATS = [
    { value: '50K+', label: 'Services Done' },
    { value: '2M+', label: 'Happy Families' },
    { value: '10K+', label: 'Verified Experts' },
    { value: '98%', label: 'Satisfaction Rate' },
]

export default function LandingPage() {
    const [isLoggedIn, setIsLoggedIn] = useState(false)

    useEffect(() => {
        const userName = localStorage.getItem('userName')
        const userPhone = localStorage.getItem('userPhone')
        if (userName && userPhone) {
            setIsLoggedIn(true)
        }
    }, [])

    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-24 pb-12 overflow-hidden bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-16 text-center">
                    <h1 className="text-6xl md:text-8xl font-extrabold text-gray-900 tracking-tight leading-[1.05] max-w-5xl mx-auto animate-slide-up">
                        Trusted <span className="relative inline-block">
                            <span className="relative z-10 text-blue-600">home services</span>
                            <svg className="absolute -bottom-2 left-0 w-full h-4 text-blue-200/60 z-0" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 25 0, 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                            </svg>
                        </span> at your doorstep.
                    </h1>

                    <p className="mt-12 text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-fade-in font-medium">
                        Whether you need a plumber, electrician, carpenter, or home cleaner, WorkIndia connects your family with verified professionals — fast, safe, and affordable.
                    </p>

                    <div className="mt-14 flex flex-col sm:flex-row gap-6 justify-center items-center animate-slide-up">
                        {!isLoggedIn ? (
                            <>
                                <Link
                                    id="hero-get-started"
                                    to="/login"
                                    className="bg-gray-900 hover:bg-gray-800 text-white font-bold px-12 py-5 rounded-full text-lg transition-all duration-200 shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    to="/register"
                                    className="flex items-center gap-3 text-lg font-bold text-gray-700 hover:text-gray-900 transition-all px-12 py-5 border border-gray-200 rounded-full bg-white shadow-md hover:shadow-lg hover:-translate-y-0.5"
                                >
                                    Register
                                </Link>
                            </>
                        ) : (
                            <Link
                                to="/dashboard"
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-14 py-5 rounded-full text-xl transition-all duration-200 shadow-2xl hover:-translate-y-1 flex items-center gap-4 group"
                            >
                                Continue to Dashboard
                                <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                            </Link>
                        )}
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="pt-12 pb-28 bg-white border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-3xl text-left mb-20">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight leading-tight">Professional home services at your command.</h2>
                        <p className="text-xl text-gray-600 mt-6 leading-relaxed">WorkIndia is built for busy families who want reliable, high-quality maintenance and cleaning services without the hassle.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                        {FEATURES.map(f => (
                            <div key={f.id} className="relative group">
                                <div className="text-5xl mb-6 opacity-80 group-hover:scale-110 transition-transform duration-300 transform-gpu">{f.icon}</div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">{f.title}</h3>
                                <p className="text-gray-600 text-base md:text-lg leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-24 bg-blue-600 overflow-hidden relative">
                {/* Decorative background circle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500 rounded-full blur-3xl opacity-20 pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-6">Complete your booking in seconds.</h2>
                    <p className="text-xl text-blue-100 mb-20 max-w-2xl mx-auto">Three simple steps to a better home.</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {STEPS.map((s, i) => (
                            <div key={s.step} className="bg-white/10 backdrop-blur-sm p-10 rounded-3xl border border-white/10 text-left hover:bg-white/20 transition-all duration-300">
                                <div className="text-blue-200 font-bold mb-6 opacity-60 text-lg">Step {s.step}</div>
                                <h3 className="text-2xl font-bold text-white mb-4">{s.title}</h3>
                                <p className="text-blue-50 text-base md:text-lg leading-relaxed">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Banner */}
            <section className="py-32 bg-white text-center">
                <div className="max-w-5xl mx-auto px-4">
                    <h2 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-6 leading-tight">
                        Ready to book your service?
                    </h2>
                    <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                        Join 2 million+ families already trusting WorkIndia for all their home needs. Fast, safe, and professional.
                    </p>
                    <Link 
                        to="/register" 
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold px-14 py-5 rounded-full text-xl transition-all duration-200 shadow-2xl hover:-translate-y-1"
                    >
                        Book Your First Service
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    )
}
