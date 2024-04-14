import { useContext } from "react";
import { ChatContext } from "../../context/chatContext";
import { AuthContext } from "../../context/authContext";

const PotentialChats = () => {
    const {user} = useContext(AuthContext);
  const { potentialChats, createChat } = useContext(ChatContext);
  // console.log("PotentialChats", potentialChats);

  return (
    <>
      <div className="all-users">
        {potentialChats &&
          potentialChats.map((u, index) => {
            return (
              <div className="single-user" key={index} onClick={()=>createChat(user._id, u._id)}>
                {u.name}
                <span className="user-online"></span>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default PotentialChats;
