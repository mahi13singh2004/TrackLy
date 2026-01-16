import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/auth.store.js'

const Landing = () => {
    const { user, logout } = useAuthStore()

    const handleLogout = async () => {
        await logout()
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center px-4">
            <div className="max-w-4xl mx-auto text-center">
                <div className="mb-8">
                    <h1 className="text-6xl md:text-7xl font-bold text-white mb-6 tracking-tight">
                        Apply<span className="text-purple-400">Zen</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-2xl mx-auto leading-relaxed">
                        Master your job hunt with AI-powered follow-ups and smart application tracking
                    </p>
                    <p className="text-lg text-gray-400 max-w-xl mx-auto">
                        Never miss a follow-up. Get personalized emails. Land your dream job.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                        <div className="text-3xl mb-3">📊</div>
                        <h3 className="text-white font-semibold mb-2">Track Applications</h3>
                        <p className="text-gray-300 text-sm">Organize all your job applications in one place</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                        <div className="text-3xl mb-3">🤖</div>
                        <h3 className="text-white font-semibold mb-2">AI Follow-ups</h3>
                        <p className="text-gray-300 text-sm">Generate personalized follow-up emails instantly</p>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
                        <div className="text-3xl mb-3">⏰</div>
                        <h3 className="text-white font-semibold mb-2">Smart Reminders</h3>
                        <p className="text-gray-300 text-sm">Never forget to follow up on applications</p>
                    </div>
                </div>

                {user ? (
                    <div className="space-y-4">
                        <p className="text-lg text-gray-300">Welcome back, {user.name}!</p>
                        <div className="space-x-4">
                            <Link
                                to="/applications"
                                className="inline-block px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
                            >
                                View Applications
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="inline-block px-8 py-4 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-all duration-200"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="space-x-4">
                        <Link
                            to="/signup"
                            className="inline-block px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg"
                        >
                            Get Started Free
                        </Link>
                        <Link
                            to="/login"
                            className="inline-block px-8 py-4 bg-transparent border-2 border-white/30 hover:border-white/50 text-white font-semibold rounded-lg transition-all duration-200 backdrop-blur-sm"
                        >
                            Sign In
                        </Link>
                    </div>
                )}
            </div>

            <div className="absolute bottom-4 text-center text-gray-400 text-sm">
                Built for SDE interviews • Powered by AI
            </div>
        </div>
    )
}

export default Landing