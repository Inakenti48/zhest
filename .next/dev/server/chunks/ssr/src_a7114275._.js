module.exports = [
"[project]/src/components/DashboardCharts.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DashboardCharts
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$AreaChart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/AreaChart.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Area.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/XAxis.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/YAxis.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/CartesianGrid.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Tooltip.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/ResponsiveContainer.js [app-ssr] (ecmascript)");
'use client';
;
;
function DashboardCharts({ data }) {
    // Format dates for display
    const formattedData = data.map((item)=>({
            ...item,
            displayDate: new Date(item.date).toLocaleDateString('ru-RU', {
                day: '2-digit',
                month: 'short'
            })
        }));
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
        width: "100%",
        height: "100%",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$AreaChart$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["AreaChart"], {
            data: formattedData,
            margin: {
                top: 10,
                right: 10,
                left: 0,
                bottom: 0
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("defs", {
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("linearGradient", {
                        id: "colorAmount",
                        x1: "0",
                        y1: "0",
                        x2: "0",
                        y2: "1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "5%",
                                stopColor: "#3b82f6",
                                stopOpacity: 0.3
                            }, void 0, false, {
                                fileName: "[project]/src/components/DashboardCharts.tsx",
                                lineNumber: 25,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("stop", {
                                offset: "95%",
                                stopColor: "#3b82f6",
                                stopOpacity: 0
                            }, void 0, false, {
                                fileName: "[project]/src/components/DashboardCharts.tsx",
                                lineNumber: 26,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/DashboardCharts.tsx",
                        lineNumber: 24,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/DashboardCharts.tsx",
                    lineNumber: 23,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$CartesianGrid$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CartesianGrid"], {
                    strokeDasharray: "3 3",
                    stroke: "#ffffff05",
                    vertical: false
                }, void 0, false, {
                    fileName: "[project]/src/components/DashboardCharts.tsx",
                    lineNumber: 29,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["XAxis"], {
                    dataKey: "displayDate",
                    stroke: "#64748b",
                    fontSize: 10,
                    tickLine: false,
                    axisLine: false,
                    dy: 10
                }, void 0, false, {
                    fileName: "[project]/src/components/DashboardCharts.tsx",
                    lineNumber: 30,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["YAxis"], {
                    stroke: "#64748b",
                    fontSize: 10,
                    tickLine: false,
                    axisLine: false,
                    tickFormatter: (value)=>`${value}₽`
                }, void 0, false, {
                    fileName: "[project]/src/components/DashboardCharts.tsx",
                    lineNumber: 38,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Tooltip"], {
                    contentStyle: {
                        backgroundColor: '#0f172a',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '16px',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                        padding: '12px'
                    },
                    cursor: {
                        stroke: '#3b82f6',
                        strokeWidth: 2,
                        strokeDasharray: '5 5'
                    },
                    itemStyle: {
                        color: '#fff',
                        fontWeight: 'bold'
                    }
                }, void 0, false, {
                    fileName: "[project]/src/components/DashboardCharts.tsx",
                    lineNumber: 45,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Area$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Area"], {
                    type: "monotone",
                    dataKey: "amount",
                    stroke: "#3b82f6",
                    strokeWidth: 4,
                    fillOpacity: 1,
                    fill: "url(#colorAmount)",
                    animationDuration: 2000
                }, void 0, false, {
                    fileName: "[project]/src/components/DashboardCharts.tsx",
                    lineNumber: 56,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/DashboardCharts.tsx",
            lineNumber: 22,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/DashboardCharts.tsx",
        lineNumber: 21,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/DashboardStats.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DashboardStats
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpRight$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/arrow-up-right.js [app-ssr] (ecmascript) <export default as ArrowUpRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSign$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/dollar-sign.js [app-ssr] (ecmascript) <export default as DollarSign>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-ssr] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shopping-bag.js [app-ssr] (ecmascript) <export default as ShoppingBag>");
'use client';
;
;
;
const ICON_MAP = {
    DollarSign: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSign$3e$__["DollarSign"],
    TrendingUp: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"],
    ShoppingBag: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__["ShoppingBag"]
};
function DashboardStats({ cards }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid grid-cols-1 md:grid-cols-3 gap-6",
        children: cards.map((card, i)=>{
            const Icon = ICON_MAP[card.icon] || __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$dollar$2d$sign$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__DollarSign$3e$__["DollarSign"];
            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                initial: {
                    opacity: 0,
                    y: 20
                },
                animate: {
                    opacity: 1,
                    y: 0
                },
                transition: {
                    delay: i * 0.1
                },
                whileHover: {
                    y: -5,
                    scale: 1.02
                },
                className: "glass p-6 group transition-all cursor-default relative overflow-hidden",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: `absolute top-0 right-0 w-32 h-32 blur-[60px] opacity-10 -mr-16 -mt-16 rounded-full transition-opacity group-hover:opacity-20 ${card.color === 'blue' ? 'bg-blue-500' : card.color === 'purple' ? 'bg-purple-500' : 'bg-green-500'}`
                    }, void 0, false, {
                        fileName: "[project]/src/components/DashboardStats.tsx",
                        lineNumber: 27,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-start mb-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `p-4 rounded-2xl transition-colors ${card.color === 'blue' ? 'bg-blue-500/10 text-blue-400' : card.color === 'purple' ? 'bg-purple-500/10 text-purple-400' : 'bg-green-500/10 text-green-400'}`,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                    size: 28,
                                    strokeWidth: 2.5
                                }, void 0, false, {
                                    fileName: "[project]/src/components/DashboardStats.tsx",
                                    lineNumber: 37,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/DashboardStats.tsx",
                                lineNumber: 32,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: `px-2 py-1 rounded-lg text-xs font-black tracking-wider uppercase flex items-center gap-1 ${card.trend >= 0 ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-400'}`,
                                children: [
                                    card.trend > 0 ? '+' : '',
                                    card.trend,
                                    "%",
                                    card.trend !== 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$arrow$2d$up$2d$right$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ArrowUpRight$3e$__["ArrowUpRight"], {
                                        className: `w-3 h-3 ${card.trend < 0 ? 'rotate-90' : ''}`
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/DashboardStats.tsx",
                                        lineNumber: 44,
                                        columnNumber: 19
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/DashboardStats.tsx",
                                lineNumber: 39,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/DashboardStats.tsx",
                        lineNumber: 31,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "text-xs font-black text-metal-500 uppercase tracking-widest",
                                children: card.label
                            }, void 0, false, {
                                fileName: "[project]/src/components/DashboardStats.tsx",
                                lineNumber: 50,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                className: "text-3xl font-black text-white",
                                children: card.value
                            }, void 0, false, {
                                fileName: "[project]/src/components/DashboardStats.tsx",
                                lineNumber: 51,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/DashboardStats.tsx",
                        lineNumber: 49,
                        columnNumber: 13
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-6 pt-6 border-t border-white/5 space-y-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex justify-between items-end",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-[10px] font-bold text-metal-500 uppercase tracking-widest",
                                        children: "Чистая прибыль"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/DashboardStats.tsx",
                                        lineNumber: 56,
                                        columnNumber: 17
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm font-black text-blue-400",
                                        children: card.profit
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/DashboardStats.tsx",
                                        lineNumber: 57,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/DashboardStats.tsx",
                                lineNumber: 55,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "h-1.5 w-full bg-white/5 rounded-full overflow-hidden",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["motion"].div, {
                                    initial: {
                                        width: 0
                                    },
                                    animate: {
                                        width: Math.min(100, Math.max(10, 50 + card.trend)) + '%'
                                    },
                                    className: `h-full ${card.trend >= 0 ? 'bg-green-500' : 'bg-red-500'} opacity-50`
                                }, void 0, false, {
                                    fileName: "[project]/src/components/DashboardStats.tsx",
                                    lineNumber: 60,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/DashboardStats.tsx",
                                lineNumber: 59,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/DashboardStats.tsx",
                        lineNumber: 54,
                        columnNumber: 13
                    }, this)
                ]
            }, i, true, {
                fileName: "[project]/src/components/DashboardStats.tsx",
                lineNumber: 19,
                columnNumber: 11
            }, this);
        })
    }, void 0, false, {
        fileName: "[project]/src/components/DashboardStats.tsx",
        lineNumber: 14,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/lib/data:75a062 [app-ssr] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "updateOrderStatus",
    ()=>$$RSC_SERVER_ACTION_5
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"600429b440598bcfbe4b59c0defec2eee5bdb1ed73":"updateOrderStatus"},"src/lib/product-actions.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("600429b440598bcfbe4b59c0defec2eee5bdb1ed73", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "updateOrderStatus");
;
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vcHJvZHVjdC1hY3Rpb25zLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc2VydmVyJztcblxuaW1wb3J0IHsgcmV2YWxpZGF0ZVBhdGggfSBmcm9tICduZXh0L2NhY2hlJztcbmltcG9ydCB7IGNhY2hlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGRiIGZyb20gJy4vZGInO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0UHJvZHVjdHMoKSB7XG4gIGNvbnN0IHByb2R1Y3RzID0gZGIucHJlcGFyZSgnU0VMRUNUICogRlJPTSBwcm9kdWN0cyBPUkRFUiBCWSBjcmVhdGVkX2F0IERFU0MnKS5hbGwoKTtcbiAgcmV0dXJuIHByb2R1Y3RzO1xufVxuXG5leHBvcnQgY29uc3QgZ2V0U2FsZXNTdGF0cyA9IGNhY2hlKGFzeW5jICgpID0+IHtcbiAgY29uc3Qgc2FsZXMgPSBkYi5wcmVwYXJlKGBcbiAgICBTRUxFQ1Qgcy4qLCBwLmJ1eV9wcmljZSwgcC5uYW1lIGFzIHByb2R1Y3RfbmFtZSBcbiAgICBGUk9NIHNhbGVzIHMgXG4gICAgTEVGVCBKT0lOIHByb2R1Y3RzIHAgT04gcy5wcm9kdWN0X2lkID0gcC5pZFxuICBgKS5hbGwoKSBhcyBhbnlbXTtcblxuICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKG5vdy5nZXRGdWxsWWVhcigpLCBub3cuZ2V0TW9udGgoKSwgbm93LmdldERhdGUoKSkuZ2V0VGltZSgpO1xuICBjb25zdCB5ZXN0ZXJkYXkgPSB0b2RheSAtIDg2NDAwMDAwO1xuICBjb25zdCBsYXN0N0RheXMgPSB0b2RheSAtIDcgKiA4NjQwMDAwMDtcbiAgY29uc3QgbGFzdDE0RGF5cyA9IHRvZGF5IC0gMTQgKiA4NjQwMDAwMDtcbiAgY29uc3QgbGFzdDMwRGF5cyA9IHRvZGF5IC0gMzAgKiA4NjQwMDAwMDtcbiAgY29uc3QgbGFzdDYwRGF5cyA9IHRvZGF5IC0gNjAgKiA4NjQwMDAwMDtcblxuICBjb25zdCBzdGF0cyA9IHtcbiAgICBkYWlseV90b3RhbDogMCwgZGFpbHlfcHJvZml0OiAwLCBwcmV2X2RhaWx5X3RvdGFsOiAwLFxuICAgIHdlZWtseV90b3RhbDogMCwgd2Vla2x5X3Byb2ZpdDogMCwgcHJldl93ZWVrbHlfdG90YWw6IDAsXG4gICAgbW9udGhseV90b3RhbDogMCwgbW9udGhseV9wcm9maXQ6IDAsIHByZXZfbW9udGhseV90b3RhbDogMFxuICB9O1xuXG4gIHNhbGVzLmZvckVhY2goKHM6IGFueSkgPT4ge1xuICAgIGNvbnN0IHNhbGVEYXRlID0gbmV3IERhdGUocy5zYWxlX2RhdGUpLmdldFRpbWUoKTtcbiAgICBjb25zdCB0b3RhbCA9IE51bWJlcihzLnRvdGFsX3ByaWNlKTtcbiAgICBjb25zdCBidXlQcmljZSA9IHMuYnV5X3ByaWNlIHx8IDA7XG4gICAgY29uc3QgY29zdCA9IE51bWJlcihidXlQcmljZSkgKiBOdW1iZXIocy5xdWFudGl0eSk7XG4gICAgY29uc3QgcHJvZml0ID0gdG90YWwgLSBjb3N0O1xuXG4gICAgaWYgKHNhbGVEYXRlID49IHRvZGF5KSB7XG4gICAgICBzdGF0cy5kYWlseV90b3RhbCArPSB0b3RhbDtcbiAgICAgIHN0YXRzLmRhaWx5X3Byb2ZpdCArPSBwcm9maXQ7XG4gICAgfSBlbHNlIGlmIChzYWxlRGF0ZSA+PSB5ZXN0ZXJkYXkgJiYgc2FsZURhdGUgPCB0b2RheSkge1xuICAgICAgc3RhdHMucHJldl9kYWlseV90b3RhbCArPSB0b3RhbDtcbiAgICB9XG5cbiAgICBpZiAoc2FsZURhdGUgPj0gbGFzdDdEYXlzKSB7XG4gICAgICBzdGF0cy53ZWVrbHlfdG90YWwgKz0gdG90YWw7XG4gICAgICBzdGF0cy53ZWVrbHlfcHJvZml0ICs9IHByb2ZpdDtcbiAgICB9IGVsc2UgaWYgKHNhbGVEYXRlID49IGxhc3QxNERheXMgJiYgc2FsZURhdGUgPCBsYXN0N0RheXMpIHtcbiAgICAgIHN0YXRzLnByZXZfd2Vla2x5X3RvdGFsICs9IHRvdGFsO1xuICAgIH1cblxuICAgIGlmIChzYWxlRGF0ZSA+PSBsYXN0MzBEYXlzKSB7XG4gICAgICBzdGF0cy5tb250aGx5X3RvdGFsICs9IHRvdGFsO1xuICAgICAgc3RhdHMubW9udGhseV9wcm9maXQgKz0gcHJvZml0O1xuICAgIH0gZWxzZSBpZiAoc2FsZURhdGUgPj0gbGFzdDYwRGF5cyAmJiBzYWxlRGF0ZSA8IGxhc3QzMERheXMpIHtcbiAgICAgIHN0YXRzLnByZXZfbW9udGhseV90b3RhbCArPSB0b3RhbDtcbiAgICB9XG4gIH0pO1xuXG4gIGNvbnN0IGNoYXJ0TWFwID0gbmV3IE1hcCgpO1xuICBzYWxlcy5maWx0ZXIoKHM6IGFueSkgPT4gbmV3IERhdGUocy5zYWxlX2RhdGUpLmdldFRpbWUoKSA+PSBsYXN0MzBEYXlzKS5mb3JFYWNoKChzOiBhbnkpID0+IHtcbiAgICBjb25zdCBkID0gbmV3IERhdGUocy5zYWxlX2RhdGUpLnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVswXTtcbiAgICBjaGFydE1hcC5zZXQoZCwgKGNoYXJ0TWFwLmdldChkKSB8fCAwKSArIE51bWJlcihzLnRvdGFsX3ByaWNlKSk7XG4gIH0pO1xuICBjb25zdCBjaGFydERhdGEgPSBBcnJheS5mcm9tKGNoYXJ0TWFwLmVudHJpZXMoKSlcbiAgICAubWFwKChbZGF0ZSwgYW1vdW50XSkgPT4gKHsgZGF0ZSwgYW1vdW50IH0pKVxuICAgIC5zb3J0KChhLCBiKSA9PiBhLmRhdGUubG9jYWxlQ29tcGFyZShiLmRhdGUpKTtcblxuICBjb25zdCBtb250aGx5TWFwID0gbmV3IE1hcCgpO1xuICBzYWxlcy5mb3JFYWNoKChzOiBhbnkpID0+IHtcbiAgICBjb25zdCBkID0gbmV3IERhdGUocy5zYWxlX2RhdGUpO1xuICAgIGNvbnN0IG0gPSBkLmdldE1vbnRoKCkgKyAxO1xuICAgIG1vbnRobHlNYXAuc2V0KG0sIChtb250aGx5TWFwLmdldChtKSB8fCAwKSArIE51bWJlcihzLnRvdGFsX3ByaWNlKSk7XG4gIH0pO1xuICBjb25zdCBtb250aGx5QW5hbHlzaXMgPSBBcnJheS5mcm9tKG1vbnRobHlNYXAuZW50cmllcygpKVxuICAgIC5tYXAoKFttb250aCwgdG90YWxdKSA9PiAoeyBtb250aDogU3RyaW5nKG1vbnRoKS5wYWRTdGFydCgyLCAnMCcpLCB0b3RhbCB9KSlcbiAgICAuc29ydCgoYSwgYikgPT4gYi5tb250aC5sb2NhbGVDb21wYXJlKGEubW9udGgpKTtcblxuICBjb25zdCB3ZWVrbHlNYXAgPSBuZXcgTWFwKCk7XG4gIHNhbGVzLmZpbHRlcigoczogYW55KSA9PiBuZXcgRGF0ZShzLnNhbGVfZGF0ZSkuZ2V0VGltZSgpID49IGxhc3QzMERheXMpLmZvckVhY2goKHM6IGFueSkgPT4ge1xuICAgIGNvbnN0IGQgPSBuZXcgRGF0ZShzLnNhbGVfZGF0ZSk7XG4gICAgY29uc3Qgd2VlayA9IE1hdGguY2VpbCgoZC5nZXREYXRlKCkgLSAxICsgbmV3IERhdGUoZC5nZXRGdWxsWWVhcigpLCBkLmdldE1vbnRoKCksIDEpLmdldERheSgpKSAvIDcpO1xuICAgIHdlZWtseU1hcC5zZXQod2VlaywgKHdlZWtseU1hcC5nZXQod2VlaykgfHwgMCkgKyBOdW1iZXIocy50b3RhbF9wcmljZSkpO1xuICB9KTtcbiAgY29uc3Qgd2Vla2x5QW5hbHlzaXMgPSBBcnJheS5mcm9tKHdlZWtseU1hcC5lbnRyaWVzKCkpXG4gICAgLm1hcCgoW3dlZWssIHRvdGFsXSkgPT4gKHsgd2VlazogU3RyaW5nKHdlZWspLCB0b3RhbCB9KSlcbiAgICAuc29ydCgoYSwgYikgPT4gYi53ZWVrLmxvY2FsZUNvbXBhcmUoYS53ZWVrKSk7XG5cbiAgY29uc3QgY2FsY3VsYXRlVHJlbmQgPSAoY3VycmVudDogbnVtYmVyLCBwcmV2aW91czogbnVtYmVyKSA9PiB7XG4gICAgaWYgKCFwcmV2aW91cyB8fCBwcmV2aW91cyA9PT0gMCkgcmV0dXJuIGN1cnJlbnQgPiAwID8gMTAwIDogMDtcbiAgICByZXR1cm4gTWF0aC5yb3VuZCgoKGN1cnJlbnQgLSBwcmV2aW91cykgLyBwcmV2aW91cykgKiAxMDApO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgZGFpbHk6IHsgXG4gICAgICB0b3RhbDogc3RhdHMuZGFpbHlfdG90YWwsIFxuICAgICAgcHJvZml0OiBzdGF0cy5kYWlseV9wcm9maXQsXG4gICAgICB0cmVuZDogY2FsY3VsYXRlVHJlbmQoc3RhdHMuZGFpbHlfdG90YWwsIHN0YXRzLnByZXZfZGFpbHlfdG90YWwpXG4gICAgfSxcbiAgICB3ZWVrbHk6IHsgXG4gICAgICB0b3RhbDogc3RhdHMud2Vla2x5X3RvdGFsLCBcbiAgICAgIHByb2ZpdDogc3RhdHMud2Vla2x5X3Byb2ZpdCxcbiAgICAgIHRyZW5kOiBjYWxjdWxhdGVUcmVuZChzdGF0cy53ZWVrbHlfdG90YWwsIHN0YXRzLnByZXZfd2Vla2x5X3RvdGFsKVxuICAgIH0sXG4gICAgbW9udGhseTogeyBcbiAgICAgIHRvdGFsOiBzdGF0cy5tb250aGx5X3RvdGFsLCBcbiAgICAgIHByb2ZpdDogc3RhdHMubW9udGhseV9wcm9maXQsXG4gICAgICB0cmVuZDogY2FsY3VsYXRlVHJlbmQoc3RhdHMubW9udGhseV90b3RhbCwgc3RhdHMucHJldl9tb250aGx5X3RvdGFsKVxuICAgIH0sXG4gICAgY2hhcnREYXRhLFxuICAgIG1vbnRobHlBbmFseXNpcyxcbiAgICB3ZWVrbHlBbmFseXNpc1xuICB9O1xufSk7XG5cbmV4cG9ydCBjb25zdCBnZXRSZWNlbnRTYWxlcyA9IGNhY2hlKGFzeW5jICgpID0+IHtcbiAgY29uc3Qgc2FsZXMgPSBkYi5wcmVwYXJlKGBcbiAgICBTRUxFQ1Qgcy4qLCBwLm5hbWUgYXMgcHJvZHVjdF9uYW1lIFxuICAgIEZST00gc2FsZXMgcyBcbiAgICBMRUZUIEpPSU4gcHJvZHVjdHMgcCBPTiBzLnByb2R1Y3RfaWQgPSBwLmlkIFxuICAgIE9SREVSIEJZIHMuc2FsZV9kYXRlIERFU0MgXG4gICAgTElNSVQgMTBcbiAgYCkuYWxsKCk7XG4gIHJldHVybiBzYWxlcztcbn0pO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRkUHJvZHVjdChmb3JtRGF0YTogRm9ybURhdGEpIHtcbiAgY29uc3QgbmFtZSA9IGZvcm1EYXRhLmdldCgnbmFtZScpIGFzIHN0cmluZztcbiAgY29uc3QgYnV5X3ByaWNlID0gcGFyc2VGbG9hdChmb3JtRGF0YS5nZXQoJ2J1eV9wcmljZScpIGFzIHN0cmluZyk7XG4gIGNvbnN0IHNlbGxfcHJpY2UgPSBwYXJzZUZsb2F0KGZvcm1EYXRhLmdldCgnc2VsbF9wcmljZScpIGFzIHN0cmluZyk7XG4gIGNvbnN0IHN0b2NrID0gcGFyc2VGbG9hdChmb3JtRGF0YS5nZXQoJ3N0b2NrJykgYXMgc3RyaW5nKSB8fCAwO1xuICBjb25zdCB1bml0ID0gZm9ybURhdGEuZ2V0KCd1bml0JykgYXMgc3RyaW5nIHx8ICfRiNGCJztcbiAgY29uc3QgY2F0ZWdvcnkgPSBmb3JtRGF0YS5nZXQoJ2NhdGVnb3J5JykgYXMgc3RyaW5nIHx8ICfQntCx0YnQtdC1JztcbiAgY29uc3QgZnVsbF93aWR0aCA9IHBhcnNlRmxvYXQoZm9ybURhdGEuZ2V0KCdmdWxsX3dpZHRoJykgYXMgc3RyaW5nKSB8fCBudWxsO1xuICBjb25zdCB1c2VmdWxfd2lkdGggPSBwYXJzZUZsb2F0KGZvcm1EYXRhLmdldCgndXNlZnVsX3dpZHRoJykgYXMgc3RyaW5nKSB8fCBudWxsO1xuICBjb25zdCB0aGlja25lc3MgPSBwYXJzZUZsb2F0KGZvcm1EYXRhLmdldCgndGhpY2tuZXNzJykgYXMgc3RyaW5nKSB8fCBudWxsO1xuICBjb25zdCBjb2xvciA9IGZvcm1EYXRhLmdldCgnY29sb3InKSBhcyBzdHJpbmcgfHwgbnVsbDtcbiAgY29uc3QgaW1hZ2VfcGFkZGluZyA9IHBhcnNlSW50KGZvcm1EYXRhLmdldCgnaW1hZ2VfcGFkZGluZycpIGFzIHN0cmluZykgfHwgMDtcbiAgY29uc3QgaW1hZ2Vfc2NhbGUgPSBwYXJzZUZsb2F0KGZvcm1EYXRhLmdldCgnaW1hZ2Vfc2NhbGUnKSBhcyBzdHJpbmcpIHx8IDEuMDtcbiAgY29uc3QgdmFyaWFudHMgPSBmb3JtRGF0YS5nZXQoJ3ZhcmlhbnRzJykgYXMgc3RyaW5nIHx8IG51bGw7XG4gIGNvbnN0IGltYWdlX3VybCA9IGZvcm1EYXRhLmdldCgnaW1hZ2VfdXJsJykgYXMgc3RyaW5nO1xuXG4gIGRiLnByZXBhcmUoYFxuICAgIElOU0VSVCBJTlRPIHByb2R1Y3RzIChuYW1lLCBidXlfcHJpY2UsIHNlbGxfcHJpY2UsIGltYWdlX3VybCwgc3RvY2ssIGNhdGVnb3J5LCB1bml0LCBmdWxsX3dpZHRoLCB1c2VmdWxfd2lkdGgsIHRoaWNrbmVzcywgY29sb3IsIGltYWdlX3BhZGRpbmcsIGltYWdlX3NjYWxlLCB2YXJpYW50cylcbiAgICBWQUxVRVMgKD8sID8sID8sID8sID8sID8sID8sID8sID8sID8sID8sID8sID8sID8pXG4gIGApLnJ1bihuYW1lLCBidXlfcHJpY2UsIHNlbGxfcHJpY2UsIGltYWdlX3VybCwgc3RvY2ssIGNhdGVnb3J5LCB1bml0LCBmdWxsX3dpZHRoLCB1c2VmdWxfd2lkdGgsIHRoaWNrbmVzcywgY29sb3IsIGltYWdlX3BhZGRpbmcsIGltYWdlX3NjYWxlLCB2YXJpYW50cyk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoJy9hZG1pbi9wcm9kdWN0cycpO1xuICByZXZhbGlkYXRlUGF0aCgnL2FkbWluJyk7XG4gIHJldmFsaWRhdGVQYXRoKCcvJyk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVQcm9kdWN0KGZvcm1EYXRhOiBGb3JtRGF0YSkge1xuICBjb25zdCBpZCA9IHBhcnNlSW50KGZvcm1EYXRhLmdldCgnaWQnKSBhcyBzdHJpbmcpO1xuICBjb25zdCBuYW1lID0gZm9ybURhdGEuZ2V0KCduYW1lJykgYXMgc3RyaW5nO1xuICBjb25zdCBidXlfcHJpY2UgPSBwYXJzZUZsb2F0KGZvcm1EYXRhLmdldCgnYnV5X3ByaWNlJykgYXMgc3RyaW5nKTtcbiAgY29uc3Qgc2VsbF9wcmljZSA9IHBhcnNlRmxvYXQoZm9ybURhdGEuZ2V0KCdzZWxsX3ByaWNlJykgYXMgc3RyaW5nKTtcbiAgY29uc3Qgc3RvY2sgPSBwYXJzZUZsb2F0KGZvcm1EYXRhLmdldCgnc3RvY2snKSBhcyBzdHJpbmcpIHx8IDA7XG4gIGNvbnN0IHVuaXQgPSBmb3JtRGF0YS5nZXQoJ3VuaXQnKSBhcyBzdHJpbmcgfHwgJ9GI0YInO1xuICBjb25zdCBjYXRlZ29yeSA9IGZvcm1EYXRhLmdldCgnY2F0ZWdvcnknKSBhcyBzdHJpbmcgfHwgJ9Ce0LHRidC10LUnO1xuICBjb25zdCBmdWxsX3dpZHRoID0gcGFyc2VGbG9hdChmb3JtRGF0YS5nZXQoJ2Z1bGxfd2lkdGgnKSBhcyBzdHJpbmcpIHx8IG51bGw7XG4gIGNvbnN0IHVzZWZ1bF93aWR0aCA9IHBhcnNlRmxvYXQoZm9ybURhdGEuZ2V0KCd1c2VmdWxfd2lkdGgnKSBhcyBzdHJpbmcpIHx8IG51bGw7XG4gIGNvbnN0IHRoaWNrbmVzcyA9IHBhcnNlRmxvYXQoZm9ybURhdGEuZ2V0KCd0aGlja25lc3MnKSBhcyBzdHJpbmcpIHx8IG51bGw7XG4gIGNvbnN0IGNvbG9yID0gZm9ybURhdGEuZ2V0KCdjb2xvcicpIGFzIHN0cmluZyB8fCBudWxsO1xuICBjb25zdCBpbWFnZV9wYWRkaW5nID0gcGFyc2VJbnQoZm9ybURhdGEuZ2V0KCdpbWFnZV9wYWRkaW5nJykgYXMgc3RyaW5nKSB8fCAwO1xuICBjb25zdCBpbWFnZV9zY2FsZSA9IHBhcnNlRmxvYXQoZm9ybURhdGEuZ2V0KCdpbWFnZV9zY2FsZScpIGFzIHN0cmluZykgfHwgMS4wO1xuICBjb25zdCB2YXJpYW50cyA9IGZvcm1EYXRhLmdldCgndmFyaWFudHMnKSBhcyBzdHJpbmcgfHwgbnVsbDtcbiAgY29uc3QgaW1hZ2VfdXJsID0gZm9ybURhdGEuZ2V0KCdpbWFnZV91cmwnKSBhcyBzdHJpbmc7XG5cbiAgaWYgKGltYWdlX3VybCkge1xuICAgIGRiLnByZXBhcmUoYFxuICAgICAgVVBEQVRFIHByb2R1Y3RzIFNFVCBuYW1lID0gPywgYnV5X3ByaWNlID0gPywgc2VsbF9wcmljZSA9ID8sIGltYWdlX3VybCA9ID8sIHN0b2NrID0gPywgY2F0ZWdvcnkgPSA/LCB1bml0ID0gPywgZnVsbF93aWR0aCA9ID8sIHVzZWZ1bF93aWR0aCA9ID8sIHRoaWNrbmVzcyA9ID8sIGNvbG9yID0gPywgaW1hZ2VfcGFkZGluZyA9ID8sIGltYWdlX3NjYWxlID0gPywgdmFyaWFudHMgPSA/XG4gICAgICBXSEVSRSBpZCA9ID9cbiAgICBgKS5ydW4obmFtZSwgYnV5X3ByaWNlLCBzZWxsX3ByaWNlLCBpbWFnZV91cmwsIHN0b2NrLCBjYXRlZ29yeSwgdW5pdCwgZnVsbF93aWR0aCwgdXNlZnVsX3dpZHRoLCB0aGlja25lc3MsIGNvbG9yLCBpbWFnZV9wYWRkaW5nLCBpbWFnZV9zY2FsZSwgdmFyaWFudHMsIGlkKTtcbiAgfSBlbHNlIHtcbiAgICBkYi5wcmVwYXJlKGBcbiAgICAgIFVQREFURSBwcm9kdWN0cyBTRVQgbmFtZSA9ID8sIGJ1eV9wcmljZSA9ID8sIHNlbGxfcHJpY2UgPSA/LCBzdG9jayA9ID8sIGNhdGVnb3J5ID0gPywgdW5pdCA9ID8sIGZ1bGxfd2lkdGggPSA/LCB1c2VmdWxfd2lkdGggPSA/LCB0aGlja25lc3MgPSA/LCBjb2xvciA9ID8sIGltYWdlX3BhZGRpbmcgPSA/LCBpbWFnZV9zY2FsZSA9ID8sIHZhcmlhbnRzID0gP1xuICAgICAgV0hFUkUgaWQgPSA/XG4gICAgYCkucnVuKG5hbWUsIGJ1eV9wcmljZSwgc2VsbF9wcmljZSwgc3RvY2ssIGNhdGVnb3J5LCB1bml0LCBmdWxsX3dpZHRoLCB1c2VmdWxfd2lkdGgsIHRoaWNrbmVzcywgY29sb3IsIGltYWdlX3BhZGRpbmcsIGltYWdlX3NjYWxlLCB2YXJpYW50cywgaWQpO1xuICB9XG5cbiAgcmV2YWxpZGF0ZVBhdGgoJy9hZG1pbi9wcm9kdWN0cycpO1xuICByZXZhbGlkYXRlUGF0aCgnL2FkbWluJyk7XG4gIHJldmFsaWRhdGVQYXRoKCcvJyk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRPcmRlcnMoKSB7XG4gIGNvbnN0IG9yZGVycyA9IGRiLnByZXBhcmUoJ1NFTEVDVCAqIEZST00gb3JkZXJzIE9SREVSIEJZIGNyZWF0ZWRfYXQgREVTQycpLmFsbCgpIGFzIGFueVtdO1xuICBcbiAgY29uc3Qgb3JkZXJzV2l0aEl0ZW1zID0gb3JkZXJzLm1hcCgob3JkZXIpID0+IHtcbiAgICBjb25zdCBpdGVtcyA9IGRiLnByZXBhcmUoYFxuICAgICAgU0VMRUNUIG9pLiosIHAubmFtZSBhcyBwcm9kdWN0X25hbWUsIHAuaW1hZ2VfdXJsIFxuICAgICAgRlJPTSBvcmRlcl9pdGVtcyBvaSBcbiAgICAgIExFRlQgSk9JTiBwcm9kdWN0cyBwIE9OIG9pLnByb2R1Y3RfaWQgPSBwLmlkIFxuICAgICAgV0hFUkUgb2kub3JkZXJfaWQgPSA/XG4gICAgYCkuYWxsKG9yZGVyLmlkKTtcbiAgICByZXR1cm4geyAuLi5vcmRlciwgaXRlbXMgfTtcbiAgfSk7XG5cbiAgcmV0dXJuIG9yZGVyc1dpdGhJdGVtcztcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZU9yZGVyKGN1c3RvbWVySW5mbzogeyBuYW1lOiBzdHJpbmcsIHBob25lOiBzdHJpbmcsIGFkZHJlc3M6IHN0cmluZyB9LCBjYXJ0OiBhbnlbXSkge1xuICBjb25zdCB0b3RhbFByaWNlID0gY2FydC5yZWR1Y2UoKHN1bSwgaXRlbSkgPT4gc3VtICsgKGl0ZW0uc2VsbF9wcmljZSAqIGl0ZW0ucXVhbnRpdHkpLCAwKTtcbiAgXG4gIGNvbnN0IHJlc3VsdCA9IGRiLnByZXBhcmUoYFxuICAgIElOU0VSVCBJTlRPIG9yZGVycyAoY3VzdG9tZXJfbmFtZSwgY3VzdG9tZXJfcGhvbmUsIGN1c3RvbWVyX2FkZHJlc3MsIHRvdGFsX3ByaWNlKVxuICAgIFZBTFVFUyAoPywgPywgPywgPylcbiAgYCkucnVuKGN1c3RvbWVySW5mby5uYW1lLCBjdXN0b21lckluZm8ucGhvbmUsIGN1c3RvbWVySW5mby5hZGRyZXNzLCB0b3RhbFByaWNlKTtcblxuICBjb25zdCBvcmRlcklkID0gcmVzdWx0Lmxhc3RJbnNlcnRSb3dpZDtcblxuICBmb3IgKGNvbnN0IGl0ZW0gb2YgY2FydCkge1xuICAgIGRiLnByZXBhcmUoYFxuICAgICAgSU5TRVJUIElOVE8gb3JkZXJfaXRlbXMgKG9yZGVyX2lkLCBwcm9kdWN0X2lkLCBxdWFudGl0eSwgcHJpY2VfYXRfdGltZSwgdW5pdClcbiAgICAgIFZBTFVFUyAoPywgPywgPywgPywgPylcbiAgICBgKS5ydW4ob3JkZXJJZCwgaXRlbS5pZCwgaXRlbS5xdWFudGl0eSwgaXRlbS5zZWxsX3ByaWNlLCBpdGVtLnVuaXQpO1xuXG4gICAgZGIucHJlcGFyZSgnVVBEQVRFIHByb2R1Y3RzIFNFVCBzdG9jayA9IHN0b2NrIC0gPyBXSEVSRSBpZCA9ID8nKS5ydW4oaXRlbS5xdWFudGl0eSwgaXRlbS5pZCk7XG4gIH1cblxuICByZXZhbGlkYXRlUGF0aCgnL2FkbWluJyk7XG4gIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIG9yZGVySWQgfTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZU9yZGVyU3RhdHVzKGlkOiBudW1iZXIsIHN0YXR1czogc3RyaW5nKSB7XG4gIGRiLnByZXBhcmUoJ1VQREFURSBvcmRlcnMgU0VUIHN0YXR1cyA9ID8gV0hFUkUgaWQgPSA/JykucnVuKHN0YXR1cywgaWQpO1xuICByZXZhbGlkYXRlUGF0aCgnL2FkbWluJyk7XG59XG5cbmV4cG9ydCBjb25zdCBnZXRDYXRlZ29yaWVzID0gY2FjaGUoYXN5bmMgKCkgPT4ge1xuICBjb25zdCByb3dzID0gZGIucHJlcGFyZSgnU0VMRUNUIERJU1RJTkNUIGNhdGVnb3J5IEZST00gcHJvZHVjdHMgV0hFUkUgY2F0ZWdvcnkgSVMgTk9UIE5VTEwnKS5hbGwoKSBhcyB7IGNhdGVnb3J5OiBzdHJpbmcgfVtdO1xuICByZXR1cm4gcm93cy5tYXAociA9PiByLmNhdGVnb3J5KTtcbn0pO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGVsZXRlUHJvZHVjdChpZDogbnVtYmVyKSB7XG4gIGNvbnNvbGUubG9nKCdEZWxldGluZyBwcm9kdWN0IHdpdGggaWQ6JywgaWQpO1xuICB0cnkge1xuICAgIGRiLnByZXBhcmUoJ0RFTEVURSBGUk9NIHByb2R1Y3RzIFdIRVJFIGlkID0gPycpLnJ1bihpZCk7XG4gICAgcmV2YWxpZGF0ZVBhdGgoJy9hZG1pbi9wcm9kdWN0cycpO1xuICAgIHJldmFsaWRhdGVQYXRoKCcvYWRtaW4nKTtcbiAgICByZXZhbGlkYXRlUGF0aCgnLycpO1xuICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUgfTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdEZWxldGUgZXJyb3I6JywgZXJyb3IpO1xuICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvciB9O1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVTdG9jayhpZDogbnVtYmVyLCBuZXdTdG9jazogbnVtYmVyKSB7XG4gIGRiLnByZXBhcmUoJ1VQREFURSBwcm9kdWN0cyBTRVQgc3RvY2sgPSA/IFdIRVJFIGlkID0gPycpLnJ1bihuZXdTdG9jaywgaWQpO1xuICByZXZhbGlkYXRlUGF0aCgnL2FkbWluL3Byb2R1Y3RzJyk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZWdpc3RlclNhbGUocHJvZHVjdElkOiBudW1iZXIsIHF1YW50aXR5OiBudW1iZXIsIHRvdGFsUHJpY2U6IG51bWJlciwgcGF5bWVudE1ldGhvZDogc3RyaW5nID0gJ9Cd0LDQu9C40YfQvdGL0LzQuCcpIHtcbiAgY29uc3QgcHJvZHVjdCA9IGRiLnByZXBhcmUoJ1NFTEVDVCBzdG9jaywgbmFtZSBGUk9NIHByb2R1Y3RzIFdIRVJFIGlkID0gPycpLmdldChwcm9kdWN0SWQpIGFzIHsgc3RvY2s6IG51bWJlciwgbmFtZTogc3RyaW5nIH0gfCB1bmRlZmluZWQ7XG4gIFxuICBpZiAocHJvZHVjdCAmJiBOdW1iZXIocHJvZHVjdC5zdG9jaykgPj0gcXVhbnRpdHkpIHtcbiAgICBkYi5wcmVwYXJlKGBcbiAgICAgIElOU0VSVCBJTlRPIHNhbGVzIChwcm9kdWN0X2lkLCBwcm9kdWN0X25hbWUsIHF1YW50aXR5LCB0b3RhbF9wcmljZSwgcGF5bWVudF9tZXRob2QpXG4gICAgICBWQUxVRVMgKD8sID8sID8sID8sID8pXG4gICAgYCkucnVuKHByb2R1Y3RJZCwgcHJvZHVjdC5uYW1lLCBxdWFudGl0eSwgdG90YWxQcmljZSwgcGF5bWVudE1ldGhvZCk7XG5cbiAgICBkYi5wcmVwYXJlKCdVUERBVEUgcHJvZHVjdHMgU0VUIHN0b2NrID0gc3RvY2sgLSA/IFdIRVJFIGlkID0gPycpLnJ1bihxdWFudGl0eSwgcHJvZHVjdElkKTtcbiAgICBcbiAgICByZXZhbGlkYXRlUGF0aCgnL2FkbWluL3Byb2R1Y3RzJyk7XG4gICAgcmV2YWxpZGF0ZVBhdGgoJy9hZG1pbicpO1xuICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUgfTtcbiAgfVxuICByZXR1cm4geyBlcnJvcjogJ9Cd0LXQtNC+0YHRgtCw0YLQvtGH0L3QviDRgtC+0LLQsNGA0LAg0L3QsCDRgdC60LvQsNC00LUnIH07XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzYXZlUmVwb3J0VG9GaWxlKHJlcG9ydERhdGE6IGFueSkge1xuICByZXR1cm4geyBzdWNjZXNzOiB0cnVlIH07XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6ImdTQW1Pc0IsOExBQUEifQ==
}),
"[project]/src/lib/data:55f575 [app-ssr] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getOrders",
    ()=>$$RSC_SERVER_ACTION_3
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"00e464c490bc164924a9355ab5fff6e153f80eae61":"getOrders"},"src/lib/product-actions.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("00e464c490bc164924a9355ab5fff6e153f80eae61", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "getOrders");
;
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vcHJvZHVjdC1hY3Rpb25zLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc2VydmVyJztcblxuaW1wb3J0IHsgcmV2YWxpZGF0ZVBhdGggfSBmcm9tICduZXh0L2NhY2hlJztcbmltcG9ydCB7IGNhY2hlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGRiIGZyb20gJy4vZGInO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0UHJvZHVjdHMoKSB7XG4gIGNvbnN0IHByb2R1Y3RzID0gZGIucHJlcGFyZSgnU0VMRUNUICogRlJPTSBwcm9kdWN0cyBPUkRFUiBCWSBjcmVhdGVkX2F0IERFU0MnKS5hbGwoKTtcbiAgcmV0dXJuIHByb2R1Y3RzO1xufVxuXG5leHBvcnQgY29uc3QgZ2V0U2FsZXNTdGF0cyA9IGNhY2hlKGFzeW5jICgpID0+IHtcbiAgY29uc3Qgc2FsZXMgPSBkYi5wcmVwYXJlKGBcbiAgICBTRUxFQ1Qgcy4qLCBwLmJ1eV9wcmljZSwgcC5uYW1lIGFzIHByb2R1Y3RfbmFtZSBcbiAgICBGUk9NIHNhbGVzIHMgXG4gICAgTEVGVCBKT0lOIHByb2R1Y3RzIHAgT04gcy5wcm9kdWN0X2lkID0gcC5pZFxuICBgKS5hbGwoKSBhcyBhbnlbXTtcblxuICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKG5vdy5nZXRGdWxsWWVhcigpLCBub3cuZ2V0TW9udGgoKSwgbm93LmdldERhdGUoKSkuZ2V0VGltZSgpO1xuICBjb25zdCB5ZXN0ZXJkYXkgPSB0b2RheSAtIDg2NDAwMDAwO1xuICBjb25zdCBsYXN0N0RheXMgPSB0b2RheSAtIDcgKiA4NjQwMDAwMDtcbiAgY29uc3QgbGFzdDE0RGF5cyA9IHRvZGF5IC0gMTQgKiA4NjQwMDAwMDtcbiAgY29uc3QgbGFzdDMwRGF5cyA9IHRvZGF5IC0gMzAgKiA4NjQwMDAwMDtcbiAgY29uc3QgbGFzdDYwRGF5cyA9IHRvZGF5IC0gNjAgKiA4NjQwMDAwMDtcblxuICBjb25zdCBzdGF0cyA9IHtcbiAgICBkYWlseV90b3RhbDogMCwgZGFpbHlfcHJvZml0OiAwLCBwcmV2X2RhaWx5X3RvdGFsOiAwLFxuICAgIHdlZWtseV90b3RhbDogMCwgd2Vla2x5X3Byb2ZpdDogMCwgcHJldl93ZWVrbHlfdG90YWw6IDAsXG4gICAgbW9udGhseV90b3RhbDogMCwgbW9udGhseV9wcm9maXQ6IDAsIHByZXZfbW9udGhseV90b3RhbDogMFxuICB9O1xuXG4gIHNhbGVzLmZvckVhY2goKHM6IGFueSkgPT4ge1xuICAgIGNvbnN0IHNhbGVEYXRlID0gbmV3IERhdGUocy5zYWxlX2RhdGUpLmdldFRpbWUoKTtcbiAgICBjb25zdCB0b3RhbCA9IE51bWJlcihzLnRvdGFsX3ByaWNlKTtcbiAgICBjb25zdCBidXlQcmljZSA9IHMuYnV5X3ByaWNlIHx8IDA7XG4gICAgY29uc3QgY29zdCA9IE51bWJlcihidXlQcmljZSkgKiBOdW1iZXIocy5xdWFudGl0eSk7XG4gICAgY29uc3QgcHJvZml0ID0gdG90YWwgLSBjb3N0O1xuXG4gICAgaWYgKHNhbGVEYXRlID49IHRvZGF5KSB7XG4gICAgICBzdGF0cy5kYWlseV90b3RhbCArPSB0b3RhbDtcbiAgICAgIHN0YXRzLmRhaWx5X3Byb2ZpdCArPSBwcm9maXQ7XG4gICAgfSBlbHNlIGlmIChzYWxlRGF0ZSA+PSB5ZXN0ZXJkYXkgJiYgc2FsZURhdGUgPCB0b2RheSkge1xuICAgICAgc3RhdHMucHJldl9kYWlseV90b3RhbCArPSB0b3RhbDtcbiAgICB9XG5cbiAgICBpZiAoc2FsZURhdGUgPj0gbGFzdDdEYXlzKSB7XG4gICAgICBzdGF0cy53ZWVrbHlfdG90YWwgKz0gdG90YWw7XG4gICAgICBzdGF0cy53ZWVrbHlfcHJvZml0ICs9IHByb2ZpdDtcbiAgICB9IGVsc2UgaWYgKHNhbGVEYXRlID49IGxhc3QxNERheXMgJiYgc2FsZURhdGUgPCBsYXN0N0RheXMpIHtcbiAgICAgIHN0YXRzLnByZXZfd2Vla2x5X3RvdGFsICs9IHRvdGFsO1xuICAgIH1cblxuICAgIGlmIChzYWxlRGF0ZSA+PSBsYXN0MzBEYXlzKSB7XG4gICAgICBzdGF0cy5tb250aGx5X3RvdGFsICs9IHRvdGFsO1xuICAgICAgc3RhdHMubW9udGhseV9wcm9maXQgKz0gcHJvZml0O1xuICAgIH0gZWxzZSBpZiAoc2FsZURhdGUgPj0gbGFzdDYwRGF5cyAmJiBzYWxlRGF0ZSA8IGxhc3QzMERheXMpIHtcbiAgICAgIHN0YXRzLnByZXZfbW9udGhseV90b3RhbCArPSB0b3RhbDtcbiAgICB9XG4gIH0pO1xuXG4gIGNvbnN0IGNoYXJ0TWFwID0gbmV3IE1hcCgpO1xuICBzYWxlcy5maWx0ZXIoKHM6IGFueSkgPT4gbmV3IERhdGUocy5zYWxlX2RhdGUpLmdldFRpbWUoKSA+PSBsYXN0MzBEYXlzKS5mb3JFYWNoKChzOiBhbnkpID0+IHtcbiAgICBjb25zdCBkID0gbmV3IERhdGUocy5zYWxlX2RhdGUpLnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVswXTtcbiAgICBjaGFydE1hcC5zZXQoZCwgKGNoYXJ0TWFwLmdldChkKSB8fCAwKSArIE51bWJlcihzLnRvdGFsX3ByaWNlKSk7XG4gIH0pO1xuICBjb25zdCBjaGFydERhdGEgPSBBcnJheS5mcm9tKGNoYXJ0TWFwLmVudHJpZXMoKSlcbiAgICAubWFwKChbZGF0ZSwgYW1vdW50XSkgPT4gKHsgZGF0ZSwgYW1vdW50IH0pKVxuICAgIC5zb3J0KChhLCBiKSA9PiBhLmRhdGUubG9jYWxlQ29tcGFyZShiLmRhdGUpKTtcblxuICBjb25zdCBtb250aGx5TWFwID0gbmV3IE1hcCgpO1xuICBzYWxlcy5mb3JFYWNoKChzOiBhbnkpID0+IHtcbiAgICBjb25zdCBkID0gbmV3IERhdGUocy5zYWxlX2RhdGUpO1xuICAgIGNvbnN0IG0gPSBkLmdldE1vbnRoKCkgKyAxO1xuICAgIG1vbnRobHlNYXAuc2V0KG0sIChtb250aGx5TWFwLmdldChtKSB8fCAwKSArIE51bWJlcihzLnRvdGFsX3ByaWNlKSk7XG4gIH0pO1xuICBjb25zdCBtb250aGx5QW5hbHlzaXMgPSBBcnJheS5mcm9tKG1vbnRobHlNYXAuZW50cmllcygpKVxuICAgIC5tYXAoKFttb250aCwgdG90YWxdKSA9PiAoeyBtb250aDogU3RyaW5nKG1vbnRoKS5wYWRTdGFydCgyLCAnMCcpLCB0b3RhbCB9KSlcbiAgICAuc29ydCgoYSwgYikgPT4gYi5tb250aC5sb2NhbGVDb21wYXJlKGEubW9udGgpKTtcblxuICBjb25zdCB3ZWVrbHlNYXAgPSBuZXcgTWFwKCk7XG4gIHNhbGVzLmZpbHRlcigoczogYW55KSA9PiBuZXcgRGF0ZShzLnNhbGVfZGF0ZSkuZ2V0VGltZSgpID49IGxhc3QzMERheXMpLmZvckVhY2goKHM6IGFueSkgPT4ge1xuICAgIGNvbnN0IGQgPSBuZXcgRGF0ZShzLnNhbGVfZGF0ZSk7XG4gICAgY29uc3Qgd2VlayA9IE1hdGguY2VpbCgoZC5nZXREYXRlKCkgLSAxICsgbmV3IERhdGUoZC5nZXRGdWxsWWVhcigpLCBkLmdldE1vbnRoKCksIDEpLmdldERheSgpKSAvIDcpO1xuICAgIHdlZWtseU1hcC5zZXQod2VlaywgKHdlZWtseU1hcC5nZXQod2VlaykgfHwgMCkgKyBOdW1iZXIocy50b3RhbF9wcmljZSkpO1xuICB9KTtcbiAgY29uc3Qgd2Vla2x5QW5hbHlzaXMgPSBBcnJheS5mcm9tKHdlZWtseU1hcC5lbnRyaWVzKCkpXG4gICAgLm1hcCgoW3dlZWssIHRvdGFsXSkgPT4gKHsgd2VlazogU3RyaW5nKHdlZWspLCB0b3RhbCB9KSlcbiAgICAuc29ydCgoYSwgYikgPT4gYi53ZWVrLmxvY2FsZUNvbXBhcmUoYS53ZWVrKSk7XG5cbiAgY29uc3QgY2FsY3VsYXRlVHJlbmQgPSAoY3VycmVudDogbnVtYmVyLCBwcmV2aW91czogbnVtYmVyKSA9PiB7XG4gICAgaWYgKCFwcmV2aW91cyB8fCBwcmV2aW91cyA9PT0gMCkgcmV0dXJuIGN1cnJlbnQgPiAwID8gMTAwIDogMDtcbiAgICByZXR1cm4gTWF0aC5yb3VuZCgoKGN1cnJlbnQgLSBwcmV2aW91cykgLyBwcmV2aW91cykgKiAxMDApO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgZGFpbHk6IHsgXG4gICAgICB0b3RhbDogc3RhdHMuZGFpbHlfdG90YWwsIFxuICAgICAgcHJvZml0OiBzdGF0cy5kYWlseV9wcm9maXQsXG4gICAgICB0cmVuZDogY2FsY3VsYXRlVHJlbmQoc3RhdHMuZGFpbHlfdG90YWwsIHN0YXRzLnByZXZfZGFpbHlfdG90YWwpXG4gICAgfSxcbiAgICB3ZWVrbHk6IHsgXG4gICAgICB0b3RhbDogc3RhdHMud2Vla2x5X3RvdGFsLCBcbiAgICAgIHByb2ZpdDogc3RhdHMud2Vla2x5X3Byb2ZpdCxcbiAgICAgIHRyZW5kOiBjYWxjdWxhdGVUcmVuZChzdGF0cy53ZWVrbHlfdG90YWwsIHN0YXRzLnByZXZfd2Vla2x5X3RvdGFsKVxuICAgIH0sXG4gICAgbW9udGhseTogeyBcbiAgICAgIHRvdGFsOiBzdGF0cy5tb250aGx5X3RvdGFsLCBcbiAgICAgIHByb2ZpdDogc3RhdHMubW9udGhseV9wcm9maXQsXG4gICAgICB0cmVuZDogY2FsY3VsYXRlVHJlbmQoc3RhdHMubW9udGhseV90b3RhbCwgc3RhdHMucHJldl9tb250aGx5X3RvdGFsKVxuICAgIH0sXG4gICAgY2hhcnREYXRhLFxuICAgIG1vbnRobHlBbmFseXNpcyxcbiAgICB3ZWVrbHlBbmFseXNpc1xuICB9O1xufSk7XG5cbmV4cG9ydCBjb25zdCBnZXRSZWNlbnRTYWxlcyA9IGNhY2hlKGFzeW5jICgpID0+IHtcbiAgY29uc3Qgc2FsZXMgPSBkYi5wcmVwYXJlKGBcbiAgICBTRUxFQ1Qgcy4qLCBwLm5hbWUgYXMgcHJvZHVjdF9uYW1lIFxuICAgIEZST00gc2FsZXMgcyBcbiAgICBMRUZUIEpPSU4gcHJvZHVjdHMgcCBPTiBzLnByb2R1Y3RfaWQgPSBwLmlkIFxuICAgIE9SREVSIEJZIHMuc2FsZV9kYXRlIERFU0MgXG4gICAgTElNSVQgMTBcbiAgYCkuYWxsKCk7XG4gIHJldHVybiBzYWxlcztcbn0pO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRkUHJvZHVjdChmb3JtRGF0YTogRm9ybURhdGEpIHtcbiAgY29uc3QgbmFtZSA9IGZvcm1EYXRhLmdldCgnbmFtZScpIGFzIHN0cmluZztcbiAgY29uc3QgYnV5X3ByaWNlID0gcGFyc2VGbG9hdChmb3JtRGF0YS5nZXQoJ2J1eV9wcmljZScpIGFzIHN0cmluZyk7XG4gIGNvbnN0IHNlbGxfcHJpY2UgPSBwYXJzZUZsb2F0KGZvcm1EYXRhLmdldCgnc2VsbF9wcmljZScpIGFzIHN0cmluZyk7XG4gIGNvbnN0IHN0b2NrID0gcGFyc2VGbG9hdChmb3JtRGF0YS5nZXQoJ3N0b2NrJykgYXMgc3RyaW5nKSB8fCAwO1xuICBjb25zdCB1bml0ID0gZm9ybURhdGEuZ2V0KCd1bml0JykgYXMgc3RyaW5nIHx8ICfRiNGCJztcbiAgY29uc3QgY2F0ZWdvcnkgPSBmb3JtRGF0YS5nZXQoJ2NhdGVnb3J5JykgYXMgc3RyaW5nIHx8ICfQntCx0YnQtdC1JztcbiAgY29uc3QgZnVsbF93aWR0aCA9IHBhcnNlRmxvYXQoZm9ybURhdGEuZ2V0KCdmdWxsX3dpZHRoJykgYXMgc3RyaW5nKSB8fCBudWxsO1xuICBjb25zdCB1c2VmdWxfd2lkdGggPSBwYXJzZUZsb2F0KGZvcm1EYXRhLmdldCgndXNlZnVsX3dpZHRoJykgYXMgc3RyaW5nKSB8fCBudWxsO1xuICBjb25zdCB0aGlja25lc3MgPSBwYXJzZUZsb2F0KGZvcm1EYXRhLmdldCgndGhpY2tuZXNzJykgYXMgc3RyaW5nKSB8fCBudWxsO1xuICBjb25zdCBjb2xvciA9IGZvcm1EYXRhLmdldCgnY29sb3InKSBhcyBzdHJpbmcgfHwgbnVsbDtcbiAgY29uc3QgaW1hZ2VfcGFkZGluZyA9IHBhcnNlSW50KGZvcm1EYXRhLmdldCgnaW1hZ2VfcGFkZGluZycpIGFzIHN0cmluZykgfHwgMDtcbiAgY29uc3QgaW1hZ2Vfc2NhbGUgPSBwYXJzZUZsb2F0KGZvcm1EYXRhLmdldCgnaW1hZ2Vfc2NhbGUnKSBhcyBzdHJpbmcpIHx8IDEuMDtcbiAgY29uc3QgdmFyaWFudHMgPSBmb3JtRGF0YS5nZXQoJ3ZhcmlhbnRzJykgYXMgc3RyaW5nIHx8IG51bGw7XG4gIGNvbnN0IGltYWdlX3VybCA9IGZvcm1EYXRhLmdldCgnaW1hZ2VfdXJsJykgYXMgc3RyaW5nO1xuXG4gIGRiLnByZXBhcmUoYFxuICAgIElOU0VSVCBJTlRPIHByb2R1Y3RzIChuYW1lLCBidXlfcHJpY2UsIHNlbGxfcHJpY2UsIGltYWdlX3VybCwgc3RvY2ssIGNhdGVnb3J5LCB1bml0LCBmdWxsX3dpZHRoLCB1c2VmdWxfd2lkdGgsIHRoaWNrbmVzcywgY29sb3IsIGltYWdlX3BhZGRpbmcsIGltYWdlX3NjYWxlLCB2YXJpYW50cylcbiAgICBWQUxVRVMgKD8sID8sID8sID8sID8sID8sID8sID8sID8sID8sID8sID8sID8sID8pXG4gIGApLnJ1bihuYW1lLCBidXlfcHJpY2UsIHNlbGxfcHJpY2UsIGltYWdlX3VybCwgc3RvY2ssIGNhdGVnb3J5LCB1bml0LCBmdWxsX3dpZHRoLCB1c2VmdWxfd2lkdGgsIHRoaWNrbmVzcywgY29sb3IsIGltYWdlX3BhZGRpbmcsIGltYWdlX3NjYWxlLCB2YXJpYW50cyk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoJy9hZG1pbi9wcm9kdWN0cycpO1xuICByZXZhbGlkYXRlUGF0aCgnL2FkbWluJyk7XG4gIHJldmFsaWRhdGVQYXRoKCcvJyk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVQcm9kdWN0KGZvcm1EYXRhOiBGb3JtRGF0YSkge1xuICBjb25zdCBpZCA9IHBhcnNlSW50KGZvcm1EYXRhLmdldCgnaWQnKSBhcyBzdHJpbmcpO1xuICBjb25zdCBuYW1lID0gZm9ybURhdGEuZ2V0KCduYW1lJykgYXMgc3RyaW5nO1xuICBjb25zdCBidXlfcHJpY2UgPSBwYXJzZUZsb2F0KGZvcm1EYXRhLmdldCgnYnV5X3ByaWNlJykgYXMgc3RyaW5nKTtcbiAgY29uc3Qgc2VsbF9wcmljZSA9IHBhcnNlRmxvYXQoZm9ybURhdGEuZ2V0KCdzZWxsX3ByaWNlJykgYXMgc3RyaW5nKTtcbiAgY29uc3Qgc3RvY2sgPSBwYXJzZUZsb2F0KGZvcm1EYXRhLmdldCgnc3RvY2snKSBhcyBzdHJpbmcpIHx8IDA7XG4gIGNvbnN0IHVuaXQgPSBmb3JtRGF0YS5nZXQoJ3VuaXQnKSBhcyBzdHJpbmcgfHwgJ9GI0YInO1xuICBjb25zdCBjYXRlZ29yeSA9IGZvcm1EYXRhLmdldCgnY2F0ZWdvcnknKSBhcyBzdHJpbmcgfHwgJ9Ce0LHRidC10LUnO1xuICBjb25zdCBmdWxsX3dpZHRoID0gcGFyc2VGbG9hdChmb3JtRGF0YS5nZXQoJ2Z1bGxfd2lkdGgnKSBhcyBzdHJpbmcpIHx8IG51bGw7XG4gIGNvbnN0IHVzZWZ1bF93aWR0aCA9IHBhcnNlRmxvYXQoZm9ybURhdGEuZ2V0KCd1c2VmdWxfd2lkdGgnKSBhcyBzdHJpbmcpIHx8IG51bGw7XG4gIGNvbnN0IHRoaWNrbmVzcyA9IHBhcnNlRmxvYXQoZm9ybURhdGEuZ2V0KCd0aGlja25lc3MnKSBhcyBzdHJpbmcpIHx8IG51bGw7XG4gIGNvbnN0IGNvbG9yID0gZm9ybURhdGEuZ2V0KCdjb2xvcicpIGFzIHN0cmluZyB8fCBudWxsO1xuICBjb25zdCBpbWFnZV9wYWRkaW5nID0gcGFyc2VJbnQoZm9ybURhdGEuZ2V0KCdpbWFnZV9wYWRkaW5nJykgYXMgc3RyaW5nKSB8fCAwO1xuICBjb25zdCBpbWFnZV9zY2FsZSA9IHBhcnNlRmxvYXQoZm9ybURhdGEuZ2V0KCdpbWFnZV9zY2FsZScpIGFzIHN0cmluZykgfHwgMS4wO1xuICBjb25zdCB2YXJpYW50cyA9IGZvcm1EYXRhLmdldCgndmFyaWFudHMnKSBhcyBzdHJpbmcgfHwgbnVsbDtcbiAgY29uc3QgaW1hZ2VfdXJsID0gZm9ybURhdGEuZ2V0KCdpbWFnZV91cmwnKSBhcyBzdHJpbmc7XG5cbiAgaWYgKGltYWdlX3VybCkge1xuICAgIGRiLnByZXBhcmUoYFxuICAgICAgVVBEQVRFIHByb2R1Y3RzIFNFVCBuYW1lID0gPywgYnV5X3ByaWNlID0gPywgc2VsbF9wcmljZSA9ID8sIGltYWdlX3VybCA9ID8sIHN0b2NrID0gPywgY2F0ZWdvcnkgPSA/LCB1bml0ID0gPywgZnVsbF93aWR0aCA9ID8sIHVzZWZ1bF93aWR0aCA9ID8sIHRoaWNrbmVzcyA9ID8sIGNvbG9yID0gPywgaW1hZ2VfcGFkZGluZyA9ID8sIGltYWdlX3NjYWxlID0gPywgdmFyaWFudHMgPSA/XG4gICAgICBXSEVSRSBpZCA9ID9cbiAgICBgKS5ydW4obmFtZSwgYnV5X3ByaWNlLCBzZWxsX3ByaWNlLCBpbWFnZV91cmwsIHN0b2NrLCBjYXRlZ29yeSwgdW5pdCwgZnVsbF93aWR0aCwgdXNlZnVsX3dpZHRoLCB0aGlja25lc3MsIGNvbG9yLCBpbWFnZV9wYWRkaW5nLCBpbWFnZV9zY2FsZSwgdmFyaWFudHMsIGlkKTtcbiAgfSBlbHNlIHtcbiAgICBkYi5wcmVwYXJlKGBcbiAgICAgIFVQREFURSBwcm9kdWN0cyBTRVQgbmFtZSA9ID8sIGJ1eV9wcmljZSA9ID8sIHNlbGxfcHJpY2UgPSA/LCBzdG9jayA9ID8sIGNhdGVnb3J5ID0gPywgdW5pdCA9ID8sIGZ1bGxfd2lkdGggPSA/LCB1c2VmdWxfd2lkdGggPSA/LCB0aGlja25lc3MgPSA/LCBjb2xvciA9ID8sIGltYWdlX3BhZGRpbmcgPSA/LCBpbWFnZV9zY2FsZSA9ID8sIHZhcmlhbnRzID0gP1xuICAgICAgV0hFUkUgaWQgPSA/XG4gICAgYCkucnVuKG5hbWUsIGJ1eV9wcmljZSwgc2VsbF9wcmljZSwgc3RvY2ssIGNhdGVnb3J5LCB1bml0LCBmdWxsX3dpZHRoLCB1c2VmdWxfd2lkdGgsIHRoaWNrbmVzcywgY29sb3IsIGltYWdlX3BhZGRpbmcsIGltYWdlX3NjYWxlLCB2YXJpYW50cywgaWQpO1xuICB9XG5cbiAgcmV2YWxpZGF0ZVBhdGgoJy9hZG1pbi9wcm9kdWN0cycpO1xuICByZXZhbGlkYXRlUGF0aCgnL2FkbWluJyk7XG4gIHJldmFsaWRhdGVQYXRoKCcvJyk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRPcmRlcnMoKSB7XG4gIGNvbnN0IG9yZGVycyA9IGRiLnByZXBhcmUoJ1NFTEVDVCAqIEZST00gb3JkZXJzIE9SREVSIEJZIGNyZWF0ZWRfYXQgREVTQycpLmFsbCgpIGFzIGFueVtdO1xuICBcbiAgY29uc3Qgb3JkZXJzV2l0aEl0ZW1zID0gb3JkZXJzLm1hcCgob3JkZXIpID0+IHtcbiAgICBjb25zdCBpdGVtcyA9IGRiLnByZXBhcmUoYFxuICAgICAgU0VMRUNUIG9pLiosIHAubmFtZSBhcyBwcm9kdWN0X25hbWUsIHAuaW1hZ2VfdXJsIFxuICAgICAgRlJPTSBvcmRlcl9pdGVtcyBvaSBcbiAgICAgIExFRlQgSk9JTiBwcm9kdWN0cyBwIE9OIG9pLnByb2R1Y3RfaWQgPSBwLmlkIFxuICAgICAgV0hFUkUgb2kub3JkZXJfaWQgPSA/XG4gICAgYCkuYWxsKG9yZGVyLmlkKTtcbiAgICByZXR1cm4geyAuLi5vcmRlciwgaXRlbXMgfTtcbiAgfSk7XG5cbiAgcmV0dXJuIG9yZGVyc1dpdGhJdGVtcztcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZU9yZGVyKGN1c3RvbWVySW5mbzogeyBuYW1lOiBzdHJpbmcsIHBob25lOiBzdHJpbmcsIGFkZHJlc3M6IHN0cmluZyB9LCBjYXJ0OiBhbnlbXSkge1xuICBjb25zdCB0b3RhbFByaWNlID0gY2FydC5yZWR1Y2UoKHN1bSwgaXRlbSkgPT4gc3VtICsgKGl0ZW0uc2VsbF9wcmljZSAqIGl0ZW0ucXVhbnRpdHkpLCAwKTtcbiAgXG4gIGNvbnN0IHJlc3VsdCA9IGRiLnByZXBhcmUoYFxuICAgIElOU0VSVCBJTlRPIG9yZGVycyAoY3VzdG9tZXJfbmFtZSwgY3VzdG9tZXJfcGhvbmUsIGN1c3RvbWVyX2FkZHJlc3MsIHRvdGFsX3ByaWNlKVxuICAgIFZBTFVFUyAoPywgPywgPywgPylcbiAgYCkucnVuKGN1c3RvbWVySW5mby5uYW1lLCBjdXN0b21lckluZm8ucGhvbmUsIGN1c3RvbWVySW5mby5hZGRyZXNzLCB0b3RhbFByaWNlKTtcblxuICBjb25zdCBvcmRlcklkID0gcmVzdWx0Lmxhc3RJbnNlcnRSb3dpZDtcblxuICBmb3IgKGNvbnN0IGl0ZW0gb2YgY2FydCkge1xuICAgIGRiLnByZXBhcmUoYFxuICAgICAgSU5TRVJUIElOVE8gb3JkZXJfaXRlbXMgKG9yZGVyX2lkLCBwcm9kdWN0X2lkLCBxdWFudGl0eSwgcHJpY2VfYXRfdGltZSwgdW5pdClcbiAgICAgIFZBTFVFUyAoPywgPywgPywgPywgPylcbiAgICBgKS5ydW4ob3JkZXJJZCwgaXRlbS5pZCwgaXRlbS5xdWFudGl0eSwgaXRlbS5zZWxsX3ByaWNlLCBpdGVtLnVuaXQpO1xuXG4gICAgZGIucHJlcGFyZSgnVVBEQVRFIHByb2R1Y3RzIFNFVCBzdG9jayA9IHN0b2NrIC0gPyBXSEVSRSBpZCA9ID8nKS5ydW4oaXRlbS5xdWFudGl0eSwgaXRlbS5pZCk7XG4gIH1cblxuICByZXZhbGlkYXRlUGF0aCgnL2FkbWluJyk7XG4gIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIG9yZGVySWQgfTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZU9yZGVyU3RhdHVzKGlkOiBudW1iZXIsIHN0YXR1czogc3RyaW5nKSB7XG4gIGRiLnByZXBhcmUoJ1VQREFURSBvcmRlcnMgU0VUIHN0YXR1cyA9ID8gV0hFUkUgaWQgPSA/JykucnVuKHN0YXR1cywgaWQpO1xuICByZXZhbGlkYXRlUGF0aCgnL2FkbWluJyk7XG59XG5cbmV4cG9ydCBjb25zdCBnZXRDYXRlZ29yaWVzID0gY2FjaGUoYXN5bmMgKCkgPT4ge1xuICBjb25zdCByb3dzID0gZGIucHJlcGFyZSgnU0VMRUNUIERJU1RJTkNUIGNhdGVnb3J5IEZST00gcHJvZHVjdHMgV0hFUkUgY2F0ZWdvcnkgSVMgTk9UIE5VTEwnKS5hbGwoKSBhcyB7IGNhdGVnb3J5OiBzdHJpbmcgfVtdO1xuICByZXR1cm4gcm93cy5tYXAociA9PiByLmNhdGVnb3J5KTtcbn0pO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGVsZXRlUHJvZHVjdChpZDogbnVtYmVyKSB7XG4gIGNvbnNvbGUubG9nKCdEZWxldGluZyBwcm9kdWN0IHdpdGggaWQ6JywgaWQpO1xuICB0cnkge1xuICAgIGRiLnByZXBhcmUoJ0RFTEVURSBGUk9NIHByb2R1Y3RzIFdIRVJFIGlkID0gPycpLnJ1bihpZCk7XG4gICAgcmV2YWxpZGF0ZVBhdGgoJy9hZG1pbi9wcm9kdWN0cycpO1xuICAgIHJldmFsaWRhdGVQYXRoKCcvYWRtaW4nKTtcbiAgICByZXZhbGlkYXRlUGF0aCgnLycpO1xuICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUgfTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdEZWxldGUgZXJyb3I6JywgZXJyb3IpO1xuICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvciB9O1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVTdG9jayhpZDogbnVtYmVyLCBuZXdTdG9jazogbnVtYmVyKSB7XG4gIGRiLnByZXBhcmUoJ1VQREFURSBwcm9kdWN0cyBTRVQgc3RvY2sgPSA/IFdIRVJFIGlkID0gPycpLnJ1bihuZXdTdG9jaywgaWQpO1xuICByZXZhbGlkYXRlUGF0aCgnL2FkbWluL3Byb2R1Y3RzJyk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZWdpc3RlclNhbGUocHJvZHVjdElkOiBudW1iZXIsIHF1YW50aXR5OiBudW1iZXIsIHRvdGFsUHJpY2U6IG51bWJlciwgcGF5bWVudE1ldGhvZDogc3RyaW5nID0gJ9Cd0LDQu9C40YfQvdGL0LzQuCcpIHtcbiAgY29uc3QgcHJvZHVjdCA9IGRiLnByZXBhcmUoJ1NFTEVDVCBzdG9jaywgbmFtZSBGUk9NIHByb2R1Y3RzIFdIRVJFIGlkID0gPycpLmdldChwcm9kdWN0SWQpIGFzIHsgc3RvY2s6IG51bWJlciwgbmFtZTogc3RyaW5nIH0gfCB1bmRlZmluZWQ7XG4gIFxuICBpZiAocHJvZHVjdCAmJiBOdW1iZXIocHJvZHVjdC5zdG9jaykgPj0gcXVhbnRpdHkpIHtcbiAgICBkYi5wcmVwYXJlKGBcbiAgICAgIElOU0VSVCBJTlRPIHNhbGVzIChwcm9kdWN0X2lkLCBwcm9kdWN0X25hbWUsIHF1YW50aXR5LCB0b3RhbF9wcmljZSwgcGF5bWVudF9tZXRob2QpXG4gICAgICBWQUxVRVMgKD8sID8sID8sID8sID8pXG4gICAgYCkucnVuKHByb2R1Y3RJZCwgcHJvZHVjdC5uYW1lLCBxdWFudGl0eSwgdG90YWxQcmljZSwgcGF5bWVudE1ldGhvZCk7XG5cbiAgICBkYi5wcmVwYXJlKCdVUERBVEUgcHJvZHVjdHMgU0VUIHN0b2NrID0gc3RvY2sgLSA/IFdIRVJFIGlkID0gPycpLnJ1bihxdWFudGl0eSwgcHJvZHVjdElkKTtcbiAgICBcbiAgICByZXZhbGlkYXRlUGF0aCgnL2FkbWluL3Byb2R1Y3RzJyk7XG4gICAgcmV2YWxpZGF0ZVBhdGgoJy9hZG1pbicpO1xuICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUgfTtcbiAgfVxuICByZXR1cm4geyBlcnJvcjogJ9Cd0LXQtNC+0YHRgtCw0YLQvtGH0L3QviDRgtC+0LLQsNGA0LAg0L3QsCDRgdC60LvQsNC00LUnIH07XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzYXZlUmVwb3J0VG9GaWxlKHJlcG9ydERhdGE6IGFueSkge1xuICByZXR1cm4geyBzdWNjZXNzOiB0cnVlIH07XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IndSQTRMc0Isc0xBQUEifQ==
}),
"[project]/src/components/OrderList.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>OrderList
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
// Локальное обновление в реальном времени (polling)
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$3a$75a062__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/lib/data:75a062 [app-ssr] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$3a$55f575__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/lib/data:55f575 [app-ssr] (ecmascript) <text/javascript>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-ssr] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/package.js [app-ssr] (ecmascript) <export default as Package>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-ssr] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/phone.js [app-ssr] (ecmascript) <export default as Phone>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/user.js [app-ssr] (ecmascript) <export default as User>");
'use client';
;
;
;
;
;
function OrderList({ orders: initialOrders }) {
    const [orders, setOrders] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(initialOrders);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        // Автоматическое обновление списка заказов каждые 5 секунд
        const interval = setInterval(async ()=>{
            try {
                const updatedOrders = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$3a$55f575__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getOrders"])();
                setOrders(updatedOrders);
            } catch (error) {
                console.error('Ошибка обновления заказов:', error);
            }
        }, 5000);
        return ()=>clearInterval(interval);
    }, []);
    const handleStatusChange = async (id, status)=>{
        try {
            await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$3a$75a062__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["updateOrderStatus"])(id, status);
            setOrders((prev)=>prev.map((o)=>o.id === id ? {
                        ...o,
                        status: status
                    } : o));
        } catch (error) {
            console.error('Ошибка изменения статуса:', error);
        }
    };
    if (orders.length === 0) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-center py-20 glass",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"], {
                    size: 48,
                    className: "mx-auto text-white/5 mb-4"
                }, void 0, false, {
                    fileName: "[project]/src/components/OrderList.tsx",
                    lineNumber: 57,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    className: "text-metal-500 font-bold italic text-sm",
                    children: "Онлайн-заказов пока нет"
                }, void 0, false, {
                    fileName: "[project]/src/components/OrderList.tsx",
                    lineNumber: 58,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/OrderList.tsx",
            lineNumber: 56,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-6",
        children: orders.map((order)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `glass overflow-hidden transition-all border-l-4 ${order.status === 'completed' ? 'border-l-green-500/50 opacity-80' : 'border-l-blue-500'}`,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "p-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col md:flex-row justify-between gap-6 mb-8",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "space-y-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: `px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${order.status === 'completed' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-blue-500/10 text-blue-400 border border-blue-500/20 animate-pulse'}`,
                                                    children: order.status === 'pending' ? 'Новый заказ' : 'Выполнен'
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/OrderList.tsx",
                                                    lineNumber: 74,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[10px] text-metal-500 font-black uppercase",
                                                    children: [
                                                        "#",
                                                        order.id,
                                                        " • ",
                                                        new Date(order.created_at).toLocaleString('ru-RU')
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/OrderList.tsx",
                                                    lineNumber: 77,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/OrderList.tsx",
                                            lineNumber: 73,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    className: "text-xl font-black flex items-center gap-2 text-white",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                                            size: 18,
                                                            className: "text-metal-500"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/OrderList.tsx",
                                                            lineNumber: 82,
                                                            columnNumber: 21
                                                        }, this),
                                                        " ",
                                                        order.customer_name
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/OrderList.tsx",
                                                    lineNumber: 81,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "flex items-center gap-2 text-metal-400 text-sm font-bold",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$phone$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Phone$3e$__["Phone"], {
                                                            size: 14,
                                                            className: "text-blue-400"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/OrderList.tsx",
                                                            lineNumber: 85,
                                                            columnNumber: 21
                                                        }, this),
                                                        " ",
                                                        order.customer_phone
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/OrderList.tsx",
                                                    lineNumber: 84,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "flex items-center gap-2 text-metal-400 text-sm font-bold",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"], {
                                                            size: 14,
                                                            className: "text-red-400"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/OrderList.tsx",
                                                            lineNumber: 88,
                                                            columnNumber: 21
                                                        }, this),
                                                        " ",
                                                        order.customer_address
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/OrderList.tsx",
                                                    lineNumber: 87,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/OrderList.tsx",
                                            lineNumber: 80,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/OrderList.tsx",
                                    lineNumber: 72,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "text-right flex flex-col justify-between items-end",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "space-y-1",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-[10px] text-metal-500 uppercase font-black",
                                                    children: "Сумма заказа"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/OrderList.tsx",
                                                    lineNumber: 95,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-3xl font-black text-green-400",
                                                    children: [
                                                        order.total_price,
                                                        " ₽"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/OrderList.tsx",
                                                    lineNumber: 96,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/OrderList.tsx",
                                            lineNumber: 94,
                                            columnNumber: 17
                                        }, this),
                                        order.status === 'pending' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>handleStatusChange(order.id, 'completed'),
                                            className: "flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl font-black text-sm transition-all shadow-lg shadow-green-500/20",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {
                                                    size: 18
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/OrderList.tsx",
                                                    lineNumber: 104,
                                                    columnNumber: 21
                                                }, this),
                                                " ЗАВЕРШИТЬ СДЕЛКУ"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/OrderList.tsx",
                                            lineNumber: 100,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/OrderList.tsx",
                                    lineNumber: 93,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/OrderList.tsx",
                            lineNumber: 71,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-[10px] text-metal-500 uppercase font-black mb-2 flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"], {
                                            size: 12
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/OrderList.tsx",
                                            lineNumber: 112,
                                            columnNumber: 17
                                        }, this),
                                        " Состав заказа"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/OrderList.tsx",
                                    lineNumber: 111,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-1 md:grid-cols-2 gap-3",
                                    children: order.items.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "w-12 h-12 rounded-xl bg-metal-800 overflow-hidden flex-shrink-0 border border-white/10 relative",
                                                    children: item.image_url ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                                                        src: item.image_url,
                                                        alt: item.product_name,
                                                        fill: true,
                                                        className: "object-cover",
                                                        sizes: "48px"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/OrderList.tsx",
                                                        lineNumber: 119,
                                                        columnNumber: 27
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "w-full h-full flex items-center justify-center text-metal-600",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$package$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Package$3e$__["Package"], {
                                                            size: 20
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/OrderList.tsx",
                                                            lineNumber: 129,
                                                            columnNumber: 27
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/OrderList.tsx",
                                                        lineNumber: 128,
                                                        columnNumber: 25
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/OrderList.tsx",
                                                    lineNumber: 117,
                                                    columnNumber: 23
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex-1 min-w-0",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-sm font-black text-white truncate uppercase",
                                                            children: item.product_name
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/components/OrderList.tsx",
                                                            lineNumber: 134,
                                                            columnNumber: 23
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-[10px] text-metal-500 font-bold",
                                                            children: [
                                                                item.quantity,
                                                                " шт. × ",
                                                                item.price_at_time,
                                                                " ₽"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/src/components/OrderList.tsx",
                                                            lineNumber: 135,
                                                            columnNumber: 23
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/OrderList.tsx",
                                                    lineNumber: 133,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm font-black text-blue-400",
                                                    children: [
                                                        (item.quantity * item.price_at_time).toFixed(0),
                                                        " ₽"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/components/OrderList.tsx",
                                                    lineNumber: 137,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, item.id, true, {
                                            fileName: "[project]/src/components/OrderList.tsx",
                                            lineNumber: 116,
                                            columnNumber: 21
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/OrderList.tsx",
                                    lineNumber: 114,
                                    columnNumber: 17
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/OrderList.tsx",
                            lineNumber: 110,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/OrderList.tsx",
                    lineNumber: 70,
                    columnNumber: 11
                }, this)
            }, order.id, false, {
                fileName: "[project]/src/components/OrderList.tsx",
                lineNumber: 66,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/src/components/OrderList.tsx",
        lineNumber: 64,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/lib/data:c57b37 [app-ssr] (ecmascript) <text/javascript>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getRecentSales",
    ()=>$$RSC_SERVER_ACTION_11
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-client-wrapper.js [app-ssr] (ecmascript)");
/* __next_internal_action_entry_do_not_use__ [{"7f0c868ff325f4a0782602637ca022bde0315f6081":"getRecentSales"},"src/lib/product-actions.ts",""] */ "use turbopack no side effects";
;
const $$RSC_SERVER_ACTION_11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createServerReference"])("7f0c868ff325f4a0782602637ca022bde0315f6081", __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["callServer"], void 0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$client$2d$wrapper$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["findSourceMapURL"], "getRecentSales");
;
 //# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4vcHJvZHVjdC1hY3Rpb25zLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIid1c2Ugc2VydmVyJztcblxuaW1wb3J0IHsgcmV2YWxpZGF0ZVBhdGggfSBmcm9tICduZXh0L2NhY2hlJztcbmltcG9ydCB7IGNhY2hlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGRiIGZyb20gJy4vZGInO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZ2V0UHJvZHVjdHMoKSB7XG4gIGNvbnN0IHByb2R1Y3RzID0gZGIucHJlcGFyZSgnU0VMRUNUICogRlJPTSBwcm9kdWN0cyBPUkRFUiBCWSBjcmVhdGVkX2F0IERFU0MnKS5hbGwoKTtcbiAgcmV0dXJuIHByb2R1Y3RzO1xufVxuXG5leHBvcnQgY29uc3QgZ2V0U2FsZXNTdGF0cyA9IGNhY2hlKGFzeW5jICgpID0+IHtcbiAgY29uc3Qgc2FsZXMgPSBkYi5wcmVwYXJlKGBcbiAgICBTRUxFQ1Qgcy4qLCBwLmJ1eV9wcmljZSwgcC5uYW1lIGFzIHByb2R1Y3RfbmFtZSBcbiAgICBGUk9NIHNhbGVzIHMgXG4gICAgTEVGVCBKT0lOIHByb2R1Y3RzIHAgT04gcy5wcm9kdWN0X2lkID0gcC5pZFxuICBgKS5hbGwoKSBhcyBhbnlbXTtcblxuICBjb25zdCBub3cgPSBuZXcgRGF0ZSgpO1xuICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKG5vdy5nZXRGdWxsWWVhcigpLCBub3cuZ2V0TW9udGgoKSwgbm93LmdldERhdGUoKSkuZ2V0VGltZSgpO1xuICBjb25zdCB5ZXN0ZXJkYXkgPSB0b2RheSAtIDg2NDAwMDAwO1xuICBjb25zdCBsYXN0N0RheXMgPSB0b2RheSAtIDcgKiA4NjQwMDAwMDtcbiAgY29uc3QgbGFzdDE0RGF5cyA9IHRvZGF5IC0gMTQgKiA4NjQwMDAwMDtcbiAgY29uc3QgbGFzdDMwRGF5cyA9IHRvZGF5IC0gMzAgKiA4NjQwMDAwMDtcbiAgY29uc3QgbGFzdDYwRGF5cyA9IHRvZGF5IC0gNjAgKiA4NjQwMDAwMDtcblxuICBjb25zdCBzdGF0cyA9IHtcbiAgICBkYWlseV90b3RhbDogMCwgZGFpbHlfcHJvZml0OiAwLCBwcmV2X2RhaWx5X3RvdGFsOiAwLFxuICAgIHdlZWtseV90b3RhbDogMCwgd2Vla2x5X3Byb2ZpdDogMCwgcHJldl93ZWVrbHlfdG90YWw6IDAsXG4gICAgbW9udGhseV90b3RhbDogMCwgbW9udGhseV9wcm9maXQ6IDAsIHByZXZfbW9udGhseV90b3RhbDogMFxuICB9O1xuXG4gIHNhbGVzLmZvckVhY2goKHM6IGFueSkgPT4ge1xuICAgIGNvbnN0IHNhbGVEYXRlID0gbmV3IERhdGUocy5zYWxlX2RhdGUpLmdldFRpbWUoKTtcbiAgICBjb25zdCB0b3RhbCA9IE51bWJlcihzLnRvdGFsX3ByaWNlKTtcbiAgICBjb25zdCBidXlQcmljZSA9IHMuYnV5X3ByaWNlIHx8IDA7XG4gICAgY29uc3QgY29zdCA9IE51bWJlcihidXlQcmljZSkgKiBOdW1iZXIocy5xdWFudGl0eSk7XG4gICAgY29uc3QgcHJvZml0ID0gdG90YWwgLSBjb3N0O1xuXG4gICAgaWYgKHNhbGVEYXRlID49IHRvZGF5KSB7XG4gICAgICBzdGF0cy5kYWlseV90b3RhbCArPSB0b3RhbDtcbiAgICAgIHN0YXRzLmRhaWx5X3Byb2ZpdCArPSBwcm9maXQ7XG4gICAgfSBlbHNlIGlmIChzYWxlRGF0ZSA+PSB5ZXN0ZXJkYXkgJiYgc2FsZURhdGUgPCB0b2RheSkge1xuICAgICAgc3RhdHMucHJldl9kYWlseV90b3RhbCArPSB0b3RhbDtcbiAgICB9XG5cbiAgICBpZiAoc2FsZURhdGUgPj0gbGFzdDdEYXlzKSB7XG4gICAgICBzdGF0cy53ZWVrbHlfdG90YWwgKz0gdG90YWw7XG4gICAgICBzdGF0cy53ZWVrbHlfcHJvZml0ICs9IHByb2ZpdDtcbiAgICB9IGVsc2UgaWYgKHNhbGVEYXRlID49IGxhc3QxNERheXMgJiYgc2FsZURhdGUgPCBsYXN0N0RheXMpIHtcbiAgICAgIHN0YXRzLnByZXZfd2Vla2x5X3RvdGFsICs9IHRvdGFsO1xuICAgIH1cblxuICAgIGlmIChzYWxlRGF0ZSA+PSBsYXN0MzBEYXlzKSB7XG4gICAgICBzdGF0cy5tb250aGx5X3RvdGFsICs9IHRvdGFsO1xuICAgICAgc3RhdHMubW9udGhseV9wcm9maXQgKz0gcHJvZml0O1xuICAgIH0gZWxzZSBpZiAoc2FsZURhdGUgPj0gbGFzdDYwRGF5cyAmJiBzYWxlRGF0ZSA8IGxhc3QzMERheXMpIHtcbiAgICAgIHN0YXRzLnByZXZfbW9udGhseV90b3RhbCArPSB0b3RhbDtcbiAgICB9XG4gIH0pO1xuXG4gIGNvbnN0IGNoYXJ0TWFwID0gbmV3IE1hcCgpO1xuICBzYWxlcy5maWx0ZXIoKHM6IGFueSkgPT4gbmV3IERhdGUocy5zYWxlX2RhdGUpLmdldFRpbWUoKSA+PSBsYXN0MzBEYXlzKS5mb3JFYWNoKChzOiBhbnkpID0+IHtcbiAgICBjb25zdCBkID0gbmV3IERhdGUocy5zYWxlX2RhdGUpLnRvSVNPU3RyaW5nKCkuc3BsaXQoJ1QnKVswXTtcbiAgICBjaGFydE1hcC5zZXQoZCwgKGNoYXJ0TWFwLmdldChkKSB8fCAwKSArIE51bWJlcihzLnRvdGFsX3ByaWNlKSk7XG4gIH0pO1xuICBjb25zdCBjaGFydERhdGEgPSBBcnJheS5mcm9tKGNoYXJ0TWFwLmVudHJpZXMoKSlcbiAgICAubWFwKChbZGF0ZSwgYW1vdW50XSkgPT4gKHsgZGF0ZSwgYW1vdW50IH0pKVxuICAgIC5zb3J0KChhLCBiKSA9PiBhLmRhdGUubG9jYWxlQ29tcGFyZShiLmRhdGUpKTtcblxuICBjb25zdCBtb250aGx5TWFwID0gbmV3IE1hcCgpO1xuICBzYWxlcy5mb3JFYWNoKChzOiBhbnkpID0+IHtcbiAgICBjb25zdCBkID0gbmV3IERhdGUocy5zYWxlX2RhdGUpO1xuICAgIGNvbnN0IG0gPSBkLmdldE1vbnRoKCkgKyAxO1xuICAgIG1vbnRobHlNYXAuc2V0KG0sIChtb250aGx5TWFwLmdldChtKSB8fCAwKSArIE51bWJlcihzLnRvdGFsX3ByaWNlKSk7XG4gIH0pO1xuICBjb25zdCBtb250aGx5QW5hbHlzaXMgPSBBcnJheS5mcm9tKG1vbnRobHlNYXAuZW50cmllcygpKVxuICAgIC5tYXAoKFttb250aCwgdG90YWxdKSA9PiAoeyBtb250aDogU3RyaW5nKG1vbnRoKS5wYWRTdGFydCgyLCAnMCcpLCB0b3RhbCB9KSlcbiAgICAuc29ydCgoYSwgYikgPT4gYi5tb250aC5sb2NhbGVDb21wYXJlKGEubW9udGgpKTtcblxuICBjb25zdCB3ZWVrbHlNYXAgPSBuZXcgTWFwKCk7XG4gIHNhbGVzLmZpbHRlcigoczogYW55KSA9PiBuZXcgRGF0ZShzLnNhbGVfZGF0ZSkuZ2V0VGltZSgpID49IGxhc3QzMERheXMpLmZvckVhY2goKHM6IGFueSkgPT4ge1xuICAgIGNvbnN0IGQgPSBuZXcgRGF0ZShzLnNhbGVfZGF0ZSk7XG4gICAgY29uc3Qgd2VlayA9IE1hdGguY2VpbCgoZC5nZXREYXRlKCkgLSAxICsgbmV3IERhdGUoZC5nZXRGdWxsWWVhcigpLCBkLmdldE1vbnRoKCksIDEpLmdldERheSgpKSAvIDcpO1xuICAgIHdlZWtseU1hcC5zZXQod2VlaywgKHdlZWtseU1hcC5nZXQod2VlaykgfHwgMCkgKyBOdW1iZXIocy50b3RhbF9wcmljZSkpO1xuICB9KTtcbiAgY29uc3Qgd2Vla2x5QW5hbHlzaXMgPSBBcnJheS5mcm9tKHdlZWtseU1hcC5lbnRyaWVzKCkpXG4gICAgLm1hcCgoW3dlZWssIHRvdGFsXSkgPT4gKHsgd2VlazogU3RyaW5nKHdlZWspLCB0b3RhbCB9KSlcbiAgICAuc29ydCgoYSwgYikgPT4gYi53ZWVrLmxvY2FsZUNvbXBhcmUoYS53ZWVrKSk7XG5cbiAgY29uc3QgY2FsY3VsYXRlVHJlbmQgPSAoY3VycmVudDogbnVtYmVyLCBwcmV2aW91czogbnVtYmVyKSA9PiB7XG4gICAgaWYgKCFwcmV2aW91cyB8fCBwcmV2aW91cyA9PT0gMCkgcmV0dXJuIGN1cnJlbnQgPiAwID8gMTAwIDogMDtcbiAgICByZXR1cm4gTWF0aC5yb3VuZCgoKGN1cnJlbnQgLSBwcmV2aW91cykgLyBwcmV2aW91cykgKiAxMDApO1xuICB9O1xuXG4gIHJldHVybiB7XG4gICAgZGFpbHk6IHsgXG4gICAgICB0b3RhbDogc3RhdHMuZGFpbHlfdG90YWwsIFxuICAgICAgcHJvZml0OiBzdGF0cy5kYWlseV9wcm9maXQsXG4gICAgICB0cmVuZDogY2FsY3VsYXRlVHJlbmQoc3RhdHMuZGFpbHlfdG90YWwsIHN0YXRzLnByZXZfZGFpbHlfdG90YWwpXG4gICAgfSxcbiAgICB3ZWVrbHk6IHsgXG4gICAgICB0b3RhbDogc3RhdHMud2Vla2x5X3RvdGFsLCBcbiAgICAgIHByb2ZpdDogc3RhdHMud2Vla2x5X3Byb2ZpdCxcbiAgICAgIHRyZW5kOiBjYWxjdWxhdGVUcmVuZChzdGF0cy53ZWVrbHlfdG90YWwsIHN0YXRzLnByZXZfd2Vla2x5X3RvdGFsKVxuICAgIH0sXG4gICAgbW9udGhseTogeyBcbiAgICAgIHRvdGFsOiBzdGF0cy5tb250aGx5X3RvdGFsLCBcbiAgICAgIHByb2ZpdDogc3RhdHMubW9udGhseV9wcm9maXQsXG4gICAgICB0cmVuZDogY2FsY3VsYXRlVHJlbmQoc3RhdHMubW9udGhseV90b3RhbCwgc3RhdHMucHJldl9tb250aGx5X3RvdGFsKVxuICAgIH0sXG4gICAgY2hhcnREYXRhLFxuICAgIG1vbnRobHlBbmFseXNpcyxcbiAgICB3ZWVrbHlBbmFseXNpc1xuICB9O1xufSk7XG5cbmV4cG9ydCBjb25zdCBnZXRSZWNlbnRTYWxlcyA9IGNhY2hlKGFzeW5jICgpID0+IHtcbiAgY29uc3Qgc2FsZXMgPSBkYi5wcmVwYXJlKGBcbiAgICBTRUxFQ1Qgcy4qLCBwLm5hbWUgYXMgcHJvZHVjdF9uYW1lIFxuICAgIEZST00gc2FsZXMgcyBcbiAgICBMRUZUIEpPSU4gcHJvZHVjdHMgcCBPTiBzLnByb2R1Y3RfaWQgPSBwLmlkIFxuICAgIE9SREVSIEJZIHMuc2FsZV9kYXRlIERFU0MgXG4gICAgTElNSVQgMTBcbiAgYCkuYWxsKCk7XG4gIHJldHVybiBzYWxlcztcbn0pO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWRkUHJvZHVjdChmb3JtRGF0YTogRm9ybURhdGEpIHtcbiAgY29uc3QgbmFtZSA9IGZvcm1EYXRhLmdldCgnbmFtZScpIGFzIHN0cmluZztcbiAgY29uc3QgYnV5X3ByaWNlID0gcGFyc2VGbG9hdChmb3JtRGF0YS5nZXQoJ2J1eV9wcmljZScpIGFzIHN0cmluZyk7XG4gIGNvbnN0IHNlbGxfcHJpY2UgPSBwYXJzZUZsb2F0KGZvcm1EYXRhLmdldCgnc2VsbF9wcmljZScpIGFzIHN0cmluZyk7XG4gIGNvbnN0IHN0b2NrID0gcGFyc2VGbG9hdChmb3JtRGF0YS5nZXQoJ3N0b2NrJykgYXMgc3RyaW5nKSB8fCAwO1xuICBjb25zdCB1bml0ID0gZm9ybURhdGEuZ2V0KCd1bml0JykgYXMgc3RyaW5nIHx8ICfRiNGCJztcbiAgY29uc3QgY2F0ZWdvcnkgPSBmb3JtRGF0YS5nZXQoJ2NhdGVnb3J5JykgYXMgc3RyaW5nIHx8ICfQntCx0YnQtdC1JztcbiAgY29uc3QgZnVsbF93aWR0aCA9IHBhcnNlRmxvYXQoZm9ybURhdGEuZ2V0KCdmdWxsX3dpZHRoJykgYXMgc3RyaW5nKSB8fCBudWxsO1xuICBjb25zdCB1c2VmdWxfd2lkdGggPSBwYXJzZUZsb2F0KGZvcm1EYXRhLmdldCgndXNlZnVsX3dpZHRoJykgYXMgc3RyaW5nKSB8fCBudWxsO1xuICBjb25zdCB0aGlja25lc3MgPSBwYXJzZUZsb2F0KGZvcm1EYXRhLmdldCgndGhpY2tuZXNzJykgYXMgc3RyaW5nKSB8fCBudWxsO1xuICBjb25zdCBjb2xvciA9IGZvcm1EYXRhLmdldCgnY29sb3InKSBhcyBzdHJpbmcgfHwgbnVsbDtcbiAgY29uc3QgaW1hZ2VfcGFkZGluZyA9IHBhcnNlSW50KGZvcm1EYXRhLmdldCgnaW1hZ2VfcGFkZGluZycpIGFzIHN0cmluZykgfHwgMDtcbiAgY29uc3QgaW1hZ2Vfc2NhbGUgPSBwYXJzZUZsb2F0KGZvcm1EYXRhLmdldCgnaW1hZ2Vfc2NhbGUnKSBhcyBzdHJpbmcpIHx8IDEuMDtcbiAgY29uc3QgdmFyaWFudHMgPSBmb3JtRGF0YS5nZXQoJ3ZhcmlhbnRzJykgYXMgc3RyaW5nIHx8IG51bGw7XG4gIGNvbnN0IGltYWdlX3VybCA9IGZvcm1EYXRhLmdldCgnaW1hZ2VfdXJsJykgYXMgc3RyaW5nO1xuXG4gIGRiLnByZXBhcmUoYFxuICAgIElOU0VSVCBJTlRPIHByb2R1Y3RzIChuYW1lLCBidXlfcHJpY2UsIHNlbGxfcHJpY2UsIGltYWdlX3VybCwgc3RvY2ssIGNhdGVnb3J5LCB1bml0LCBmdWxsX3dpZHRoLCB1c2VmdWxfd2lkdGgsIHRoaWNrbmVzcywgY29sb3IsIGltYWdlX3BhZGRpbmcsIGltYWdlX3NjYWxlLCB2YXJpYW50cylcbiAgICBWQUxVRVMgKD8sID8sID8sID8sID8sID8sID8sID8sID8sID8sID8sID8sID8sID8pXG4gIGApLnJ1bihuYW1lLCBidXlfcHJpY2UsIHNlbGxfcHJpY2UsIGltYWdlX3VybCwgc3RvY2ssIGNhdGVnb3J5LCB1bml0LCBmdWxsX3dpZHRoLCB1c2VmdWxfd2lkdGgsIHRoaWNrbmVzcywgY29sb3IsIGltYWdlX3BhZGRpbmcsIGltYWdlX3NjYWxlLCB2YXJpYW50cyk7XG5cbiAgcmV2YWxpZGF0ZVBhdGgoJy9hZG1pbi9wcm9kdWN0cycpO1xuICByZXZhbGlkYXRlUGF0aCgnL2FkbWluJyk7XG4gIHJldmFsaWRhdGVQYXRoKCcvJyk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVQcm9kdWN0KGZvcm1EYXRhOiBGb3JtRGF0YSkge1xuICBjb25zdCBpZCA9IHBhcnNlSW50KGZvcm1EYXRhLmdldCgnaWQnKSBhcyBzdHJpbmcpO1xuICBjb25zdCBuYW1lID0gZm9ybURhdGEuZ2V0KCduYW1lJykgYXMgc3RyaW5nO1xuICBjb25zdCBidXlfcHJpY2UgPSBwYXJzZUZsb2F0KGZvcm1EYXRhLmdldCgnYnV5X3ByaWNlJykgYXMgc3RyaW5nKTtcbiAgY29uc3Qgc2VsbF9wcmljZSA9IHBhcnNlRmxvYXQoZm9ybURhdGEuZ2V0KCdzZWxsX3ByaWNlJykgYXMgc3RyaW5nKTtcbiAgY29uc3Qgc3RvY2sgPSBwYXJzZUZsb2F0KGZvcm1EYXRhLmdldCgnc3RvY2snKSBhcyBzdHJpbmcpIHx8IDA7XG4gIGNvbnN0IHVuaXQgPSBmb3JtRGF0YS5nZXQoJ3VuaXQnKSBhcyBzdHJpbmcgfHwgJ9GI0YInO1xuICBjb25zdCBjYXRlZ29yeSA9IGZvcm1EYXRhLmdldCgnY2F0ZWdvcnknKSBhcyBzdHJpbmcgfHwgJ9Ce0LHRidC10LUnO1xuICBjb25zdCBmdWxsX3dpZHRoID0gcGFyc2VGbG9hdChmb3JtRGF0YS5nZXQoJ2Z1bGxfd2lkdGgnKSBhcyBzdHJpbmcpIHx8IG51bGw7XG4gIGNvbnN0IHVzZWZ1bF93aWR0aCA9IHBhcnNlRmxvYXQoZm9ybURhdGEuZ2V0KCd1c2VmdWxfd2lkdGgnKSBhcyBzdHJpbmcpIHx8IG51bGw7XG4gIGNvbnN0IHRoaWNrbmVzcyA9IHBhcnNlRmxvYXQoZm9ybURhdGEuZ2V0KCd0aGlja25lc3MnKSBhcyBzdHJpbmcpIHx8IG51bGw7XG4gIGNvbnN0IGNvbG9yID0gZm9ybURhdGEuZ2V0KCdjb2xvcicpIGFzIHN0cmluZyB8fCBudWxsO1xuICBjb25zdCBpbWFnZV9wYWRkaW5nID0gcGFyc2VJbnQoZm9ybURhdGEuZ2V0KCdpbWFnZV9wYWRkaW5nJykgYXMgc3RyaW5nKSB8fCAwO1xuICBjb25zdCBpbWFnZV9zY2FsZSA9IHBhcnNlRmxvYXQoZm9ybURhdGEuZ2V0KCdpbWFnZV9zY2FsZScpIGFzIHN0cmluZykgfHwgMS4wO1xuICBjb25zdCB2YXJpYW50cyA9IGZvcm1EYXRhLmdldCgndmFyaWFudHMnKSBhcyBzdHJpbmcgfHwgbnVsbDtcbiAgY29uc3QgaW1hZ2VfdXJsID0gZm9ybURhdGEuZ2V0KCdpbWFnZV91cmwnKSBhcyBzdHJpbmc7XG5cbiAgaWYgKGltYWdlX3VybCkge1xuICAgIGRiLnByZXBhcmUoYFxuICAgICAgVVBEQVRFIHByb2R1Y3RzIFNFVCBuYW1lID0gPywgYnV5X3ByaWNlID0gPywgc2VsbF9wcmljZSA9ID8sIGltYWdlX3VybCA9ID8sIHN0b2NrID0gPywgY2F0ZWdvcnkgPSA/LCB1bml0ID0gPywgZnVsbF93aWR0aCA9ID8sIHVzZWZ1bF93aWR0aCA9ID8sIHRoaWNrbmVzcyA9ID8sIGNvbG9yID0gPywgaW1hZ2VfcGFkZGluZyA9ID8sIGltYWdlX3NjYWxlID0gPywgdmFyaWFudHMgPSA/XG4gICAgICBXSEVSRSBpZCA9ID9cbiAgICBgKS5ydW4obmFtZSwgYnV5X3ByaWNlLCBzZWxsX3ByaWNlLCBpbWFnZV91cmwsIHN0b2NrLCBjYXRlZ29yeSwgdW5pdCwgZnVsbF93aWR0aCwgdXNlZnVsX3dpZHRoLCB0aGlja25lc3MsIGNvbG9yLCBpbWFnZV9wYWRkaW5nLCBpbWFnZV9zY2FsZSwgdmFyaWFudHMsIGlkKTtcbiAgfSBlbHNlIHtcbiAgICBkYi5wcmVwYXJlKGBcbiAgICAgIFVQREFURSBwcm9kdWN0cyBTRVQgbmFtZSA9ID8sIGJ1eV9wcmljZSA9ID8sIHNlbGxfcHJpY2UgPSA/LCBzdG9jayA9ID8sIGNhdGVnb3J5ID0gPywgdW5pdCA9ID8sIGZ1bGxfd2lkdGggPSA/LCB1c2VmdWxfd2lkdGggPSA/LCB0aGlja25lc3MgPSA/LCBjb2xvciA9ID8sIGltYWdlX3BhZGRpbmcgPSA/LCBpbWFnZV9zY2FsZSA9ID8sIHZhcmlhbnRzID0gP1xuICAgICAgV0hFUkUgaWQgPSA/XG4gICAgYCkucnVuKG5hbWUsIGJ1eV9wcmljZSwgc2VsbF9wcmljZSwgc3RvY2ssIGNhdGVnb3J5LCB1bml0LCBmdWxsX3dpZHRoLCB1c2VmdWxfd2lkdGgsIHRoaWNrbmVzcywgY29sb3IsIGltYWdlX3BhZGRpbmcsIGltYWdlX3NjYWxlLCB2YXJpYW50cywgaWQpO1xuICB9XG5cbiAgcmV2YWxpZGF0ZVBhdGgoJy9hZG1pbi9wcm9kdWN0cycpO1xuICByZXZhbGlkYXRlUGF0aCgnL2FkbWluJyk7XG4gIHJldmFsaWRhdGVQYXRoKCcvJyk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRPcmRlcnMoKSB7XG4gIGNvbnN0IG9yZGVycyA9IGRiLnByZXBhcmUoJ1NFTEVDVCAqIEZST00gb3JkZXJzIE9SREVSIEJZIGNyZWF0ZWRfYXQgREVTQycpLmFsbCgpIGFzIGFueVtdO1xuICBcbiAgY29uc3Qgb3JkZXJzV2l0aEl0ZW1zID0gb3JkZXJzLm1hcCgob3JkZXIpID0+IHtcbiAgICBjb25zdCBpdGVtcyA9IGRiLnByZXBhcmUoYFxuICAgICAgU0VMRUNUIG9pLiosIHAubmFtZSBhcyBwcm9kdWN0X25hbWUsIHAuaW1hZ2VfdXJsIFxuICAgICAgRlJPTSBvcmRlcl9pdGVtcyBvaSBcbiAgICAgIExFRlQgSk9JTiBwcm9kdWN0cyBwIE9OIG9pLnByb2R1Y3RfaWQgPSBwLmlkIFxuICAgICAgV0hFUkUgb2kub3JkZXJfaWQgPSA/XG4gICAgYCkuYWxsKG9yZGVyLmlkKTtcbiAgICByZXR1cm4geyAuLi5vcmRlciwgaXRlbXMgfTtcbiAgfSk7XG5cbiAgcmV0dXJuIG9yZGVyc1dpdGhJdGVtcztcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNyZWF0ZU9yZGVyKGN1c3RvbWVySW5mbzogeyBuYW1lOiBzdHJpbmcsIHBob25lOiBzdHJpbmcsIGFkZHJlc3M6IHN0cmluZyB9LCBjYXJ0OiBhbnlbXSkge1xuICBjb25zdCB0b3RhbFByaWNlID0gY2FydC5yZWR1Y2UoKHN1bSwgaXRlbSkgPT4gc3VtICsgKGl0ZW0uc2VsbF9wcmljZSAqIGl0ZW0ucXVhbnRpdHkpLCAwKTtcbiAgXG4gIGNvbnN0IHJlc3VsdCA9IGRiLnByZXBhcmUoYFxuICAgIElOU0VSVCBJTlRPIG9yZGVycyAoY3VzdG9tZXJfbmFtZSwgY3VzdG9tZXJfcGhvbmUsIGN1c3RvbWVyX2FkZHJlc3MsIHRvdGFsX3ByaWNlKVxuICAgIFZBTFVFUyAoPywgPywgPywgPylcbiAgYCkucnVuKGN1c3RvbWVySW5mby5uYW1lLCBjdXN0b21lckluZm8ucGhvbmUsIGN1c3RvbWVySW5mby5hZGRyZXNzLCB0b3RhbFByaWNlKTtcblxuICBjb25zdCBvcmRlcklkID0gcmVzdWx0Lmxhc3RJbnNlcnRSb3dpZDtcblxuICBmb3IgKGNvbnN0IGl0ZW0gb2YgY2FydCkge1xuICAgIGRiLnByZXBhcmUoYFxuICAgICAgSU5TRVJUIElOVE8gb3JkZXJfaXRlbXMgKG9yZGVyX2lkLCBwcm9kdWN0X2lkLCBxdWFudGl0eSwgcHJpY2VfYXRfdGltZSwgdW5pdClcbiAgICAgIFZBTFVFUyAoPywgPywgPywgPywgPylcbiAgICBgKS5ydW4ob3JkZXJJZCwgaXRlbS5pZCwgaXRlbS5xdWFudGl0eSwgaXRlbS5zZWxsX3ByaWNlLCBpdGVtLnVuaXQpO1xuXG4gICAgZGIucHJlcGFyZSgnVVBEQVRFIHByb2R1Y3RzIFNFVCBzdG9jayA9IHN0b2NrIC0gPyBXSEVSRSBpZCA9ID8nKS5ydW4oaXRlbS5xdWFudGl0eSwgaXRlbS5pZCk7XG4gIH1cblxuICByZXZhbGlkYXRlUGF0aCgnL2FkbWluJyk7XG4gIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUsIG9yZGVySWQgfTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHVwZGF0ZU9yZGVyU3RhdHVzKGlkOiBudW1iZXIsIHN0YXR1czogc3RyaW5nKSB7XG4gIGRiLnByZXBhcmUoJ1VQREFURSBvcmRlcnMgU0VUIHN0YXR1cyA9ID8gV0hFUkUgaWQgPSA/JykucnVuKHN0YXR1cywgaWQpO1xuICByZXZhbGlkYXRlUGF0aCgnL2FkbWluJyk7XG59XG5cbmV4cG9ydCBjb25zdCBnZXRDYXRlZ29yaWVzID0gY2FjaGUoYXN5bmMgKCkgPT4ge1xuICBjb25zdCByb3dzID0gZGIucHJlcGFyZSgnU0VMRUNUIERJU1RJTkNUIGNhdGVnb3J5IEZST00gcHJvZHVjdHMgV0hFUkUgY2F0ZWdvcnkgSVMgTk9UIE5VTEwnKS5hbGwoKSBhcyB7IGNhdGVnb3J5OiBzdHJpbmcgfVtdO1xuICByZXR1cm4gcm93cy5tYXAociA9PiByLmNhdGVnb3J5KTtcbn0pO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGVsZXRlUHJvZHVjdChpZDogbnVtYmVyKSB7XG4gIGNvbnNvbGUubG9nKCdEZWxldGluZyBwcm9kdWN0IHdpdGggaWQ6JywgaWQpO1xuICB0cnkge1xuICAgIGRiLnByZXBhcmUoJ0RFTEVURSBGUk9NIHByb2R1Y3RzIFdIRVJFIGlkID0gPycpLnJ1bihpZCk7XG4gICAgcmV2YWxpZGF0ZVBhdGgoJy9hZG1pbi9wcm9kdWN0cycpO1xuICAgIHJldmFsaWRhdGVQYXRoKCcvYWRtaW4nKTtcbiAgICByZXZhbGlkYXRlUGF0aCgnLycpO1xuICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUgfTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKCdEZWxldGUgZXJyb3I6JywgZXJyb3IpO1xuICAgIHJldHVybiB7IHN1Y2Nlc3M6IGZhbHNlLCBlcnJvciB9O1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB1cGRhdGVTdG9jayhpZDogbnVtYmVyLCBuZXdTdG9jazogbnVtYmVyKSB7XG4gIGRiLnByZXBhcmUoJ1VQREFURSBwcm9kdWN0cyBTRVQgc3RvY2sgPSA/IFdIRVJFIGlkID0gPycpLnJ1bihuZXdTdG9jaywgaWQpO1xuICByZXZhbGlkYXRlUGF0aCgnL2FkbWluL3Byb2R1Y3RzJyk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZWdpc3RlclNhbGUocHJvZHVjdElkOiBudW1iZXIsIHF1YW50aXR5OiBudW1iZXIsIHRvdGFsUHJpY2U6IG51bWJlciwgcGF5bWVudE1ldGhvZDogc3RyaW5nID0gJ9Cd0LDQu9C40YfQvdGL0LzQuCcpIHtcbiAgY29uc3QgcHJvZHVjdCA9IGRiLnByZXBhcmUoJ1NFTEVDVCBzdG9jaywgbmFtZSBGUk9NIHByb2R1Y3RzIFdIRVJFIGlkID0gPycpLmdldChwcm9kdWN0SWQpIGFzIHsgc3RvY2s6IG51bWJlciwgbmFtZTogc3RyaW5nIH0gfCB1bmRlZmluZWQ7XG4gIFxuICBpZiAocHJvZHVjdCAmJiBOdW1iZXIocHJvZHVjdC5zdG9jaykgPj0gcXVhbnRpdHkpIHtcbiAgICBkYi5wcmVwYXJlKGBcbiAgICAgIElOU0VSVCBJTlRPIHNhbGVzIChwcm9kdWN0X2lkLCBwcm9kdWN0X25hbWUsIHF1YW50aXR5LCB0b3RhbF9wcmljZSwgcGF5bWVudF9tZXRob2QpXG4gICAgICBWQUxVRVMgKD8sID8sID8sID8sID8pXG4gICAgYCkucnVuKHByb2R1Y3RJZCwgcHJvZHVjdC5uYW1lLCBxdWFudGl0eSwgdG90YWxQcmljZSwgcGF5bWVudE1ldGhvZCk7XG5cbiAgICBkYi5wcmVwYXJlKCdVUERBVEUgcHJvZHVjdHMgU0VUIHN0b2NrID0gc3RvY2sgLSA/IFdIRVJFIGlkID0gPycpLnJ1bihxdWFudGl0eSwgcHJvZHVjdElkKTtcbiAgICBcbiAgICByZXZhbGlkYXRlUGF0aCgnL2FkbWluL3Byb2R1Y3RzJyk7XG4gICAgcmV2YWxpZGF0ZVBhdGgoJy9hZG1pbicpO1xuICAgIHJldHVybiB7IHN1Y2Nlc3M6IHRydWUgfTtcbiAgfVxuICByZXR1cm4geyBlcnJvcjogJ9Cd0LXQtNC+0YHRgtCw0YLQvtGH0L3QviDRgtC+0LLQsNGA0LAg0L3QsCDRgdC60LvQsNC00LUnIH07XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzYXZlUmVwb3J0VG9GaWxlKHJlcG9ydERhdGE6IGFueSkge1xuICByZXR1cm4geyBzdWNjZXNzOiB0cnVlIH07XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjBkQXFIYSJ9
}),
"[project]/src/components/RecentSalesFeed.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RecentSalesFeed
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/shopping-bag.js [app-ssr] (ecmascript) <export default as ShoppingBag>");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$3a$c57b37__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__ = __turbopack_context__.i("[project]/src/lib/data:c57b37 [app-ssr] (ecmascript) <text/javascript>");
'use client';
;
;
;
;
function RecentSalesFeed({ initialSales }) {
    const [sales, setSales] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(initialSales);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const interval = setInterval(async ()=>{
            const updated = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$data$3a$c57b37__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$text$2f$javascript$3e$__["getRecentSales"])();
            setSales(updated);
        }, 5000);
        return ()=>clearInterval(interval);
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "space-y-4 relative z-10",
        children: [
            sales.map((sale)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-blue-500/30 hover:bg-white/10 transition-all group animate-in slide-in-from-right duration-500",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "w-12 h-12 rounded-2xl bg-blue-500/10 flex flex-col items-center justify-center text-blue-400 font-black border border-blue-500/20 group-hover:scale-110 transition-transform text-xs",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "opacity-50",
                                    children: "x"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/RecentSalesFeed.tsx",
                                    lineNumber: 24,
                                    columnNumber: 13
                                }, this),
                                sale.quantity
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/RecentSalesFeed.tsx",
                            lineNumber: 23,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 min-w-0",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "font-black truncate text-white uppercase tracking-tight text-sm",
                                    children: sale.product_name
                                }, void 0, false, {
                                    fileName: "[project]/src/components/RecentSalesFeed.tsx",
                                    lineNumber: 27,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-[10px] text-metal-500 font-bold uppercase",
                                            children: [
                                                new Date(sale.sale_date).toLocaleTimeString('ru-RU', {
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                }),
                                                " • ",
                                                new Date(sale.sale_date).toLocaleDateString('ru-RU')
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/components/RecentSalesFeed.tsx",
                                            lineNumber: 29,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: `text-[8px] font-black uppercase px-1.5 py-0.5 rounded ${sale.payment_method === 'Перевод' ? 'bg-purple-500/20 text-purple-400' : 'bg-green-500/20 text-green-400'}`,
                                            children: sale.payment_method
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/RecentSalesFeed.tsx",
                                            lineNumber: 32,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/RecentSalesFeed.tsx",
                                    lineNumber: 28,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/RecentSalesFeed.tsx",
                            lineNumber: 26,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "font-black text-green-400 text-sm",
                            children: [
                                "+",
                                sale.total_price,
                                " ₽"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/RecentSalesFeed.tsx",
                            lineNumber: 37,
                            columnNumber: 11
                        }, this)
                    ]
                }, sale.id, true, {
                    fileName: "[project]/src/components/RecentSalesFeed.tsx",
                    lineNumber: 22,
                    columnNumber: 9
                }, this)),
            sales.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-center py-20",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$shopping$2d$bag$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__ShoppingBag$3e$__["ShoppingBag"], {
                        size: 48,
                        className: "mx-auto text-white/5 mb-4"
                    }, void 0, false, {
                        fileName: "[project]/src/components/RecentSalesFeed.tsx",
                        lineNumber: 42,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-metal-500 font-bold italic",
                        children: "Продаж пока нет"
                    }, void 0, false, {
                        fileName: "[project]/src/components/RecentSalesFeed.tsx",
                        lineNumber: 43,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/RecentSalesFeed.tsx",
                lineNumber: 41,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/RecentSalesFeed.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=src_a7114275._.js.map