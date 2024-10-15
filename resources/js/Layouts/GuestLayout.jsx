import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div
        
            className="flex min-h-screen flex-col items-center justify-center p-6 sm:pt-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/orange-background.png')" }} 
        >
            {/* Main Content Box */}
            <div className="relative w-full overflow-hidden bg-gradient-to-b from-white via-orange-300 to-red-400 px-10 py-8 shadow-xl sm:max-w-md sm:rounded-lg">
  
                {/* Main Content */}
                <div className="relative z-10">
                    {children}
                </div>
            </div>
        </div>
    );
}