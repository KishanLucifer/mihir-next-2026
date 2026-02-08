// import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
// // import { api, type InsertInquiry } from "@shared/routes";

// // === CATEGORIES ===
// export function useCategories() {
//   return useQuery({
//     queryKey: [api.categories.list.path],
//     queryFn: async () => {
//       const res = await fetch(api.categories.list.path);
//       if (!res.ok) throw new Error("Failed to fetch categories");
//       return api.categories.list.responses[200].parse(await res.json());
//     },
//   });
// }

// export function useCategory(id: number) {
//   return useQuery({
//     queryKey: [api.categories.get.path, id],
//     queryFn: async () => {
//       // Manually construct URL since we don't have buildUrl imported here,
//       // but typically we'd use the helper.
//       // Assuming simple replacement for this example.
//       const url = api.categories.get.path.replace(":id", String(id));
//       const res = await fetch(url);
//       if (res.status === 404) return null;
//       if (!res.ok) throw new Error("Failed to fetch category");
//       return api.categories.get.responses[200].parse(await res.json());
//     },
//     enabled: !!id,
//   });
// }

// // === PHOTOS ===
// export function usePhotos(categoryId?: string, featured?: string) {
//   return useQuery({
//     queryKey: [api.photos.list.path, { categoryId, featured }],
//     queryFn: async () => {
//       const params = new URLSearchParams();
//       if (categoryId) params.append("categoryId", categoryId);
//       if (featured) params.append("featured", featured);

//       const url = `${api.photos.list.path}?${params.toString()}`;
//       const res = await fetch(url);
//       if (!res.ok) throw new Error("Failed to fetch photos");
//       return api.photos.list.responses[200].parse(await res.json());
//     },
//   });
// }

// export function usePhoto(id: number) {
//   return useQuery({
//     queryKey: [api.photos.get.path, id],
//     queryFn: async () => {
//       const url = api.photos.get.path.replace(":id", String(id));
//       const res = await fetch(url);
//       if (res.status === 404) return null;
//       if (!res.ok) throw new Error("Failed to fetch photo");
//       return api.photos.get.responses[200].parse(await res.json());
//     },
//     enabled: !!id,
//   });
// }

// // === VIDEOS ===
// export function useVideos(categoryId?: string) {
//   return useQuery({
//     queryKey: [api.videos.list.path, { categoryId }],
//     queryFn: async () => {
//       const params = new URLSearchParams();
//       if (categoryId) params.append("categoryId", categoryId);

//       const url = `${api.videos.list.path}?${params.toString()}`;
//       const res = await fetch(url);
//       if (!res.ok) throw new Error("Failed to fetch videos");
//       return api.videos.list.responses[200].parse(await res.json());
//     },
//   });
// }

// export function useVideo(id: number) {
//   return useQuery({
//     queryKey: [api.videos.get.path, id],
//     queryFn: async () => {
//       const url = api.videos.get.path.replace(":id", String(id));
//       const res = await fetch(url);
//       if (res.status === 404) return null;
//       if (!res.ok) throw new Error("Failed to fetch video");
//       return api.videos.get.responses[200].parse(await res.json());
//     },
//     enabled: !!id,
//   });
// }

// // === PROFILE ===
// export function useProfile() {
//   return useQuery({
//     queryKey: [api.profile.get.path],
//     queryFn: async () => {
//       const res = await fetch(api.profile.get.path);
//       if (res.status === 404) return null;
//       if (!res.ok) throw new Error("Failed to fetch profile");
//       return api.profile.get.responses[200].parse(await res.json());
//     },
//   });
// }

// // === CONTACT ===
// export function useSubmitInquiry() {
//   return useMutation({
//     mutationFn: async (data: InsertInquiry) => {
//       const res = await fetch(api.contact.submit.path, {
//         method: api.contact.submit.method,
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(data),
//       });

//       if (!res.ok) {
//         if (res.status === 400) {
//           const error = await res.json();
//           throw new Error(error.message || "Validation failed");
//         }
//         throw new Error("Failed to submit inquiry");
//       }
//       return api.contact.submit.responses[201].parse(await res.json());
//     },
//   });
// }
