"use client";

import { useState, FormEvent } from "react";
import axios from "axios";
import { FiArrowRight } from "react-icons/fi";

export default function HomePage() {
  // フォームの各入力値を管理するためのState
  const [theme, setTheme] = useState("");
  const [target, setTarget] = useState("");
  const [goal, setGoal] = useState("");
  const [tone, setTone] = useState("です・ます調"); // デフォルト値を設定

  // ローディング状態と結果メッセージを管理するためのState
  const [isLoading, setIsLoading] = useState(false);
  const [resultMessage, setResultMessage] = useState("");

  // フォーム送信時の処理
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setResultMessage("");

    // Nodeの環境に応じて使用するWebhook URLを自動で切り替える
    const webhookUrl =
      process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_N8N_WEBHOOK_PROD_URL
        : process.env.NEXT_PUBLIC_N8N_WEBHOOK_DEV_URL;

    if (!webhookUrl) {
      setResultMessage("エラー: Webhook URLが設定されていません。");
      setIsLoading(false);
      return;
    }

    try {
      // 決定したURLに対してリクエストを送信
      await axios.post(webhookUrl, {
        theme,
        target,
        goal,
        tone,
      });

      setResultMessage(
        "ドラフトの生成リクエストを受け付けました。完了後、Notionをご確認ください。"
      );
    } catch (error) {
      console.error("API Request Failed:", error);
      setResultMessage(
        "エラーが発生しました。時間をおいて再度お試しください。"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-gray-50 p-4 sm:p-8">
      <div className="w-full max-w-2xl">
        <header className="text-center mb-10">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-3 text-zinc-900">
            DraftDash
          </h1>
          <p className="text-lg text-slate-500">
            アイデアから記事のドラフトを5分で作成
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-200"
        >
          <div className="mb-6">
            <label
              htmlFor="theme"
              className="block mb-2 text-sm font-bold text-gray-700 uppercase tracking-wider"
            >
              記事のテーマ / メインキーワード
            </label>
            <input
              id="theme"
              type="text"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              required
              className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white transition-colors"
              placeholder="例: Next.js ISR"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="target"
              className="block mb-2 text-sm font-bold text-gray-700 uppercase tracking-wider"
            >
              ターゲット読者
            </label>
            <textarea
              id="target"
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              rows={3}
              className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white transition-colors"
              placeholder="例: プログラミング学習を始めたばかりの学生"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="goal"
              className="block mb-2 text-sm font-bold text-gray-700 uppercase tracking-wider"
            >
              この記事の最も伝えたい結論 / ゴール
            </label>
            <textarea
              id="goal"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              rows={3}
              className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white transition-colors"
              placeholder="例: ISRのメリットを理解してもらう"
            />
          </div>

          <div className="mb-8">
            <label
              htmlFor="tone"
              className="block mb-2 text-sm font-bold text-gray-700 uppercase tracking-wider"
            >
              文体
            </label>
            <select
              id="tone"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:bg-white transition-colors appearance-none bg-no-repeat"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                backgroundPosition: "right 0.75rem center",
                backgroundSize: "1.5em 1.5em",
              }}
            >
              <option value="です・ます調">です・ます調（丁寧）</option>
              <option value="だ・である調">だ・である調（断定的）</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-2 text-white bg-gradient-to-r from-green-400 to-teal-500 hover:from-green-500 hover:to-teal-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-bold rounded-lg text-lg px-5 py-3.5 text-center transition-all duration-200 ease-in-out transform hover:scale-102 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              "生成中..."
            ) : (
              <>
                ドラフトを生成する
                <FiArrowRight className="ml-2" />
              </>
            )}
          </button>
        </form>

        {resultMessage && (
          <div className="mt-8 p-5 bg-white rounded-lg text-center border border-gray-200 shadow-sm">
            <p className="text-gray-700">{resultMessage}</p>
          </div>
        )}
      </div>
    </main>
  );
}
