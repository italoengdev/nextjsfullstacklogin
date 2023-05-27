import { useState,useEffect } from 'react';
import { auth, createUserWithEmailAndPassword, sendEmailVerification } from '../../firebase';
import { useRouter } from 'next/router';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showConfirmationAlert, setShowConfirmationAlert] = useState(false);
  const router = useRouter();



  const navigateToUserLogin = () => {
    router.push('/');
  };
  

  const handleRegister = async () => {
    try {
      // Create a new user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Send email verification
      await sendEmailVerification(user);

      console.log('User registered:', user);
      console.log('Email verification sent.');

      setShowSuccessMessage(true);
      setShowConfirmationAlert(true);

      navigateToUserLogin();

      // Optionally, you can show a success message or redirect the user to a confirmation page.
    } catch (error: any) {
      console.error('Registration error:', error.message);
    }
  };

  const validatePassword = () => {
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long');
    } else if (password !== confirmPassword) {
      setPasswordError('Passwords do not match');
    } else {
      setPasswordError('');
    }
  };

  useEffect(() => {
    // Set a timer to hide the success message and confirmation alert after 2 seconds
    const timer = setTimeout(() => {
      setShowSuccessMessage(false);
      setShowConfirmationAlert(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [showSuccessMessage, showConfirmationAlert]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="w-full max-w-md">
        <div className="mt-4">
          <h1 className='mb-4 flex justify-center'>Registration Page</h1>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mt-4">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={validatePassword}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
          {password === confirmPassword && password.length >= 6 && (
            <span className="text-green-500 ml-2">✓</span>
          )}
        </div>
        <div className="mt-4">
          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            onBlur={validatePassword}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {passwordError && <p className="text-red-500 mt-2">{passwordError}</p>}
        {showSuccessMessage && <p className="text-green-500 mt-2">Registration successful!</p>}
        {showConfirmationAlert && (
          <div className="mt-2 bg-yellow-200 p-3 rounded">
            <p className="text-yellow-800">
              A confirmation email has been sent to the registered email address.
            </p>
          </div>
        )}
        <button
          onClick={handleRegister}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;
