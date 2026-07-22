import { motion } from 'framer-motion';
import { CheckCircle2, Sparkles } from 'lucide-react';
import { Mood } from '@/types/mood';

interface ProductivityTipsProps {
  mood: Mood;
  tips: string[];
}

export function ProductivityTips({ mood, tips }: ProductivityTipsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.35 }}
      className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg rounded-3xl p-6 shadow-lg border border-white/50 dark:border-gray-700/50"
    >
      <div className="flex items-start gap-4">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-3xl border border-white/60 text-primary"
          style={{
            background: `linear-gradient(135deg, ${mood.color}20, ${mood.glow}20)`,
          }}
        >
          <Sparkles className="w-6 h-6" />
        </div>

        <div className="flex-1">
          <p className="text-xs uppercase tracking-[0.24em] font-semibold text-primary/80">
            Productivity Tips
          </p>
          <h3 className="mt-2 text-lg font-semibold text-gray-900 dark:text-gray-100">
            Work with your current mood
          </h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Actions that naturally fit how you feel right now.
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {tips.map((tip, index) => (
          <motion.div
            key={`${tip}-${index}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.05 }}
            className="flex items-start gap-3 rounded-2xl border border-gray-200/70 bg-gray-50/70 dark:bg-white/5 p-4"
          >
            <CheckCircle2 className="mt-1 w-5 h-5 text-primary" />
            <p className="text-sm leading-6 text-gray-700 dark:text-gray-200">
              {tip}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
