import React, { useState } from 'react';
import { X, Loader2, CheckCircle, Send, User, Mail, Phone, Building } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { Button } from './Button';

interface LeadFormModalProps {
  onClose: () => void;
  source?: string; // To track which button opened the form
}

export const LeadFormModal: React.FC<LeadFormModalProps> = ({ onClose, source = 'General' }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    note: ''
  });
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [generatedEmail, setGeneratedEmail] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. SIMULATE DATABASE INSERT
      // In a real app, this would be: await supabase.from('Customer').insert(formData);
      console.log(`[MOCK DB] Inserted into 'Customer' table:`, {
        ...formData,
        source: source,
        timestamp: new Date().toISOString()
      });

      // 2. GENERATE FORMAL EMAIL USING AI
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `
          Bạn là hệ thống trả lời tự động của công ty FastPOS.
          Khách hàng tên là "${formData.name}" vừa đăng ký tư vấn qua website.
          Hãy viết một email phản hồi (chỉ nội dung email, không cần tiêu đề phụ) với giọng văn:
          1. Cực kỳ trang trọng, chuyên nghiệp (Formal).
          2. Cảm ơn khách hàng đã quan tâm đến giải pháp FastPOS.
          3. Xác nhận đã nhận được thông tin (SĐT: ${formData.phone}).
          4. Thông báo rằng chuyên viên tư vấn sẽ liên hệ lại trong vòng 2 giờ làm việc.
          5. Ký tên: Ban Quản Trị FastPOS.
        `,
      });

      const emailContent = response.text || "Cảm ơn bạn đã đăng ký. Chúng tôi sẽ liên hệ sớm.";
      setGeneratedEmail(emailContent);
      
      // 3. SIMULATE SENDING EMAIL
      console.log("Sending Email...", emailContent);
      
      setStep('success');
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Đã có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden relative flex flex-col max-h-[90vh]">
        
        {/* Close Button */}
        <button 
          onClick={onClose} 
          className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors z-10"
        >
          <X size={20} className="text-gray-500" />
        </button>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          {step === 'form' ? (
            <div className="p-8">
              <div className="text-center mb-8">
                <div className="w-12 h-12 bg-accent-orange/10 text-accent-orange rounded-2xl flex items-center justify-center mx-auto mb-4">
                   <Send size={24} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Đăng Ký Tư Vấn</h2>
                <p className="text-sm text-gray-500">
                  Để lại thông tin, chuyên gia FastPOS sẽ liên hệ demo giải pháp cho doanh nghiệp của bạn.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-4">
                  <div className="relative group">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-accent-orange transition-colors" size={18} />
                    <input
                      required
                      name="name"
                      type="text"
                      placeholder="Họ và tên của bạn"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-accent-orange focus:ring-2 focus:ring-accent-orange/20 transition-all outline-none"
                    />
                  </div>

                  <div className="relative group">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-accent-orange transition-colors" size={18} />
                    <input
                      required
                      name="email"
                      type="email"
                      placeholder="Email công việc"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-accent-orange focus:ring-2 focus:ring-accent-orange/20 transition-all outline-none"
                    />
                  </div>

                  <div className="relative group">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-accent-orange transition-colors" size={18} />
                    <input
                      required
                      name="phone"
                      type="tel"
                      placeholder="Số điện thoại"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-accent-orange focus:ring-2 focus:ring-accent-orange/20 transition-all outline-none"
                    />
                  </div>

                  <div className="relative group">
                    <Building className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-accent-orange transition-colors" size={18} />
                    <input
                      name="company"
                      type="text"
                      placeholder="Tên doanh nghiệp / Cửa hàng"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl focus:bg-white focus:border-accent-orange focus:ring-2 focus:ring-accent-orange/20 transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <Button 
                    type="submit" 
                    fullWidth 
                    variant="primary" 
                    disabled={loading}
                    className="py-4 text-lg shadow-accent-orange/30"
                  >
                    {loading ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="animate-spin" /> Đang xử lý...
                      </div>
                    ) : (
                      'Xác Nhận & Nhận Tư Vấn'
                    )}
                  </Button>
                </div>
                
                <p className="text-xs text-center text-gray-400 mt-4">
                   Thông tin của bạn được bảo mật an toàn theo chính sách của FastPOS.
                </p>
              </form>
            </div>
          ) : (
            <div className="p-8 h-full flex flex-col">
               <div className="text-center mb-6">
                 <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
                   <CheckCircle size={32} />
                 </div>
                 <h2 className="text-2xl font-bold text-gray-900">Đăng Ký Thành Công!</h2>
                 <p className="text-gray-500 mt-2">Dữ liệu đã được lưu vào hệ thống.</p>
               </div>

               <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100 flex-1 overflow-y-auto mb-6">
                 <div className="flex items-center gap-2 mb-3 border-b border-gray-200 pb-2">
                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wide">AI Auto-Reply Sent</span>
                 </div>
                 <div className="prose prose-sm prose-gray max-w-none">
                    <p className="whitespace-pre-line text-gray-700 italic">
                      {generatedEmail}
                    </p>
                 </div>
               </div>

               <Button onClick={onClose} fullWidth variant="secondary">
                 Đóng
               </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
