import sqlite3

conn = sqlite3.connect("blog.db")
c = conn.cursor()

articles = [
    (
        "Deep Dive into LiteLLM Source Code: Core Architecture of an LLM API Gateway",
        "深入 LiteLLM 源码：LLM API 网关的核心架构",
        "LLM",
        "Explore LiteLLM's source-level architecture: protocol adapter pattern, routing & load balancing strategies, fault tolerance with tenacity.",
        "从源码级别剖析 LiteLLM 网关架构：协议适配器模式、路由与负载均衡策略、基于 tenacity 的容灾降级。",
        "blog/litellm-architecture/cover.png",
        "blog/litellm-architecture/read.html",
        "2026-05-14 10:00:00",
        "", "",
    ),
    (
        "Streaming Billing in Practice: Counting Tokens Without Blocking the Main Pipeline",
        "流式计费实战：Stream 模式下如何不阻塞主链路计算 Token",
        "LLM",
        "How to count tokens in streaming mode: AsyncGenerator wrapper, tiktoken offline calculation, and async DB writes via BackgroundTasks.",
        "流式场景下的 Token 计费方案：AsyncGenerator 包装器、tiktoken 离线计算、BackgroundTasks 异步落库。",
        "blog/streaming-billing/cover.png",
        "blog/streaming-billing/read.html",
        "2026-05-14 10:10:00",
        "", "",
    ),
    (
        "LLM Gateway Observability: Langfuse Integration and Callback Mechanism",
        "大模型网关的可观测性：Langfuse 集成与 Callback 机制解析",
        "LLM",
        "Three-layer analysis: business value of observability, Callback/Observer pattern in LiteLLM, non-blocking async reporting.",
        "三层剖析 Langfuse 集成：可观测性的业务价值、LiteLLM 中的 Callback 观察者模式、异步非阻塞上报。",
        "blog/langfuse-observability/cover.png",
        "blog/langfuse-observability/read.html",
        "2026-05-14 10:20:00",
        "", "",
    ),
    (
        "Redis in LLM Applications: Rate Limiting, Caching, and Progress Tracking",
        "Redis 在 LLM 应用中的实战：限流、缓存与进度追踪",
        "LLM",
        "Real-world Redis use cases: distributed rate limiting (sliding window/token bucket), in-flight tracking for load balancing, progress caching.",
        "Redis 三个实战场景：分布式限流（滑动窗口/令牌桶）、负载均衡 in-flight 追踪、异步任务进度缓存。",
        "blog/redis-in-llm/cover.png",
        "blog/redis-in-llm/read.html",
        "2026-05-14 10:30:00",
        "", "",
    ),
    (
        "SSE Real-time Push: From Heartbeat Keep-alive to Reconnection Recovery",
        "SSE 实时推送实战：从心跳保活到断线重连",
        "System Design",
        "Production-grade SSE: global singleton manager, 15s heartbeat, zombie cleanup, graceful shutdown, Redis-backed reconnection.",
        "生产级 SSE 实现：全局单例管理器、15秒心跳、僵尸清理、优雅停机、Redis 兜底的断线重连。",
        "blog/sse-real-time/cover.png",
        "blog/sse-real-time/read.html",
        "2026-05-14 10:40:00",
        "", "",
    ),
]

for art in articles:
    c.execute("INSERT INTO articles (title, title_zh, category, summary, summary_zh, cover_image, read_url, created_at, content, content_zh) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", art)

conn.commit()
conn.close()
print(f"Seeded {len(articles)} new articles.")
