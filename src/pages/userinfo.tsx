import Logout from '@/components/Logout';
import UserInfo from '../components/UserInfo';

const UserInfoPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white mx-8 md:mx-0 shadow rounded-3xl sm:p-10">
          <h1 className="text-center text-4xl font-bold mb-8">User Information</h1>
          <UserInfo />
          <Logout />
        </div>
      </div>
    </div>
  );
};

export default UserInfoPage;
