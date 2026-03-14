"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Play, X } from "lucide-react";
import { Video } from "@/typings";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

interface Props {
  videos: Video[];
}

function getVideoUrl(video: Video): string | null {
  const url = video.videoUrl || video.videoFile?.asset?.url;
  return url && url.trim() ? url : null;
}

export default function Videos({ videos }: Props) {
  const [playingId, setPlayingId] = useState<string | null>(null);

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16">
          <span className="text-primary font-medium tracking-wider uppercase text-sm mb-2 block">
            Cinematic
          </span>
          <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
            Motion Gallery
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Nature in motion. Experience the raw energy and serene moments of
            the wild through these captured films.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos?.map((video: Video, index: number) => {
            const videoUrl = getVideoUrl(video);
            const isPlaying = playingId === video._id;

            return (
              <motion.div
                key={video._id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="group">
                <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-white/10 shadow-lg">
                  {isPlaying && videoUrl ? (
                    <>
                      <div className="absolute inset-0 z-10">
                        <ReactPlayer
                          src={videoUrl}
                          width="100%"
                          height="100%"
                          controls
                          playing
                          style={{ position: "absolute", top: 0, left: 0 }}
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => setPlayingId(null)}
                        className="absolute top-2 right-2 z-20 p-2 rounded-full bg-black/60 hover:bg-black/80 text-white transition-colors"
                        aria-label="Close video"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={() => videoUrl && setPlayingId(video._id)}
                      className="w-full h-full text-left block cursor-pointer"
                    >
                      <img
                        src={
                          video.previewImageUrl ||
                          video.previewImage?.asset?.url ||
                          "https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&q=80"
                        }
                        alt={video.title}
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity duration-300"
                      />
                      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                        <div className="w-16 h-16 rounded-full bg-primary/90 text-background flex items-center justify-center pl-1 transform group-hover:scale-110 transition-transform duration-300 shadow-xl shadow-primary/20">
                          <Play className="w-8 h-8 fill-current" />
                        </div>
                      </div>
                      <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
                        <h3 className="text-xl font-display font-bold text-white mb-1">
                          {video.title}
                        </h3>
                      </div>
                    </button>
                  )}
                </div>
                <p className="mt-3 text-sm text-muted-foreground line-clamp-2 px-1">
                  {video.story}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
