
import React from 'react';

const NotificationTab: React.FC = () => {
  return (
    <div className="h-full flex flex-col items-center p-6 bg-white dark:bg-zinc-900 rounded-3xl shadow-2xl relative overflow-hidden font-sans">
      {/* Background Decor - Rising Sun feel */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-red-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 -left-10 w-40 h-40 bg-red-500/5 rounded-full blur-2xl pointer-events-none"></div>

      {/* Header */}
      <div className="flex flex-col items-center mb-8 z-10">
        <div className="mb-4 text-red-600 drop-shadow-lg animate-pulse">
           <svg width="64" height="64" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="6" />
                <path d="M12 2V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M12 20V22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M4.93 4.93L6.34 6.34" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M17.66 17.66L19.07 19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M2 12H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M20 12H22" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M6.34 17.66L4.93 19.07" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <path d="M19.07 4.93L17.66 6.34" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
        </div>
        <h2 className="text-2xl md:text-3xl font-black text-center tracking-tight text-gray-900 dark:text-white uppercase leading-tight">
          THÔNG BÁO<br/><span className="text-red-600">HỢP TÁC NHẬT BẢN</span>
        </h2>
        <div className="w-16 h-1 bg-red-600 mt-4 rounded-full"></div>
      </div>

      {/* Content Frame */}
      <div className="w-full bg-gray-50/50 dark:bg-zinc-800/50 backdrop-blur-xl border border-gray-100 dark:border-zinc-700/50 rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-500 z-10">
        <ul className="space-y-4">
          {[
            "Cập nhật thời trang OL Nhật Bản, streetwear Tokyo, kimono.",
            "Nâng cấp tính năng AI chỉnh ảnh phong cách Nhật.",
            "Bổ sung màu LUT Nhật Bản và ánh sáng dịu Tokyo.",
            "Hỗ trợ tạo poster game, anime, quảng cáo Nhật chuyên nghiệp."
          ].map((item, index) => (
            <li key={index} className="flex items-start group">
              <span className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-red-500 mr-3 group-hover:scale-150 transition-transform duration-300"></span>
              <p className="text-sm md:text-base font-medium text-gray-700 dark:text-gray-300 leading-relaxed group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                {item}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Admin Signature */}
      <div className="mt-auto pt-8 text-center z-10 w-full border-t border-gray-100 dark:border-zinc-800/50">
        <p className="text-xs font-bold tracking-widest text-gray-400 dark:text-gray-500 uppercase mt-4">
          Admin: Bé Quý – Đồng Nai
        </p>
      </div>
    </div>
  );
};

export default NotificationTab;
