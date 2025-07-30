import { BusinessProfileStep } from "./_components/business-profile-step";
import { AddressStep } from "./_components/address-step";
import { IdentityStep } from "./_components/identity-step";
import { VideoStep } from "./_components/video-step";
import { ProofOfAddressStep } from "./_components/proof-of-address-step";
import { BankAccountStep } from "./_components/bank-account-step";
import { GstinStep } from "./_components/gstin-step";
import { FssaiStep } from "./_components/fssai-step";

export type VerificationStep = {
  id: string;
  name: string;
  description: string;
  component: React.FC<{ onComplete: () => void }>;
  isOptional?: boolean;
};

export const verificationSteps: VerificationStep[] = [
  {
    id: "business-profile",
    name: "Business Profile",
    description: "Official business details.",
    component: BusinessProfileStep,
  },
  {
    id: "address",
    name: "Address Validation",
    description: "Accurate, standardized address.",
    component: AddressStep,
  },
  {
    id: "identity",
    name: "Government ID & Selfie",
    description: "Confirm your identity.",
    component: IdentityStep,
  },
  {
    id: "video",
    name: "Recorded Intro Video",
    description: "Link your face to your workspace.",
    component: VideoStep,
  },
  {
    id: "proof-of-address",
    name: "Proof of Address (PoA)",
    description: "Additional location evidence.",
    component: ProofOfAddressStep,
  },
  {
    id: "bank-account",
    name: "Bank Account Verification",
    description: "Validate account for payouts.",
    component: BankAccountStep,
  },
  {
    id: "gstin",
    name: "GSTIN Lookup",
    description: "For B2B buyers and legal clarity.",
    component: GstinStep,
    isOptional: true,
  },
  {
    id: "fssai",
    name: "FSSAI License",
    description: "For food-safety compliance.",
    component: FssaiStep,
    isOptional: true,
  },
];
