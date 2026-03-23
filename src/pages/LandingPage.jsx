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
            <section className="relative pt-20 pb-16 overflow-hidden bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
                    <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight leading-[1.1] max-w-4xl mx-auto animate-slide-up">
                        Trusted <span className="relative inline-block">
                            <span className="relative z-10 text-blue-600">home services</span>
                            <svg className="absolute -bottom-2 left-0 w-full h-3 text-blue-200/60 z-0" viewBox="0 0 100 10" preserveAspectRatio="none">
                                <path d="M0 5 Q 25 0, 50 5 T 100 5" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                            </svg>
                        </span> at your doorstep.
                    </h1>

                    <p className="mt-8 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed animate-fade-in font-medium">
                        Whether you need a plumber, electrician, carpenter, or home cleaner, GharSeva connects your family with verified professionals — fast, safe, and affordable.
                    </p>

                    <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up">
                        <Link
                            id="hero-get-started"
                            to="/register"
                            className="bg-gray-900 hover:bg-gray-800 text-white font-bold px-8 py-3.5 rounded-full text-sm transition-all duration-200 shadow-lg"
                        >
                            Book a Service
                        </Link>
                        <Link
                            to="/dashboard/jobs"
                            className="flex items-center gap-2 text-sm font-bold text-gray-700 hover:text-gray-900 transition-colors px-6 py-3 border border-gray-200 rounded-full bg-white"
                        >
                            <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center text-[10px] text-white pl-0.5">▶</div>
                            Browse Services
                        </Link>
                    </div>

                    {/* Logo Cloud */}
                    <div className="mt-24">
                        <p className="text-sm font-semibold text-gray-900 tracking-wide uppercase">Trusted by 50,000+ happy families across India</p>
                        <div className="mt-10 flex flex-wrap justify-center items-center gap-x-12 gap-y-8 opacity-40 grayscale transition-all duration-500 hover:grayscale-0 hover:opacity-100">
                            {[
                                { name: 'Transistor', icon: '⧬' },
                                { name: 'Tuple', icon: '■' },
                                { name: 'StaticKit', icon: '⚡' },
                                { name: 'Mirage', icon: '◎' },
                                { name: 'Laravel', icon: '◇' },
                                { name: 'Statamic', icon: '▣' },
                            ].map(logo => (
                                <div key={logo.name} className="flex items-center gap-2">
                                    <span className="text-2xl font-bold">{logo.icon}</span>
                                    <span className="text-xl font-bold tracking-tighter">{logo.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section id="features" className="py-24 bg-white border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-2xl text-left mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Professional home services at your command.</h2>
                        <p className="text-lg text-gray-600 mt-4 leading-relaxed">GharSeva is built for busy families who want reliable, high-quality maintenance and cleaning services without the hassle.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {FEATURES.map(f => (
                            <div key={f.id} className="relative group">
                                <div className="text-3xl mb-4 opacity-80 group-hover:scale-110 transition-transform duration-300">{f.icon}</div>
                                <h3 className="text-lg font-bold text-gray-900 mb-3">{f.title}</h3>
                                <p className="text-gray-600 text-sm leading-relaxed">{f.desc}</p>
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
                    <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">Complete your booking in seconds.</h2>
                    <p className="text-blue-100 mb-16 max-w-xl mx-auto">Three simple steps to a better home.</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {STEPS.map((s, i) => (
                            <div key={s.step} className="bg-white/10 backdrop-blur-sm p-8 rounded-3xl border border-white/10 text-left hover:bg-white/20 transition-all duration-300">
                                <div className="text-blue-200 font-bold mb-4 opacity-60">Step {s.step}</div>
                                <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
                                <p className="text-blue-50 text-sm leading-relaxed">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Banner */}
            <section className="py-24 bg-white text-center">
                <div className="max-w-4xl mx-auto px-4">
                    <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight mb-4">
                        Ready to book your service?
                    </h2>
                    <p className="text-lg text-gray-600 mb-10 max-w-xl mx-auto">
                        Join 2 million+ families already trusting GharSeva for all their home needs. Fast, safe, and professional.
                    </p>
                    <Link 
                        to="/register" 
                        className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold px-10 py-4 rounded-full transition-all duration-200 shadow-xl hover:shadow-2xl hover:-translate-y-1"
                    >
                        Book Your First Service
                    </Link>
                </div>
            </section>

            <Footer />
        </div>
    )
}
