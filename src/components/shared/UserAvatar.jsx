import { useUser } from "@clerk/clerk-react";
const UserAvatar = () => {
  const { user } = useUser();

  return (
    <div className="h-8 w-8 rounded-full overflow-hidden">
      <img
        src={user?.imageUrl}
        alt="profile_image"
        className="h-full w-full object-cover"
      />
    </div>
  );
};

export default UserAvatar;
