"use client";

import { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { PrimaryButton } from "@/components/Button/PrimaryButton";
import styles from "@/components/EndScreen/EndScreen.module.css";
import { ThumbsUpIcon } from "@/components/icons/ThumbsUpIcon";

function EndScreenContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const scoreParam = searchParams.get("score");
  const score = scoreParam ? Number(scoreParam) : 0;

  const handleRestart = () => {
    router.replace("/");
  };

  return (
    <div className={styles.endContainer}>
      <div className={styles.content}>
        <div className={styles.thumbsUp}>
          <ThumbsUpIcon />
        </div>
        <div className={styles.textContainer}>
          <h2 className={styles.finalScore}>Total score:</h2>
          <h1 className={styles.scoreAmount}>
            ${score.toLocaleString()} earned
          </h1>
          <PrimaryButton text="Try Again" onClick={handleRestart} />
        </div>
      </div>
    </div>
  );
}

export default function EndScreen() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EndScreenContent />
    </Suspense>
  );
}
