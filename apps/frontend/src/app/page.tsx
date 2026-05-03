import Background from "@/components/layout/Background";
import Header from "@/components/layout/Header";
import MainPage from "@/components/layout/MainPage";

export default function HomePage() {
  return (
    <>
      <Background />

      <div className="w-[90%] md:w-[70%] mx-auto z-10 relative">
        <Header />
        <MainPage />
      </div>
    </>
  );
}
