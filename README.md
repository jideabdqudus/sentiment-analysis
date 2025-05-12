# Sentiment Analysis Tool 🎭

A modern web application that analyzes product reviews and provides sentiment analysis using AI. Built with Next.js and Together AI.

## 🚀 Getting Started

1. Clone the repository:

```bash
git clone https://github.com/jideabdqudus/sentiment-analysis.git
cd sentiment-analysis
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env.local
```

Add your Together AI API key to `.env.local`:

```
TOGETHER_API_KEY=your_api_key_here
```

4. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 🎯 Usage

1. Enter a product review in the text area
2. Press Enter or click the send button
3. The AI will analyze the sentiment and provide a result
4. Results include:
   - Sentiment (Positive/Negative/Neutral)
   - Confidence score

## 📝 License

This project is licensed under the MIT License.
