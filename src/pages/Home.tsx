import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

const Home = () => {
  return (
    <main className="pt-20 pb-16">
      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-light text-stone-800 dark:text-stone-100 leading-tight">
                Building with
                <span className="block text-amber-600 dark:text-amber-400 font-medium">
                  intention
                </span>
              </h1>
              <p className="text-xl text-stone-600 dark:text-stone-300 leading-relaxed">
                Fullstack engineer who believes in the power of mindful growth,
                daily reflection, and the 1% better principle.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link to="/about">
                <Button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-full transition-all duration-300 hover:scale-105">
                  My Story
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/projects">
                <Button
                  variant="outline"
                  className="border-stone-300 dark:border-stone-600 px-6 py-3 rounded-full hover:bg-stone-50 dark:hover:bg-stone-800 transition-all duration-300"
                >
                  View Projects
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="w-full h-96 bg-gradient-to-br from-amber-100 to-stone-200 dark:from-amber-900/20 dark:to-stone-800 rounded-3xl relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-amber-200/20 to-stone-300/20 dark:from-transparent dark:via-amber-800/10 dark:to-stone-700/20"></div>
              <div className="absolute top-8 right-8 w-3 h-3 bg-amber-400 rounded-full animate-pulse"></div>
              <div className="absolute bottom-12 left-8 w-2 h-2 bg-stone-400 rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <div className="text-stone-600 dark:text-stone-300 text-sm font-mono">
                  {"{ growth: '1%', mindset: 'zen' }"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy Preview */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="text-center space-y-8">
          <h2 className="text-3xl font-light text-stone-800 dark:text-stone-100">
            Core Principles
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="p-6 bg-white/50 dark:bg-stone-800/50 border-stone-200 dark:border-stone-700 hover:shadow-lg transition-all duration-300">
              <div className="space-y-3">
                <div className="text-2xl">🧘</div>
                <h3 className="text-lg font-medium text-stone-800 dark:text-stone-200">
                  Balance over Hustle
                </h3>
                <p className="text-stone-600 dark:text-stone-400 text-sm">
                  Sustainable growth through mindful practices and intentional
                  choices.
                </p>
              </div>
            </Card>

            <Card className="p-6 bg-white/50 dark:bg-stone-800/50 border-stone-200 dark:border-stone-700 hover:shadow-lg transition-all duration-300">
              <div className="space-y-3">
                <div className="text-2xl">📝</div>
                <h3 className="text-lg font-medium text-stone-800 dark:text-stone-200">
                  Reflection over Reactivity
                </h3>
                <p className="text-stone-600 dark:text-stone-400 text-sm">
                  Daily journaling and self-awareness as tools for continuous
                  improvement.
                </p>
              </div>
            </Card>

            <Card className="p-6 bg-white/50 dark:bg-stone-800/50 border-stone-200 dark:border-stone-700 hover:shadow-lg transition-all duration-300">
              <div className="space-y-3">
                <div className="text-2xl">🌱</div>
                <h3 className="text-lg font-medium text-stone-800 dark:text-stone-200">
                  Progress over Perfection
                </h3>
                <p className="text-stone-600 dark:text-stone-400 text-sm">
                  Every commit is a conversation, every line of code a step
                  forward.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <div className="space-y-6">
          <h2 className="text-2xl font-light text-stone-800 dark:text-stone-100">
            "Build intentionally. Grow quietly. Reflect constantly."
          </h2>
          <div>
            <Link to="/journal">
              <Button
                variant="outline"
                className="border-amber-300 dark:border-amber-600 text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 px-8 py-3 rounded-full"
              >
                Read My Journal
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Home;
