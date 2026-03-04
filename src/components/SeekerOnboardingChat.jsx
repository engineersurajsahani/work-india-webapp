import { useEffect, useMemo, useRef, useState, useCallback } from 'react'

function MessageBubble({ msg }) {
    const isBot = msg.role === 'bot'
    return (
        <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} animate-slide-up`}>
            <div
                className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${isBot
                    ? 'bg-white text-gray-800 border border-gray-100 rounded-bl-sm shadow-sm'
                    : 'bg-gradient-to-br from-primary-600 to-accent-400 text-white rounded-br-sm shadow-md'
                    }`}
            >
                {msg.text}
            </div>
        </div>
    )
}

const ONBOARDING_STEPS = [
    { key: 'fullName', question: "Hi! I'm your Career Assistant AI 🤖\n\nLet's build your profile. What's your full name?", placeholder: 'Full name' },
    { key: 'title', question: 'What is your professional title or the type of work you do?', placeholder: 'e.g. Electrician, Plumber, Data Entry' },
    { key: 'salaryType', question: 'Do you prefer a monthly salary or hourly pay?', kind: 'salaryType' },
    { key: 'expectedSalary', question: 'What is your expected salary?', placeholder: 'e.g. ₹25,000/month or ₹150/hour', kind: 'salary' },
    { key: 'currentLocation', question: 'Which city are you currently based in?', placeholder: 'e.g. Mumbai' },
    { key: 'preferredLocation', question: 'Which city/area do you prefer to work in?', placeholder: 'e.g. Pune, Navi Mumbai' },
]

// Simple AI response engine for post-onboarding queries
function generateAIResponse(userText, profile) {
    const lower = userText.toLowerCase()

    if (lower.includes('salary') || lower.includes('pay') || lower.includes('wage')) {
        return `Based on your profile as a ${profile.title || 'professional'} in ${profile.preferredLocation || 'your area'}, the typical salary range is ₹18,000–₹45,000/month depending on experience. Your expectation of ${profile.expectedSalary} is ${lower.includes('reasonable') ? '' : 'well '}within market range. 💡 Tip: Highlight certifications to command higher rates.`
    }
    if (lower.includes('job') || lower.includes('work') || lower.includes('service') || lower.includes('booking')) {
        return `I found opportunities matching your ${profile.title || 'skill set'} in ${profile.preferredLocation || 'your area'}:\n\n🔧 QuickFix Services — ₹299–₹799/visit\n🏠 HomeHero India — ₹500–₹1,200/day\n⚡ PrimeWork Contractors — ₹22,000/month\n\nVisit the Browse Services tab to apply!`
    }
    if (lower.includes('tip') || lower.includes('improve') || lower.includes('help') || lower.includes('advice')) {
        return `Here are my top tips for ${profile.title || 'professionals'} like you:\n\n1️⃣ Keep your profile photo professional\n2️⃣ Add verified government ID for trust\n3️⃣ Collect reviews after every job\n4️⃣ Be responsive — reply within 1 hour\n5️⃣ Expand your preferred service area`
    }
    if (lower.includes('update') || lower.includes('change') || lower.includes('edit') || lower.includes('redo')) {
        return `Sure! You can update your profile info anytime. Click "Update My Info" below to re-answer the setup questions, or visit the Profile tab to edit directly. 📝`
    }
    if (lower.includes('location') || lower.includes('area') || lower.includes('city')) {
        return `Your current location is set to ${profile.currentLocation || 'unknown'} and preferred work area is ${profile.preferredLocation || 'unknown'}. Want to update these? Just say "update my info" or visit your Profile tab.`
    }
    if (lower.includes('hello') || lower.includes('hi') || lower.includes('hey')) {
        return `Hello ${profile.fullName?.split(' ')[0] || 'there'}! 👋 How can I help you today? You can ask me about jobs, salary tips, how to improve your profile, or anything work-related!`
    }
    return `Great question, ${profile.fullName?.split(' ')[0] || 'there'}! As a ${profile.title || 'professional'} in ${profile.preferredLocation || 'your area'}, I suggest exploring the Browse Services tab for the latest opportunities. You can also ask me about salary expectations, tips to grow, or how to update your information. 😊`
}

export default function SeekerOnboardingChat({ onProfileReady }) {
    const steps = useMemo(() => ONBOARDING_STEPS, [])

    const [messages, setMessages] = useState([])
    const [currentIdx, setCurrentIdx] = useState(0)
    const [input, setInput] = useState('')
    const [saving, setSaving] = useState(false)
    const [completed, setCompleted] = useState(false)
    const [isTyping, setIsTyping] = useState(false)
    const [minimized, setMinimized] = useState(false)

    const [answers, setAnswers] = useState({
        fullName: '',
        title: '',
        salaryType: 'monthly',
        expectedSalary: '',
        currentLocation: '',
        preferredLocation: '',
    })

    const endRef = useRef(null)

    // Load persisted data on mount
    useEffect(() => {
        const stored = localStorage.getItem('seekerProfile')
        const done = localStorage.getItem('seekerOnboardingCompleted')
        if (stored && done) {
            const profile = JSON.parse(stored)
            setAnswers(profile)
            setCompleted(true)
            setCurrentIdx(steps.length)
            setMessages([
                { id: 1, role: 'bot', text: `Welcome back, ${profile.fullName?.split(' ')[0] || 'there'}! 👋\n\nYour profile is all set. Ask me anything — jobs, salary tips, opportunities, or say "update my info" to refresh your profile.` }
            ])
            onProfileReady?.(profile, false)
        } else {
            setMessages([{ id: 1, role: 'bot', text: steps[0].question }])
        }
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages, saving, isTyping])

    const persistProfile = async (payload) => {
        await new Promise(res => setTimeout(res, 800))
        localStorage.setItem('seekerProfile', JSON.stringify(payload))
        localStorage.setItem('seekerOnboardingCompleted', 'true')
    }

    const botReply = useCallback((text, delay = 450) => {
        setIsTyping(true)
        setTimeout(() => {
            setIsTyping(false)
            setMessages(prev => [...prev, { id: Date.now() + Math.random(), role: 'bot', text }])
        }, delay)
    }, [])

    const finish = async (finalAnswers) => {
        setSaving(true)
        setIsTyping(true)
        try {
            await persistProfile(finalAnswers)
        } finally {
            setSaving(false)
            setIsTyping(false)
        }
        setCompleted(true)
        onProfileReady?.(finalAnswers, true)
        const name = finalAnswers.fullName?.split(' ')[0] || 'there'
        botReply(
            `✅ Profile saved, ${name}!\n\nHere's your summary:\n👤 ${finalAnswers.fullName}\n💼 ${finalAnswers.title}\n💰 ${finalAnswers.expectedSalary} (${finalAnswers.salaryType})\n📍 ${finalAnswers.currentLocation} → ${finalAnswers.preferredLocation}\n\nYour overview is ready below. Feel free to ask me anything anytime — I'm always here! 🚀`,
            600
        )
    }

    const advanceOnboarding = async (userText) => {
        const step = steps[currentIdx]
        setMessages(prev => [...prev, { id: Date.now(), role: 'user', text: userText }])

        let updatedAnswers = { ...answers }
        if (step.kind === 'salaryType') {
            updatedAnswers.salaryType = userText.toLowerCase().includes('hour') ? 'hourly' : 'monthly'
        } else {
            updatedAnswers[step.key] = userText
        }
        setAnswers(updatedAnswers)

        const nextIdx = currentIdx + 1
        if (nextIdx >= steps.length) {
            await finish(updatedAnswers)
            return
        }

        setCurrentIdx(nextIdx)
        botReply(steps[nextIdx].question)
    }

    const handleFreeChat = (userText) => {
        setMessages(prev => [...prev, { id: Date.now(), role: 'user', text: userText }])
        const response = generateAIResponse(userText, answers)
        botReply(response, 700)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (saving || isTyping) return
        const step = steps[currentIdx]
        if (!completed && step?.kind === 'salaryType') return
        const text = input.trim()
        if (!text) return
        setInput('')

        if (completed) {
            handleFreeChat(text)
        } else {
            await advanceOnboarding(text)
        }
    }

    const startOver = () => {
        setCompleted(false)
        setCurrentIdx(0)
        setAnswers({ fullName: '', title: '', salaryType: 'monthly', expectedSalary: '', currentLocation: '', preferredLocation: '' })
        setMessages([{ id: Date.now(), role: 'bot', text: "Sure! Let's update your profile. 📝\n\n" + steps[0].question }])
    }

    const showSalaryButtons = !completed && steps[currentIdx]?.kind === 'salaryType'
    const inputDisabled = saving || isTyping || (!completed && showSalaryButtons)

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary-600 to-accent-500 px-5 py-4 text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center text-xl">🤖</div>
                    <div>
                        <p className="font-bold text-base leading-tight">Career Assistant AI</p>
                        <p className="text-primary-100 text-xs">
                            {completed ? '✦ Profile complete · Ask me anything' : `Step ${Math.min(currentIdx + 1, steps.length)} of ${steps.length}`}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    {completed && (
                        <button
                            onClick={startOver}
                            className="text-xs bg-white/20 hover:bg-white/30 text-white font-semibold px-3 py-1.5 rounded-lg transition-colors"
                        >
                            ✏️ Update Info
                        </button>
                    )}
                    <button
                        onClick={() => setMinimized(m => !m)}
                        className="text-xs bg-white/20 hover:bg-white/30 text-white font-semibold w-7 h-7 rounded-lg transition-colors flex items-center justify-center"
                        aria-label={minimized ? 'Expand' : 'Minimise'}
                    >
                        {minimized ? '▲' : '▼'}
                    </button>
                </div>
            </div>

            {!minimized && (
                <div className="flex flex-col h-[420px] bg-gray-50">
                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                        {messages.map(m => (
                            <MessageBubble key={m.id} msg={m} />
                        ))}
                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm flex gap-1 items-center">
                                    <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce [animation-delay:0ms]" />
                                    <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce [animation-delay:150ms]" />
                                    <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce [animation-delay:300ms]" />
                                </div>
                            </div>
                        )}
                        <div ref={endRef} />
                    </div>

                    {/* Input area */}
                    {showSalaryButtons ? (
                        <div className="p-4 bg-white border-t border-gray-100">
                            <p className="text-xs text-gray-400 mb-2 font-medium">Choose your preferred pay type:</p>
                            <div className="flex gap-2">
                                <button
                                    type="button"
                                    onClick={() => advanceOnboarding('Monthly')}
                                    disabled={saving}
                                    className="flex-1 btn-secondary py-2"
                                >
                                    📅 Monthly
                                </button>
                                <button
                                    type="button"
                                    onClick={() => advanceOnboarding('Hourly')}
                                    disabled={saving}
                                    className="flex-1 btn-secondary py-2"
                                >
                                    ⏱ Hourly
                                </button>
                            </div>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="p-4 bg-white border-t border-gray-100 flex gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder={
                                    completed
                                        ? 'Ask me about jobs, salary, tips…'
                                        : (steps[currentIdx]?.placeholder || 'Type here…')
                                }
                                className="flex-1 input-field py-2"
                                autoFocus
                                disabled={inputDisabled}
                            />
                            <button type="submit" className="btn-primary px-5 py-2" disabled={inputDisabled || !input.trim()}>
                                {saving ? '…' : '↑'}
                            </button>
                        </form>
                    )}
                </div>
            )}
        </div>
    )
}
