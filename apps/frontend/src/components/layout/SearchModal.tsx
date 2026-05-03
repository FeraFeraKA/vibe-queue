import { Input } from "../ui/input";

interface ISearchModalProps {
  isOpen: boolean;
  handleOpen: (flag: boolean) => void;
}

const SearchModal = ({ isOpen, handleOpen }: ISearchModalProps) => {
  return (
    <>
      {isOpen ? (
        <div className="flex justify-center fixed inset-0 z-20">
          <div
            className="bg-black/50 backdrop-blur-xs absolute inset-0"
            onClick={() => handleOpen(false)}
          ></div>
          <div className="mt-30 w-full max-w-5xl px-4 z-20">
            <Input
              placeholder="Search tracks..."
              className="rounded-xl h-12 bg-[#171717]"
            />
          </div>
        </div>
      ) : null}
    </>
  );
};

export default SearchModal;
