import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Bell, MessageCircle, ShoppingBag } from 'lucide-react';

const notificationTypes = [
    { text: "ליד חדש התקבל!", icon: CheckCircle2, color: "text-green-400" },
    { text: "שיחה נכנסת...", icon: Bell, color: "text-blue-400" },
    { text: "פנייה חדשה", icon: MessageCircle, color: "text-purple-400" },
    { text: "הזמנה חדשה", icon: ShoppingBag, color: "text-pink-400" }
];

interface ActiveNotification {
    id: number;
    data: typeof notificationTypes[0];
    xOffset: number;
}

const LiveNotifications: React.FC = () => {
    const [notifications, setNotifications] = useState<ActiveNotification[]>([]);

    useEffect(() => {
        let counter = 0;
        const interval = setInterval(() => {
            const newNotif = {
                id: Date.now(),
                data: notificationTypes[counter % notificationTypes.length],
                xOffset: Math.random() * 40 - 20 // Random X drift
            };

            setNotifications(prev => [...prev.slice(-4), newNotif]); // Keep max 5 items
            counter++;
        }, 2500); // Add new one every 2.5s

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="absolute bottom-0 left-4 md:left-20 w-[300px] h-[60vh] z-0 pointer-events-none overflow-hidden">
            <AnimatePresence>
                {notifications.map((item) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 100, x: item.xOffset, scale: 0.8 }}
                        animate={{
                            opacity: [0, 0.7, 0], // Fade in then out 
                            y: -400, // Float up significantly
                            scale: 1
                        }}
                        transition={{
                            duration: 10, // Slow float
                            ease: "easeOut"
                        }}
                        className="absolute bottom-0 left-0 flex items-center gap-3 px-4 py-2 bg-white/[0.02] backdrop-blur-sm border border-white/5 rounded-full"
                        onAnimationComplete={() => {
                            setNotifications(prev => prev.filter(n => n.id !== item.id));
                        }}
                    >
                        <div className={`p-1.5 rounded-full bg-white/5 ${item.data.color}`}>
                            <item.data.icon size={14} />
                        </div>
                        <span className="text-white/60 text-sm font-medium tracking-wide whitespace-nowrap">
                            {item.data.text}
                        </span>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default LiveNotifications;
