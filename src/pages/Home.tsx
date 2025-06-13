import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { FadeIn, StaggerContainer } from "@/components/ui/motion";
import HomeClientWrapper from "./HomeClientWrapper";

const Home = () => {
  const principles = [
    {
      title: "Balance over Hustle",
      icon: "⚖️",
      description: "Sustainable growth comes from harmony, not burnout.",
      details:
        "The industry often glorifies the 'grind,' but I've learned that sustainable progress comes from working in harmony with your natural rhythms. I prioritize deep work sessions followed by restorative breaks, meaningful weekends, and saying no to opportunities that don't align with my values.",
    },
    {
      title: "Reflection over Reactivity",
      icon: "🪞",
      description: "Pause, process, then proceed with purpose.",
      details:
        "In both code and life, my first instinct isn't always my best response. Daily journaling helps me process challenges, celebrate wins, and approach problems with curiosity rather than frustration. This practice has made me a better debugger and a more thoughtful team member.",
    },
    {
      title: "Progress over Perfection",
      icon: "🌱",
      description: "1% better daily compounds into extraordinary growth.",
      details:
        "Perfect code doesn't exist, but better code does. I focus on atomic improvements—cleaner functions, better naming, more thoughtful architecture. Small, consistent improvements in both my technical skills and personal habits create lasting transformation.",
    },
    {
      title: "Connection over Competition",
      icon: "🤝",
      description: "We rise by lifting others in our community.",
      details:
        "The tech industry can feel competitive, but I've found more fulfillment in collaboration. Mentoring junior developers, contributing to open source, and sharing knowledge openly has enriched my own learning journey while building meaningful professional relationships.",
    },
  ];

  return <HomeClientWrapper principles={principles} />;
};

export default Home;
