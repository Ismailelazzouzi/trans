import './App.css'

import toolbox from './assets/toolbox.png'
import Button from './components/Button'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import ProtectedRoute from './Auth/ProtectedRoute'
import PublicRoute from './Auth/PublicRoute'
import GoogleCallback from './Auth/GoogleCallback'

import { Routes, Route } from 'react-router-dom';
import { useNavigation } from './hooks/useNavigation';
import { useAuth } from './hooks/useAuth'
import Dashboard from './pages/Dashboard'


function App() {
	const { goToHome , goToLogin, goToRegister, goToDashboard } = useNavigation();
	const { isAuthenticated, user, logout , isLoading} = useAuth();
	return (
    	<div className='min-h-screen bg-slate-900'>
    		<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<header className='py-6 flex justify-between items-center'>
					<div onClick={isAuthenticated ? goToDashboard : goToHome} className='flex items-center gap-3 cursor-pointer'>
						<h1 className='text-2xl font-bold tracking-tighter text-emerald-400'>THE HIVE</h1>
						<img src={toolbox} alt="toolboxIcon" className='h-10 w-10'/>
					</div>
					<nav className='flex items-center gap-6'>
						{ 	isLoading ? (
								<></>
							)

							: !isAuthenticated ? (
								<>
									<Button label="Login" variant="secondary" onClick={goToLogin} disabled={false}/>
									<Button label="Sign Up" variant="primary" onClick={goToRegister} disabled={false}/>
								</>
							) : (
								<>
									<div className="flex items-center gap-4">
                                		<span className="text-slate-300">Welcome, {user?.firstName}</span>
										<Button label="Logout" variant="primary" onClick={logout} disabled={false}/>
									</div>
								</>
							)
						}
					</nav>
				</header>
				<Routes>
					<Route element={<PublicRoute />}>
						<Route path="/" element={<Home />} />
						<Route path="/login" element={<Login />} />
						<Route path="/register" element={<Register />} />
					</Route>
						<Route path="/auth/callback" element={<GoogleCallback />} />
					<Route element={<ProtectedRoute />}>
						<Route path="/dashboard" element={<Dashboard />} />
					</Route>
					<Route path="*" element={<div className="text-2xl text-white">404 - Page Not Found</div>} />
				</Routes>
    		</div>
    	</div>
)
}

export default App
