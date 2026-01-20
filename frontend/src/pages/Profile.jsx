import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuthStore } from "../store/auth.store.js"
import { useApplicationStore } from "../store/application.store.js"

const Profile = () => {
    const { user, getMe, loading } = useAuthStore()
    const { applications, getApplications, loading: appsLoading } = useApplicationStore()

    useEffect(() => {
        if (!user) {
            getMe()
        }
        getApplications()
    }, [])

    if (loading) {
        return (
            <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            </div>
        )
    }

    if (!user) return null

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 p-6">
            <div className="max-w-4xl mx-auto">
                <div className="mb-8">
                    <Link
                        to="/applications"
                        className="text-purple-400 hover:text-purple-300 transition-colors duration-200 text-sm font-medium mb-4 inline-block"
                    >
                        ← Back to Applications
                    </Link>
                    <h1 className="text-3xl font-bold text-white mb-2">Profile</h1>
                    <p className="text-gray-300">Manage your account information</p>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 p-8 shadow-2xl">
                    <div className="space-y-6">
                        <div className="flex items-center space-x-4 mb-8">
                            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center">
                                <span className="text-2xl font-bold text-white">
                                    {user.name.charAt(0).toUpperCase()}
                                </span>
                            </div>
                            <div>
                                <h2 className="text-2xl font-semibold text-white">{user.name}</h2>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-2">Full Name</label>
                                <div className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white">
                                    {user.name}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-200 mb-2">Email Address</label>
                                <div className="px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white">
                                    {user.email}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8">
                        <h3 className="text-xl font-semibold text-white mb-4">Application Statistics</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {['Applied', 'Interview', 'Offer', 'Rejected'].map(status => {
                                const count = applications.filter(app => app.status === status).length
                                return (
                                    <div key={status} className="bg-white/10 backdrop-blur-md rounded-lg border border-white/20 p-4 text-center">
                                        <div className="text-2xl font-bold text-white">{count}</div>
                                        <div className="text-gray-300 text-sm">{status}</div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="mt-4 text-center">
                            <p className="text-gray-300 text-sm">
                                Total Applications: <span className="font-semibold text-white">{applications.length}</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile