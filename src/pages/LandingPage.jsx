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
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 overflow-hidden bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-gray-900 leading-[1.1] tracking-tight animate-slide-up">
                        Trusted Home Services at Your<br />
                        <span className="wavy-underline text-blue-600">Doorstep</span> Across India
                    </h1>

                    <p className="mt-8 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed animate-fade-in font-medium">
                        Whether you need a plumber, electrician, carpenter, or home cleaner, GharSeva connects your family with verified professionals — fast, safe, and affordable.
                    </p>

                    <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
                        <Link
                            id="hero-get-started"
                            to="/register"
                            className="inline-flex items-center justify-center gap-2 bg-gray-900 text-white hover:bg-black font-bold px-8 py-4 rounded-full text-lg transition-all duration-200 shadow-md hover:shadow-xl hover:-translate-y-0.5"
                        >
                            Book a Service — It's Free
                        </Link>
                        <Link
                            to="/dashboard/jobs"
                            className="inline-flex items-center justify-center gap-2 border border-gray-200 text-gray-700 hover:bg-gray-50 font-semibold px-8 py-4 rounded-full text-lg transition-all duration-200 group"
                        >
                            <span className="w-6 h-6 rounded-full border border-blue-600 flex items-center justify-center text-[10px] text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">▶</span>
                            Browse Services
                        </Link>
                    </div>

                    {/* Trusted By / Stats */}
                    <div className="mt-24">
                        <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mb-10">Trusted by thousands of families so far</p>
                        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                            {STATS.map(stat => (
                                <div key={stat.label} className="flex flex-col items-center">
                                    <div className="text-2xl font-black text-gray-900">{stat.value}</div>
                                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>


            {/* Features Section */}
            <section id="features" className="py-24 bg-white border-y border-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 tracking-tight">Everything You Need at Home</h2>
                        <p className="text-gray-500 mt-4 max-w-xl mx-auto text-lg leading-relaxed">Reliable, affordable, and professional home services all in one trusted platform.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {FEATURES.map(f => (
                            <div
                                key={f.id}
                                id={`feature-${f.id}`}
                                className="group p-8 rounded-3xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-all duration-300"
                            >
                                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${f.color} flex items-center justify-center text-xl mb-6 shadow-sm group-hover:scale-110 transition-transform`}>
                                    {f.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">{f.title}</h3>
                                <p className="text-gray-500 leading-relaxed text-sm">{f.desc}</p>
                                <div className="mt-6 pt-6 border-t border-gray-100">
                                    <Link to="/register" className="text-blue-600 font-bold text-sm hover:text-blue-700 transition-colors inline-flex items-center gap-1 group/link">
                                        Explore features <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-gray-900 tracking-tight">Simple Process</h2>
                        <p className="text-gray-500 mt-4 max-w-xl mx-auto text-lg leading-relaxed">Get your home service done in 3 simple steps — no hassle, no waiting.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
                        {STEPS.map((s, i) => (
                            <div key={s.step} className="relative group">
                                <div className="text-[120px] font-bold text-gray-50 absolute -top-20 -left-4 select-none group-hover:text-blue-50 transition-colors duration-500">{s.step}</div>
                                <div className="relative z-10">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{s.title}</h3>
                                    <p className="text-gray-500 leading-relaxed">{s.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-20">
                        <Link to="/register" className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-10 py-5 rounded-full inline-flex items-center gap-2 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all group">
                            Book Your First Service 
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </Link>
                    </div>
                </div>
            </section>

            {/* CTA Banner */}
            <section className="py-24 bg-blue-600">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-4xl font-bold text-white mb-6 tracking-tight">
                        Ready to Book a Home Service?
                    </h2>
                    <p className="text-blue-100 text-lg mb-10 leading-relaxed max-w-2xl mx-auto">
                        Join 2 million+ Indian families already trusting GharSeva for all their home needs.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link to="/register" className="inline-block bg-white text-blue-600 font-bold px-10 py-4 rounded-full hover:bg-gray-50 transition-all duration-200 shadow-xl hover:-translate-y-1">
                            Create Free Account
                        </Link>
                        <Link to="/dashboard/jobs" className="inline-block border-2 border-white/30 text-white font-bold px-10 py-4 rounded-full hover:bg-white/10 transition-all duration-200">
                            Browse Services
                        </Link>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    )
}
