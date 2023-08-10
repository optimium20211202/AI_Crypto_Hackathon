"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { SelectionPost } from "./SelectionPost";
import { PLAY_CONTENTS_NUM } from "@/constants";
import { useRouter } from "next/navigation";
// import queryString from "query-string";
import { getPosAndNegContents } from "@/utils";
import { Content } from "@/types";
import { userIcons } from "@/userIcons";
import { userNames } from "@/userNames";

// 最低でもこの確率で反対意見が出るように調整
const RANDOM_LIMIT = 0.0;

const updateScore = (doLike: boolean, score: number, label: number) => {
  const adj = label == 1 ? 1 : -1;

  const updatedScore = Math.max(
    0.0 + RANDOM_LIMIT,
    Math.min(doLike ? score + 0.1 * adj : score - 0.1 * adj, 1.0 - RANDOM_LIMIT)
  );
  return updatedScore;
};

type Props = {
  topicId: number;
};

export const SelectionPlay = ({ topicId }: Props) => {
  const router = useRouter();
  const displayedContents = useRef<number[]>([]);
  const [count, setCount] = useState(PLAY_CONTENTS_NUM);
  const decrementCount = () => setCount((prev) => prev - 1);
  const complete = count < 1;
  const updateDisplayedContents = (displayedContentId: number) => {
    displayedContents.current.push(displayedContentId);
  };

  const [score, setScore] = useState(0.5);

  const [posContents, negContents] = useMemo(
    () => getPosAndNegContents(topicId)!,
    [topicId]
  );

  // TODO: error handling
  if (!posContents || !negContents) {
    throw new Error("contents is null");
  }

  const [content, setContent] = useState<Content>(posContents[0]);
  const [currentPosIndex, setCurrentPosIndex] = useState(1);
  const [currentNegIndex, setCurrentNegIndex] = useState(0);

  const [userIcon, setUserIcon] = useState(userIcons[0]);
  const [userName, setUserName] = useState(userNames[0]);

  const handleNextContent = (updatedScore: number) => {
    updateDisplayedContents(content.id);
    const targetLabel = updatedScore < Math.random() ? 0 : 1;
    if (targetLabel === 0) {
      const targetIndex = currentPosIndex + 1;
      if (targetIndex >= posContents.length) {
        // TODO: error handling
      }
      setContent(posContents[targetIndex]);
      setCurrentPosIndex(targetIndex);
    } else {
      const targetIndex = currentNegIndex + 1;
      if (targetIndex >= negContents.length) {
        // TODO: error handling
      }
      setContent(negContents[targetIndex]);
      setCurrentNegIndex(targetIndex);
    }
    decrementCount();
    const dummyUserIndex = Math.floor(Math.random() * 15);
    setUserIcon(userIcons[dummyUserIndex]);
    setUserName(userNames[dummyUserIndex]);
  };

  const onClickLike = () => {
    const updatedScore = updateScore(true, score, content.label);
    setScore(updatedScore);
    handleNextContent(updatedScore);
  };
  const onClickSkip = () => {
    const updatedScore = updateScore(false, score, content.label);
    setScore(updatedScore);
    handleNextContent(updatedScore);
  };

  useEffect(() => {
    // TODO: 完了時の画面遷移の見せ方は工夫した方が良さそう。
    if (complete) {
      // console.log(displayedContents.current);
      // const q = queryString.stringify(
      //   { contents: displayedContents.current },
      //   { arrayFormat: "comma" }
      // );

      localStorage.setItem(
        "displayedContents",
        JSON.stringify(displayedContents.current)
      );
      localStorage.setItem("preference", score > 0.5 ? "1" : "0");
      // router.push(
      //   `/selection/topics/${topicId}/result1/?${q}&preference=${
      //     score > 0.5 ? 1 : 0
      //   }`
      // );
      router.push(`/selection/topics/${topicId}/result1`);
    }
  }, [complete, router, score, topicId]);

  return (
    <>
      <div className="mr-auto mt-9 font-bold text-xl">
        👀SNSコメント（{count}）
      </div>
      <div className="mt-6">
        <SelectionPost
          text={content.text}
          complete={complete}
          onClickLike={onClickLike}
          onClickSkip={onClickSkip}
          userIcon={userIcon}
          userName={userName}
        />
      </div>
    </>
  );
};