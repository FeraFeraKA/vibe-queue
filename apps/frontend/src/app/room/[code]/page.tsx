import RoomClient from "./RoomClient";

interface IRoomPageProps {
  params: Promise<{
    code: string;
  }>;
}

export default async function RoomPage({ params }: IRoomPageProps) {
  const { code } = await params;

  return <RoomClient code={code} />;
}
