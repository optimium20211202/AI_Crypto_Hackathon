import { Explanation } from "@/components/Explanation";
import { PubbleLogo } from "@/components/PubbleLogo";
import { UserBadgeWithUserInfo } from "@/components/UserBadgWithUserInfo";
import Link from "next/link";

type Props = {
  params: {
    topicId: string;
  };
};
export default function Result3Page({ params }: Props) {
  const topicId = Number(params.topicId);

  return (
    <main className="w-96 px-3 pb-16 max-w-full mx-auto text-center flex flex-col items-center justify-start">
      <div className="w-full mt-6 flex flex-row justify-between">
        <UserBadgeWithUserInfo />
      </div>
      <PubbleLogo className="" isColored width={150} height={60} />

      <div className="m-auto mt-9 font-bold text-xl">
        ⚖️ 実際はすごく偏ってた
      </div>
      <div className="mt-9">
        <Explanation
          imagePath="/result/result2.png"
          imageHeight={180}
          imageWidth={270}
          text={
            "一見、さまざまな意見が出てきたように感じますが、じつは多数が片方の意見にかたよっていました。あなたの意見をうかがいながら、こちらで都合のよい情報を投稿していました。\n\nちょっと真逆の好みの人のタイムラインを見てみませんか？"
          }
        />
      </div>
      <Link className="mt-10" href={`/selection/topics/${topicId}/result4`}>
        <button className="w-60 h-12 bg-blue-base text-center text-white text-xl font-black rounded-4xl shadow-base tracking-[0.05rem] indent-[0.05rem]">
          他人のを見る
        </button>
      </Link>
      <Link className="mt-6" href={`/selection/topics/${topicId}/result2`}>
        <button className="w-60 h-12 text-center text-xl font-bold tracking-[1rem] indent-[1rem]">
          戻る
        </button>
      </Link>
    </main>
  );
}