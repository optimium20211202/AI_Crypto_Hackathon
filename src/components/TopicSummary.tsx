import { getTopic } from "@/utils";
import Image from "next/image";
import Link from "next/link";

type Props = {
  topicId: number;
};

export const TopicSummary = ({ topicId }: Props) => {
  const { largeImagePath, textShort } = getTopic(topicId) || {
    largeImagePath: "",
  };
  return (
    <div className="flex flex-col">
      <Image
        className="flex-shrink-0"
        src={largeImagePath}
        alt="news image"
        width={366}
        height={206}
      />
      <div className="mt-3 font-bold text-left text-sm text-gray-base leading-6">
        {textShort}
      </div>
    </div>
  );
};
