import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

export type LegalType = 'privacy' | 'accessibility' | 'terms' | null;

interface LegalModalsProps {
    activeModal: LegalType;
    onClose: () => void;
}

const content = {
    privacy: {
        title: "מדיניות פרטיות",
        body: `האתר מכבד את פרטיות המשתמשים. המידע שנאסף (שם וטלפון) נמסר מרצונך החופשי ונועד אך ורק לצורך יצירת קשר למתן שירותי בניית אתרים. המידע נשמר במאגר המידע של אורן שמיר ולא יועבר לצד שלישי ללא הסכמה, למעט כנדרש בחוק. זכותך לעיין במידע ולבקש את מחיקתו בפנייה לטלפון 052-644-8826.`
    },
    accessibility: {
        title: "הצהרת נגישות",
        body: `אני רואה חשיבות עליונה במתן שירות שוויוני לכלל הגולשים ובפרט לבעלי מוגבלויות. האתר נבנה בהתאם להוראות נגישות תכנים באינטרנט (WCAG) ברמה AA. בוצעו התאמות לגלישה באמצעות מקלדת וקוראי מסך. אם נתקלתם בקושי לגלוש באתר, אנא פנו אליי ישירות בטלפון 052-644-8826 ואדאג לטפל בבעיה מיידית.`
    },
    terms: {
        title: "תנאי שימוש",
        body: `השימוש באתר מוצע כמות שהוא (AS-IS). התכנים באתר נועדו למטרות אינפורמטיביות ושיווקיות. אין להעתיק תכנים או תמונות מהאתר ללא אישור בכתב. בעלי האתר לא יישא באחריות לכל נזק עקיף או ישיר שייגרם כתוצאה מהשימוש באתר.`
    }
};

const LegalModals: React.FC<LegalModalsProps> = ({ activeModal, onClose }) => {

    // Close on Escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    return (
        <AnimatePresence>
            {activeModal && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 cursor-pointer"
                    >
                        {/* Modal Container */}
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
                            className="bg-[#111] border border-white/10 w-full max-w-2xl rounded-2xl overflow-hidden shadow-2xl relative cursor-default"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-white/5 bg-white/5">
                                <h3 className="text-xl font-bold text-white">{content[activeModal].title}</h3>
                                <button
                                    onClick={onClose}
                                    className="p-2 rounded-full hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            {/* Body */}
                            <div className="p-8 text-zinc-300 leading-relaxed text-lg whitespace-pre-wrap">
                                {content[activeModal].body}
                            </div>

                            {/* Footer */}
                            <div className="p-6 border-t border-white/5 bg-black/20 text-center">
                                <button
                                    onClick={onClose}
                                    className="px-8 py-2 bg-white text-black font-bold rounded-full hover:bg-zinc-200 transition-colors"
                                >
                                    סגור
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default LegalModals;
