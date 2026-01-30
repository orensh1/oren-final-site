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

        const addNotification = () => {
            const newNotif = {
                id: Date.now(),
                data: notificationTypes[counter % notificationTypes.length],
                xOffset: Math.random() * 300 - 150 // Wide spread (-150px to 150px)
            };
            setNotifications(prev => [...prev.slice(-6), newNotif]); // More simultaneous items
            counter++;
        };

        // Start immediately
        addNotification();

        const interval = setInterval(addNotification, 2000); // Faster pace for "busier" look

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-0 h-0 z-[-1] overflow-visible pointer-events-none">
            <AnimatePresence>
                {notifications.map((item) => (
                    <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 60, x: item.xOffset, scale: 0.5 }}
                        animate={{
                            opacity: [0, 0.8, 0],
                            y: -400, // Float much higher up
                            scale: [0.5, 1, 0.9]
                        }}
                        transition={{
                            duration: 7, // Slow ascent
                            ease: "easeOut"
                        }}
                        className="absolute bottom-0 left-0 flex items-center gap-3 px-4 py-2 bg-white/[0.05] backdrop-blur-md border border-white/10 rounded-full shadow-xl whitespace-nowrap"
                        style={{ x: "-50%" }} // Center the bubble on its offset
                        onAnimationComplete={() => {
                            setNotifications(prev => prev.filter(n => n.id !== item.id));
                        }}
                    >
                        <div className={`p-1.5 rounded-full bg-white/5 ${item.data.color}`}>
                            <item.data.icon size={14} />
                        </div>
                        <span className="text-white/80 text-sm font-medium tracking-wide">
                            {item.data.text}
                        </span>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default LiveNotifications;
