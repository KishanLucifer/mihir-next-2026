import { Link } from "wouter";
import { motion } from "framer-motion";
import { useVideos } from "@/hooks/use-content";
import { Play, Loader2 } from "lucide-react";
import ReactPlayer from "react-player";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export default function Videos() {
  const { data: videos, isLoading } = useVideos();
  const [playingId, setPlayingId] = useState<number | null>(null);

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium tracking-wider uppercase text-sm mb-2 block">Cinematic</span>
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">Motion Gallery</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Nature in motion. Experience the raw energy and serene moments of the wild through these captured films.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center"><Loader2 className="w-8 h-8 animate-spin" /></div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos?.map((video, index) => (
              <Dialog key={video.id}>
                <DialogTrigger asChild>
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="group cursor-pointer"
                  >
                    <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-white/10 shadow-lg">
                      {/* Thumbnail Image */}
                      <img 
                        src={video.previewUrl || "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&q=80"} 
                        alt={video.title} 
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity duration-300"
                      />
                      
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center z-10">
                        <div className="w-16 h-16 rounded-full bg-primary/90 text-background flex items-center justify-center pl-1 transform group-hover:scale-110 transition-transform duration-300 shadow-xl shadow-primary/20">
                          <Play className="w-8 h-8 fill-current" />
                        </div>
                      </div>

                      {/* Info Overlay */}
                      <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent">
                        <h3 className="text-xl font-display font-bold text-white mb-1">{video.title}</h3>
                      </div>
                    </div>
                    <p className="mt-3 text-sm text-muted-foreground line-clamp-2 px-1">
                      {video.story}
                    </p>
                  </motion.div>
                </DialogTrigger>
                
                <DialogContent className="max-w-5xl bg-black border-white/10 p-0 overflow-hidden">
                  <div className="aspect-video w-full">
                    <ReactPlayer 
                      url={video.url} 
                      width="100%" 
                      height="100%" 
                      controls 
                      playing
                    />
                  </div>
                  <div className="p-6 bg-card">
                    <h2 className="text-2xl font-display font-bold text-white mb-2">{video.title}</h2>
                    <p className="text-muted-foreground">{video.story}</p>
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
