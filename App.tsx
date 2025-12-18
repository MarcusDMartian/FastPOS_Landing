import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  Check, 
  Zap, 
  Users, 
  Layers, 
  BarChart3, 
  ShieldCheck,
  Package,
  ShoppingBag,
  ChevronRight,
  Play,
  ArrowRight,
  Smartphone,
  TrendingUp,
  Activity
} from 'lucide-react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Button } from './components/Button';
import { Playground } from './components/Playground';
import { FloatingChatbot } from './components/FloatingChatbot';
import { FAQ } from './components/FAQ';
import { LeadFormModal } from './components/LeadFormModal';
import { ContactInfo } from './components/ContactInfo';
import { IMAGES } from './constants';

// UI Helper: Pill Tag (như trong ảnh mẫu "Introduction", "Core Services")
const PillTag = ({ text, color = "bg-gray-100 text-gray-600" }: { text: string, color?: string }) => (
  <span className={`inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase mb-4 ${color}`}>
    {text}
  </span>
);

// UI Helper: Card Container (Bo góc lớn 4xl)
const Card = ({ children, className = "", dark = false }: { children: React.ReactNode, className?: string, dark?: boolean }) => (
  <div className={`rounded-4xl p-8 md:p-10 transition-transform duration-500 hover:scale-[1.01] ${dark ? 'bg-accent-dark text-white' : 'bg-bg-surface text-text-main'} ${className}`}>
    {children}
  </div>
);

function App() {
  const [showPlayground, setShowPlayground] = useState(false);
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadSource, setLeadSource] = useState('General');

  // Logic to open Playground (for "Tìm hiểu thêm" or other features if needed later)
  const handleDemoClick = () => setShowPlayground(true);
  
  // Logic to open Lead Form
  const handleLeadFormOpen = (source: string) => {
    setLeadSource(source);
    setShowLeadForm(true);
  };

  const handleConsultClick = () => {
    // Replaced mailto with lead form as well for consistency in CTA
    handleLeadFormOpen('Footer CTA Button');
  };

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-accent-orange selection:text-white relative">
      <Header />

      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 pb-20">
        
        {/* === SECTION 1: HERO (Giới thiệu) === */}
        <section id="ky-nguyen-moi" className="pt-32 pb-20 relative scroll-mt-20">
          {/* Subtle Background Blobs */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full z-0 pointer-events-none overflow-hidden">
             <div className="absolute top-20 left-10 w-96 h-96 bg-accent-purple/10 rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{animationDelay: '0s'}}></div>
             <div className="absolute top-40 right-10 w-80 h-80 bg-accent-orange/10 rounded-full mix-blend-multiply filter blur-3xl animate-float" style={{animationDelay: '2s'}}></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 relative z-10 items-center">
            
            {/* Left: Typography & Intro */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <div className="animate-fade-in-up opacity-0" style={{animationDelay: '100ms'}}>
                <PillTag text="Introduction to FastPOS" color="bg-accent-purple/10 text-accent-purple" />
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] tracking-tight mb-6 text-accent-dark animate-fade-in-up opacity-0" style={{animationDelay: '200ms'}}>
                Vận Hành <span className="text-accent-orange">Tinh Gọn.</span><br />
                Tăng Trưởng <span className="text-accent-purple">Vượt Trội.</span>
              </h1>
              
              <p className="text-xl text-gray-500 mb-8 max-w-xl leading-relaxed animate-fade-in-up opacity-0" style={{animationDelay: '300ms'}}>
                Khách hàng không còn kiên nhẫn với sự chậm trễ. FastPOS hợp nhất quy trình bán lẻ của bạn vào một nền tảng duy nhất, nhanh hơn và thông minh hơn.
              </p>
              
              {/* Feature List */}
              <div className="space-y-4 mb-8 animate-fade-in-up opacity-0" style={{animationDelay: '400ms'}}>
                {[
                  "Quản lý bán hàng đa kênh (Omnichannel)",
                  "Đồng bộ kho hàng & đơn hàng Real-time",
                  "Báo cáo phân tích hành vi khách hàng",
                  "Tích hợp AI dự báo xu hướng"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-gray-700 font-medium group cursor-default">
                    <div className="w-5 h-5 rounded-full bg-green-100 text-green-600 flex items-center justify-center shadow-sm group-hover:bg-green-500 group-hover:text-white transition-colors">
                      <Check size={12} strokeWidth={3} />
                    </div>
                    {item}
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-4 animate-fade-in-up opacity-0" style={{animationDelay: '500ms'}}>
                {/* Changed: Trải nghiệm ngay opens Lead Form */}
                <Button 
                  variant="black" 
                  withArrow 
                  onClick={() => handleLeadFormOpen('Hero: Trải nghiệm ngay')} 
                  className="shadow-xl shadow-gray-200"
                >
                  Trải nghiệm ngay
                </Button>
                <Button variant="secondary" onClick={() => document.getElementById('fastpos')?.scrollIntoView()}>Tìm hiểu thêm</Button>
              </div>
            </div>

            {/* Right: Dynamic Visual */}
            <div className="lg:col-span-6 relative animate-fade-in-up opacity-0" style={{animationDelay: '600ms'}}>
               <div className="relative rounded-3xl shadow-2xl overflow-hidden border border-gray-100 bg-white transform rotate-1 hover:rotate-0 transition-transform duration-700 ease-out">
                 {/* Main Dashboard Image */}
                 <img 
                   src={IMAGES.hero} 
                   alt="FastPOS Dashboard Interface" 
                   className="w-full h-auto object-cover min-h-[400px]"
                 />
                 
                 {/* Gradient Overlay for text contrast if needed, but keeping it clean */}
                 <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500"></div>

                 {/* Floating Card 1: Revenue Stats */}
                 <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-gray-100 animate-float" style={{animationDelay: '1s'}}>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="bg-green-100 p-2 rounded-lg text-green-600">
                        <TrendingUp size={20} />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400 font-bold uppercase">Doanh thu hôm nay</p>
                        <p className="text-lg font-bold text-gray-900">48.500.000đ</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 text-xs font-bold text-green-500 bg-green-50 px-2 py-1 rounded-full w-fit">
                       <ArrowUpRight size={12} /> +24% so với hôm qua
                    </div>
                 </div>

                 {/* Floating Card 2: Performance */}
                 <div className="absolute bottom-8 left-8 bg-accent-dark/90 backdrop-blur-md p-5 rounded-2xl shadow-xl animate-float" style={{animationDelay: '0s'}}>
                    <div className="flex items-center gap-4">
                      <div className="bg-brand-yellow p-3 rounded-xl text-accent-dark">
                        <Zap size={24} fill="currentColor" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-300 uppercase font-bold tracking-wide">Hiệu suất hệ thống</p>
                        <p className="text-2xl font-bold text-white">99.9% Uptime</p>
                      </div>
                    </div>
                 </div>
               </div>
               
               {/* Decorative dots behind */}
               <div className="absolute -bottom-6 -right-6 -z-10 text-gray-200">
                  <svg width="100" height="100" fill="currentColor" viewBox="0 0 100 100">
                     <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                        <circle cx="2" cy="2" r="2" />
                     </pattern>
                     <rect width="100" height="100" fill="url(#dots)" />
                  </svg>
               </div>
            </div>
          </div>
        </section>


        {/* === SECTION 2: CORE PRINCIPLES (Giá trị) === */}
        <section id="vien-canh-tuong-lai" className="py-12 scroll-mt-28">
          <div className="flex flex-col md:flex-row justify-between items-end mb-10">
            <div>
              <PillTag text="Core Values" />
              <h2 className="text-4xl font-bold text-accent-dark">Giá Trị Cốt Lõi</h2>
            </div>
            <p className="text-gray-500 max-w-md text-right hidden md:block">
              Ba trụ cột giúp doanh nghiệp bán lẻ đứng vững trước biến động thị trường.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Card 1: Orange - Tốc độ */}
            <div className="bg-accent-orange rounded-4xl p-8 text-white relative group overflow-hidden min-h-[320px] flex flex-col justify-between">
              <div className="absolute top-0 right-0 p-8 opacity-20 transform group-hover:scale-150 transition-transform duration-500">
                <Zap size={120} />
              </div>
              <div className="bg-white/20 w-12 h-12 rounded-xl flex items-center justify-center backdrop-blur-sm mb-6">
                <Zap size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">Tốc Độ &<br/>Tiện Lợi</h3>
                <p className="text-orange-100 text-sm leading-relaxed">
                  Xử lý đơn hàng trong tích tắc. Thanh toán chạm, QR Code, thẻ từ. Không để khách hàng chờ đợi quá 30 giây.
                </p>
              </div>
              <div className="mt-6 flex justify-end">
                <div className="w-10 h-10 rounded-full bg-white text-accent-orange flex items-center justify-center">
                  <ArrowUpRight size={20} />
                </div>
              </div>
            </div>

            {/* Card 2: Purple - Dữ liệu */}
            <div className="bg-accent-purple rounded-4xl p-8 text-white relative group overflow-hidden min-h-[320px] flex flex-col justify-between">
              <div className="absolute top-0 right-0 p-8 opacity-20 transform group-hover:scale-150 transition-transform duration-500">
                <BarChart3 size={120} />
              </div>
              <div className="bg-white/20 w-12 h-12 rounded-xl flex items-center justify-center backdrop-blur-sm mb-6">
                <BarChart3 size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">Dữ Liệu &<br/>Thấu Hiểu</h3>
                <p className="text-purple-100 text-sm leading-relaxed">
                  Báo cáo thời gian thực. Phân tích hành vi khách hàng để đưa ra quyết định nhập hàng và khuyến mãi chính xác.
                </p>
              </div>
              <div className="mt-6 flex justify-end">
                <div className="w-10 h-10 rounded-full bg-white text-accent-purple flex items-center justify-center">
                  <ArrowUpRight size={20} />
                </div>
              </div>
            </div>

            {/* Card 3: Green - Kết nối */}
            <div className="bg-accent-green rounded-4xl p-8 text-accent-dark relative group overflow-hidden min-h-[320px] flex flex-col justify-between">
              <div className="absolute top-0 right-0 p-8 opacity-20 transform group-hover:scale-150 transition-transform duration-500">
                <Users size={120} />
              </div>
              <div className="bg-white/40 w-12 h-12 rounded-xl flex items-center justify-center backdrop-blur-sm mb-6">
                <Users size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-3">Gắn Kết &<br/>Trung Thành</h3>
                <p className="text-gray-800 text-sm leading-relaxed">
                  Hệ thống CRM tích hợp. Tự động gửi ưu đãi, chúc mừng sinh nhật, giữ chân khách hàng quay lại.
                </p>
              </div>
              <div className="mt-6 flex justify-end">
                <div className="w-10 h-10 rounded-full bg-white text-accent-green flex items-center justify-center">
                  <ArrowUpRight size={20} />
                </div>
              </div>
            </div>

          </div>
        </section>


        {/* === SECTION 3: CASE STUDY STYLE (Problem & Solution) === */}
        {/* Uses the "Successful Circular Economy Case Study" layout */}
        <section id="me-cung-van-hanh" className="py-12">
          <Card className="bg-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              
              {/* Left Content */}
              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <div className="bg-black text-white text-xs font-bold px-3 py-1 inline-block rounded-full mb-6">PROBLEM</div>
                  <h2 className="text-4xl font-bold mb-6 text-accent-dark">Mê Cung Vận Hành</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Quy trình rời rạc</h4>
                      <p className="text-gray-500 text-sm">Sổ sách, Excel, và phần mềm kế toán không nói chuyện với nhau.</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Nhân viên kiệt sức</h4>
                      <p className="text-gray-500 text-sm">Tốn 4h/ngày cho các việc thủ công lặp lại thay vì bán hàng.</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Thất thoát kho</h4>
                      <p className="text-gray-500 text-sm">Không kiểm soát được hàng tồn thực tế so với sổ sách.</p>
                    </div>
                  </div>
                </div>

                <div className="mt-10">
                   <p className="text-sm text-gray-400">CASE STUDY: RETAIL CHAINS</p>
                </div>
              </div>

              {/* Right Visuals (Grid collage like reference) */}
              <div className="lg:col-span-7 grid grid-cols-2 gap-4 h-full min-h-[400px]">
                 <div className="col-span-2 relative h-48 md:h-64 rounded-3xl overflow-hidden">
                    <img src={IMAGES.maze} className="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-500" alt="Maze" />
                    <div className="absolute top-4 right-4 bg-accent-orange text-white text-xs font-bold px-3 py-1 rounded-full">
                      30% lãng phí
                    </div>
                 </div>
                 <div className="relative rounded-3xl overflow-hidden bg-accent-orange p-6 flex items-end">
                    <h3 className="text-white font-bold text-2xl">Mất khách<br/>vì chờ đợi</h3>
                 </div>
                 <div className="relative rounded-3xl overflow-hidden h-48 md:h-auto">
                    <img src={IMAGES.decision} className="absolute inset-0 w-full h-full object-cover" alt="Decision" />
                 </div>
              </div>
            </div>
          </Card>
        </section>


        {/* === SECTION 4: UNIFIED PLATFORM (Giải pháp) === */}
        <section id="nen-tang-hop-nhat" className="py-12 scroll-mt-28">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Left: Headline & List */}
            <div className="bg-white border-2 border-gray-100 rounded-4xl p-10 flex flex-col justify-center">
              <PillTag text="Unified Platform" color="bg-orange-100 text-accent-orange" />
              <h2 className="text-4xl font-bold mb-8">
                Nền Tảng <span className="text-accent-orange">Hợp Nhất</span>
              </h2>
              <p className="text-gray-500 mb-8">
                Không còn chuyển đổi giữa các tab. Mọi thứ bạn cần để vận hành đều nằm trên một màn hình duy nhất.
              </p>

              <div className="space-y-4">
                {[
                  { icon: ShoppingBag, label: "Bán Hàng (POS)", desc: "Giao diện cảm ứng tối ưu" },
                  { icon: Package, label: "Kho Vận (Inventory)", desc: "Đồng bộ đa chi nhánh" },
                  { icon: Users, label: "Nhân Sự (HRM)", desc: "Chấm công & Hoa hồng" },
                  { icon: Layers, label: "Báo Cáo (Report)", desc: "Real-time Dashboard" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50 transition-colors">
                    <div className="bg-gray-100 p-2 rounded-xl text-gray-700">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900 text-sm uppercase tracking-wide">{item.label}</div>
                      <div className="text-xs text-gray-400">{item.desc}</div>
                    </div>
                    <ArrowRight size={16} className="ml-auto text-gray-300" />
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Visual Imagery (Collage) */}
            <div className="grid grid-rows-2 gap-6">
               <div className="bg-accent-blue rounded-4xl overflow-hidden relative min-h-[250px] group">
                  <img src={IMAGES.platform} className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-80 group-hover:scale-105 transition-transform duration-700" alt="Platform" />
                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <h3 className="text-white text-3xl font-bold">All-in-One</h3>
                  </div>
               </div>
               <div className="grid grid-cols-2 gap-6">
                  <div className="bg-bg-surface rounded-4xl flex items-center justify-center p-6">
                     <div className="text-center">
                        <Smartphone size={40} className="mx-auto mb-2 text-gray-400" />
                        <span className="font-bold text-gray-600">Mobile</span>
                     </div>
                  </div>
                  <div className="bg-bg-surface rounded-4xl flex items-center justify-center p-6">
                     <div className="text-center">
                        <Layers size={40} className="mx-auto mb-2 text-gray-400" />
                        <span className="font-bold text-gray-600">Web</span>
                     </div>
                  </div>
               </div>
            </div>

          </div>
        </section>


        {/* === SECTION 5: STATS & RESULTS (Hiệu quả) === */}
        {/* Dark card + Colorful small cards */}
        <section id="bao-cao-thong-minh" className="py-12 scroll-mt-28">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Dark Main Card */}
            <div className="md:col-span-7 bg-accent-dark rounded-4xl p-10 text-white flex flex-col justify-between min-h-[400px]">
              <div>
                <h2 className="text-4xl font-bold mb-4">Kết Quả &<br/>Lợi Ích Thực Tế</h2>
                <p className="text-gray-400 max-w-sm">
                  Chúng tôi không chỉ bán phần mềm. Chúng tôi mang lại sự tăng trưởng có thể đo lường được bằng con số.
                </p>
              </div>
              
              <div className="mt-8">
                 {/* Changed: Xem báo cáo mẫu opens Lead Form */}
                 <Button 
                   variant="primary" 
                   withArrow 
                   onClick={() => handleLeadFormOpen('Stats: Xem báo cáo mẫu')}
                 >
                   Xem Báo Cáo Mẫu
                 </Button>
              </div>

              {/* Decorative Image Strip at bottom */}
              <div className="mt-8 h-24 rounded-2xl overflow-hidden relative">
                 <img src={IMAGES.reports} className="absolute inset-0 w-full h-full object-cover opacity-50" alt="Reports" />
              </div>
            </div>

            {/* Right: Bento Stats */}
            <div className="md:col-span-5 flex flex-col gap-6">
               
               {/* Orange Stat */}
               <div className="bg-accent-orange rounded-4xl p-6 text-white flex-1 relative overflow-hidden group">
                  <div className="relative z-10">
                    <h3 className="text-5xl font-bold mb-1">30%</h3>
                    <p className="text-sm font-medium opacity-90">Giảm chi phí vận hành</p>
                  </div>
                  <div className="absolute top-4 right-4 bg-white/20 p-2 rounded-full">
                    <ArrowUpRight size={20} />
                  </div>
               </div>

               {/* Purple Stat */}
               <div className="bg-accent-purple rounded-4xl p-6 text-white flex-1 relative overflow-hidden group">
                  <div className="relative z-10">
                    <h3 className="text-5xl font-bold mb-1">90%</h3>
                    <p className="text-sm font-medium opacity-90">Tỷ lệ khách hàng quay lại</p>
                  </div>
                   <div className="absolute top-4 right-4 bg-white/20 p-2 rounded-full">
                    <ArrowUpRight size={20} />
                  </div>
               </div>

               {/* Blue Stat */}
               <div className="bg-accent-blue rounded-4xl p-6 text-white flex-1 relative overflow-hidden group">
                  <div className="relative z-10 flex items-center gap-4">
                     <Users size={32} />
                     <div>
                       <h3 className="text-2xl font-bold">1 Triệu+</h3>
                       <p className="text-xs opacity-90">Đơn hàng được xử lý</p>
                     </div>
                  </div>
                   <div className="absolute top-4 right-4 bg-white/20 p-2 rounded-full">
                    <ArrowUpRight size={20} />
                  </div>
               </div>

            </div>
          </div>
        </section>

        {/* === SECTION 6: FAQ === */}
        <FAQ />

        {/* === SECTION 7: CONTACT INFO (New) === */}
        <ContactInfo />

        {/* === SECTION 8: IMPLEMENTATION & CTA === */}
        <section id="cta" className="py-12">
           <div className="bg-gray-100 rounded-4xl p-10 md:p-20 text-center relative overflow-hidden">
             {/* Decor */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-accent-orange rounded-full filter blur-3xl opacity-10 -translate-y-1/2 translate-x-1/2"></div>
             <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent-purple rounded-full filter blur-3xl opacity-10 translate-y-1/2 -translate-x-1/2"></div>

             <div className="relative z-10 max-w-3xl mx-auto">
               <PillTag text="Implementation Strategies" />
               <h2 className="text-4xl md:text-6xl font-bold text-accent-dark mb-8">
                 Sẵn Sàng Kiến Tạo Tương Lai?
               </h2>
               <p className="text-xl text-gray-500 mb-10">
                 Đăng ký tư vấn ngay hôm nay để nhận lộ trình triển khai FastPOS phù hợp nhất với mô hình kinh doanh của bạn.
               </p>

               <div className="grid md:grid-cols-3 gap-6 text-left mb-12">
                 {[
                   { step: 1, title: "Tư Vấn", text: "Khảo sát quy trình hiện tại" },
                   { step: 2, title: "Triển Khai", text: "Setup hệ thống & Đào tạo" },
                   { step: 3, title: "Tăng Trưởng", text: "Tối ưu hóa & Hỗ trợ 24/7" },
                 ].map((s) => (
                   <div key={s.step} className="bg-white p-6 rounded-3xl shadow-sm">
                     <div className="w-8 h-8 rounded-full bg-accent-purple text-white flex items-center justify-center font-bold mb-4">{s.step}</div>
                     <h4 className="font-bold text-lg mb-1">{s.title}</h4>
                     <p className="text-sm text-gray-500">{s.text}</p>
                   </div>
                 ))}
               </div>

               <div className="flex flex-col sm:flex-row justify-center gap-4">
                 {/* Changed: Lên Lịch Demo opens Lead Form */}
                 <Button 
                   variant="primary" 
                   withArrow 
                   onClick={() => handleLeadFormOpen('CTA: Lên Lịch Demo')} 
                   className="text-lg px-8 py-4"
                 >
                   Lên Lịch Demo
                 </Button>
                 {/* Changed: Liên Hệ Tư Vấn also opens Lead Form (consistent with request to capture leads) */}
                 <Button 
                   variant="secondary" 
                   onClick={() => handleLeadFormOpen('CTA: Liên Hệ Tư Vấn')} 
                   className="text-lg px-8 py-4"
                 >
                   Liên Hệ Tư Vấn
                 </Button>
               </div>
             </div>
           </div>
        </section>

      </main>

      <Footer />
      
      {/* Floating Chatbot Component */}
      <FloatingChatbot />

      {/* Render Modals */}
      {showPlayground && (
        <Playground onClose={() => setShowPlayground(false)} />
      )}

      {showLeadForm && (
        <LeadFormModal 
          onClose={() => setShowLeadForm(false)} 
          source={leadSource}
        />
      )}
    </div>
  );
}

export default App;