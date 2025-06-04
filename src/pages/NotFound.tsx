"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const NotFound = () => {
  return (
    <main className="pt-20 pb-16">
      <div className="max-w-2xl mx-auto px-6 text-center">
        <section className="py-20">
          <Card className="p-12 bg-white/50 dark:bg-stone-800/50 border-stone-200 dark:border-stone-700">
            <div className="space-y-8">
              <div className="text-6xl">🧭</div>

              <div className="space-y-4">
                <h1 className="text-4xl font-light text-stone-800 dark:text-stone-100">
                  Out of Balance
                </h1>
                <p className="text-xl text-stone-600 dark:text-stone-300">
                  This path doesn't exist in our current reality.
                </p>
              </div>

              <div className="space-y-4 text-stone-600 dark:text-stone-300">
                <p>
                  Like a misaligned algorithm or a broken reference, this URL
                  leads to nowhere meaningful.
                </p>
                <p className="italic">
                  But every 404 is an opportunity to recenter and choose a
                  better path.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/">
                  <Button className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-full">
                    Return Home
                  </Button>
                </Link>
                <Link href="/journal">
                  <Button
                    variant="outline"
                    className="border-stone-300 dark:border-stone-600 px-6 py-3 rounded-full"
                  >
                    Read Journal
                  </Button>
                </Link>
              </div>

              <div className="pt-6 border-t border-stone-200 dark:border-stone-700">
                <p className="text-sm text-stone-500 dark:text-stone-400 italic">
                  "Not all who wander are lost, but this URL definitely is."
                </p>
              </div>
            </div>
          </Card>
        </section>
      </div>
    </main>
  );
};

export default NotFound;
