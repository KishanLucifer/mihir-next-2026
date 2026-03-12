import { useMutation } from "@tanstack/react-query";

// The only hook currently used in the project is the inquiry mutation for the
// contact form. The rest of the file previously referenced an `api` object
// coming from a shared package, which doesn't exist in this repo, leading to
// compile errors. We'll strip everything else and provide a self-contained
// mutation implementation.

interface InsertInquiry {
  name: string;
  email: string;
  message: string;
}

export function useSubmitInquiry() {
  return useMutation({
    mutationFn: async (data: InsertInquiry) => {
      // send to a simple local API route; see app/api/contact/route.ts
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        if (res.status === 400) {
          const error = await res.json();
          throw new Error(error.message || "Validation failed");
        }
        throw new Error("Failed to submit inquiry");
      }
      return res.json();
    },
  });
}
