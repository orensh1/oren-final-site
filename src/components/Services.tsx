import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Palette, Zap, TrendingUp } from 'lucide-react';

const services = [
  {
    icon: Layout,
    title: "דפי נחיתה ממירים",
    description: "בניית דפים שממוקדים במטרה אחת: להפוך מתעניינים ללקוחות משלמים. מבנה פסיכולוגי מדויק."
  },
  {
    icon: Palette,
    title: "עיצוב UI/UX מתקדם",
    description: "עיצוב שלא רק נראה טוב, אלא מרגיש נכון. חווית משתמש חלקה שמשדרת מקצועיות ואמינות."
  },
  {
    icon: Zap,
    title: "פיתוח מהיר ורספונסיבי",
    description: "קוד נקי, טעינה מהירה בטירוף והתאמה מושלמת לכל מסך - ממובייל ועד דסקטופ."
  },
  {
    icon: TrendingUp,
    title: "אופטימיזציה להמרה",
    description: "שימוש בטכניקות שכנוע וקופירייטינג כדי למקסם את החזר ההשקעה (ROI) של הקמפיינים שלך."
  }
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 relative bg-zinc-950">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">השירותים שלי</h2>
          <p className="text-zinc-400 text-lg max-w-2xl mx-auto">
            אני לא רק בונה אתרים, אני בונה מנועי צמיחה לעסקים. הנה איך אני עושה את זה.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ServiceCard: React.FC<{ icon: any, title: string, description: string, index: number }> = ({ icon: Icon, title, description, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -10 }}
      className="bg-zinc-900/50 border border-white/5 p-8 rounded-2xl group hover:border-pink-500/50 hover:bg-zinc-900 transition-all duration-300 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="w-12 h-12 bg-zinc-800 rounded-lg flex items-center justify-center mb-6 group-hover:bg-pink-500 group-hover:text-white transition-colors duration-300">
        <Icon size={24} />
      </div>
      
      <h3 className="text-xl font-bold mb-3 text-white group-hover:text-pink-400 transition-colors">{title}</h3>
      <p className="text-zinc-400 leading-relaxed text-sm">
        {description}
      </p>
    </motion.div>
  );
};

export default Services;