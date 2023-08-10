import Image from "next/image";

type Props = {
  userName: string;
  userIcon: string;
};
export const UserBadge = ({ userName, userIcon }: Props) => {
  return (
    <div className="flex flex-row items-center">
      {userIcon ? (
        <Image
          className="rounded-full"
          src={userIcon}
          alt="user icon"
          width={36}
          height={36}
        />
      ) : (
        <div className="h-[36px] w-[36px] bg-gray-300 rounded-full"></div>
      )}

      <div className="pl-2">{userName}</div>
    </div>
  );
};
