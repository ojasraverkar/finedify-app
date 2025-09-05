import React, { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { FaStar, FaChartLine, FaRocket } from "react-icons/fa";
import { createPortal } from "react-dom";

const modules = [
	{
		id: 1,
		title: "Stock Market Basics",
		description:
			"Learn the fundamentals of stocks, exchanges, IPOs, and order types.",
		lessons: [
			{ title: "What Are Stocks?", rating: "Basic" },
			{ title: "Stock Exchanges", rating: "Basic" },
			{ title: "Initial Public Offering (IPO)", rating: "Intermediate" },
			{ title: "Order Types", rating: "Intermediate" },
		],
		content: [
			{
				title: "What Are Stocks?",
				details: `Stocks represent ownership shares in a company. When you buy stock, you become a partial owner of that business.\nKey Concepts:\n• Share: A unit of ownership in a company\n• Shareholder: Someone who owns shares in a company\n• Market Capitalization: Total value of a company's shares (shares outstanding × stock price)\n• Outstanding Shares: Total number of shares issued by a company\nTypes of Stocks:\n1. Common Stock: Voting rights, potential dividends, last paid in bankruptcy\n2. Preferred Stock: Fixed dividends, no voting rights, priority in bankruptcy\nStock Classifications by Size: Large-cap, Mid-cap, Small-cap, Micro-cap.`,
			},
			{
				title: "Stock Exchanges",
				details: `A regulated marketplace where stocks are bought and sold. Major Global Exchanges: NYSE, NASDAQ, LSE, NSE (India). Trading Hours: Business hours, pre-market/after-hours, weekends usually closed.`,
			},
			{
				title: "Initial Public Offering (IPO)",
				details: `The first time a private company sells shares to the public. IPO Process: Preparation, underwriter selection, S-1 filing, roadshow, price setting, trading begins. Risks: High volatility, limited history, lock-up periods, overvaluation. Red Flags: Market peaks, excessive hype, management selling immediately.`,
			},
			{
				title: "Order Types",
				details: `Market Orders: Buy/sell immediately at current price. Limit Orders: Buy/sell at specific price. Stop Orders: Sell/buy at specific price for risk management. Advanced Types: GTC, Day Orders, FOK, AON.`,
			},
		],
	},
	{
		id: 2,
		title: "Risk & Return",
		description: "Understand risk types, volatility, drawdowns, and leverage.",
		lessons: [
			{ title: "Understanding Risk", rating: "Basic" },
			{ title: "Volatility", rating: "Intermediate" },
			{ title: "Drawdowns", rating: "Intermediate" },
			{ title: "Leverage Cautions", rating: "Advanced" },
		],
		content: [
			{
				title: "Understanding Risk",
				details: `Risk is the possibility of losing money or not meeting expected returns. Types: Market risk (systematic), company-specific risk (unsystematic), inflation risk, liquidity risk, currency risk.`,
			},
			{
				title: "Volatility",
				details: `Volatility measures how much a stock's price fluctuates. Measured by standard deviation and beta. High volatility = larger swings, low volatility = stability. Manage with diversification, time horizon, dollar-cost averaging, position sizing.`,
			},
			{
				title: "Drawdowns",
				details: `Drawdown is the decline from peak to trough in investment value. Metrics: Maximum drawdown, duration, recovery time. Historical examples: 2008 crisis, COVID-19 crash, dot-com bubble. Manage with stress testing, risk budgeting, rebalancing, emergency fund.`,
			},
			{
				title: "Leverage Cautions",
				details: `Leverage uses borrowed money to increase exposure. Types: Margin trading, leveraged ETFs, options, forex. Risks: Amplified losses, interest costs, forced liquidation. Safe guidelines: Start small, understand costs, have exit strategy, maintain cushion, avoid leveraged ETFs for long-term.`,
			},
		],
	},
	{
		id: 3,
		title: "Portfolio Diversification",
		description:
			"Master diversification, sector rotation, correlation, and rebalancing.",
		lessons: [
			{ title: "Fundamentals of Diversification", rating: "Basic" },
			{ title: "Sector Diversification", rating: "Intermediate" },
			{ title: "Understanding Correlation", rating: "Intermediate" },
			{ title: "Rebalancing", rating: "Advanced" },
		],
		content: [
			{
				title: "Fundamentals of Diversification",
				details: `Diversification spreads investments across different assets to reduce risk. Principle: Don't put all your eggs in one basket. Benefits: Reduces volatility, different assets react differently, mathematical benefit from imperfect correlation.`,
			},
			{
				title: "Sector Diversification",
				details: `Major sectors: Technology, Healthcare, Financials, Consumer Discretionary, Consumer Staples, Energy, Utilities, Materials, Industrials, Real Estate, Communication Services. Sector rotation: Different sectors perform better in different economic phases.`,
			},
			{
				title: "Understanding Correlation",
				details: `Correlation measures how similarly two investments move. Range: -1 to +1. Examples: High positive (US stocks/S&P 500), moderate (US/international), low/negative (stocks/bonds, gold/stocks in crises). Geographic and asset class diversification.`,
			},
			{
				title: "Rebalancing",
				details: `Rebalancing adjusts portfolio to maintain target allocation. Why: Market movements change allocation, forces sell high/buy low, maintains risk level, removes emotion. Methods: Time-based, threshold-based, combination. Consider transaction costs, tax implications, market conditions, life changes. Tax-efficient: Use new contributions, harvest tax losses, asset location, avoid wash sale rules.`,
			},
		],
	},
	{
		id: 4,
		title: "Algorithmic Trading & HFT",
		description:
			"Explore algorithmic strategies, HFT, myths, and safe rules-based trading.",
		lessons: [
			{ title: "Introduction to Algorithmic Trading", rating: "Basic" },
			{ title: "High-Frequency Trading (HFT)", rating: "Intermediate" },
			{ title: "Myths vs Reality", rating: "Intermediate" },
			{ title: "Safe Introduction to Rules-Based Strategies", rating: "Advanced" },
		],
		content: [
			{
				title: "Introduction to Algorithmic Trading",
				details: `Algorithmic trading uses computer programs to automate trading decisions. It can range from simple rule-based strategies to complex high-frequency trading (HFT) systems.`,
			},
			{
				title: "High-Frequency Trading (HFT)",
				details: `HFT Characteristics:\n• Speed: Trades executed in microseconds\n• Volume: Millions of trades per day\n• Holding Period: Positions held for seconds or minutes\n• Technology: Requires expensive infrastructure\nHFT Strategies:\n1. Market Making: Continuously quote buy/sell prices, capture bid-ask spread, provide market liquidity\n2. Statistical Arbitrage: Exploit temporary price inefficiencies, mean reversion between related securities, high win rate, small profits per trade\n3. Latency Arbitrage: Exploit delays in price updates across exchanges, requires fastest possible connections, controversial practice\nHFT Infrastructure:\n• Co-location: Servers placed next to exchange servers\n• Direct Market Access: Bypass traditional brokers\n• Specialized Hardware: Custom chips, optimized networks\n• Algorithmic Development: Quantitative analysts and programmers`,
			},
			{
				title: "Myths vs Reality",
				details: `Myth 1: "Algorithmic trading guarantees profits" Reality: Algorithms can lose money, especially in changing market conditions. They require constant monitoring and adjustment.\nMyth 2: "You need millions to start algorithmic trading" Reality: Basic algorithmic trading can start with modest capital, but sophisticated HFT requires significant resources.\nMyth 3: "Algorithms always react perfectly to market conditions" Reality: Algorithms are based on historical data and may not adapt well to unprecedented market conditions.\nMyth 4: "HFT manipulates markets" Reality: While controversial, HFT generally provides liquidity and narrows spreads, though it can amplify volatility during stressed conditions.\nMyth 5: "Individual investors can't compete with algorithms" Reality: Retail investors have advantages like flexibility, longer time horizons, and lower regulatory constraints.`,
			},
			{
				title: "Safe Introduction to Rules-Based Strategies",
				details: `Starting Simple: Begin with basic, well-understood strategies before advancing to complex algorithms.\nBasic Moving Average Strategy:\nIF (Short-term MA > Long-term MA): BUY signal\nIF (Short-term MA < Long-term MA): SELL signal\nRSI Mean Reversion:\nIF (RSI < 30): Oversold - potential BUY\nIF (RSI > 70): Overbought - potential SELL\nRisk Management Rules:\n1. Position Sizing: Never risk more than 2% on single trade\n2. Stop Losses: Automatic exit if losses exceed threshold\n3. Daily Loss Limits: Stop trading if daily losses exceed limit\n4. Diversification: Don't put all capital in one strategy\nBacktesting Guidelines:\n• Test strategy on historical data\n• Use out-of-sample data for validation\n• Account for transaction costs and slippage\n• Be wary of over-optimization (curve fitting)\nGetting Started Safely:\n1. Paper Trading: Practice with fake money first\n2. Small Position Sizes: Start with minimal real money\n3. Simple Strategies: Begin with basic, well-understood approaches\n4. Continuous Learning: Study market microstructure and execution\n5. Risk First: Focus on risk management over profits.`,
			},
		],
	},
	{
		id: 5,
		title: "Fraud & Scams Awareness",
		description:
			"Learn to spot and avoid scams, social media fraud, and guaranteed return traps.",
		lessons: [
			{ title: "Pump and Dump Schemes", rating: "Basic" },
			{ title: "WhatsApp and Social Media Tips", rating: "Intermediate" },
			{ title: "Guaranteed Return Traps", rating: "Intermediate" },
			{ title: "General Fraud Prevention", rating: "Advanced" },
		],
		content: [
			{
				title: "Pump and Dump Schemes",
				details: `What is Pump and Dump? Fraudsters artificially inflate a stock's price through false or misleading statements, then sell their shares at the inflated price, leaving other investors with worthless stock.\nHow It Works:\n1. Accumulation: Fraudsters buy large quantities of low-priced stock\n2. Promotion: Spread false/misleading information to create buying interest\n3. Inflation: Stock price rises due to increased demand\n4. Distribution: Fraudsters sell their shares at inflated prices\n5. Collapse: Stock price crashes, leaving victims with losses\nCommon Pump and Dump Tactics:\n• Social Media Campaigns\n• Fake Press Releases\n• Paid Promotions\n• Celebrity Endorsements\n• Email Spam\nRed Flags:\n• Sudden, unexplained price spikes\n• Heavy promotion with limited company information\n• Promises of guaranteed returns\n• Pressure to "act now" or miss out\n• Unknown or recently incorporated companies\n• Low trading volume suddenly surging\nProtection Strategies:\n1. Research Thoroughly\n2. Verify News\n3. Avoid "Hot Tips"\n4. Check Promoter Compensation\n5. Start Small`,
			},
			{
				title: "WhatsApp and Social Media Tips",
				details: `The Problem: Social media platforms have become breeding grounds for investment scams, with fraudsters using the appearance of legitimacy and social proof to deceive investors.\nCommon WhatsApp Scam Patterns:\n1. "Exclusive" Groups\n2. Fake Success Stories\n3. Guru Mentality\n4. FOMO Tactics\n5. Testimonial Fraud\nRed Flags in Social Media Investment Advice:\n• Unsolicited messages about investment opportunities\n• Claims of guaranteed returns or "risk-free" investments\n• Requests for personal financial information\n• Pressure to invest quickly without due diligence time\n• Reluctance to provide verifiable company information\n• No regulatory registration or licensing mentioned\nTypes of Social Media Investment Scams:\n1. Forex Trading Scams\n2. Cryptocurrency Schemes\n3. Binary Options Fraud\n4. Ponzi Schemes\nProtection Measures:\n1. Verify Credentials\n2. Independent Research\n3. Be Skeptical\n4. Avoid Pressure\n5. Report Suspicious Activity`,
			},
			{
				title: "Guaranteed Return Traps",
				details: `The Fundamental Truth: There is no such thing as a guaranteed high return investment without corresponding risk.\nCommon "Guaranteed Return" Scams:\n1. High-Yield Investment Programs (HYIPs)\n2. Affinity Fraud\n3. Prime Bank Schemes\n4. Insurance Fraud\nWarning Signs of Guarantee Scams:\n• Returns significantly higher than market rates\n• "Secret" or proprietary investment strategies\n• Difficulty understanding how returns are generated\n• Resistance to providing detailed information\n• Unregistered investment advisors or products\n• Emphasis on recruiting new investors\nUnderstanding Real Guarantees:\nGovernment-Backed Securities\nInsurance Products\nThe Risk-Return Relationship:\n• Higher potential returns always involve higher risk\n• "Guaranteed" high returns violate basic financial principles\n• Diversification can reduce risk but not eliminate it`,
			},
			{
				title: "General Fraud Prevention",
				details: `Due Diligence Checklist:\n1. Regulatory Status\n2. Background Research\n3. Financial Analysis\n4. Professional Networks\nRed Flags Summary:\n• Unregistered investments or advisors\n• Guarantees of high returns with low risk\n• Complex strategies that can't be explained simply\n• Pressure to invest immediately\n• Testimonials that can't be verified\n• Difficulty withdrawing funds or getting information\n• Unlicensed sellers or unregistered products\nRecovery After Fraud:\n1. Report to Authorities\n2. Document Everything\n3. Contact Attorney\n4. Credit Monitoring\n5. Learn and Move Forward`,
			},
		],
	},
];

export default function App() {
		const [progress, setProgress] = useState({ 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 });
		// Fetch progress from backend on mount
		useEffect(() => {
			const fetchProgress = async () => {
				const token = localStorage.getItem("token");
				if (!token) return;
				try {
					  const res = await axios.get("https://findefy-14vpu07mo-ojas12062006-7157s-projects.vercel.app/api/progress", {
						headers: { "x-auth-token": token },
					});
					const backendProgress = {};
					Object.entries(res.data).forEach(([moduleId, lessonIndex]) => {
						backendProgress[moduleId] = lessonIndex;
					});
					setProgress((prev) => ({ ...prev, ...backendProgress }));
				} catch (err) {
					// Ignore if not logged in or error
				}
			};
			fetchProgress();
		}, []);
	const [openModule, setOpenModule] = useState<number | null>(null);
	const [openLesson, setOpenLesson] = useState<
		{ moduleId: number; lessonIdx: number } | null
	>(null);
	const [showConfetti, setShowConfetti] = useState(false);
	const handleCompleteLesson = (moduleId: number) => {
			setProgress((prev) => {
				const newVal = Math.min(
					(prev[moduleId] || 0) + 1,
					modules[moduleId - 1].lessons.length
				);
				if (newVal === modules[moduleId - 1].lessons.length) {
					setShowConfetti(true);
					setTimeout(() => setShowConfetti(false), 2000);
				}
				// Save progress to backend
				const token = localStorage.getItem("token");
				if (token) {
					axios.post(
						"https://findefy-14vpu07mo-ojas12062006-7157s-projects.vercel.app/api/progress",
						{ moduleId, lessonIndex: newVal },
						{ headers: { "x-auth-token": token } }
					).catch(() => {});
				}
				return { ...prev, [moduleId]: newVal };
			});
	};
	const getRatingIcon = (rating: string) => {
		if (rating === "Basic")
			return <FaStar className="text-blue-400" title="Basic" />;
		if (rating === "Intermediate")
			return <FaChartLine className="text-orange-400" title="Intermediate" />;
		return <FaRocket className="text-blue-600" title="Advanced" />;
	};
	// Modal for lesson details
	const LessonModal = ({ lesson, content, onClose }: any) =>
		createPortal(
			<div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
				<div className="bg-white rounded-xl shadow-2xl p-8 max-w-lg w-full relative animate-fade-in">
					<button
						className="absolute top-2 right-2 text-xl text-orange-500 hover:text-blue-600"
						onClick={onClose}
					>
						×
					</button>
					<h3 className="text-2xl font-bold text-blue-700 mb-2 flex items-center gap-2">
						{lesson.title} {getRatingIcon(lesson.rating)}
					</h3>
					<div className="text-base text-gray-800 whitespace-pre-line mb-4 w-full max-w-none">
						{content.details}
					</div>
					<button
						className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-orange-500 font-bold"
						onClick={onClose}
					>
						Close
					</button>
				</div>
			</div>,
			document.body
		);
	return (
		<div className="w-full flex justify-center items-center px-0 md:px-0 xl:px-0">
		  <div className="grid grid-cols-1 md:grid-cols-2 gap-16 w-full max-w-7xl items-center">
			{modules.map((mod) => (
				<div
					key={mod.id}
					className="bg-gradient-to-br from-orange-100 via-white to-blue-100 rounded-2xl shadow-2xl p-12 flex flex-col border-4 border-orange-400 w-full min-h-[320px] max-w-xl mx-auto"
				>
					<button
						className="text-left"
						onClick={() =>
							setOpenModule(openModule === mod.id ? null : mod.id)
						}
					>
						<h3 className="text-2xl font-bold text-blue-700 mb-2 cursor-pointer flex items-center justify-between">
							{mod.title}
							<span
								className={`ml-2 text-lg ${
									openModule === mod.id
										? "text-orange-500"
										: "text-blue-600"
								}`}
							>
								{openModule === mod.id ? "▲" : "▼"}
							</span>
						</h3>
					</button>
					<p className="text-gray-700 mb-4">{mod.description}</p>
					<div className="mb-4 relative">
						<span className="font-semibold text-orange-500">Progress:</span>
						<div className="w-full bg-blue-100 rounded-full h-4 mt-2 overflow-hidden relative">
							<div
								className="bg-orange-500 h-4 rounded-full transition-all duration-700"
								style={{
									width: `${
										(progress[mod.id] / mod.lessons.length) * 100
									}%`,
								}}
							>
								<span className="sr-only">Progress</span>
							</div>
							{/* Animated confetti on completion */}
							{showConfetti && (
								<div className="absolute left-0 top-0 w-full h-full pointer-events-none">
									{[...Array(30)].map((_, i) => (
										<span
											key={i}
											className="absolute"
											style={{
												left: `${Math.random() * 100}%`,
												top: `${Math.random() * 100}%`,
												color: i % 2 === 0 ? "#f97316" : "#2563eb",
												fontSize: `${12 + Math.random() * 16}px`,
											}}
										>
											🎉
										</span>
									))}
								</div>
							)}
						</div>
						<span className="text-sm text-gray-600">
							{progress[mod.id]} / {mod.lessons.length} lessons completed
						</span>
					</div>
					{openModule === mod.id && (
						<ul className="mb-4 space-y-5">
							{mod.lessons.map((lesson, idx) => (
								<li
									key={idx}
									className={`flex flex-col md:flex-row items-center justify-between gap-2 border rounded-lg p-3 shadow-sm transition-all duration-300 ${
										progress[mod.id] === idx
											? "border-orange-400 bg-orange-50"
											: "border-blue-100 bg-white"
									}`}
								>
									<div className="flex items-center gap-2 flex-1 min-w-0">
										<span
											className={`w-6 h-6 mr-2 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
												progress[mod.id] > idx
													? "bg-orange-500 text-white"
													: "bg-blue-100 text-blue-600"
											}`}
										>
											{progress[mod.id] > idx ? "✓" : idx + 1}
										</span>
										<span className="text-gray-800 font-semibold truncate">
											{lesson.title}
										</span>
										<span className="ml-2 px-2 py-1 rounded text-xs font-bold flex items-center gap-1 bg-blue-50 text-blue-700">
											{getRatingIcon(lesson.rating)}
											{lesson.rating}
										</span>
									</div>
									<div className="flex gap-2 mt-2 md:mt-0">
										{progress[mod.id] === idx && (
											<button
												className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-orange-500 transition"
												onClick={() => handleCompleteLesson(mod.id)}
											>
												Mark Complete
											</button>
										)}
										<button
											className="px-2 py-1 text-xs bg-orange-100 text-orange-600 rounded hover:bg-orange-300 transition"
											onClick={() =>
												setOpenLesson({ moduleId: mod.id, lessonIdx: idx })
											}
										>
											View Details
										</button>
									</div>
								</li>
							))}
						</ul>
					)}
					{/* Modal for lesson details */}
					{openLesson && openLesson.moduleId === mod.id && (
						<LessonModal
							lesson={mod.lessons[openLesson.lessonIdx]}
							content={mod.content[openLesson.lessonIdx]}
							onClose={() => setOpenLesson(null)}
						/>
					)}
				</div>
			))}
		</div>
	</div>
	);
}
