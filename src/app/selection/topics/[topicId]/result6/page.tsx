import { Explanation } from "@/components/Explanation";
import { MyTimeline } from "@/components/MyTimeline";
import { PubbleLogo } from "@/components/PubbleLogo";
import { UserBadgeWithUserInfo } from "@/components/UserBadgWithUserInfo";
import Link from "next/link";

type Props = {
  params: {
    topicId: string;
  };
};
export default function Result6Page({ params }: Props) {
  const topicId = Number(params.topicId);

  return (
    <main className="main-container">
      <div className="w-full flex flex-row justify-between">
        <UserBadgeWithUserInfo />
      </div>
      <PubbleLogo className="" isColored width={150} height={60} />

      <div className="m-auto mt-md font-bold text-xl">
        💬 ディスカッションタイム
      </div>
      <div className="mt-md">
        <Explanation
          imagePath="/result/result6.png"
          imageHeight={240}
          imageWidth={325}
          text="それでは、自分のタイムラインと他の人のタイムラインを比較しながら、ディスカッションをしましょう。"
        />
      </div>
      <div className="mt-md">
        <MyTimeline topicId={topicId} showPreference={true} />
      </div>
      <Link href={`/selection/topics`} style={{ marginTop: "68px" }}>
        <button
          className="py-3.5 px-4 text-center text-xl bg-white font-black rounded-full"
          style={{
            color: "#888888",
            boxShadow: "0px 0px 12px 0px rgba(0, 0, 0, 0.12)",
          }}
        >
          ディスカッション終了
        </button>
      </Link>
    </main>
  );
}
