
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Journal = () => {
  const journalEntries = [
    {
      date: "2024-03-15",
      title: "On Debugging Patience",
      category: "Technical Reflection",
      excerpt: "Spent 3 hours tracking down a race condition today. Initially frustrated, then realized this is exactly where growth happens...",
      mood: "🧘",
      growth: "Practiced mindful debugging—each console.log was an investigation, not a complaint.",
      version: "v1.2.3"
    },
    {
      date: "2024-03-12",
      title: "The Art of Code Review",
      category: "Team Dynamics",
      excerpt: "Gave feedback on a PR today and realized how my tone in comments affects team culture...",
      mood: "🤝",
      growth: "Experimented with 'appreciation + question + suggestion' format for reviews.",
      version: "v1.2.2"
    },
    {
      date: "2024-03-10",
      title: "Saying No Mindfully",
      category: "Boundaries",
      excerpt: "Declined a freelance project that would have paid well but conflicted with my values around work-life balance...",
      mood: "💚",
      growth: "Practiced values-based decision making over financial optimization.",
      version: "v1.2.1"
    },
    {
      date: "2024-03-08",
      title: "Refactoring as Meditation",
      category: "Technical Practice",
      excerpt: "Cleaned up a legacy component today. Each function extraction felt like a breath of fresh air...",
      mood: "✨",
      growth: "Found flow state in systematic improvement—small changes, big impact.",
      version: "v1.2.0"
    },
    {
      date: "2024-03-05",
      title: "Teaching Teaches",
      category: "Knowledge Sharing",
      excerpt: "Mentored a junior developer on React hooks. Explaining concepts clarified my own understanding...",
      mood: "🌱",
      growth: "Discovered that teaching is learning disguised as helping.",
      version: "v1.1.9"
    }
  ];

  const stats = {
    daysJournaled: 127,
    totalEntries: 89,
    currentStreak: 12,
    averageWordsPerEntry: 324
  };

  return (
    <main className="pt-20 pb-16">
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <section className="py-16 text-center">
          <h1 className="text-4xl lg:text-5xl font-light text-stone-800 dark:text-stone-100 mb-6">
            Growth Journal
          </h1>
          <p className="text-xl text-stone-600 dark:text-stone-300 leading-relaxed max-w-3xl mx-auto">
            Daily reflections on the intersection of code, craft, and character. 
            Each entry is a small commit to continuous improvement.
          </p>
        </section>

        {/* Stats Dashboard */}
        <section className="py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="p-4 bg-white/50 dark:bg-stone-800/50 border-stone-200 dark:border-stone-700 text-center">
              <div className="text-2xl font-light text-amber-600 dark:text-amber-400">
                {stats.daysJournaled}
              </div>
              <div className="text-xs text-stone-600 dark:text-stone-400 mt-1">
                Days Journaled
              </div>
            </Card>
            
            <Card className="p-4 bg-white/50 dark:bg-stone-800/50 border-stone-200 dark:border-stone-700 text-center">
              <div className="text-2xl font-light text-amber-600 dark:text-amber-400">
                {stats.totalEntries}
              </div>
              <div className="text-xs text-stone-600 dark:text-stone-400 mt-1">
                Total Entries
              </div>
            </Card>
            
            <Card className="p-4 bg-white/50 dark:bg-stone-800/50 border-stone-200 dark:border-stone-700 text-center">
              <div className="text-2xl font-light text-amber-600 dark:text-amber-400">
                {stats.currentStreak}
              </div>
              <div className="text-xs text-stone-600 dark:text-stone-400 mt-1">
                Current Streak
              </div>
            </Card>
            
            <Card className="p-4 bg-white/50 dark:bg-stone-800/50 border-stone-200 dark:border-stone-700 text-center">
              <div className="text-2xl font-light text-amber-600 dark:text-amber-400">
                {stats.averageWordsPerEntry}
              </div>
              <div className="text-xs text-stone-600 dark:text-stone-400 mt-1">
                Avg Words
              </div>
            </Card>
          </div>
        </section>

        {/* Journal Entries */}
        <section className="py-12 space-y-8">
          {journalEntries.map((entry, index) => (
            <Card key={index} className="p-6 bg-white/50 dark:bg-stone-800/50 border-stone-200 dark:border-stone-700 hover:shadow-lg transition-all duration-300">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{entry.mood}</span>
                  <div>
                    <h3 className="text-lg font-medium text-stone-800 dark:text-stone-200">
                      {entry.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm text-stone-600 dark:text-stone-400">
                      <span>{entry.date}</span>
                      <span>•</span>
                      <span className="text-amber-600 dark:text-amber-400">{entry.category}</span>
                      <span>•</span>
                      <span className="font-mono text-xs">{entry.version}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-stone-600 dark:text-stone-300 leading-relaxed">
                  {entry.excerpt}
                </p>
                
                <div className="bg-gradient-to-r from-amber-50 to-stone-50 dark:from-amber-900/10 dark:to-stone-800 p-4 rounded-lg border-l-4 border-amber-400">
                  <h4 className="text-sm font-medium text-stone-800 dark:text-stone-200 mb-2">
                    Growth Moment
                  </h4>
                  <p className="text-stone-600 dark:text-stone-300 text-sm">
                    {entry.growth}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-stone-200 dark:border-stone-700">
                <Button variant="ghost" size="sm" className="text-stone-600 hover:text-amber-600 dark:text-stone-400 dark:hover:text-amber-400 text-sm">
                  Read Full Entry →
                </Button>
              </div>
            </Card>
          ))}
        </section>

        {/* Journal Philosophy */}
        <section className="py-12">
          <Card className="p-8 bg-gradient-to-br from-amber-50 to-stone-50 dark:from-amber-900/10 dark:to-stone-800 border-amber-200 dark:border-stone-700">
            <div className="text-center space-y-6">
              <h2 className="text-2xl font-medium text-stone-800 dark:text-stone-200">
                Why I Journal
              </h2>
              <div className="max-w-3xl mx-auto space-y-4 text-stone-600 dark:text-stone-300 leading-relaxed">
                <p>
                  Writing forces clarity. When I journal about a challenging bug or a difficult conversation, 
                  I often discover solutions or perspectives I hadn't considered. It's like pair programming 
                  with my future self.
                </p>
                <p>
                  Each entry is timestamped and versioned, like commits in a personal growth repository. 
                  Looking back, I can see patterns in my thinking, track progress on goals, 
                  and celebrate small wins that might otherwise be forgotten.
                </p>
              </div>
              <blockquote className="text-lg text-stone-700 dark:text-stone-300 italic">
                "The unexamined life is not worth living. The unexamined code is not worth committing."
              </blockquote>
            </div>
          </Card>
        </section>

        {/* Newsletter Signup */}
        <section className="py-12">
          <Card className="p-8 bg-white/50 dark:bg-stone-800/50 border-stone-200 dark:border-stone-700">
            <div className="text-center space-y-6">
              <h2 className="text-2xl font-medium text-stone-800 dark:text-stone-200">
                Tiny Refactors
              </h2>
              <p className="text-stone-600 dark:text-stone-300 max-w-2xl mx-auto">
                Weekly reflections on incremental improvement, mindful development practices, 
                and the intersection of technical craft with personal growth.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-2 rounded-full border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
                <Button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded-full whitespace-nowrap">
                  Subscribe
                </Button>
              </div>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                One email per week. Unsubscribe anytime. No spam, just thoughtful reflection.
              </p>
            </div>
          </Card>
        </section>
      </div>
    </main>
  );
};

export default Journal;
