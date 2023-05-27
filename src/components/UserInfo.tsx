import React, { useEffect, useState } from 'react';
import { auth } from '../../firebase';
import { User, updateProfile, getAuth } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import Modal from './Modal';

const UserInfo = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [displayName, setDisplayName] = useState('');


  const storage = getStorage();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser(null);
      }
    });

    return unsubscribe;
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const storageRef = ref(storage, `user_photos/${user?.uid}`); // Update the storage reference path
      try {
        const snapshot = await uploadBytes(storageRef, file);
  
        const downloadURL = await getDownloadURL(snapshot.ref);
        await updateUserProfile({ photoURL: downloadURL });
  
        console.log('Profile photo updated successfully');
      } catch (error) {
        console.log('Error uploading photo:', error);
      }
    }
  };
  
  const updateUserProfile = async (profileData: { photoURL: string }) => {
    try {
      const updatedUser: User = {
        ...user!,
        photoURL: profileData.photoURL,
      };
      setUser(updatedUser);
  
      const authInstance = getAuth();
      await updateProfile(authInstance.currentUser!, profileData);
    } catch (error) {
      console.log('Error updating profile:', error);
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault(); // Prevent the default form submission behavior
  
    try {
      const authInstance = getAuth();
      const currentUser = authInstance.currentUser;
  
      if (currentUser) {
        // Update the display name
        await updateProfile(currentUser, {
          displayName: displayName,
          
        });
        // Close the modal after submission
        setIsModalOpen(false);
      }
    } catch (error) {
      console.log('Error updating profile:', error);
    }
  };
  
  
  

  const handleEditProfile = () => {
    setDisplayName(user?.displayName || '');
    setIsModalOpen(true);
  };
  
  

  return (
    <div className="mt-8">
      {user ? (
        <div className="bg-gray-100 p-4 rounded-md">
           {user.photoURL ? (
            <div className="flex justify-center">
            <img
              src={user.photoURL}
              alt="User Photo"
              className="mt-2 rounded-full w-24 h-24 object-cover"
            />
          </div>
            
          ) : (
            <div>
              <p>No photo available</p>
            </div>
          )}
          <h2 className="text-xl font-bold mb-2">Welcome, {user.displayName}!</h2>
          <p>Email: <strong>{user.email}</strong></p>
          <p>UID: <strong>{user.uid}</strong></p>
          <p>Display Name: <strong>{user.displayName}</strong></p>
          
         
          <button
  onClick={handleEditProfile}
  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 my-2 px-4 rounded focus:outline-none focus:shadow-outline"
>
  Edit Profile
</button>

        </div>
      ) : (
        <p className="text-gray-500">User not logged in.</p>
      )}
  
      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <h2 className="text-xl font-bold mb-2">Edit Profile</h2>
          <form onSubmit={(e) => handleSubmit(e)} className="mt-4">

          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="displayName">
              Display Name:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="displayName"
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="profilePhoto">
              Profile Photo:
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="profilePhoto"
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Submit
          </button>
        </form>


        </Modal>
      )}
    </div>
  );
  
};

export default UserInfo;
