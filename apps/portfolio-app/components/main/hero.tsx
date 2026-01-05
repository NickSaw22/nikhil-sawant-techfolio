import { HeroContent } from "../sub/hero-content";

export const Hero = () => {
  return (
    <div id="home" className="relative flex flex-col h-full w-full min-h-screen">
      <video
        autoPlay
        muted
        loop
        className="rotate-180 absolute top-[-340px] left-0 w-full h-full object-cover -z-20"
      >
        <source src="/videos/blackhole.webm" type="video/webm" />
      </video>

      <HeroContent />
    </div>
  );
};
