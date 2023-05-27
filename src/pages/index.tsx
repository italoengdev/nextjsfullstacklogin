import Login from '../components/Login';
import  Link  from 'next/link';

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-md p-6 max-w-sm w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">Welcome to Login Page Firebase Test</h1>
        <Login />
        <div className='mt-4'><Link className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline " href="/register">
        Registration
      </Link></div>
        
      </div>
    </div>
  );
};

export default LoginPage;
