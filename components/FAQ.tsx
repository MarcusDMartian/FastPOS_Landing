import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "FastPOS có phù hợp với mô hình kinh doanh nhỏ không?",
    answer: "Có, FastPOS được thiết kế tối ưu cho mọi quy mô, từ cửa hàng nhỏ lẻ, quán cafe đến chuỗi bán lẻ lớn. Bạn có thể bắt đầu với gói cơ bản miễn phí hoặc gói Startup tiết kiệm và nâng cấp dễ dàng khi doanh nghiệp mở rộng."
  },
  {
    question: "Chi phí triển khai FastPOS được tính như thế nào?",
    answer: "Chúng tôi cung cấp mô hình đăng ký (SaaS) linh hoạt theo tháng hoặc năm để giảm áp lực chi phí ban đầu. Chi phí cụ thể phụ thuộc vào số lượng chi nhánh, người dùng và các tính năng nâng cao bạn cần. Hãy liên hệ để nhận báo giá chi tiết."
  },
  {
    question: "Tôi có cần mua thiết bị phần cứng mới không?",
    answer: "FastPOS hoạt động trên nền tảng web và ứng dụng di động, tương thích với hầu hết các thiết bị phần cứng hiện có như máy tính, máy tính bảng, máy in, máy quét mã vạch. Tuy nhiên, chúng tôi cũng cung cấp các thiết bị chuyên dụng FastHardware nếu bạn cần sự đồng bộ và hiệu suất cao nhất."
  },
  {
    question: "Dữ liệu của tôi có được bảo mật không?",
    answer: "An toàn dữ liệu là ưu tiên hàng đầu của FastPOS. Chúng tôi sử dụng mã hóa SSL/TLS tiêu chuẩn ngân hàng, sao lưu dữ liệu tự động hàng ngày và lưu trữ trên nền tảng đám mây Google Cloud an toàn."
  },
  {
    question: "Thời gian triển khai hệ thống mất bao lâu?",
    answer: "Với quy trình tinh gọn 'Fast & Easy', việc thiết lập hệ thống, nhập liệu sản phẩm và đào tạo nhân viên thường chỉ mất từ 3-7 ngày. Đội ngũ triển khai của chúng tôi sẽ hỗ trợ trực tiếp tại điểm bán."
  },
  {
    question: "FastPOS có hỗ trợ kỹ thuật khi gặp sự cố không?",
    answer: "Chắc chắn rồi. Đội ngũ hỗ trợ khách hàng của chúng tôi luôn sẵn sàng 24/7 qua Hotline, Zalo, Email và Chat trực tuyến trên ứng dụng để đảm bảo hoạt động kinh doanh của bạn luôn thông suốt."
  }
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-white relative">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-4 bg-gray-100 text-gray-600">
                Support Center
            </span>
            <h2 className="text-4xl font-bold text-accent-dark mb-4">Câu Hỏi Thường Gặp</h2>
            <p className="text-gray-500 text-lg">
                Giải đáp nhanh những thắc mắc phổ biến nhất về giải pháp FastPOS.
            </p>
        </div>

        {/* Accordion Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className={`border border-gray-100 rounded-3xl overflow-hidden transition-all duration-300 ${
                openIndex === index 
                  ? 'bg-gray-50 shadow-md border-gray-200' 
                  : 'bg-white hover:border-accent-orange/30'
              }`}
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none group"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span className={`font-bold text-lg pr-4 transition-colors duration-300 ${openIndex === index ? 'text-accent-orange' : 'text-gray-800 group-hover:text-accent-orange'}`}>
                  {faq.question}
                </span>
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${openIndex === index ? 'bg-accent-orange text-white' : 'bg-gray-100 text-gray-400 group-hover:bg-accent-orange/10 group-hover:text-accent-orange'}`}>
                   <ChevronDown 
                     className={`transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`} 
                     size={18} 
                   />
                </div>
              </button>
              
              <div 
                id={`faq-answer-${index}`}
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-dashed border-gray-200 mt-2">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
            <p className="text-gray-500 mb-4">Bạn vẫn còn thắc mắc?</p>
            <a href="#cta" className="text-accent-orange font-bold hover:underline">Liên hệ với đội ngũ tư vấn &rarr;</a>
        </div>

      </div>
    </section>
  );
};