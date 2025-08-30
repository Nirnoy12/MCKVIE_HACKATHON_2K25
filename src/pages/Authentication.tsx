import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Firebase imports
import { initializeApp, FirebaseApp } from 'firebase/app';
import {
    getAuth,
    Auth,
    createUserWithEmailAndPassword,
    signInWithPopup,
    signInWithRedirect,
    getRedirectResult,
    GoogleAuthProvider,
    User,
} from 'firebase/auth';

// Icon imports
import { Mail, Lock, AlertTriangle, X } from 'lucide-react';

// --- Mock UI Components & Hook (for standalone functionality) ---
const Card = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => <div className={`w-full max-w-md bg-gray-800/50 backdrop-blur-sm border border-purple-500/30 rounded-lg p-8 shadow-2xl ${className}`}>{children}</div>;
const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => <input {...props} className={`w-full p-3 pl-10 bg-purple-900/50 border border-purple-600 rounded-md text-gray-200 placeholder-gray-400 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all duration-300 ${props.className}`} />;
const Button = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => <button {...props} className={`w-full text-lg font-bold p-4 rounded-lg shadow-lg transition-all duration-300 focus:ring-4 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed ${props.className}`}>{props.children}</button>;
const GoogleButton = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => (
    <button {...props} className={`w-full flex items-center justify-center gap-3 text-lg font-bold p-4 bg-white text-gray-800 rounded-lg shadow-lg hover:bg-gray-200 transition-all duration-300 focus:ring-4 focus:ring-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed ${props.className}`}>
        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/><path d="M1 1h22v22H1z" fill="none"/></svg>
        {props.children}
    </button>
);
// --- End of Mock Components ---

const Authentication = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [auth, setAuth] = useState<Auth | null>(null);
    const [user, setUser] = useState<User | null>(null);

    // --- Firebase Configuration ---
    const firebaseConfig = {
        apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
        authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
        storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
        appId: import.meta.env.VITE_FIREBASE_APP_ID
    };

    // --- Firebase Initialization Effect ---
    useEffect(() => {
        if (firebaseConfig.apiKey && firebaseConfig.projectId) {
            try {
                const app: FirebaseApp = initializeApp(firebaseConfig);
                const authInstance: Auth = getAuth(app);
                setAuth(authInstance);
                
                // Handle redirect result from Google Sign-In
                getRedirectResult(authInstance)
                    .then((result) => {
                        if (result?.user) {
                            console.log('✅ Google Sign-In redirect successful:', result.user.email);
                            setUser(result.user);
                            navigate('/register', { 
                                state: { 
                                    userEmail: result.user.email, 
                                    userName: result.user.displayName || ''
                                } 
                            });
                        }
                    })
                    .catch((error) => {
                        console.error("Redirect result error:", error);
                        if (error.code !== 'auth/no-auth-event') {
                            setError("Authentication redirect failed. Please try again.");
                        }
                    });
                    
            } catch (err) {
                console.error("Firebase initialization error:", err);
                setError("Could not connect to authentication service.");
            }
        }
    }, [navigate]);

    const handleEmailSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!auth) return;
        if (password.length < 6) {
            setError("Password must be at least 6 characters long.");
            return;
        }
        setLoading(true);
        setError(null);

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            setUser(userCredential.user);
            console.log('✅ Email sign-up successful:', userCredential.user.email);
            
            // Navigate to registration page with user info
            navigate('/register', { 
                state: { 
                    userEmail: userCredential.user.email, 
                    userName: userCredential.user.displayName || ''
                } 
            });
        } catch (err: any) {
            if (err.code === 'auth/email-already-in-use') {
                setError("This email is already registered. Please sign in.");
            } else {
                setError("Failed to sign up. Please try again.");
            }
            console.error("Email sign up error:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        if (!auth) return;
        setLoading(true);
        setError(null);
        const provider = new GoogleAuthProvider();
        
        // Add additional scopes for better user info
        provider.addScope('email');
        provider.addScope('profile');

        try {
            console.log('🚀 Starting Google Sign-In...');
            const result = await signInWithPopup(auth, provider);
            console.log('✅ Google Sign-In successful:', result.user.email);
            
            setUser(result.user);
            
            // Navigate to registration page with user info
            navigate('/register', { 
                state: { 
                    userEmail: result.user.email, 
                    userName: result.user.displayName || ''
                } 
            });
            
        } catch (err: any) {
            console.error("Google sign in error:", err);
            
            // Handle specific CORS and popup errors
            if (err.code === 'auth/popup-closed-by-user') {
                setError("Sign-in cancelled. Please try again.");
            } else if (err.code === 'auth/popup-blocked') {
                setError("Popup blocked by browser. Please allow popups and try again.");
            } else if (err.message?.includes('Cross-Origin-Opener-Policy')) {
                // Fallback to redirect method for CORS issues
                console.log('🔄 Popup failed due to CORS, trying redirect method...');
                setError("Popup authentication failed. Using redirect method...");
                try {
                    await signInWithRedirect(auth, provider);
                } catch (redirectErr) {
                    console.error("Redirect sign-in also failed:", redirectErr);
                    setError("Authentication failed. Please try email/password instead.");
                }
            } else {
                setError("Failed to sign in with Google. Please try again or use email/password.");
            }
        } finally {
            setLoading(false);
        }
    };

    // If user is successfully authenticated, show a success message.
    // In a real app, this would be where you redirect them.
    if (user) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900 font-sans p-4">
                <Card>
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-green-400 mb-4">Success!</h1>
                        <p className="text-gray-300 mb-2">You're authenticated as:</p>
                        <p className="text-orange-400 font-mono break-all mb-6">{user.email}</p>
                        <p className="text-gray-300">Redirecting you to the registration form...</p>
                        {/* This is where you would have a spinner and then navigate */}
                    </div>
                </Card>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-900 font-sans p-4">
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Creepster&display=swap');
                .font-spooky { font-family: 'Creepster', cursive; }
                .text-gradient-halloween { background: -webkit-linear-gradient(45deg, #ff7e5f, #feb47b); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
            `}</style>
            <Card>
                <div className="text-center mb-8">
                    <h1 className="text-5xl font-spooky text-gradient-halloween mb-2">Get Started</h1>
                    <p className="text-gray-400">Create an account to join the hunt</p>
                </div>

                {error && (
                    <div className="bg-red-500/20 border border-red-500 text-red-300 p-3 rounded-md mb-6 flex items-start gap-3">
                        <AlertTriangle className="h-5 w-5 mt-0.5 flex-shrink-0" />
                        <span>{error}</span>
                        <button onClick={() => setError(null)} className="ml-auto"><X className="h-5 w-5" /></button>
                    </div>
                )}

                <form onSubmit={handleEmailSignUp} className="space-y-6">
                    <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                            type="email"
                            placeholder="Your Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                            type="password"
                            placeholder="Create a Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <Button
                        type="submit"
                        disabled={loading}
                        className="bg-orange-600 hover:bg-orange-700 text-white focus:ring-orange-500/50"
                    >
                        {loading ? 'Signing Up...' : 'Sign Up with Email'}
                    </Button>
                </form>

                <div className="my-6 flex items-center">
                    <div className="flex-grow border-t border-purple-700"></div>
                    <span className="flex-shrink mx-4 text-gray-400">OR</span>
                    <div className="flex-grow border-t border-purple-700"></div>
                </div>

                <GoogleButton onClick={handleGoogleSignIn} disabled={loading}>
                    Sign Up with Google
                </GoogleButton>

            </Card>
        </div>
    );
};

export default Authentication;
