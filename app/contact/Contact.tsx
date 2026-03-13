"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useSubmitInquiry } from "@/hooks/use-content";

// define schema locally since '@shared/schema' doesn't exist in this repo
const insertInquirySchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
});

type InsertInquiry = z.infer<typeof insertInquirySchema>;
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { motion } from "framer-motion";
import type { Contact as ContactType } from "@/typings";

interface Props {
  contact: ContactType[];
}

export default function Contact({ contact }: Props) {
  const info = contact[0] || ({} as ContactType);

  const { toast } = useToast();
  const mutation = useSubmitInquiry();

  const form = useForm<InsertInquiry>({
    resolver: zodResolver(insertInquirySchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  function onSubmit(data: InsertInquiry) {
    mutation.mutate(data, {
      onSuccess: () => {
        toast({
          title: "Message Sent",
          description:
            "Thank you for reaching out. I'll get back to you shortly.",
        });
        form.reset();
      },
      onError: (error: any) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      },
    });
  }

  return (
    <div className="min-h-screen pt-32 pb-24">
      {/* cover / hero image */}
      {info.coverImageUrl && (
        <div className="relative h-[40vh] overflow-hidden mb-12">
          <img
            src={info.coverImageUrl}
            alt="Cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
      )}
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16">
          <span className="text-primary font-medium tracking-wider uppercase text-sm mb-2 block">
            Get in Touch
          </span>
          <h1 className="text-5xl md:text-6xl font-display font-bold mb-6">
            {info.name || "Contact & Inquiries"}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {info.bio ||
              "For print sales, licensing, workshops, or just to say hello."}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-12">
            <div className="bg-card/50 backdrop-blur-sm p-8 rounded-3xl border border-white/5">
              <h3 className="text-2xl font-bold font-display mb-6">
                Contact Information
              </h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-full text-primary">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Email</h4>
                    <p className="text-muted-foreground">hello@wildlens.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-full text-primary">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Phone</h4>
                    <p className="text-muted-foreground">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-primary/10 rounded-full text-primary">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Studio Address</h4>
                    <p className="text-muted-foreground">
                      123 Wilderness Avenue
                      <br />
                      Portland, OR 97205
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Google Map Placeholder */}
            <div className="aspect-video w-full rounded-3xl overflow-hidden grayscale invert hover:filter-none transition-all duration-500 border border-white/10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.566861502444!2d-122.6788470848694!3d45.51523277910196!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54950a0b8026118b%3A0x6d357026723e7534!2sPortland%20Art%20Museum!5e0!3m2!1sen!2sus!4v1651234567890!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}>
            <div className="bg-card p-8 md:p-10 rounded-3xl shadow-xl border border-white/5 max-w-lg mx-auto">
              <h3 className="text-2xl font-bold font-display mb-6">
                Send a Message
              </h3>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Your Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="John Doe"
                            className="bg-background/50 border-white/10 h-12"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="john@example.com"
                            className="bg-background/50 border-white/10 h-12"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="How can I help you?"
                            className="bg-background/50 border-white/10 min-h-[150px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    className="w-full h-12 text-lg font-medium bg-primary hover:bg-primary/90 text-primary-foreground"
                    disabled={mutation.isPending}>
                    {mutation.isPending ? "Sending..." : "Send Message"}
                    {!mutation.isPending && <Send className="ml-2 w-4 h-4" />}
                  </Button>
                </form>
              </Form>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
