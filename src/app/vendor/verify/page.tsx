"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  CheckCircle,
  Circle,
  Loader2,
  ArrowLeft,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipProvider,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useVerification } from "@/context/vendor-verification-context";
import { verificationSteps } from "./steps";

export default function VendorVerificationPage() {
  const router = useRouter();
  const { toast } = useToast();

  const {
    currentStep,
    completedSteps,
    setCurrentStep,
    setCompletedSteps,
    setAsVerified,
  } = useVerification();

  const [isFinishing, setIsFinishing] = useState(false);

  const handleStepComplete = () => {
    const stepId = verificationSteps[currentStep].id;

    if (!completedSteps.includes(stepId)) {
      setCompletedSteps([...completedSteps, stepId]);
    }

    if (currentStep < verificationSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleFinishVerification();
    }
  };

  const handleFinishVerification = () => {
    setIsFinishing(true);

    setTimeout(() => {
      setAsVerified();
      toast({
        title: "Verification Submitted!",
        description:
          "Your details are under review. You will be redirected to your dashboard.",
      });
      router.push("/vendor/dashboard");
    }, 2000);
  };

  const handleBackToDashboard = () => {
    toast({
      title: "Progress Saved",
      description:
        "Your verification progress has been saved. You can continue later.",
    });
    router.push("/vendor/dashboard");
  };

  const isStepCompleted = (stepId: string) =>
    completedSteps.includes(stepId);

  const ActiveComponent = verificationSteps[currentStep]?.component;

  const requiredStepsCount = verificationSteps.filter(
    (step) => !step.isOptional
  ).length;

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/40 p-4 sm:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <div className="relative text-center mb-8">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="absolute left-0 top-1/2 -translate-y-1/2"
                  onClick={handleBackToDashboard}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Dashboard
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  Your progress is saved automatically. You can safely return
                  to the dashboard and continue later.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <h1 className="text-3xl font-bold font-headline">
            Vendor Verification
          </h1>
          <p className="text-muted-foreground">
            Complete the following steps to start selling on ShopSphere.
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8 items-start">
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-4">
                <nav className="space-y-2">
                  {verificationSteps.map((step, index) => (
                    <button
                      key={step.id}
                      onClick={() => setCurrentStep(index)}
                      disabled={
                        index > 0 &&
                        !isStepCompleted(verificationSteps[index - 1].id)
                      }
                      className={cn(
                        "w-full text-left flex items-center gap-3 p-2 rounded-md transition-colors",
                        currentStep === index
                          ? "bg-primary/10 text-primary font-semibold"
                          : "hover:bg-muted/50",
                        isStepCompleted(step.id) &&
                          "text-muted-foreground font-normal",
                        index > 0 &&
                          !isStepCompleted(
                            verificationSteps[index - 1].id
                          ) &&
                          "opacity-50 cursor-not-allowed"
                      )}
                    >
                      {isStepCompleted(step.id) ? (
                        <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                      ) : (
                        <Circle
                          className={cn(
                            "h-5 w-5 flex-shrink-0",
                            currentStep === index
                              ? "text-primary"
                              : "text-muted-foreground"
                          )}
                        />
                      )}
                      <div className="flex flex-col">
                        <span className="text-sm">{step.name}</span>
                        {step.isOptional && (
                          <span className="text-xs text-muted-foreground">
                            (Optional)
                          </span>
                        )}
                      </div>
                    </button>
                  ))}
                </nav>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>
                  {verificationSteps[currentStep]?.name}
                </CardTitle>
                <CardDescription>
                  {verificationSteps[currentStep]?.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {ActiveComponent && (
                  <ActiveComponent onComplete={handleStepComplete} />
                )}
              </CardContent>
            </Card>

            {currentStep === verificationSteps.length - 1 && (
              <div className="mt-4 flex justify-end">
                <Button
                  onClick={handleFinishVerification}
                  disabled={
                    isFinishing ||
                    completedSteps.length < requiredStepsCount
                  }
                >
                  {isFinishing && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Finish & Submit for Review
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
