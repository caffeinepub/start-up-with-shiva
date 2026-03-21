import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import type { AccountType, UserProfile } from "../backend.d";
import { useActor } from "./useActor";

export function useGetCallerProfile() {
  const { actor, isFetching } = useActor();
  return useQuery<UserProfile | null>({
    queryKey: ["callerProfile"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useRegisterUser() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error("Not connected");
      await actor.registerUser(profile);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["callerProfile"] });
    },
  });
}

export function useSaveProfile() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error("Not connected");
      await actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["callerProfile"] });
    },
  });
}

// Problems
export function useGetAllProblems() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["problems"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllProblems();
    },
    enabled: !!actor && !isFetching,
  });
}

export function usePostProblem() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      title: string;
      description: string;
      location: string;
      category: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      await actor.postProblem(
        data.title,
        data.description,
        data.location,
        data.category,
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["problems"] });
      toast.success("Problem posted!");
    },
    onError: () => toast.error("Failed to post problem."),
  });
}

export function useUpvoteProblem() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: bigint) => {
      if (!actor) throw new Error("Not connected");
      await actor.upvoteProblem(id);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["problems"] });
      toast.success("Vote counted!");
    },
    onError: () => toast.error("Failed to upvote."),
  });
}

// Listings (Sellers)
export function useGetAllListings() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["listings"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllListings();
    },
    enabled: !!actor && !isFetching,
  });
}

export function usePostListing() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      title: string;
      description: string;
      price: bigint;
      category: string;
      location: string;
      contactPhone: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      await actor.postListing(
        data.title,
        data.description,
        data.price,
        data.category,
        data.location,
        data.contactPhone,
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["listings"] });
      toast.success("Listing posted!");
    },
    onError: () => toast.error("Failed to post listing."),
  });
}

// Buyer Requests
export function useGetAllBuyerRequests() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["buyerRequests"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllBuyerRequests();
    },
    enabled: !!actor && !isFetching,
  });
}

export function usePostBuyerRequest() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      title: string;
      description: string;
      budget: bigint;
      category: string;
      location: string;
      contactPhone: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      await actor.postBuyerRequest(
        data.title,
        data.description,
        data.budget,
        data.category,
        data.location,
        data.contactPhone,
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["buyerRequests"] });
      toast.success("Request posted!");
    },
    onError: () => toast.error("Failed to post request."),
  });
}

// Investor Profiles
export function useGetAllInvestorProfiles() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["investorProfiles"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllInvestorProfiles();
    },
    enabled: !!actor && !isFetching,
  });
}

export function usePostInvestorProfile() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      sector: string;
      minBudget: bigint;
      maxBudget: bigint;
      location: string;
      description: string;
      contactPhone: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      await actor.postInvestorProfile(
        data.sector,
        data.minBudget,
        data.maxBudget,
        data.location,
        data.description,
        data.contactPhone,
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["investorProfiles"] });
      toast.success("Investor profile posted!");
    },
    onError: () => toast.error("Failed to post investor profile."),
  });
}

// Partner Opportunities
export function useGetAllPartnerOpportunities() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["partnerOpportunities"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllPartnerOpportunities();
    },
    enabled: !!actor && !isFetching,
  });
}

export function usePostPartnerOpportunity() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      title: string;
      description: string;
      businessType: string;
      investmentNeeded: bigint;
      location: string;
      contactPhone: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      await actor.postPartnerOpportunity(
        data.title,
        data.description,
        data.businessType,
        data.investmentNeeded,
        data.location,
        data.contactPhone,
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["partnerOpportunities"] });
      toast.success("Partnership opportunity posted!");
    },
    onError: () => toast.error("Failed to post opportunity."),
  });
}

// Admin stats
export function useGetAdminStats() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["adminStats"],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getAdminStats();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useIsCallerAdmin() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["isAdmin"],
    queryFn: async () => {
      if (!actor) return false;
      return actor.isCallerAdmin();
    },
    enabled: !!actor && !isFetching,
  });
}

// Messaging
export function useGetMyInbox() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["inbox"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyInbox();
    },
    enabled: !!actor && !isFetching,
    refetchInterval: 30_000,
  });
}

export function useGetMySentMessages() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["sentMessages"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMySentMessages();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetUserDirectory() {
  const { actor, isFetching } = useActor();
  return useQuery({
    queryKey: ["userDirectory"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getUserDirectory();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSendMessage() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (data: {
      recipientId: string;
      subject: string;
      body: string;
    }) => {
      if (!actor) throw new Error("Not connected");
      const { Principal } = await import("@icp-sdk/core/principal");
      await actor.sendMessage(
        Principal.fromText(data.recipientId),
        data.subject,
        data.body,
      );
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["sentMessages"] });
      toast.success("Message sent!");
    },
    onError: () => toast.error("Failed to send message."),
  });
}

export function useMarkAsRead() {
  const { actor } = useActor();
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (messageId: bigint) => {
      if (!actor) throw new Error("Not connected");
      await actor.markAsRead(messageId);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["inbox"] });
    },
  });
}

export type { AccountType };
