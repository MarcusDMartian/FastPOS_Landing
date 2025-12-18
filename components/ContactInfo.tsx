import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export const ContactInfo: React.FC = () => {
  return (
    <section id="contact-info" className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Info */}
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-6 bg-accent-orange/10 text-accent-orange">
              Liên Hệ
            </span>
            <h2 className="text-4xl font-bold text-accent-dark mb-6">
              Ghé thăm văn phòng <span className="text-accent-orange">FastYear</span>
            </h2>
            <p className="text-gray-500 mb-8 text-lg">
              Trải nghiệm trực tiếp hệ thống POS tại showroom của chúng tôi hoặc liên hệ để được tư vấn tận nơi.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center flex-shrink-0 text-accent-orange">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Địa chỉ trụ sở</h4>
                  <p className="text-gray-600">66 Nguyễn Huệ, Phường Bến Nghé, Quận 1, TP. Hồ Chí Minh</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center flex-shrink-0 text-accent-orange">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Giờ làm việc</h4>
                  <p className="text-gray-600">Thứ 2 - Thứ 6: 8:00 - 18:00</p>
                  <p className="text-gray-600">Thứ 7: 8:00 - 12:00</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center flex-shrink-0 text-accent-orange">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-900 mb-1">Hotline hỗ trợ</h4>
                  <p className="text-gray-600 font-bold text-lg">0939 373 789</p>
                </div>
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="h-[500px] bg-gray-100 rounded-3xl overflow-hidden shadow-lg border border-gray-200 relative group">
             <iframe 
               width="100%" 
               height="100%" 
               id="gmap_canvas" 
               src="https://maps.google.com/maps?q=66%20Nguyễn%20Huệ%2C%20Quận%201%2C%20Hồ%20Chí%20Minh&t=&z=15&ie=UTF8&iwloc=&output=embed" 
               frameBorder="0" 
               scrolling="no" 
               marginHeight={0} 
               marginWidth={0}
               title="FastPOS Location"
               className="absolute inset-0 w-full h-full grayscale group-hover:grayscale-0 transition-all duration-500"
             ></iframe>
             <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl text-xs font-bold shadow-sm pointer-events-none">
                📍 66 Nguyễn Huệ, Q.1
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};