import { Navigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"


export default function ProtectedRoute(){
    const {isAuthenticated, isLoading} = useAuth();
    
    if (isLoading){
        return (
            <div className="flex justify-center align-center h-screen">
                <h1 className="text-emerald">LOADING...</h1>
            </div>
        );
    }
    else if (!isAuthenticated){
        return (
            <Navigate to="/login" replace />
        );
    }
    return (
        <Outlet />
    );
}