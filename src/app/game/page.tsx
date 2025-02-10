"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { GameScreen } from "@/components/GameScreen/GameScreen";
import { useGameLogic } from "@/hooks/useGameLogic";

export default function GamePage() {
  const router = useRouter();
  const gameLogic = useGameLogic();

  useEffect(() => {
    if (gameLogic.isGameOver) {
      router.replace(`/end?score=${gameLogic.totalPrize}`);
    }
  }, [gameLogic.isGameOver, gameLogic.totalPrize, router]);

  return <GameScreen gameLogic={gameLogic} />;
}
