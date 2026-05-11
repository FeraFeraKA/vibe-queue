import AuthForm from "@/components/layout/AuthForm";

const JoinPage = () => {
  return (
    <>
      <AuthForm
        joining={true}
        cardTitle="Join Room"
        cardDescription="Enter the room code and nickname to join a room."
        cardAction="Joining..."
        cardButton="Join Room"
      />
    </>
  );
};

export default JoinPage;
