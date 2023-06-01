import { useState } from 'react';
import { auth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from '../../firebase';
import { FaGoogle } from 'react-icons/fa';
import { useRouter } from 'next/router';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      // Authenticate the user using email and password
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log('User logged in:', user);
      navigateToUserInfo();
    } catch (error: any) {
      
      if (error.code === 'auth/user-not-found') {
        alert('User does not exist. Please check your email and password.');
      } else {
        console.error('Login error:', error.message);
        alert('User or Password Incorrect. Please try again.');
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      // Create a Google provider instance
      const provider = new GoogleAuthProvider();

      // Sign in with Google using a pop-up window
      const userCredential = await signInWithPopup(auth, provider);
      const user = userCredential.user;
      console.log('User logged in with Google:', user);
      navigateToUserInfo();
    } catch (error: any) {
      console.error('Google login error:', error.message);
      
    }
  };

  const navigateToUserInfo = () => {
    router.push('/userinfo');
  };

  return (
    <div>
      <div className="mb-4">
        <label htmlFor="email" className="block mb-1 font-medium">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-md"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="block mb-1 font-medium">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-md"
        />
      </div>
      <div>
        <button onClick={handleLogin} className="bg-blue-500 text-white py-2 px-4 rounded-md mr-2 mb-2">
          Login
        </button>
        <button onClick={handleGoogleLogin} className="flex items-center bg-red-500 text-white py-2 px-4 rounded-md">
          <FaGoogle className="mr-2" /> Login with Google
        </button>
      </div>
    </div>
  );
};

export default Login;
