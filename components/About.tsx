import { useProfile } from "@/hooks/use-content";
import { motion } from "framer-motion";
import { Award, BookOpen, PenTool, Twitter, Instagram, Linkedin, Globe } from "lucide-react";

export default function About() {
  const { data: profile, isLoading } = useProfile();

  if (isLoading) return <div className="h-screen bg-background" />;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Header */}
      <div className="relative h-[60vh] overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10" />
        <img 
          src={profile?.coverImageUrl || "https://images.unsplash.com/photo-1452570053594-1b985d6ea890?q=80&w=2070&auto=format&fit=crop"} 
          alt="Profile Cover" 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-background to-transparent z-20" />
        
        <div className="absolute bottom-0 left-0 w-full z-30 pb-12">
          <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-end gap-8">
            <div className="w-40 h-40 md:w-56 md:h-56 rounded-full border-4 border-background overflow-hidden shadow-2xl flex-shrink-0 bg-muted">
              <img 
                src={profile?.avatarUrl || "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop"} 
                alt={profile?.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mb-4">
              <h1 className="text-5xl md:text-6xl font-display font-bold text-white mb-2">{profile?.name || "The Photographer"}</h1>
              <p className="text-xl text-primary/90 font-medium">Wildlife & Conservation Photographer</p>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-16">
            <motion.section 
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={container}
            >
              <motion.h2 variants={item} className="text-3xl font-display font-bold mb-6">About Me</motion.h2>
              <motion.div variants={item} className="prose prose-invert prose-lg text-muted-foreground">
                <p className="leading-relaxed whitespace-pre-wrap">
                  {profile?.bio || "Loading bio..."}
                </p>
              </motion.div>
            </motion.section>

            {/* Achievements Timeline */}
            <motion.section
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              variants={container}
            >
              <motion.h2 variants={item} className="text-3xl font-display font-bold mb-8 flex items-center gap-3">
                <Award className="text-primary w-8 h-8" /> Awards & Recognition
              </motion.h2>
              
              <div className="space-y-8 pl-4 border-l-2 border-primary/20">
                {profile?.achievements?.map((achievement, idx) => (
                  <motion.div variants={item} key={idx} className="relative pl-8">
                    <span className="absolute -left-[21px] top-1 w-4 h-4 rounded-full bg-primary border-4 border-background" />
                    <span className="text-primary font-bold text-sm block mb-1">{achievement.year}</span>
                    <h3 className="text-xl font-bold text-white mb-2">{achievement.title}</h3>
                    <p className="text-muted-foreground">{achievement.description}</p>
                  </motion.div>
                )) || <p className="text-muted-foreground pl-8">No achievements listed yet.</p>}
              </div>
            </motion.section>
            
            {/* Random Showcase / Parallax Section */}
            <section className="py-12">
              <div className="bg-card rounded-3xl p-8 border border-white/5 relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <h3 className="text-2xl font-display font-bold mb-4 relative z-10">Behind the Lens</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
                  {/* Decorative random images */}
                  <img src="https://images.unsplash.com/photo-1549366021-9f761d450615?w=400" className="rounded-lg rotate-2 hover:rotate-0 transition-transform duration-300" alt="Gear" />
                  <img src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400" className="rounded-lg -rotate-2 hover:rotate-0 transition-transform duration-300 translate-y-4" alt="Field work" />
                  <img src="https://images.unsplash.com/photo-1452570053594-1b985d6ea890?w=400" className="rounded-lg rotate-1 hover:rotate-0 transition-transform duration-300" alt="Landscape" />
                  <img src="https://images.unsplash.com/photo-1480044965905-02098d419e96?w=400" className="rounded-lg -rotate-1 hover:rotate-0 transition-transform duration-300 translate-y-6" alt="Nature" />
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="space-y-12">
            {/* Books */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2 border-b border-border pb-4">
                <BookOpen className="w-5 h-5 text-primary" /> Published Books
              </h3>
              <ul className="space-y-4">
                {profile?.books?.map((book, idx) => (
                  <li key={idx} className="group">
                    <a href={book.link} target="_blank" className="block p-4 rounded-xl bg-card border border-white/5 hover:border-primary/50 transition-colors">
                      <h4 className="font-bold text-white group-hover:text-primary transition-colors">{book.title}</h4>
                      <span className="text-sm text-muted-foreground">{book.year}</span>
                    </a>
                  </li>
                )) || <li className="text-muted-foreground">Coming soon...</li>}
              </ul>
            </motion.div>

            {/* Articles */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2 border-b border-border pb-4">
                <PenTool className="w-5 h-5 text-primary" /> Articles & Press
              </h3>
              <ul className="space-y-4">
                {profile?.articles?.map((article, idx) => (
                  <li key={idx}>
                    <a href={article.link} target="_blank" className="flex flex-col hover:opacity-80 transition-opacity">
                      <span className="font-medium text-white underline decoration-primary/50 underline-offset-4">{article.title}</span>
                      <span className="text-sm text-muted-foreground mt-1">{article.publication}</span>
                    </a>
                  </li>
                )) || <li className="text-muted-foreground">No articles listed.</li>}
              </ul>
            </motion.div>

            {/* Socials */}
            <div>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2 border-b border-border pb-4">
                <Globe className="w-5 h-5 text-primary" /> Follow Me
              </h3>
              <div className="flex gap-4">
                {profile?.socialLinks?.map((link, idx) => (
                  <a key={idx} href={link.url} target="_blank" className="w-12 h-12 rounded-full bg-card border border-white/10 flex items-center justify-center text-white hover:bg-primary hover:text-background hover:scale-110 transition-all duration-300">
                    {/* Simple icon mapping based on platform string */}
                    {link.platform.toLowerCase().includes('twitter') ? <Twitter className="w-5 h-5" /> :
                     link.platform.toLowerCase().includes('instagram') ? <Instagram className="w-5 h-5" /> :
                     link.platform.toLowerCase().includes('linkedin') ? <Linkedin className="w-5 h-5" /> :
                     <Globe className="w-5 h-5" />}
                  </a>
                )) || (
                  // Default mock icons if no data
                  <>
                    <div className="w-12 h-12 rounded-full bg-card border border-white/10 flex items-center justify-center text-muted-foreground"><Instagram /></div>
                    <div className="w-12 h-12 rounded-full bg-card border border-white/10 flex items-center justify-center text-muted-foreground"><Twitter /></div>
                  </>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
