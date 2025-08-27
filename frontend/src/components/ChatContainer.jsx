// import React from 'react'
// import {useChatStore} from "../store/useChatStore";
// import { useEffect } from 'react';
// import ChatHeader from './ChatHeader'
// import MessageInput from './MessageInput'
// import { formatMessageTime } from "../lib/utils";
// import MessageSkeleton from "./skeletons/MessageSkeleton";


// const ChatContainer = ()=>{
// 	const {messages,getMessages,isMessagesLoading,selectedUser}= useChatStore()
// 	const {authUser}= useChatStore()

// 	useEffect(()=>{
// 		getMessages(selectedUser._id)
// 	},[selectedUser._id,getMessages]
// )

// if(isMessagesLoading) return (
// <div className="flex-1 flex flex-col overflow-auto">
// 	<ChatHeader/>
// 	<MessageSkeleton/>
// 	<MessageInput/>



// </div>
// )


// return (
// 	<div className="flex-1 flex flex-col overflow-auto">
// 		<ChatHeader/>
// 		<div className="flex-1 overflow-y-auto p-4 space-y-4">
//         {messages.map((message) => (
//           <div
//             key={message._id}
//             className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
//             ref={messageEndRef}
//           >
//             <div className=" chat-image avatar">
//               <div className="size-10 rounded-full border">
//                 <img
//                   src={
//                     message.senderId === authUser._id
//                       ? authUser.profilePic || "/avatar.png"
//                       : selectedUser.profilePic || "/avatar.png"
//                   }
//                   alt="profile pic"
//                 />
//               </div>
//             </div>
//             <div className="chat-header mb-1">
//               <time className="text-xs opacity-50 ml-1">
//                 {formatMessageTime(message.createdAt)}
//               </time>
//             </div>
//             <div className="chat-bubble flex flex-col">
//               {message.image && (
//                 <img
//                   src={message.image}
//                   alt="Attachment"
//                   className="sm:max-w-[200px] rounded-md mb-2"
//                 />
//               )}
//               {message.text && <p>{message.text}</p>}
//             </div>
//           </div>
//         ))}
//       </div>
// 		<MessageInput/>
// 	</div>


// )
// }

// export default ChatContainer






import React, { useEffect } from 'react'
import { useChatStore } from "../store/useChatStore";
import ChatHeader from './ChatHeader'
import MessageInput from './MessageInput'
import { formatMessageTime } from "../lib/utils";
import MessageSkeleton from "./skeletons/MessageSkeleton";

// import MessageSkeleton if you use it for loading state

const ChatContainer = () => {
  const { messages, getMessages, isMessagesLoading, selectedUser, authUser } = useChatStore();

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
    }
  }, [selectedUser?._id, getMessages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <p className="text-center text-gray-400">No messages yet</p>
        )}

     {messages.map((message) => {
  const senderId = message.senderId || message.sender?._id;
  const isOwnMessage = senderId === authUser?._id;

  return (
    <div
      key={message._id}
      className={`chat ${isOwnMessage ? "chat-end" : "chat-start"}`}
    >
      {/* Avatar */}
      <div className="chat-image avatar">
        <div className="size-10 rounded-full border overflow-hidden">
          <img
            src={
              isOwnMessage
                ? authUser?.profilePic || "/avtar.png"
                : selectedUser?.profilePic || "/avtar.png"
            }
            alt="profile-pic"
          />
        </div>
      </div>

      {/* Header with timestamp */}
      <div className="chat-header mb-1">
        <time className="text-xs opacity-50 ml-1">
          {formatMessageTime(message.createdAt)}
        </time>
      </div>

      {/* Message bubble */}
      <div className="chat-bubble flex flex-col gap-2">
        {message.image && (
          <img
            src={message.image}
            alt="Attachment"
            className="sm:max-w-[200px] rounded-md"
          />
        )}
        {message.text && <p>{message.text}</p>}
      </div>
    </div>
  );
})}

      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
