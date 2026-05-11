import AuthForm from "@/components/layout/AuthForm";
import { IParamsProps } from "@vibe-queue/shared";

export default async function JoinOnRedirect({ params }: IParamsProps) {
  const { code } = await params;

  return (
    <AuthForm
      redirectedToJoin={true}
      code={code}
      cardTitle="Join Room"
      cardDescription="Enter the nickname to join a room."
      cardAction="Joining..."
      cardButton="Join Room"
    />
  );
}
