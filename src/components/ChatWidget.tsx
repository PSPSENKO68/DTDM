import { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-6 right-6 z-40">
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-xl overflow-hidden flex flex-col w-80 h-96 animate-fade-in">
          <div className="bg-primary-600 text-white p-4 flex justify-between items-center">
            <h3 className="font-semibold">Trợ giúp trực tuyến</h3>
            <button onClick={toggleChat} className="text-white hover:text-primary-200">
              <X size={20} />
            </button>
          </div>
          <div className="flex-grow p-4 overflow-y-auto bg-gray-50">
            <div className="bg-primary-100 rounded-lg p-3 max-w-[80%] mb-4">
              <p className="text-sm">
                Xin chào! Chúng tôi có thể giúp gì cho bạn hôm nay?
              </p>
              <span className="text-xs text-gray-500 block mt-1">10:00 AM</span>
            </div>
            {/* Placeholder for future chat integration */}
            <div className="text-center text-sm text-gray-500 mt-8">
              <p>Tính năng chat đang được phát triển</p>
              <p>Sẽ sớm được tích hợp với Salesforce Service Cloud</p>
            </div>
          </div>
          <div className="p-3 border-t">
            <div className="flex gap-2">
              <input
                type="text"
                className="input-field text-sm py-2 flex-grow"
                placeholder="Nhập tin nhắn của bạn..."
                disabled
              />
              <button className="btn btn-primary py-2 px-4" disabled>
                Gửi
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={toggleChat}
          className="bg-primary-600 text-white p-4 rounded-full shadow-lg hover:bg-primary-700 transition-colors"
          aria-label="Open chat"
        >
          <MessageCircle size={24} />
        </button>
      )}
    </div>
  );
};

export default ChatWidget;