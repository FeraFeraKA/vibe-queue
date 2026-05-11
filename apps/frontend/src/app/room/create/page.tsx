import AuthForm from "@/components/layout/Form";

const CreatePage = () => {
  return (
    <>
      <AuthForm
        cardTitle="Create Room"
        cardDescription="Create a new room and invite others to join."
        cardAction="Creating..."
        cardButton="Create Room"
      />
    </>
  );
};

export default CreatePage;
