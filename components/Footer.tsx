import { Link } from "wouter";
import { Camera, Instagram, Twitter, Facebook, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-background/50 backdrop-blur-sm pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 group w-fit">
              <div className="relative w-8 h-8 flex items-center justify-center bg-primary rounded-full text-background">
                <Camera className="w-4 h-4" />
              </div>
              <span className="text-xl font-display font-bold text-foreground">WildLens</span>
            </Link>
            <p className="text-muted-foreground max-w-sm leading-relaxed">
              Capturing the raw beauty of nature through the lens. 
              Specializing in rare avian species, wildlife portraits, and atmospheric landscapes.
            </p>
          </div>

          <div>
            <h4 className="font-display font-bold text-lg mb-4">Explore</h4>
            <ul className="space-y-3">
              <li><Link href="/galleries" className="text-muted-foreground hover:text-primary transition-colors">Galleries</Link></li>
              <li><Link href="/videos" className="text-muted-foreground hover:text-primary transition-colors">Motion</Link></li>
              <li><Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">The Photographer</Link></li>
              <li><Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Inquiries</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-bold text-lg mb-4">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border/50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} WildLens Photography. All rights reserved.</p>
          <p>Designed with passion for the wild.</p>
        </div>
      </div>
    </footer>
  );
}
