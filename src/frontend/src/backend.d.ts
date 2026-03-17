import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface PartnerOpportunity {
    id: bigint;
    investmentNeeded: bigint;
    title: string;
    owner: Principal;
    businessType: string;
    description: string;
    location: string;
    contactPhone: string;
}
export interface InvestorProfile {
    id: bigint;
    minBudget: bigint;
    owner: Principal;
    description: string;
    sector: string;
    location: string;
    contactPhone: string;
    maxBudget: bigint;
}
export interface Listing {
    id: bigint;
    title: string;
    owner: Principal;
    description: string;
    category: string;
    price: bigint;
    location: string;
    contactPhone: string;
}
export interface AdminStats {
    totalBuyerRequests: bigint;
    partnerCount: bigint;
    investorCount: bigint;
    totalListings: bigint;
    totalInvestorProfiles: bigint;
    sellerCount: bigint;
    totalPartnerOpportunities: bigint;
    totalProblems: bigint;
    buyerCount: bigint;
}
export interface Problem {
    id: bigint;
    upvotes: bigint;
    title: string;
    owner: Principal;
    description: string;
    category: string;
    location: string;
}
export interface BuyerRequest {
    id: bigint;
    title: string;
    owner: Principal;
    description: string;
    category: string;
    budget: bigint;
    location: string;
    contactPhone: string;
}
export interface UserProfile {
    city: string;
    name: string;
    email: string;
    accountType: AccountType;
    phone: string;
}
export enum AccountType {
    seller = "seller",
    buyer = "buyer",
    partner = "partner",
    investor = "investor"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAdminStats(): Promise<AdminStats>;
    getAllBuyerRequests(): Promise<Array<BuyerRequest>>;
    getAllInvestorProfiles(): Promise<Array<InvestorProfile>>;
    getAllListings(): Promise<Array<Listing>>;
    getAllPartnerOpportunities(): Promise<Array<PartnerOpportunity>>;
    getAllPosts(): Promise<{
        listings: Array<Listing>;
        partnerOpportunities: Array<PartnerOpportunity>;
        investorProfiles: Array<InvestorProfile>;
        buyerRequests: Array<BuyerRequest>;
    }>;
    getAllProblems(): Promise<Array<Problem>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    postBuyerRequest(title: string, description: string, budget: bigint, category: string, location: string, contactPhone: string): Promise<void>;
    postInvestorProfile(sector: string, minBudget: bigint, maxBudget: bigint, location: string, description: string, contactPhone: string): Promise<void>;
    postListing(title: string, description: string, price: bigint, category: string, location: string, contactPhone: string): Promise<void>;
    postPartnerOpportunity(title: string, description: string, businessType: string, investmentNeeded: bigint, location: string, contactPhone: string): Promise<void>;
    postProblem(title: string, description: string, location: string, category: string): Promise<void>;
    registerUser(profile: UserProfile): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    upvoteProblem(id: bigint): Promise<void>;
}
