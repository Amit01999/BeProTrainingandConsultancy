import { useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";
import type { InsertContact } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";

export function useCreateContact() {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (data: InsertContact) => {
      const res = await fetch(api.contacts.create.path, {
        method: api.contacts.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) throw new Error("Failed to send message");
      return api.contacts.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      toast({ title: "Message Sent", description: "We'll get back to you as soon as possible." });
    },
    onError: (error: Error) => {
      toast({ title: "Error", description: error.message, variant: "destructive" });
    },
  });
}
