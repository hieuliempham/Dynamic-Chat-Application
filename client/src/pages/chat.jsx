import { useContext } from "react";
import { ChatContext } from "../context/chatContext";
import { Container, Stack } from "react-bootstrap";
import UserChat from "../component/chat/userChat";
import { AuthContext } from "../context/authContext";
import PotentialChats from "../component/chat/potentialChats";
import ChatBox from "../component/chat/chatBox";

const Chat = () => {
  const { user } = useContext(AuthContext);
  const { userChats, isUserChatsLoading, updateCurrentChat } =
    useContext(ChatContext);

  return (
    <Container>
      <PotentialChats />
      {userChats?.length < 1 ? null : (
        <Stack direction="horizontal" gap={4} className="align-items-start">
          <Stack className="messages-box flex-grow-0 pe-3" gap={3}>
            {isUserChatsLoading && <p>Đang tải tin nhắn...</p>}
            {userChats?.map((chat, index) => {
              return (
                <div
                  key={index}
                  onClick={() => {
                    updateCurrentChat(chat);
                  }}
                >
                  <UserChat chat={chat} user={user} />
                </div>
              );
            })}
          </Stack>
          <ChatBox/>
        </Stack>
      )}
    </Container>
  );
};

export default Chat;
