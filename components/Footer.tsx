import React from 'react';
import { Heart, ShoppingBag, Mail, Phone, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-100 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-primary p-1.5 rounded-lg">
                 <ShoppingBag className="h-6 w-6 text-primary-content" />
              </div>
              <span className="text-xl font-bold tracking-tight text-gray-900">FastYear</span>
            </div>
            <p className="text-gray-500 mb-6 max-w-sm leading-relaxed">
              Giải pháp POS tinh gọn, vận hành hiệu quả. Chúng tôi đồng hành cùng sự tăng trưởng bền vững của doanh nghiệp bán lẻ Việt Nam.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold text-gray-900 mb-4">Liên hệ</h4>
            <ul className="space-y-3 text-gray-600 text-sm">
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-primary" /> 
                <a href="mailto:hello@fastyear.vn" className="hover:text-primary transition-colors">hello@fastyear.vn</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-primary" />
                <a href="tel:+84939373789" className="hover:text-primary transition-colors">(+84) 939 373 789</a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-primary" />
                <span>Ho Chi Minh City, Vietnam</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-4">Sản phẩm</h4>
            <ul className="space-y-3 text-gray-600 text-sm">
              <li><a href="#" className="hover:text-primary transition-colors">FastPOS App</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Giải pháp quản trị Fast Manager</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Báo cáo thông minh Fast Report</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Outsource Services</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">&copy; 2025 FastYear. All rights reserved.</p>
          <div className="flex items-center gap-1.5 text-gray-500 text-sm">
            <span>Made with</span>
            <Heart size={14} className="text-red-500 fill-current" />
            <span>in Vietnam</span>
          </div>
        </div>
      </div>
    </footer>
  );
};