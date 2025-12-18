import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Minimize2, Sparkles, MapPin } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

export const FloatingChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string, links?: string[]}[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatSessionRef = useRef<any>(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const getChatSession = () => {
    if (!chatSessionRef.current) {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      // UPDATED: Use gemini-2.5-flash with googleMaps tool
      chatSessionRef.current = ai.chats.create({
        model: 'gemini-2.5-flash',
        config: { 
          tools: [{googleMaps: {}}],
          systemInstruction: 'Bạn là trợ lý AI chuyên nghiệp của FastPOS. Địa chỉ trụ sở công ty tại 66 Nguyễn Huệ, Quận 1, TP.HCM. Nhiệm vụ của bạn là hỗ trợ khách hàng tìm hiểu về các giải pháp quản lý bán hàng, tồn kho, nhân sự của FastPOS. Hãy trả lời ngắn gọn, súc tích, thân thiện và sử dụng tiếng Việt. Nếu khách hàng hỏi về địa điểm, hãy sử dụng Google Maps để cung cấp thông tin chính xác.' 
        }
      });
    }
    return chatSessionRef.current;
  };

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const chat = getChatSession();
      const result = await chat.sendMessage({ message: userMsg });
      
      let links: string[] = [];
      // Handle Maps Grounding Metadata extraction
      if (result.candidates?.[0]?.groundingMetadata?.groundingChunks) {
         result.candidates[0].groundingMetadata.groundingChunks.forEach((chunk: any) => {
             if (chunk.web?.uri) {
                 links.push(chunk.web.uri);
             }
         });
      }

      setMessages(prev => [...prev, { role: 'model', text: result.text || "Xin lỗi, tôi không thể phản hồi lúc này.", links }]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Đã có lỗi kết nối. Vui lòng thử lại sau." }]);
      // Reset session on error in case of invalid state
      chatSessionRef.current = null;
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 flex items-center justify-center ${
          isOpen ? 'bg-white text-gray-800 rotate-90' : 'bg-gradient-to-r from-accent-orange to-red-500 text-white'
        }`}
        aria-label="Open Chat"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={28} fill="currentColor" className="text-white/90" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-[350px] md:w-[380px] bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col max-h-[600px] h-[500px] animate-fade-in-up origin-bottom-right overflow-hidden font-sans">
            {/* Header */}
            <div className="p-4 bg-accent-dark text-white flex justify-between items-center bg-gradient-to-r from-gray-900 to-gray-800">
                <div className="flex items-center gap-2">
                    <div className="bg-white/10 p-1.5 rounded-lg">
                        <Sparkles size={16} className="text-yellow-400" />
                    </div>
                    <div>
                        <h3 className="font-bold text-sm">FastPOS AI</h3>
                        <p className="text-[10px] text-gray-400 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Online
                        </p>
                    </div>
                </div>
                <button onClick={toggleChat} className="text-gray-400 hover:text-white transition-colors">
                    <Minimize2 size={18}/>
                </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
                {messages.length === 0 && (
                    <div className="text-center mt-8 space-y-3">
                        <div className="w-16 h-16 bg-white rounded-2xl mx-auto flex items-center justify-center shadow-sm">
                            <MessageCircle size={32} className="text-accent-orange" />
                        </div>
                        <div>
                            <p className="font-bold text-gray-800">Xin chào!</p>
                            <p className="text-xs text-gray-500 px-6">Tôi là trợ lý ảo FastPOS. Bạn cần tư vấn về tính năng nào?</p>
                        </div>
                        <div className="flex flex-wrap justify-center gap-2 px-4">
                            {['Giá cả thế nào?', 'Văn phòng ở đâu?', 'Có dùng thử không?'].map(q => (
                                <button 
                                    key={q} 
                                    onClick={() => setInput(q)} 
                                    className="text-xs bg-white border border-gray-200 px-3 py-1.5 rounded-full hover:border-accent-orange hover:text-accent-orange transition-colors"
                                >
                                    {q}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
                
                {messages.map((msg, idx) => (
                    <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                        <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                            msg.role === 'user' 
                            ? 'bg-accent-orange text-white rounded-tr-sm' 
                            : 'bg-white border border-gray-100 text-gray-700 rounded-tl-sm'
                        }`}>
                            {msg.text}
                        </div>
                        {/* Render Links if any */}
                        {msg.links && msg.links.length > 0 && (
                            <div className="mt-2 space-y-1">
                                {msg.links.map((link, i) => (
                                    <a key={i} href={link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-md hover:underline">
                                        <MapPin size={10} /> Xem trên bản đồ
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
                
                {loading && (
                    <div className="flex justify-start">
                        <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-2">
                            <Loader2 className="w-3 h-3 animate-spin text-accent-orange" />
                            <span className="text-xs text-gray-400">Đang tìm kiếm...</span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 bg-white border-t border-gray-100">
                <div className="relative flex items-center">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Hỏi tôi bất cứ điều gì..."
                        className="w-full pl-4 pr-12 py-3 bg-gray-100 border-transparent focus:bg-white focus:border-accent-orange/50 border rounded-full text-sm transition-all focus:outline-none focus:ring-2 focus:ring-accent-orange/20"
                    />
                    <button 
                        onClick={handleSend} 
                        disabled={loading || !input.trim()}
                        className="absolute right-1.5 p-2 bg-accent-orange text-white rounded-full hover:bg-orange-600 disabled:opacity-50 disabled:hover:bg-accent-orange transition-colors shadow-sm"
                    >
                        <Send size={16} />
                    </button>
                </div>
                <div className="text-center mt-2">
                   <p className="text-[10px] text-gray-400">Powered by Gemini 2.5 Flash</p>
                </div>
            </div>
        </div>
      )}
    </>
  );
};