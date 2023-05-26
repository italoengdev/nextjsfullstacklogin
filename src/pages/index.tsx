import Login from '../components/Login';

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-md p-6 max-w-sm w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">Welcome to Login Page Firebase Test</h1>
        <Login />
      </div>
    </div>
  );
};

export default LoginPage;
