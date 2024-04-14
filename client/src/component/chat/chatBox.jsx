import { useContext } from "react";
import { AuthContext } from "../../context/authContext";
import { ChatContext } from "../../context/chatContext";
import { useFetchRecipientUser } from "../../hooks/userFetchRecipient";
import { Stack } from "react-bootstrap";
import moment from "moment"

const ChatBox = () => {
  const { user } = useContext(AuthContext);
  const { currentChat, messages, isMessagesLoading } = useContext(ChatContext);
  const { recipientUser } = useFetchRecipientUser(currentChat, user);

  if (!recipientUser)
    return (
      <p style={{ textAlign: "center", width: "100%" }}>
        Chưa có cuộc hội thoại được chọn...
      </p>
    );

  if (isMessagesLoading)
    return (
      <p style={{ textAlign: "center", width: "100%" }}>Đang tải tin nhắn...</p>
    );

  return (
    <Stack gap={4} className="chat-box">
      <div className="chat-header">
        <strong>{recipientUser?.name}</strong>
      </div>
      <Stack gap={3} className="messages">
        {messages &&
          messages?.map((message, index) => (
            <Stack key={index} className={`${message?.senderId === user?._id ? "message self align-seft-end flex-grow-0" : "message align-seft-start flex-grow-0"}`}>
              <span>{message.text}</span>
              <span className="message-footer">{moment(message.createdAt).calendar()}</span>
            </Stack>
          ))}
      </Stack>
    </Stack>
  );
};

export default ChatBox;
