import React from 'react';
import { User, TrendingUp, Phone } from 'lucide-react';

const SuccessStack: React.FC = () => {
    return (
        <div className="absolute inset-0 z-0 pointer-events-none hidden md:flex items-center justify-center -translate-x-1/4 translate-y-20 opacity-80">
            <div className="relative w-[300px] h-[400px]">
                {/* Card 1: New Lead */}
                <div
                    className="absolute left-0 bottom-0 animate-float-up"
                    style={{ animationDelay: '0s' }}
                >
                    <GlassCard
                        icon={<User size={20} className="text-blue-400" />}
                        text="ליד חדש התקבל"
                        color="blue"
                    />
                </div>

                {/* Card 2: Traffic */}
                <div
                    className="absolute left-10 bottom-24 animate-float-up"
                    style={{ animationDelay: '2.5s' }}
                >
                    <GlassCard
                        icon={<TrendingUp size={20} className="text-green-400" />}
                        text="+150% תנועה לאתר"
                        color="green"
                    />
                </div>

                {/* Card 3: Call Scheduled */}
                <div
                    className="absolute -left-8 bottom-48 animate-float-up"
                    style={{ animationDelay: '5s' }}
                >
                    <GlassCard
                        icon={<Phone size={20} className="text-purple-400" />}
                        text="שיחה נקבעה"
                        color="purple"
                    />
                </div>
            </div>
        </div>
    );
};

const GlassCard = ({ icon, text, color }: { icon: React.ReactNode, text: string, color: string }) => (
    <div className={`flex flex-row-reverse items-center gap-4 px-6 py-4 rounded-2xl border border-white/10 bg-[#0A0A0A]/80 backdrop-blur-sm shadow-lg min-w-[240px] group transition-colors duration-300 hover:border-${color}-500/30`}>
        <div className={`w-10 h-10 rounded-full bg-${color}-500/10 flex items-center justify-center relative`}>
            <div className="relative z-10">
                {icon}
            </div>
        </div>
        <span className="text-base font-bold text-white tracking-wide" dir="rtl">{text}</span>
    </div>
);

export default SuccessStack;
