// components/ChatSidebar.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Send } from 'lucide-react';
import { formatTime } from './utils/helpers';


const ChatSidebar = ({ chatMessages, newMessage, setNewMessage, handleSendMessage, memberCount, chatEndRef }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 h-[800px] flex flex-col"
    >
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-green-500 to-blue-500 p-6 text-white">
        <div className="flex items-center gap-3">
          <MessageCircle className="w-6 h-6" />
          <h2 className="text-xl font-semibold">Team Chat</h2>
        </div>
        <p className="text-green-100 text-sm mt-2">
          {memberCount} members online
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {chatMessages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex gap-3 ${message.isOwn ? 'flex-row-reverse' : ''}`}
            >
              <img
                src={message.avatar}
                alt={message.sender}
                className="w-10 h-10 rounded-full border-2 border-gray-200 flex-shrink-0"
              />
              <div className={`flex-1 ${message.isOwn ? 'text-right' : ''}`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-gray-900">
                    {message.sender}
                  </span>
                  <span className="text-xs text-gray-500">
                    {formatTime(message.timestamp)}
                  </span>
                </div>
                <div
                  className={`inline-block px-4 py-2 rounded-2xl max-w-xs ${
                    message.isOwn
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}
                >
                  {message.message}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={chatEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Type your message..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleSendMessage}
            className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-3 rounded-full hover:shadow-lg transition-all duration-200"
          >
            <Send className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatSidebar;