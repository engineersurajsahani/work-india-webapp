export default function Footer() {
    return (
        <footer className="bg-gray-50 border-t border-gray-100 text-gray-600">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                                <span className="text-white font-bold text-xs">W</span>
                            </div>
                            <span className="text-xl font-bold text-gray-900 tracking-tight">GharSeva</span>
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                            Connecting Indian households with trusted, verified service professionals. Your comfort is our priority.
                        </p>
                        <div className="flex gap-4 mt-8">
                            {['LinkedIn', 'Twitter', 'Instagram'].map(s => (
                                <button
                                    key={s}
                                    className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:bg-white hover:border-blue-600 hover:text-blue-600 transition-all duration-200 text-xs font-semibold"
                                >
                                    {s[0]}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-gray-900 font-bold mb-6 text-sm uppercase tracking-wider">Quick Links</h4>
                        <ul className="space-y-4 text-sm font-medium">
                            {['Our Services', 'Book a Professional', 'Service Areas', 'Customer Reviews'].map(item => (
                                <li key={item}>
                                    <a href="#" className="hover:text-blue-600 transition-colors duration-200">{item}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="text-gray-900 font-bold mb-6 text-sm uppercase tracking-wider">Support</h4>
                        <ul className="space-y-4 text-sm font-medium">
                            {['Help Center', 'Privacy Policy', 'Terms of Use', 'Contact Us'].map(item => (
                                <li key={item}>
                                    <a href="#" className="hover:text-blue-600 transition-colors duration-200">{item}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-200 mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-gray-400 uppercase tracking-widest">
                    <p>© 2026 GharSeva. All rights reserved.</p>
                    <p>Made with ❤️ for Indian households</p>
                </div>
            </div>
        </footer>
    )
}
