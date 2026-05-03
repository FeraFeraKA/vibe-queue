import About from "@/components/layout/About";
import Background from "@/components/layout/Background";
import Header from "@/components/layout/Header";

const AboutPage = () => {
  return (
    <>
      <div className="w-[90%] md:w-[70%] mx-auto z-10 relative">
        <Header />
      </div>

      <Background />
      <About />
    </>
  );
};

export default AboutPage;
