import { Button } from "../ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const JoinCard = () => {
  return (
    <Card className="w-[90%] max-w-xl mx-auto mt-10">
      <CardHeader>
        <CardTitle>Join a room</CardTitle>
        <CardDescription>Enter the code told by your crew</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="flex flex-col gap-6">
          <div className="flex flex-col gap-3">
            <Label htmlFor="room-code">Room Code</Label>
            <Input id="room-code" type="text" placeholder="#47D9" />
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="nickname">Nickname</Label>
            <Input
              id="nickname"
              type="text"
              placeholder="Enter your nickname"
            />
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" className="w-full text-white dark:bg-blue-700">
          Join Room
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JoinCard;
