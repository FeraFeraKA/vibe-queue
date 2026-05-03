import Background from "@/components/layout/Background";
import CreateCard from "@/components/layout/CreateCard";
import Header from "@/components/layout/Header";

const CreatePage = () => {
  return (
    <>
      <Background />
      <div className="w-[90%] md:w-[70%] mx-auto z-10 relative">
        <Header />
      </div>

      <CreateCard />
    </>
  );
};

export default CreatePage;
