"use client";
import { howItWorksSteps } from "@/constants/how-it-works";

export function HowItWorks() {
  return (
    <section className="py-20 lg:py-32 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Simple Process
          </span>

          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>

          <p className="text-lg text-muted-foreground">
            From zero to job-ready resume in minutes, not hours.
          </p>
        </div>

        <div className="relative">
          {/* Desktop connection line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-border to-transparent -translate-y-1/2" />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
            {howItWorksSteps.map((step, index) => {
              const Icon = step.icon;

              return (
                <div key={step.step} className="relative group">
                  <div className="flex flex-col items-center text-center">
                    {/* Icon card */}
                    <div className="relative mb-6">
                      <div className="w-20 h-20 rounded-2xl bg-background border-2 border-border group-hover:border-primary/50 flex items-center justify-center transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/10">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>

                      {/* Step badge */}
                      <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center">
                        {step.step}
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      {step.title}
                    </h3>

                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Mobile connector */}
                  {index < howItWorksSteps.length - 1 && (
                    <div className="hidden md:block lg:hidden absolute -bottom-4 left-1/2 -translate-x-1/2">
                      <div className="w-0.5 h-8 bg-border" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
