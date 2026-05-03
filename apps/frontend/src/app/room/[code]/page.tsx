import Background from "@/components/layout/Background";
import Header from "@/components/layout/Header";
import Room from "@/components/layout/Room";

type TRoomPageProps = {
  params: Promise<{
    code: string;
  }>;
};

export default async function RoomPage({ params }: TRoomPageProps) {
  const { code } = await params;

  return (
    <>
      <Background />

      <div className="flex flex-col w-full max-w-5xl min-h-screen mx-auto z-10 relative px-4">
        <Header />
        <Room code={code} />
      </div>
    </>
  );
}
