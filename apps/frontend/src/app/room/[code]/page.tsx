import { IParamsProps } from "@vibe-queue/shared";
import RoomClient from "./RoomClient";

export default async function RoomPage({ params }: IParamsProps) {
  const { code } = await params;

  return <RoomClient code={code} />;
}
