# DraftDash

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/) [![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/) [![n8n](https://img.shields.io/badge/n8n-%23F7796B?style=for-the-badge&logo=n8n&logoColor=white)](https://n8n.io/) [![Google Gemini](https://img.shields.io/badge/Google%20Gemini-4285F4?style=for-the-badge&logo=google-gemini&logoColor=white)](https://gemini.google.com/)

## **アイデアから記事のドラフトを 5 分で作成する、AI 搭載型コンテンツ作成支援ツール**

<p align="center">
  <a href="https://draftdash-frontend.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/デモサイトを見る-007ACC?style=for-the-badge&logo=vercel&logoColor=white" alt="デモサイト">
  </a>
  <a href="public\images\demo.png" target="_blank">
    <img src="https://img.shields.io/badge/デモ動画を見る-FF0000?style=for-the-badge&logo=youtube&logoColor=white" alt="デモ動画">
  </a>
</p>

---

## 1. プロジェクトの目的・ビジョン

### 1.1. 解決したい課題

コンテンツマーケティングにおいて、多くの専門家は「『質』と『速度』の両立」という構造的な課題に直面しています。
競合調査や構成案作成といった準備工程に多くの時間を費やすあまり、記事の最も価値ある核となるべき**「独自の経験や洞察（E-E-A-T）」**を言語化する作業を、後回しにせざるを得ない状況でした。

### 1.2. このプロジェクトが目指す世界

`DraftDash` は、AI との「戦略的“分業”」を実現することで、この非効率を解消します。
AI が得意なリサーチや構造化といった「面倒な 8 割」を自動化し、人間は自身の経験や洞察といった「最も価値ある 2 割」の創造的作業に集中できる世界を目指します。

### 1.3. 私がこのプロジェクトを作る理由（Why me）

このプロジェクトは、私自身の原体験から生まれました。
Web マーケティングに携わる中で感じた「価値ある作業に集中しきれない」というジレンマを、技術の力で解決したいと考えたのが原点です。

そのワークフローを最も効率的に実現する技術スタックを検討する中で、Next.js によるモダンなフロントエンド開発と、n8n を活用したローコードでの高速なバックエンド自動化処理を組み合わせるというアイデアに至りました。

この`DraftDash`の開発は、私にとって単にコードを書く行為ではありません。**自身の原体験からユーザーの根深いペインを発見し、AI という最新技術を用いて本質的な解決策を設計し、プロトタイプとして迅速に形にする**という、一気通貫したプロダクト開発のサイクルそのものです。
この経験で培った能力は、ユーザーの「できない」を「できる」に変える、価値あるプロダクトを創造する上で必ず活かせると確信しています。

---

## 2. 主な機能一覧

- **AI による高速ドラフト生成:**
  テーマやターゲット読者などの簡単な条件を入力するだけで、記事全体のドラフト（タイトル案、導入文、構成案、各章の本文）を自動生成します。
- **E-E-A-T 注入ガイド:**
  生成されたドラフト内に、`[💡あなたの具体的な体験談をここに追加してください]` のような編集ガイドを自動挿入し、ユーザーが独自の価値を追記する作業をサポートします。
- **Notion へのシームレスな連携:**
  生成されたドラフトを、ワンクリックで使い慣れた Notion にデータベースページとして保存し、すぐに編集作業へ移行できます。

---

## 3. 使用技術（技術スタック）

- **フロントエンド:** Next.js, React, TypeScript, Tailwind CSS
- **バックエンド / 自動化:** n8n
- **外部 API:** Google AI (Gemini), Notion API
- **インフラ:** Vercel

---

## 4. システムアーキテクチャ

このアプリケーションは、ユーザーのリクエストを即座に受け付けるフロントエンドと、時間のかかる重い処理を実行する非同期なバックエンドを分離した、モダンなアーキテクチャを採用しています。

```
[User on Next.js Frontend]
|
| 1. フォーム入力・送信 (POST Request)
V
[n8n Webhook]
|
| 2. 即時レスポンスをフロントに返す
|
| (ここからバックグラウンド処理)
|
| 3. プロンプトを組み立てる (Set Node)
V
[AI (LLM) API]
|
| 4. 記事ドラフトを生成
V
[Code Node (データ整形)]
|
| 5. タイトルと本文を分割・整形
V
[Notion API]
|
| 6. 新規ページとしてデータベースに保存
V
[Notion Database]
```

---

## 5. セットアップ手順

1.  このリポジトリをクローンします。
    ```bash
    git clone https://github.com/t-skg/draftdash_frontend.git
    ```
2.  ディレクトリを移動し、依存関係をインストールします。
    ```bash
    cd draftdash_frontend
    npm install
    ```
3.  `.env.local.example` を参考に `.env.local` ファイルを作成し、n8n の Webhook URL を設定します。
    ```env
    NEXT_PUBLIC_N8N_WEBHOOK_DEV_URL='Your n8n Test Webhook URL'
    NEXT_PUBLIC_N8N_WEBHOOK_PROD_URL='Your n8n Production Webhook URL'
    ```
4.  開発サーバーを起動します。
    ```bash
    npm run dev
    ```
5.  ブラウザで `http://localhost:3000` を開きます。
