import { auth } from '../../firebase';

const Logout = () => {
  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log('User signed out successfully');
      window.location.href = '/'; // Redirect to "/login" page after successful logout
    } catch (error:any) {
      console.error('Logout error:', error.message);
    }
  };

  return (
    <div>
    <button
      onClick={handleLogout}
      className="bg-red-500 hover:bg-red-600 text-white my-2 py-2 px-4 rounded-md"
    >
      Logout
    </button>
  </div>
  
  );
};

export default Logout;
