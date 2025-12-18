import React, { useState, useRef, useEffect } from 'react';
import { X, MessageSquare, Image as ImageIcon, Video, Send, Loader2, Upload, AlertCircle, Zap } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { Button } from './Button';

// Helper to encode file to base64
const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const result = reader.result as string;
      // Remove data URL prefix (e.g., "data:image/png;base64,")
      const base64 = result.split(',')[1];
      resolve(base64);
    };
    reader.onerror = error => reject(error);
  });
};

// --- Chat Component ---
const ChatFeature = () => {
  const [messages, setMessages] = useState<{role: 'user' | 'model', text: string}[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const chat = ai.chats.create({
        model: 'gemini-3-pro-preview',
        config: { systemInstruction: 'You are a helpful assistant for the FastPOS application.' }
      });

      // Replay history (simplified)
      // Note: In a real app, maintain chat history properly in the chat object
      // Here we just send the new message for simplicity in this demo context
      
      const result = await chat.sendMessage({ message: userMsg });
      setMessages(prev => [...prev, { role: 'model', text: result.text || "No response" }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'model', text: "Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[500px]">
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50 rounded-xl mb-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-20">
            <MessageSquare className="w-12 h-12 mx-auto mb-2 opacity-20" />
            <p>Chào bạn! Tôi có thể giúp gì cho bạn về FastPOS?</p>
          </div>
        )}
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-lg ${msg.role === 'user' ? 'bg-primary text-primary-content' : 'bg-white border border-gray-200 shadow-sm'}`}>
              {msg.text}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 p-3 rounded-lg shadow-sm">
              <Loader2 className="w-4 h-4 animate-spin text-primary" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Nhập câu hỏi của bạn..."
          className="flex-1 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
        <Button onClick={handleSend} disabled={loading || !input.trim()} className="px-4">
          <Send size={20} />
        </Button>
      </div>
    </div>
  );
};

// --- Image Edit Component ---
const ImageEditFeature = () => {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      setResultImage(null);
    }
  };

  const handleGenerate = async () => {
    if (!image || !prompt || loading) return;
    setLoading(true);

    try {
      const base64Data = await fileToBase64(image);
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            { inlineData: { mimeType: image.type, data: base64Data } },
            { text: prompt }
          ]
        }
      });

      // Find image part
      let foundImage = false;
      if (response.candidates?.[0]?.content?.parts) {
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) {
            setResultImage(`data:image/png;base64,${part.inlineData.data}`);
            foundImage = true;
            break;
          }
        }
      }
      if (!foundImage) {
        alert("Không tìm thấy hình ảnh trong phản hồi. Vui lòng thử lại.");
      }
    } catch (error) {
      console.error(error);
      alert("Đã xảy ra lỗi khi xử lý hình ảnh.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        {/* Input Area */}
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors relative">
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageUpload} 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="max-h-48 mx-auto rounded-lg shadow-sm" />
            ) : (
              <div className="flex flex-col items-center text-gray-400">
                <Upload size={32} className="mb-2" />
                <p>Tải ảnh lên</p>
              </div>
            )}
          </div>
          
          <div className="flex gap-2">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Ví dụ: Thêm hiệu ứng retro, Xóa người phía sau..."
              className="flex-1 p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
            />
            <Button onClick={handleGenerate} disabled={!image || !prompt || loading}>
              {loading ? <Loader2 className="animate-spin" /> : 'Sửa'}
            </Button>
          </div>
        </div>

        {/* Result Area */}
        <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-center min-h-[300px]">
          {loading ? (
            <div className="text-center">
              <Loader2 className="w-8 h-8 animate-spin text-primary mx-auto mb-2" />
              <p className="text-gray-500 animate-pulse">Đang xử lý hình ảnh...</p>
            </div>
          ) : resultImage ? (
            <img src={resultImage} alt="Result" className="max-h-64 rounded-lg shadow-lg" />
          ) : (
            <p className="text-gray-400">Kết quả sẽ hiển thị ở đây</p>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Veo Video Gen Component ---
const VideoGenFeature = () => {
  const [hasKey, setHasKey] = useState(false);
  const [checkingKey, setCheckingKey] = useState(true);
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    checkKey();
  }, []);

  const checkKey = async () => {
    if (window.aistudio) {
      const has = await window.aistudio.hasSelectedApiKey();
      setHasKey(has);
    }
    setCheckingKey(false);
  };

  const handleSelectKey = async () => {
    if (window.aistudio) {
      await window.aistudio.openSelectKey();
      // Assume success after dialog close logic or re-check
      // In a real scenario, we might wait or need a callback, but instructions say assume success/recheck
      checkKey();
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      setVideoUrl(null);
    }
  };

  const handleGenerate = async () => {
    if (!image || !hasKey) return;
    setLoading(true);

    try {
      // Re-create AI instance with latest key
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const base64Data = await fileToBase64(image);

      let operation = await ai.models.generateVideos({
        model: 'veo-3.1-fast-generate-preview',
        image: {
          imageBytes: base64Data,
          mimeType: image.type,
        },
        config: {
          numberOfVideos: 1,
          resolution: '720p',
          aspectRatio: '16:9'
        }
      });

      // Poll for completion
      while (!operation.done) {
        await new Promise(resolve => setTimeout(resolve, 5000));
        operation = await ai.operations.getVideosOperation({operation: operation});
      }

      const downloadLink = operation.response?.generatedVideos?.[0]?.video?.uri;
      if (downloadLink) {
         // Fetch with key
         const response = await fetch(`${downloadLink}&key=${process.env.API_KEY}`);
         const blob = await response.blob();
         setVideoUrl(URL.createObjectURL(blob));
      } else {
        alert("Không thể tạo video. Vui lòng thử lại.");
      }

    } catch (error: any) {
      console.error(error);
      if (error.message && error.message.includes("Requested entity was not found")) {
        setHasKey(false);
        alert("API Key không hợp lệ hoặc đã hết hạn. Vui lòng chọn lại.");
      } else {
        alert("Đã xảy ra lỗi khi tạo video.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (checkingKey) return <div className="p-8 text-center"><Loader2 className="animate-spin mx-auto" /></div>;

  if (!hasKey) {
    return (
      <div className="text-center p-8 space-y-4">
        <div className="bg-yellow-50 p-4 rounded-lg inline-block">
          <AlertCircle className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
          <p className="text-yellow-800 font-medium">Yêu cầu API Key trả phí</p>
        </div>
        <p className="text-gray-600 max-w-md mx-auto">
          Tính năng tạo video Veo yêu cầu API Key từ dự án có liên kết thanh toán.
        </p>
        <Button onClick={handleSelectKey}>Chọn API Key</Button>
        <div className="text-sm text-gray-500">
          <a href="https://ai.google.dev/gemini-api/docs/billing" target="_blank" rel="noreferrer" className="underline hover:text-primary">
            Xem tài liệu thanh toán
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:bg-gray-50 transition-colors relative">
            <input 
              type="file" 
              accept="image/*" 
              onChange={handleImageUpload} 
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="max-h-48 mx-auto rounded-lg shadow-sm" />
            ) : (
              <div className="flex flex-col items-center text-gray-400">
                <Upload size={32} className="mb-2" />
                <p>Tải ảnh gốc</p>
              </div>
            )}
          </div>
          <Button onClick={handleGenerate} disabled={!image || loading} fullWidth>
            {loading ? (
              <div className="flex items-center gap-2">
                <Loader2 className="animate-spin" /> Đang tạo video (có thể mất vài phút)...
              </div>
            ) : 'Tạo Video với Veo'}
          </Button>
        </div>

        <div className="bg-gray-900 rounded-xl p-4 flex items-center justify-center min-h-[300px]">
          {loading ? (
            <div className="text-center text-white">
              <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
              <p className="animate-pulse">Đang sáng tạo video...</p>
            </div>
          ) : videoUrl ? (
            <video src={videoUrl} controls className="w-full rounded-lg shadow-lg" />
          ) : (
            <div className="text-gray-500 flex flex-col items-center">
              <Video size={48} className="mb-2 opacity-50" />
              <p>Video sẽ hiển thị ở đây</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Main Playground Modal ---
interface PlaygroundProps {
  onClose: () => void;
}

export const Playground: React.FC<PlaygroundProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'chat' | 'image' | 'video'>('chat');

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div className="flex items-center gap-2">
            <div className="bg-primary/10 p-2 rounded-lg text-primary-dark">
              <Zap size={20} />
            </div>
            <h2 className="text-xl font-bold text-gray-900">FastPOS AI Studio</h2>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={24} className="text-gray-500" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100">
          <button
            onClick={() => setActiveTab('chat')}
            className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 transition-colors relative ${activeTab === 'chat' ? 'text-primary-dark' : 'text-gray-500 hover:text-gray-900'}`}
          >
            <MessageSquare size={18} /> Chat Assistant
            {activeTab === 'chat' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />}
          </button>
          <button
            onClick={() => setActiveTab('image')}
            className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 transition-colors relative ${activeTab === 'image' ? 'text-primary-dark' : 'text-gray-500 hover:text-gray-900'}`}
          >
            <ImageIcon size={18} /> Magic Editor
            {activeTab === 'image' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />}
          </button>
          <button
            onClick={() => setActiveTab('video')}
            className={`flex-1 py-4 text-sm font-bold flex items-center justify-center gap-2 transition-colors relative ${activeTab === 'video' ? 'text-primary-dark' : 'text-gray-500 hover:text-gray-900'}`}
          >
            <Video size={18} /> Veo Video
            {activeTab === 'video' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-primary" />}
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-white">
          {activeTab === 'chat' && <ChatFeature />}
          {activeTab === 'image' && <ImageEditFeature />}
          {activeTab === 'video' && <VideoGenFeature />}
        </div>
      </div>
    </div>
  );
};