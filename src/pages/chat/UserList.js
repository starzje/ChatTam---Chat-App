import Avatar from "react-avatar";

const UserList = ({ user, handleClickUser }) => {
  return (
    <li
      onClick={() => handleClickUser(user)}
      key={user.uid}
      id={user.uid}
      className="flex items-center p-2 mb-2 space-x-3 text-white transition duration-200 cursor-pointer hover:bg-primary-violet overflox-y-auto">
      <Avatar
        src={user.image}
        name={user.name}
        size="45"
        round={true}
        textSizeRatio={1.5}
      />
      <p className="overflow-x-hidden break-words whitespace-nowrap text-ellipsis ">
        {user.name}
      </p>

      {user.isOnline ? (
        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
      ) : (
        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
      )}
    </li>
  );
};

export default UserList;
