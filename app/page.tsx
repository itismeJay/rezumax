// app/page.tsx
import { Metadata } from "next";
import { CompanyLogos } from "@/components/homepage/CompanyLogos";
import { CTASection } from "@/components/homepage/CTASection";
import { FeaturesSection } from "@/components/homepage/FeaturesSection";
import { Footer } from "@/components/homepage/Footer";
import { HeroSection } from "@/components/homepage/HeroSection";
import { HowItWorks } from "@/components/homepage/HowItWorks";
import { LiveScorePreview } from "@/components/homepage/LiveScorePreview";
import { WhyDevelopers } from "@/components/homepage/WhyDevelopers";
import { Navbar } from "@/components/Navbar";

export const metadata: Metadata = {
  title: "DevResumeAI – AI-Powered Resume Builder",
  description:
    "DevResumeAI helps you create professional, optimized resumes quickly. Tailor your resume for job applications, improve your chances of landing interviews, and get AI-powered suggestions.",
  keywords: [
    "resume builder",
    "AI resume",
    "professional resume",
    "job application",
    "resume optimizer",
    "DevResumeAI",
  ],
  authors: [{ name: "Rb Jay Salamanes" }],
  openGraph: {
    title: "DevResumeAI – AI-Powered Resume Builder",
    description:
      "Create and optimize professional resumes with AI. Improve your chances of landing interviews.",
    url: "https://devresumeai.com", // change to your domain
    siteName: "DevResumeAI",
    images: [
      {
        url: "https://devresumeai.com/og-image.png", // your social sharing image
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DevResumeAI – AI-Powered Resume Builder",
    description:
      "Create and optimize professional resumes with AI. Improve your chances of landing interviews.",
    images: ["https://devresumeai.com/og-image.png"], // same OG image
    creator: "@RbJaySalamanes", // your Twitter handle if any
  },
};

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <CompanyLogos />
      <HowItWorks />
      <FeaturesSection />
      <WhyDevelopers />
      <LiveScorePreview />
      <CTASection />
      <Footer />
    </div>
  );
}
