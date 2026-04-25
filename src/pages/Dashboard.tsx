import { useAuth } from "../hooks/useAuth";

export default function Dashboard() {
    const { user } = useAuth();

    return (
        <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
                <div className="flex align-center gap-3">
                    <span className="h-12 w-12 rounded-full flex items-center justify-center bg-slate-800 border border-slate-700 text-white font-medium">{user.firstName[0].toUpperCase()}{user.lastName[0].toUpperCase()}</span>
                    <div className="flex flex-col gap-1">
                        <h1 className="text-white font-medium">WELCOME BACK, {user.firstName} {user.lastName}</h1>
                        <span className="w-fit bg-emerald-500/10 border-emerald-500/20 text-white px-2 py-0.5 text-xs uppercase tracking-wider rounded-md">client</span>
                    </div>
                </div>
            </div>
            <div className="lg:w-1/3"></div>
        </div>
    );
}