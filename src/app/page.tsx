"use client";

import { useRouter } from "next/navigation";
import { PrimaryButton } from "@/components/Button/PrimaryButton";
import styles from "@/components/StartScreen/StartScreen.module.css";
import { ThumbsUpIcon } from "@/components/icons/ThumbsUpIcon";

export default function StartScreen() {
  const router = useRouter();
  const handleStart = () => {
    router.push("/game");
  };

  return (
    <div className={styles.startContainer}>
      <div className={styles.content}>
        <div className={styles.thumbsUp}>
          <ThumbsUpIcon />
        </div>
        <div className={styles.textContainer}>
          <h1 className={styles.title}>Who wants to be a millionaire?</h1>
          <PrimaryButton text="Start" onClick={handleStart} />
        </div>
      </div>
    </div>
  );
}
