import Image from "next/image";
import { companies } from "@/constants/companies";

export function CompanyLogos() {
  // Duplicate for seamless infinite scroll
  const duplicatedCompanies = [...companies, ...companies];

  return (
    <section className="py-16 lg:py-24 bg-card/50 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Create a Resume That Gets You Hired at{" "}
            <span className="gradient-text">These Companies</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            AI-optimized for ATS systems and recruiter expectations used by top
            tech companies.
          </p>
        </div>

        {/* Infinite scroll */}
        <div className="relative w-full overflow-hidden">
          {/* Gradient edges */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-card/50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-card/50 to-transparent z-10 pointer-events-none" />

          {/* IMPORTANT PART */}
          <div className="flex flex-nowrap min-w-max animate-scroll-left">
            {duplicatedCompanies.map((company, index) => (
              <div
                key={`${company.name}-${index}`}
                className="flex-shrink-0 mx-8 lg:mx-12 group"
              >
                <div className="rounded-lg p-2 transition-all duration-300 hover:green-glow">
                  <Image
                    src={company.logo}
                    alt={`${company.name} logo`}
                    width={120}
                    height={40}
                    unoptimized
                    className="h-8 lg:h-10 w-auto object-contain opacity-40 grayscale transition-all duration-300 dark:invert group-hover:opacity-100 group-hover:grayscale-0 group-hover:scale-110"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Logos are for demonstration purposes only.
        </p>
      </div>
    </section>
  );
}
