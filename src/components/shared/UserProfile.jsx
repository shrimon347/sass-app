// Home.js
import { SignInButton, UserButton, useUser } from "@clerk/clerk-react";


const UserProfile = () => {
  const { isSignedIn } = useUser();

  return (
   
      <div className="absolute top-0 right-4 flex items-center space-x-4">
        {!isSignedIn ? (
          <>
            <SignInButton>
              <button className="px-4 py-2 bg-black text-white rounded hover:bg-gray-700">
                Sign In
              </button>
            </SignInButton>
          </>
        ) : (
          <UserButton afterSignOutUrl="/" /> 
        )}
      </div>

  );
};

export default UserProfile;
