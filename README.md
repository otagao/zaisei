# 月次収支管理ダッシュボード (zaisei)

> このプロジェクトは Claude Code 等のLLMサービスを用いてvibe codeされました。

個人用の月次収支管理ダッシュボードです。シンプルなMarkdownベースのデータ管理とChart.jsによる可視化を実現しています。

## 技術スタック

- **Astro v4** - 静的サイトジェネレーター
- **TypeScript** - 型安全性
- **Chart.js** - グラフ可視化
- **Tailwind CSS** - スタイリング
- **Cloudflare Pages** - デプロイ先

## 開発メモ

### セットアップ
```bash
npm install
npm run dev
```

### データ追加
`src/content/transactions/`にMarkdownファイルを作成:
```md
---
title: "ラーメン代"
date: 2025-07-04
amount: -900
type: expense
---
```

### ビルド・デプロイ
```bash
npm run build
# Cloudflare Pagesで自動デプロイ
```

## 主要機能

- 月次収支の集計・表示
- 収入/支出の棒グラフ
- 取引履歴のタイムライン表示
- 静的サイト生成（高速・軽量）

## 備考

- 全て静的生成のため、外部APIなし
- データはMarkdownファイルで管理
- 日本語UI、英語コメント
