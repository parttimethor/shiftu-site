import { ShaderBackground } from "@/components/field/ShaderBackgroundLazy";
import { ScrollProgress } from "@/components/home/ScrollProgress";
import { Hero } from "@/components/home/Hero";
import { StoryExperience } from "@/components/home/StoryExperience";
import { Certainty } from "@/components/home/Certainty";
import { LeadLoop } from "@/components/home/LeadLoop";
import { ChatDemo } from "@/components/home/ChatDemo";
import { Standards } from "@/components/home/Standards";
import { RevealBuild } from "@/components/home/RevealBuild";
import { RoiCalculator } from "@/components/home/RoiCalculator";
import { PerceivedValue } from "@/components/home/PerceivedValue";
import { Exclusivity } from "@/components/home/Exclusivity";
import { FinalCTAImmersive } from "@/components/home/FinalCTAImmersive";

// Immersive home: shader background + an interactive persuasion scroll.
// Page stays a Server Component; each beat is an isolated client/server leaf.
export default function HomePage() {
  return (
    <>
      <ShaderBackground />
      <ScrollProgress />
      <Hero />
      <StoryExperience />
      <Certainty />
      <LeadLoop />
      <ChatDemo />
      <Standards />
      <RevealBuild />
      <RoiCalculator />
      <PerceivedValue />
      <Exclusivity />
      <FinalCTAImmersive />
    </>
  );
}
