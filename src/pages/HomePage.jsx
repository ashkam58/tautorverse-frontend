import React, { useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Confetti from 'react-confetti';
import school from '../assets/gurukul.png'; // Example image, replace with your own
// Dummy data (could come from props or API)
const courses = [
  { title: 'MERN Stack Dev', tagline: 'Build, deploy, interview-ready', emoji: '🛠️' },
  { title: 'Math Magic (K-8)', tagline: 'Olympiad + mental math + story mode', emoji: '🧠' },
  { title: 'Typing & Literacy', tagline: 'Comic drills, home row mastery', emoji: '⌨️' },
  { title: 'Coding for Kids', tagline: 'Scratch, Python, mini games', emoji: '🕹️' },
  { title: 'AI Workshops', tagline: 'Prompt hacks, automation, business AI', emoji: '🤖' },
  { title: 'Chess & Strategy', tagline: 'Tactics, rating roadmap', emoji: '♟️' },
  { title: 'Speedcubing', tagline: 'CFOP, timers, mindset', emoji: '🧩' },
  { title: 'English Wordcraft', tagline: 'Vocabulary, idioms, comic writing', emoji: '✍️' },
  { title: 'Interview Prep Lab', tagline: 'Real questions, mini projects, internal monologue', emoji: '🔥' },
  { title: 'Creative Writing', tagline: 'Magical essay & storytelling', emoji: '📚' },
];

const testimonials = [
  { quote: "My kid actually looks forward to math now.", name: 'Ritu (Parent)', fun: '"Potion master vibes!"' },
  { quote: "Weekly sync means I know exactly what’s up.", name: 'Kareem (Parent)', fun: '"Zero confusion, full trust."' },
  { quote: "Free drills gave us the boost before paying.", name: 'Deepa (Parent)', fun: '"No fluff, pure progress."' },
  { quote: "MERN interview prep turned me from shaky to confident.", name: 'Dev Student', fun: '"Got the offer + hype."' },
  { quote: "English lessons made writing fun again.", name: 'Saindhavi (Student)', fun: '"Wordplay is my superpower."' },
];

const learningSteps = [
  {
    title: '🔍 Discovery',
    desc: 'Start with a quirky onboarding quiz that reads your mind (okay, just your personality and learning style). It’s like Hogwarts sorting, minus the hat.',
  },
  {
    title: '🗺️ Custom Path',
    desc: 'Your AI sidekick crafts a magical roadmap with milestones. Think of it as Google Maps for your brain—with fewer wrong turns.',
  },
  {
    title: '🎮 Playful Practice',
    desc: 'Drills disguised as cartoons, mini-games that tickle your neurons, and prompts that make your inner monologue sound like a TED Talk.',
  },
  {
    title: '🏗️ Real Projects',
    desc: 'Build tiny things that grow into mighty creations. From “hello world” to “hire me please,” it’s your portfolio’s glow-up moment.',
  },
  {
    title: '📣 Feedback Loop',
    desc: 'Auto-generated session summaries, parent syncs (if applicable), and badges that make you feel like a wizard every time you level up.',
  },
  {
    title: '🚀 Level Up',
    desc: 'Adaptive challenges, streaks that make you feel invincible, and surprise power-ups—because learning should feel like unlocking cheat codes.',
  },
];


export default function TutorverseHome() {
  const { scrollY } = useScroll();
  const scale = useTransform(scrollY, [0, 500], [1, 1.05]);
  const skew = useTransform(scrollY, [0, 500], [0, 2]);

  useEffect(() => {
    // optional: preload confetti or trigger based on user action
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white font-sans relative overflow-x-hidden">
      <Confetti recycle={false} numberOfPieces={200} gravity={0.1} />

      {/* Hero */}
      <section className="py-16 px-6 text-center max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-12 border-2 border-indigo-200"
        >
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h1 className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tight">Tutorverse</h1>
              <p className="text-lg md:text-2xl mb-6">Where Tutors, Parents & Learners Team Up Like Superheroes. Free bites, project quests, sync magic.</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-3xl font-bold shadow-lg hover:scale-105 transition">Explore Courses</button>
                <button className="px-8 py-4 border-2 border-indigo-500 text-indigo-600 rounded-3xl font-bold hover:bg-indigo-50 transition">Hire a Hero</button>
              </div>
              <p className="mt-4 text-sm italic">Teachers get leads, parents get clarity, students get wins. Cartoon vibes, real growth.</p>
            </div>
            <div className="flex-1 relative">
              <div className="bg-gradient-to-r from-pink-300 to-indigo-300 rounded-3xl p-6 shadow-xl text-left text-sm font-mono">🎒 <span className="font-bold">Quick Stats:</span> 632 students, 1,234 badges earned, 89% goal completion streaks.</div>
              <div className="mt-6">
                <img src={school} alt="cartoon classroom" className="rounded-2xl shadow-2xl w-full" />
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Courses Carousel / Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-6 text-center">Courses & Quests</h2>
          <p className="text-center mb-8">Pick a path. Level up. Show off the badge. Repeat.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {courses.map((c, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.03 }}
                className="card card-bordered bg-gradient-to-br from-indigo-50 to-pink-50 shadow-xl rounded-2xl border-2 border-purple-200 p-6 relative overflow-visible"
              >
                <div className="absolute -top-3 left-3 bg-pink-500 text-white px-3 py-1 rounded-full text-xs">{i < 3 ? 'Hot' : 'New'}</div>
                <div className="text-3xl mb-2">{c.emoji}</div>
                <h3 className="text-xl font-bold mb-1">{c.title}</h3>
                <p className="text-sm mb-4">{c.tagline}</p>
                <div className="flex gap-2 mt-auto">
                  <button className="btn btn-sm btn-outline">View</button>
                  <button className="btn btn-sm btn-primary">Start</button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Approach Timeline with Parallax-ish Effect */}
      <section className="py-24 px-6 bg-gradient-to-r from-purple-100 to-white">
        <div className="max-w-6xl mx-auto text-center mb-12">
          <h2 className="text-4xl font-bold">Our Learning Adventure</h2>
          <p className="mt-2">Step-by-step, playful, adaptive. This isn’t boring school—it’s your questline.</p>
        </div>
        <div className="relative overflow-hidden">
          <div className="absolute left-1/2 top-0 h-full w-1 bg-gradient-to-b from-indigo-500 to-pink-500 transform -translate-x-1/2" />
          <div className="flex flex-col space-y-16">
            {learningSteps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="flex flex-col md:flex-row items-center gap-6"
              >
                <div className={`flex-1 text-right ${i % 2 === 1 ? 'order-2' : ''}`}> 
                  <div className="text-5xl mb-2">{s.emoji}</div>
                </div>
                <div className="flex-1 bg-white rounded-3xl shadow-lg p-6 border-2 border-indigo-100">
                  <h3 className="text-xl font-bold mb-1">{s.title}</h3>
                  <p className="text-sm">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto text-center mb-10">
          <h2 className="text-4xl font-bold">Why Families & Learners Flex</h2>
          <p className="mb-6">Real words, real glow-ups. Cartoon-approved testimonials.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div key={i} whileHover={{ scale: 1.02 }} className="bg-gradient-to-br from-white to-indigo-50 rounded-3xl shadow-xl p-6 relative border-2 border-purple-200">
              <div className="absolute -top-3 right-3 text-xs bg-yellow-200 px-2 py-1 rounded-full">#{i + 1}</div>
              <p className="italic mb-2">“{t.quote}”</p>
              <p className="text-sm mb-1">{t.fun}</p>
              <p className="font-semibold">{t.name}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Teacher-Parent Sync Snapshot */}
      <section className="py-16 px-6 bg-gradient-to-r from-indigo-50 to-purple-50">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10 items-start">
          <div className="flex-1">
            <h2 className="text-3xl font-bold mb-4">Teacher + Parent Fusion</h2>
            <p className="mb-4">Auto summaries, shared goal boards, real-time badges, and feedback loops. Kids get personal quests; parents get trust notifications.</p>
            <ul className="list-disc ml-6 space-y-2 mb-4">
              <li>Dashboard snapshots per student</li>
              <li>AI-generated next-step guide</li>
              <li>Progress streaks with surprise boosters</li>
              <li>Parent-teacher micro chats</li>
            </ul>
            <button className="btn btn-lg btn-secondary">Start Free Trial</button>
          </div>
          <div className="flex-1 bg-white rounded-3xl shadow-xl p-6 border-2 border-indigo-200">
            <div className="flex justify-between items-center mb-3">
              <div>
                <p className="text-xs font-medium text-gray-500">Student: Aryan</p>
                <p className="font-bold text-xl">Math Progress</p>
              </div>
              <div className="text-xs bg-green-100 text-green-800 px-3 py-1 rounded-full">On Track</div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden mb-2">
              <div className="w-2/3 bg-gradient-to-r from-indigo-600 to-pink-500 h-full rounded-full" />
            </div>
            <p className="text-sm mb-2">"Crushed fractions with story-mode. Next: word problems."</p>
            <div className="flex justify-between mt-4 text-center">
              <div>
                <p className="text-xs">Sessions</p>
                <p className="font-bold">8</p>
              </div>
              <div>
                <p className="text-xs">Goals</p>
                <p className="font-bold">3/5</p>
              </div>
              <div>
                <p className="text-xs">Streak</p>
                <p className="font-bold">5 days</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action + Confetti Trigger */}
      <section className="py-16 px-6 text-center bg-gradient-to-r from-pink-50 to-purple-100 relative">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold mb-4">Ready to Level Up?</h2>
          <p className="mb-6">Start a free trial, book a trial session, or grab a free drill. Cartoon badges await.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-3xl font-bold hover:scale-105 transition">Get Started Free</button>
            <button className="px-8 py-4 border-2 border-indigo-600 text-indigo-600 rounded-3xl font-bold hover:bg-indigo-50 transition">Book Demo</button>
          </div>
          <p className="mt-4 text-sm">No credit card. No complexity. Just cartoon-powered learning.</p>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h4 className="font-bold mb-3">Tutorverse</h4>
            <p>Teachers + Parents + Learners = Super Squad. Free drops, real results.</p>
          </div>
          <div>
            <h4 className="font-bold mb-3">Quick Links</h4>
            <ul className="space-y-1 text-sm">
              <li>Courses</li>
              <li>Find a Tutor</li>
              <li>Free Resources</li>
              <li>Pricing</li>
              <li>Leaderboard</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-3">Stay Updated</h4>
            <p className="text-sm mb-2">Cartoon newsletter with monthly power-up packs.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="you@example.com" className="rounded-full px-4 py-2 flex-1 text-black" />
              <button className="px-4 py-2 bg-purple-600 rounded-full font-semibold">Subscribe</button>
            </div>
          </div>
        </div>
        <div className="text-center mt-8 text-xs">© {new Date().getFullYear()} Tutorverse. All rights reserved.</div>
      </footer>
    </div>
  );
}
