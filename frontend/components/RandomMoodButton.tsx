"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Dice1 } from "lucide-react";

interface MoodOption {
  id: string;
  name: string;
  emoji: string;
}

interface RandomMoodButtonProps {
  moods: MoodOption[];
}

export default function RandomMoodButton({ moods }: RandomMoodButtonProps) {
  const router = useRouter();
  const [isRolling, setIsRolling] = useState(false);
  const [selectedMood, setSelectedMood] = useState<MoodOption | null>(null);

  const handleRandomMood = () => {
    if (isRolling || moods.length === 0) return;

    const randomIndex = Math.floor(Math.random() * moods.length);
    const mood = moods[randomIndex];
    setSelectedMood(mood);
    setIsRolling(true);

    setTimeout(() => {
      router.push(`/mood/${mood.id}`);
    }, 450);
  };

  return (
    <div className="w-full max-w-xl mx-auto">
      <motion.button
        whileHover={{ scale: 1.02, y: -1 }}
        whileTap={{ scale: 0.96, rotate: isRolling ? 15 : 0 }}
        onClick={handleRandomMood}
        disabled={isRolling}
        className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-3xl border border-white/20 bg-white/15 text-white shadow-[0_20px_60px_rgba(109,40,217,0.18)] backdrop-blur-xl transition-all duration-300 hover:border-pink-300/40 hover:shadow-[0_20px_60px_rgba(195,46,255,0.18)] focus:outline-none focus:ring-2 focus:ring-pink-400/50"
      >
        <Dice1 className={`w-5 h-5 ${isRolling ? "animate-spin" : ""}`} />
        <span className="font-semibold text-sm sm:text-base">
          {isRolling ? `Rolling for ${selectedMood?.name}...` : "🎲 Surprise Me"}
        </span>
      </motion.button>

      <p className="mt-3 text-center text-sm text-muted-foreground dark:text-gray-300">
        {isRolling
          ? "Hang tight — exploring a tone from the full emotion library." 
          : "Discover a random emotion and explore its insights."}
      </p>
    </div>
  );
}
