import { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function RegisterPage() {
    const navigate = useNavigate()
    const [form, setForm] = useState({
        fullName: '',
        phone: '',
        password: '',
        role: 'jobseeker', // default role
    })
    const [errors, setErrors] = useState({})
    const [loading, setLoading] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [showChatbot, setShowChatbot] = useState(false)
    const [chatbotStep, setChatbotStep] = useState(0)
    const [messages, setMessages] = useState([])
    const [chatInput, setChatInput] = useState('')
    const chatEndRef = useRef(null)

    const steps = [
        { field: 'fullName', question: "Hi! I'm your WorkIndia assistant. Let's get you registered. What's your **Full Name**?", placeholder: 'Enter your name...' },
        { field: 'phone', question: "Great! And what's your **Phone Number**?", placeholder: '10-digit mobile number...' },
        { field: 'role', question: "Are you here to **Hire** someone or **Find Work**? (Type 'Job Provider' or 'Job Seeker')", placeholder: "Type 'Job Provider' or 'Job Seeker'..." },
        { field: 'password', question: "Finally, set a **4-digit numeric PIN** as your password (digits only, e.g. 1234).", placeholder: 'Enter your 4 digit PIN...', type: 'password' },
    ]

    useEffect(() => {
        if (showChatbot && messages.length === 0) {
            setMessages([{ role: 'bot', text: steps[0].question }])
        }
    }, [showChatbot])

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages])

    const handleChatSubmit = (e) => {
        e.preventDefault()
        if (!chatInput.trim()) return

        const currentStep = steps[chatbotStep]
        const userInput = chatInput.trim()

        // Special handling for role selection in chat
        let val = userInput
        if (currentStep.field === 'role') {
            if (userInput.toLowerCase().includes('provider')) val = 'provider'
            else if (userInput.toLowerCase().includes('seeker')) val = 'jobseeker'
        }

        // Update form state
        setForm(prev => ({ ...prev, [currentStep.field]: val }))

        // Update messages
        const newMessages = [...messages, { role: 'user', text: userInput }]
        setMessages(newMessages)
        setChatInput('')

        // Move to next step or finish
        let nextStepIdx = chatbotStep + 1

        if (nextStepIdx < steps.length) {
            setChatbotStep(nextStepIdx)
            setTimeout(() => {
                setMessages(prev => [...prev, { role: 'bot', text: steps[nextStepIdx].question }])
            }, 600)
        } else {
            setTimeout(() => {
                setMessages(prev => [...prev, { role: 'bot', text: "Perfect! I've filled out the registration form for you. Please review your details and click the **'Create Account'** button below to finish! 🚀" }])
            }, 600)
        }
    }

    const validate = () => {
        const e = {}
        if (!form.fullName.trim()) e.fullName = 'Name is required'
        if (!/^\d{10}$/.test(form.phone)) e.phone = 'Enter a valid 10-digit phone number'
        if (!form.password) {
            e.password = 'Password is required'
        } else if (!/^\d{4}$/.test(form.password)) {
            e.password = 'Password must be exactly 4 digits (numbers only)'
        }
        if (!form.role) e.role = 'Please select a role'
        return e
    }

    const handleChange = e => {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
    }

    const handleSubmit = async e => {
        e.preventDefault()
        const validationErrors = validate()
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            setShowChatbot(false)
        } else {
            setLoading(true)
            try {
                const response = await fetch('https://work-india-api.onrender.com/api/auth/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: form.fullName,
                        phone: form.phone,
                        password: form.password
                    })
                });

                const data = await response.json();

                if (response.ok) {
                    localStorage.setItem('userRole', form.role)
                    localStorage.setItem('userName', data.name)
                    localStorage.setItem('userToken', data.token)
                    setSubmitted(true)
                } else {
                    setErrors({ submit: data.message || 'Registration failed' })
                }
            } catch (error) {
                setErrors({ submit: 'Could not connect to server' })
            } finally {
                setLoading(false)
            }
        }
    }

    if (submitted) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center p-4">
                <div className="card max-w-md w-full text-center py-12">
                    <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-8">
                        <span className="text-5xl">🎉</span>
                    </div>
                    <h2 className="text-3xl font-black text-gray-900 mb-4 tracking-tight">Account Created!</h2>
                    <p className="text-lg font-medium text-gray-500 mb-8 px-6">Welcome to WorkIndia. Your profile is ready to go!</p>
                    <Link to="/login" className="btn-primary w-full inline-block text-center text-lg py-4">
                        Continue to Login
                    </Link>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
            {/* Background Blobs */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-30" />
                <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-20" />
            </div>

            <div className="relative w-full max-w-lg">
                {/* Header */}
                <div className="text-center mb-10">
                    <Link to="/" className="inline-flex items-center gap-3 mb-8 group">
                        <div className="w-11 h-11 rounded-xl bg-blue-600 flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-200">
                            <span className="text-white font-bold text-lg">W</span>
                        </div>
                        <span className="text-3xl font-extrabold text-gray-900 tracking-tight">WorkIndia</span>
                    </Link>
                    <h1 className="text-4xl font-black text-gray-900 tracking-tight">Join WorkIndia</h1>
                    <p className="text-gray-500 mt-3 font-medium text-lg text-center px-4">Trusted home services at your doorstep.</p>
                </div>

                {/* Chatbot Toggle Button */}
                <div className="flex justify-center mb-8">
                    <button
                        onClick={() => setShowChatbot(!showChatbot)}
                        className={`flex items-center gap-3 px-8 py-3 rounded-full font-bold transition-all shadow-md ${showChatbot
                            ? 'bg-gray-100 text-gray-600'
                            : 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg hover:-translate-y-0.5 active:scale-95'
                            }`}
                    >
                        {showChatbot ? '❌ Close Assistant' : '🤖 Use AI Assistant'}
                    </button>
                </div>

                {/* Main Container */}
                <div className="card shadow-xl border-0 overflow-hidden p-0">
                    {showChatbot ? (
                        <div className="flex flex-col h-[500px] bg-gray-50">
                            {/* Chat Messages */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                {messages.map((msg, idx) => (
                                    <div key={idx} className={`flex ${msg.role === 'bot' ? 'justify-start' : 'justify-end'} animate-fade-in`}>
                                        <div className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm ${msg.role === 'bot'
                                            ? 'bg-white text-gray-800 border border-gray-100 rounded-bl-sm shadow-sm'
                                            : 'bg-primary-600 text-white rounded-br-sm shadow-md'
                                            }`}>
                                            {msg.text.split('**').map((part, i) => (
                                                i % 2 === 1 ? <strong key={i} className="font-bold">{part}</strong> : part
                                            ))}
                                        </div>
                                    </div>
                                ))}
                                <div ref={chatEndRef} />
                            </div>

                            {/* Chat Input */}
                            <form onSubmit={handleChatSubmit} className="p-4 bg-white border-t border-gray-100 flex gap-2">
                                <input
                                    type={steps[chatbotStep]?.type || 'text'}
                                    value={chatInput}
                                    onChange={(e) => setChatInput(e.target.value)}
                                    placeholder={steps[chatbotStep]?.placeholder || 'Type here...'}
                                    className="flex-1 input-field py-2"
                                    autoFocus
                                />
                                <button
                                    type="submit"
                                    className="btn-primary px-5 py-2"
                                    disabled={!chatInput.trim()}
                                >
                                    Send
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div className="p-6 lg:p-8">
                            <form id="register-form" onSubmit={handleSubmit} noValidate className="space-y-5">
                                {/* Role Selection */}
                                <div className="space-y-3">
                                    <label className="label block text-center">I want to...</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setForm(prev => ({ ...prev, role: 'provider' }))}
                                            className={`p-4 rounded-2xl border-2 transition-all text-center group ${form.role === 'provider'
                                                ? 'border-primary-600 bg-primary-50 ring-2 ring-primary-100'
                                                : 'border-gray-100 hover:border-primary-200'
                                                }`}
                                        >
                                            <span className="text-2xl block mb-1 group-hover:scale-110 transition-transform">💼</span>
                                            <span className={`text-sm font-bold ${form.role === 'provider' ? 'text-primary-700' : 'text-gray-600'}`}>Job Provider</span>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setForm(prev => ({ ...prev, role: 'jobseeker' }))}
                                            className={`p-4 rounded-2xl border-2 transition-all text-center group ${form.role === 'jobseeker'
                                                ? 'border-primary-600 bg-primary-50 ring-2 ring-primary-100'
                                                : 'border-gray-100 hover:border-primary-200'
                                                }`}
                                        >
                                            <span className="text-2xl block mb-1 group-hover:scale-110 transition-transform">🔍</span>
                                            <span className={`text-sm font-bold ${form.role === 'jobseeker' ? 'text-primary-700' : 'text-gray-600'}`}>Job Seeker</span>
                                        </button>
                                    </div>
                                    {errors.role && <p className="text-red-500 text-xs text-center">{errors.role}</p>}
                                </div>

                                {/* Name */}
                                <div>
                                    <label htmlFor="reg-fullName" className="label">Name</label>
                                    <input
                                        id="reg-fullName"
                                        type="text"
                                        name="fullName"
                                        value={form.fullName}
                                        onChange={handleChange}
                                        placeholder="Your full name"
                                        className={`input-field ${errors.fullName ? 'border-red-400 ring-1 ring-red-400' : ''}`}
                                    />
                                    {errors.fullName && <p className="text-red-500 text-xs mt-1.5">{errors.fullName}</p>}
                                </div>

                                {/* Phone */}
                                <div>
                                    <label htmlFor="reg-phone" className="label">Phone Number</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium text-sm">+91</span>
                                        <input
                                            id="reg-phone"
                                            type="tel"
                                            name="phone"
                                            value={form.phone}
                                            onChange={handleChange}
                                            placeholder="9876543210"
                                            className={`input-field pl-12 ${errors.phone ? 'border-red-400 ring-1 ring-red-400' : ''}`}
                                        />
                                    </div>
                                    {errors.phone && <p className="text-red-500 text-xs mt-1.5">{errors.phone}</p>}
                                </div>


                                {/* Password */}
                                <div>
                                    <label htmlFor="reg-password" className="label">Enter your PIN</label>
                                    <input
                                        id="reg-password"
                                        type="password"
                                        name="password"
                                        value={form.password}
                                        onChange={e => {
                                            // Strip every character that is not a digit (0-9)
                                            const digitsOnly = e.target.value.replace(/\D/g, '')
                                            // Enforce max length of 4 at the input level
                                            setForm(prev => ({ ...prev, password: digitsOnly.slice(0, 4) }))
                                            if (errors.password) setErrors(prev => ({ ...prev, password: '' }))
                                        }}
                                        placeholder="Enter your 4 digit PIN"
                                        inputMode="numeric"
                                        maxLength={4}
                                        autoComplete="new-password"
                                        className={`input-field tracking-widest text-lg ${errors.password ? 'border-red-400 ring-1 ring-red-400' : ''}`}
                                    />
                                    {errors.password && <p className="text-red-500 text-xs mt-1.5">{errors.password}</p>}
                                </div>

                                {/* Terms */}
                                <p className="text-xs text-gray-400 leading-relaxed">
                                    By registering, you agree to our{' '}
                                    <a href="#" className="text-primary-600 hover:underline">Terms of Service</a> and{' '}
                                    <a href="#" className="text-primary-600 hover:underline">Privacy Policy</a>.
                                </p>

                                {errors.submit && <p className="text-red-500 text-sm text-center font-medium bg-red-50 py-2 rounded-xl border border-red-100">{errors.submit}</p>}
                                <button id="register-submit" type="submit" disabled={loading} className="btn-primary w-full text-base py-3.5 flex items-center justify-center gap-2">
                                    {loading ? (
                                        <>
                                            <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                                            </svg>
                                            Creating Account...
                                        </>
                                    ) : 'Create Account'}
                                </button>
                            </form>
                        </div>
                    )}

                    {!showChatbot && (
                        <div className="pb-8 text-center text-sm text-gray-500">
                            Already have an account?{' '}
                            <Link to="/login" className="text-primary-600 font-semibold hover:text-primary-700 transition-colors">
                                Sign in
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
