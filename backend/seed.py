import sqlite3
import datetime

conn = sqlite3.connect("blog.db")
c = conn.cursor()

articles = [
    (
        "Design and analysis of a dynamic programming algorithm to solve the MCS problem",
        "Algorithm",
        "There are many ways to solve the minimum subarray problem, here we use the idea of dynamic programming to solve it.",
        "blog/read_daa/1.png",
        "",
        "2024-06-27 10:00:00",
        """
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.8; color: #333;">
            <h2 style="color: #0056b3; border-bottom: 2px solid #eee; padding-bottom: 10px;">Design and analysis of a dynamic programming algorithm to solve the MCS problem</h2>
            <div style="width: 100%; text-align: center;">
                <iframe src="blog/read_daa/pa.pdf" width="100%" height="800px" style="border: none; box-shadow: 0 4px 10px rgba(0,0,0,0.1); border-radius: 8px;"></iframe>
            </div>
        </div>
        """
    ),
    (
        "The worst linear time algorithm?",
        "Algorithm",
        "Try to write a linear time algorithm to find the kth largest element in an array. But why our linear time algorithm only beats 5 percent of similar algorithms?",
        "blog/kth-largest-element-in-an-array/img/cover.png",
        "",
        "2024-07-03 10:00:00",
        """
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.8; color: #333;">
            <p style="font-size: 16px;">Today we have a common problem, finding the kth largest element in an array. We need to find the kth largest element after sorting the array. And we need to solve the time in linear time.</p>
            <h2 style="color: #0056b3; margin-top: 30px;">Problem definition</h2>
            <p><strong>Input:</strong> A array of n integers and an integer k (1 ≤ k ≤ n).</p>
            <p><strong>Output:</strong> The kth largest element in the array.</p>
            <p><strong>Example:</strong> Input: [3, 2, 1, 5, 6, 4], k = 2 &nbsp;&nbsp; Output: 5</p>

            <h2 style="color: #0056b3; margin-top: 30px;">Approach</h2>
            <p style="font-size: 16px;">The most common algorithm to solve this problem is quicksort. However, the time complexity is O(nlogn). That is because quicksort do partition of whole array, and then recurisively do partition on the left and right subarray, but size of subarray is decrease in logn times, so total time complexity is O(nlogn). But if we only need to find the kth largest element, we don't need to do the participating for each subarray. We only need to do partition on the array we think it contains the kth largest element. Therefore, the time complexity is O(n), O(n/a),O(n/b)... (a,b is a constant), so the time complexity for whole array is O(n).</p>

            <h2 style="color: #0056b3; margin-top: 30px;">Visualization</h2>
            <p>Imagine we perform the Quick Select partition logic...</p>
            <div style="text-align: center; margin: 20px 0;">
                <img src="blog/kth-largest-element-in-an-array/img/cover.png" alt="Visual" style="max-width: 100%; border-radius: 8px;">
            </div>

            <h2 style="color: #0056b3; margin-top: 30px;">Algorithm implementation:</h2>
            <pre style="background: #282c34; color: #abb2bf; padding: 15px; border-radius: 8px; overflow-x: auto;"><code class="language-java">class Solution {
    public int findKthLargest(int[] nums, int k) {
        int length = nums.length;
        int result = divide(nums,0,length-1,k);
        return result;
    }
    public int divide(int[]nums, int startIndex, int endIndex,int k){
        int random = (int) (Math.random() * (endIndex - startIndex + 1)) + startIndex;
        if(startIndex==endIndex){
            return nums[startIndex];
        }
        int arrLength=endIndex-startIndex+1;
        int x=nums[random];
        int temp=nums[random];
        nums[random]=nums[endIndex];
        nums[endIndex]=temp;

        int j=startIndex;
        int i=j-1;
        for(;j<endIndex;j++){
            if(nums[j]<x){
                i=i+1;
                temp=nums[i];
                nums[i]=nums[j];
                nums[j]=temp;
            }
        }
        temp=nums[endIndex];
        nums[endIndex]=nums[i+1];
        nums[i+1]=temp;

        int kThLargest=endIndex-i;
        if(kThLargest==k){
            return nums[i+1];
        }
        else if(kThLargest<k){
            int findKth=k-kThLargest;
            return divide(nums,startIndex,i,findKth);
        }
        else if(kThLargest>k){
            return divide(nums,i+2,endIndex,k);
        }
        return -1;
    }
}</code></pre>
        </div>
        """
    ),
    (
        "Building an Android Movie Collection App",
        "Software Engineering",
        "a comprehensive movie collection application that enables users to search, favorite, display, and manage movie information with dynamic data loading. Built with modern Android technologies, the app delivers a responsive and seamless user experience.",
        "blog/android-movie-app/img/icon.jpg",
        "blog/android-movie-app/read.html",
        "2025-11-14 10:00:00",
        """
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.8; color: #333;">
            <h2 style="color: #0056b3; border-bottom: 2px solid #eee; padding-bottom: 10px;">Android Movie Collection App Overview</h2>
            <p>A comprehensive movie collection application that enables users to search, favorite, display, and manage movie information with dynamic data loading.</p>
            <h3 style="color: #333; margin-top: 20px;">Features Built:</h3>
            <ul>
                <li><strong>Modern Architecture:</strong> Built using MVVM architecture and Kotlin Coroutines for smooth asynchronous operations.</li>
                <li><strong>Dynamic Loading:</strong> Integrated Retrofit and Glide for seamless API calls and image caching.</li>
                <li><strong>Local Persistence:</strong> Used Room database to securely store user's favorite movies offline.</li>
            </ul>
            <div style="text-align: center; margin: 20px 0;">
                <img src="blog/android-movie-app/img/app_overview.png" alt="App Overview" style="max-width: 80%; border-radius: 8px; box-shadow: 0 4px 10px rgba(0,0,0,0.1);">
            </div>
        </div>
        """
    )
]

c.execute("""
CREATE TABLE IF NOT EXISTS articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(255),
    category VARCHAR(100),
    summary TEXT,
    content TEXT,
    cover_image VARCHAR(255),
    created_at DATETIME,
    read_url VARCHAR(255)
)
""")

c.execute("""
CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(255),
    category VARCHAR(100),
    summary TEXT,
    content TEXT,
    cover_image VARCHAR(255),
    tech_stack VARCHAR(255),
    created_at DATETIME
)
""")

# clear existing
c.execute("DELETE FROM articles")
c.execute("DELETE FROM projects")

for art in articles:
    c.execute("""
    INSERT INTO articles (title, category, summary, cover_image, read_url, created_at, content)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    """, art)

projects = [
    (
        "MathTasks Intelligent Production Platform",
        "Web & AI",
        "5-role full-link collaboration based on FSM & RBAC, solving concurrent routing conflicts. Built a 30+ field question bank model. Async task queues for difficulty evaluation.",
        "work/work1/cover.png",
        "Python, FastAPI, Next.js, PostgreSQL, Vector Search, Playwright, Agent",
        "2026-01-10 10:00:00",
        """
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.8; color: #333;">
            <h2 style="color: #0056b3; border-bottom: 2px solid #eee; padding-bottom: 10px;">Project Overview</h2>
            <p><strong>MathTasks</strong> is a comprehensive intelligent production platform designed to streamline the creation and management of math question banks.</p>
            <h3 style="color: #333; margin-top: 20px;">Key Features & Architecture:</h3>
            <ul>
                <li><strong>Core Architecture & Workflow:</strong> Implemented a 5-role full-link collaboration system based on Finite State Machine (FSM) and RBAC, resolving concurrent routing conflicts.</li>
                <li><strong>Async Queues & Real-time Push:</strong> Built asynchronous task queues for difficulty evaluation and vector deduplication, supporting efficient deduplication of 10,000+ questions. Used SSE streams combined with Redis caching for real-time frontend progress pushing and disconnection recovery.</li>
                <li><strong>AI Quality Evaluation:</strong> Designed an "adversarial validation" mechanism based on Large Language Models (LLMs), converting probabilistic outputs into deterministic difficulty evaluation metrics.</li>
                <li><strong>Automated Testing:</strong> Utilized Playwright for multi-role end-to-end testing; integrated multimodal LLMs to solve CAPTCHA recognition, with a Tesseract/manual intervention fallback strategy to ensure process robustness.</li>
            </ul>
        </div>
        """
    ),
    (
        "Enterprise LLM Unified Gateway & API Management",
        "Backend & Infrastructure",
        "Unified access to 8+ vendors and 20+ models. Configured multi-key load balancing and Failover. Optimized long-running inference connections.",
        "work/work2/1.png",
        "Python, LiteLLM, Docker, PostgreSQL, Redis, Asyncio, Langfuse",
        "2026-02-10 10:00:00",
        """
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.8; color: #333;">
            <h2 style="color: #0056b3; border-bottom: 2px solid #eee; padding-bottom: 10px;">System Architecture</h2>
            <p>An enterprise-grade unified gateway designed to manage, route, and monitor Large Language Model API calls across the organization.</p>
            <h3 style="color: #333; margin-top: 20px;">Core Contributions:</h3>
            <ul>
                <li><strong>Gateway Routing & High Availability:</strong> Unified access to 8+ vendors and 20+ models (OpenAI/Anthropic/Doubao). Configured multi-Key load balancing and automatic Failover to smoothly handle upstream rate limits and network anomalies.</li>
                <li><strong>Performance Testing & Optimization:</strong> Wrote concurrent load testing scripts to evaluate and tune the gateway's time-to-first-token and throughput under 50+ concurrency; optimized long-running inference connection settings to stably support thousands of complex Agent tasks daily.</li>
                <li><strong>Cost Governance & Observability:</strong> Integrated Langfuse for Token-level tracking; developed automated scheduled scripts to deeply parse aggregated gateway logs and automatically push fine-grained multi-team/multi-project cost reports via Feishu Webhooks.</li>
                <li><strong>Scale & Traffic:</strong> Cumulatively processed over 100 million+ Tokens requests.</li>
            </ul>
        </div>
        """
    ),
    (
        "Baipiao: Browser-Automation Local LLM Proxy",
        "Web & Automation",
        "Hijacked local browsers via CDP protocol to simulate actions and bypass anti-scraping. Provided standard /v1/chat/completions interfaces.",
        "index_page/img/portfolio/app.png",
        "Bun, Hono, CDP (Chrome DevTools Protocol)",
        "2026-04-01 10:00:00",
        """
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.8; color: #333;">
            <h2 style="color: #0056b3; border-bottom: 2px solid #eee; padding-bottom: 10px;">Project Background</h2>
            <p>I was always curious why LLM API services charge fees when their web interfaces are often free. Why not fetch web chat conversations directly to act as an API provider? Thus, this project was born.</p>
            <h3 style="color: #333; margin-top: 20px;">Implementation Details:</h3>
            <ul>
                <li><strong>Mechanism:</strong> Took control of the local browser via the underlying CDP (Chrome DevTools Protocol), simulating real keyboard strokes and mouse clicks, successfully bypassing conventional anti-scraping mechanisms based on DOM selectors and clipboards.</li>
                <li><strong>API Encapsulation:</strong> Built a local HTTP service using Bun and Hono, parsing the web DOM to separate the model's "deep thinking" content from the official reply.</li>
                <li><strong>Format Compatibility:</strong> Provides standard <code>/v1/chat/completions</code> interfaces, dynamically adapting to OpenAI and Anthropic Messages API formats based on client requests.</li>
            </ul>
        </div>
        """
    ),
    (
        "Roles-Skill: Character Distillation Architecture",
        "AI Agent & Prompt Engineering",
        "A Cyber Immortality Skill architecture based on Claude Code. Supports native language replies and automatic tool generation.",
        "index_page/img/portfolio/web.jpg",
        "Claude Code, Python, Agent Architecture",
        "2026-03-15 10:00:00",
        """
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.8; color: #333;">
            <h2 style="color: #0056b3; border-bottom: 2px solid #eee; padding-bottom: 10px;">Concept & Design</h2>
            <p>Based on Anthropic's latest Claude Code CLI tool, I designed and open-sourced a "Cyber Immortality" Skill architecture encompassing dozens of historical figures and modern professions.</p>
            <h3 style="color: #333; margin-top: 20px;">Core Technologies:</h3>
            <ul>
                <li><strong>Distillation Architecture:</strong> Implemented a dual-layer distillation architecture supporting a "native language reply + auto-translation" pipeline.</li>
                <li><strong>Auto-Tool Generation:</strong> Developed an automatic tool generation engine that dispatches Python tool code to Agents based on their character types, granting them computational and execution capabilities.</li>
                <li><strong>Multi-role Protocol:</strong> Designed a multi-role group chat protocol enabling cross-dimensional Agents to interact and debate.</li>
            </ul>
        </div>
        """
    ),
    (
        "CJC-Company: Vibe-Coding Multi-Agent Org",
        "Multi-Agent System",
        "Simulated Multi-Agent organization with 11 virtual departments. Handed over requirements, coding, and prep to an AI Cyber Company.",
        "index_page/img/portfolio/ui1.jpg",
        "Vibe-Coding, Multi-Agent Framework, Markdown Protocol",
        "2026-03-20 10:00:00",
        """
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.8; color: #333;">
            <h2 style="color: #0056b3; border-bottom: 2px solid #eee; padding-bottom: 10px;">Organization Simulation</h2>
            <p>Independently built a simulated Multi-Agent organization consisting of 11 virtual departments (Product, R&D, QA, HR, Finance, etc.).</p>
            <h3 style="color: #333; margin-top: 20px;">Engineering Value:</h3>
            <ul>
                <li><strong>Architecture:</strong> Each department is equipped with independent Supervisor, Assistant, and Member roles, communicating across departments via a standardized Markdown protocol.</li>
                <li><strong>Solopreneur Automation:</strong> Achieved an extreme "Solopreneur" automated workflow. By establishing strict PRD writing standards and Token cost mechanisms, personal requirements planning, code development, and job preparation are fully delegated to the AI Agent "Cyber Company", vastly boosting individual productivity.</li>
            </ul>
        </div>
        """
    )
]

for proj in projects:
    c.execute("""
    INSERT INTO projects (title, category, summary, cover_image, tech_stack, created_at, content)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    """, proj)

conn.commit()
conn.close()
print("Database seeded!")
