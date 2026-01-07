import { HeroContent } from "../sub/hero-content";

export const Hero = () => {
  return (
    <div id="home" className="relative flex flex-col items-center justify-center h-screen w-full overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="rotate-180 absolute inset-0 w-full h-[120vh] object-cover -z-20"
        style={{ top: '-55vh' }}
      >
        <source src="/videos/blackhole.webm" type="video/webm" />
      </video>

      <HeroContent />
    </div>
  );
};
