/* eslint-disable react/prop-types */
import empty from "../../assets/image/empty.png";
const Empty = ({ label }) => {
  return (
    <div className="h-full p-20 flex flex-col items-center justify-center">
      <div className="relative h-72 w-72">
        <img src={empty} alt="empty"  />
        <p className="mt-10 text-muted-forground text-sm text-center">{label}</p>
      </div>
    </div>
  );
};

export default Empty;
