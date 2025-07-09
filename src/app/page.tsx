"use client";

import { useState, FormEvent } from "react";
import axios from "axios";

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
    <main className="max-w-3xl mx-auto mb-10 p-6">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2">DraftDash</h1>
        <p className="text-lg text-gray-600">
          アイデアから記事のドラフトを5分で作成
        </p>
      </header>

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label
            htmlFor="theme"
            className="block mb-2 text-lg font-bold text-gray-800"
          >
            記事のテーマ / メインキーワード
          </label>
          <input
            id="theme"
            type="text"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="例: Next.js ISR"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="target"
            className="block mb-2 text-lg font-bold text-gray-800"
          >
            ターゲット読者
          </label>
          <textarea
            id="target"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            rows={3}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="例: プログラミング学習を始めたばかりの学生"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="goal"
            className="block mb-2 text-lg font-bold text-gray-800"
          >
            この記事の最も伝えたい結論 / ゴール
          </label>
          <textarea
            id="goal"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            rows={3}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            placeholder="例: ISRを使えば、ビルド時間を短縮しつつ最新の情報を表示できることを理解してもらう"
          />
        </div>

        <div className="mb-12">
          <label
            htmlFor="tone"
            className="block mb-2 text-lg font-bold text-gray-800"
          >
            文体
          </label>
          <select
            id="tone"
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
          >
            <option value="です・ます調">です・ます調（丁寧）</option>
            <option value="だ・である調">だ・である調（断定的）</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-lg px-5 py-3.5 text-center transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isLoading ? "生成中..." : "ドラフトを生成する"}
        </button>
      </form>

      {resultMessage && (
        <div className="mt-8 p-5 bg-gray-100 rounded-lg text-center">
          <p className="text-gray-800">{resultMessage}</p>
        </div>
      )}
    </main>
  );
}
