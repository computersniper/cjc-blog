import sqlite3
import datetime

conn = sqlite3.connect("blog.db")
c = conn.cursor()

articles = [
    (
        "Design and analysis of a dynamic programming algorithm to solve the MCS problem",
        "动态规划算法解决最大子段和问题的设计与分析",
        "Algorithm",
        "There are many ways to solve the minimum subarray problem, here we use the idea of dynamic programming to solve it.",
        "解决最小子数组问题的方法有很多，在这里我们使用动态规划的思想来解决。",
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
        """,
        """
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.8; color: #333;">
            <h2 style="color: #0056b3; border-bottom: 2px solid #eee; padding-bottom: 10px;">动态规划算法解决最大子段和问题的设计与分析</h2>
            <div style="width: 100%; text-align: center;">
                <iframe src="blog/read_daa/pa.pdf" width="100%" height="800px" style="border: none; box-shadow: 0 4px 10px rgba(0,0,0,0.1); border-radius: 8px;"></iframe>
            </div>
        </div>
        """
    ),
    (
        "The worst linear time algorithm?",
        "最差的线性时间算法？",
        "Algorithm",
        "Try to write a linear time algorithm to find the kth largest element in an array. But why our linear time algorithm only beats 5 percent of similar algorithms?",
        "尝试编写一个线性时间算法来查找数组中第K大的元素。但是为什么我们的线性时间算法只击败了5%的同类算法？",
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
        </div>
        """,
        """
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.8; color: #333;">
            <p style="font-size: 16px;">今天我们来看一个常见的问题，在数组中找到第K大的元素。并且我们需要在线性时间内解决这个问题。</p>
            <h2 style="color: #0056b3; margin-top: 30px;">问题定义</h2>
            <p><strong>输入:</strong> 一个包含 n 个整数的数组和一个整数 k (1 ≤ k ≤ n)。</p>
            <p><strong>输出:</strong> 数组中第k大的元素。</p>
            <p><strong>例子:</strong> 输入: [3, 2, 1, 5, 6, 4], k = 2 &nbsp;&nbsp; 输出: 5</p>

            <h2 style="color: #0056b3; margin-top: 30px;">解决方法</h2>
            <p style="font-size: 16px;">解决这个问题最常见的算法是快速排序，但由于它需要完全排序，所以时间复杂度是 O(nlogn)。但如果我们只需要找到第K大的元素，我们就不需要对每个子数组进行分区。我们只需要对包含第K大元素的子数组进行分区。通过类似 Quick Select 的思想，时间复杂度可以降低到 O(n)。</p>

            <h2 style="color: #0056b3; margin-top: 30px;">可视化</h2>
            <p>想象一下我们执行快速选择分区逻辑的过程...</p>
            <div style="text-align: center; margin: 20px 0;">
                <img src="blog/kth-largest-element-in-an-array/img/cover.png" alt="Visual" style="max-width: 100%; border-radius: 8px;">
            </div>
        </div>
        """
    ),
    (
        "Building an Android Movie Collection App",
        "构建 Android 电影收藏应用",
        "Software Engineering",
        "A comprehensive movie collection application that enables users to search, favorite, display, and manage movie information with dynamic data loading.",
        "一个全面的电影收藏应用，使用户能够搜索、收藏、展示和管理具有动态数据加载功能的电影信息。采用现代 Android 技术构建。",
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
        </div>
        """,
        """
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.8; color: #333;">
            <h2 style="color: #0056b3; border-bottom: 2px solid #eee; padding-bottom: 10px;">Android 电影收藏应用概述</h2>
            <p>一个全面的电影收藏应用，使用户能够搜索、收藏、展示和管理具有动态数据加载功能的电影信息。</p>
            <h3 style="color: #333; margin-top: 20px;">构建的功能：</h3>
            <ul>
                <li><strong>现代架构:</strong> 使用 MVVM 架构和 Kotlin 协程构建，实现流畅的异步操作。</li>
                <li><strong>动态加载:</strong> 集成 Retrofit 和 Glide 实现无缝 API 调用和图像缓存。</li>
                <li><strong>本地持久化:</strong> 使用 Room 数据库离线安全存储用户收藏的电影。</li>
            </ul>
        </div>
        """
    ),
    (
        "Building LLMs from Scratch: Pretraining, SFT, and RLHF Explained",
        "从0开始构造大模型：Pretraining, SFT 与 RLHF 原理解析",
        "Reinforcement Learning",
        "Using the open-source minimind project as an example, we deeply analyze the three-step strategy of building a large language model from scratch: Pretraining, SFT, and RLHF alignment based on PPO/DPO.",
        "以 GitHub 上的 minimind 开源项目为例，深入解析大模型从无到有的三步走战略：预训练 (Pretraining)、监督微调 (SFT) 以及基于 PPO/DPO 的强化学习对齐。",
        "index_page/img/blogs/rl_cover.png",
        "",
        "2026-04-23 10:00:00",
        """
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.8; color: #333;">
            <h2 style="color: #0056b3; border-bottom: 2px solid #eee; padding-bottom: 10px;">The Three-Step Strategy for Training LLMs</h2>
            <p>This article refers to the minimalist open-source LLM project <a href="https://github.com/jingyaogong/minimind" target="_blank" style="color: #0056b3; text-decoration: none; font-weight: bold;">minimind (🚀🚀 Train a 64M-parameter GPT from scratch in 2h)</a> to outline the core stages of building a large language model. It's not just a reproduction project, but a highly valuable tutorial.</p>

            <h3 style="color: #333; margin-top: 30px;">1. Pretraining</h3>
            <p><strong>Goal:</strong> Teach the model the rules of language and the ability to "predict the next word". However, at this stage, the model only knows how to continue writing and doesn't know how to answer questions.</p>
            <p><strong>Data Format:</strong> Massive amounts of unlabeled plain text. For example:</p>
            <pre style="background: #282c34; color: #abb2bf; padding: 15px; border-radius: 8px; overflow-x: auto;"><code>{"text": "How to overcome procrastination? It's not easy, but the following tips might help."}
{"text": "The morning sun shone through the curtains, and the pages on the desk were gently turned by the wind."}
{"text": "Transformer models context relationships through self-attention mechanisms, which is the foundational structure of modern LLMs."}</code></pre>
            
            <div style="background-color: #f0f7ff; padding: 15px; border-left: 4px solid #0056b3; margin: 20px 0; border-radius: 4px;">
                <h4 style="margin-top: 0; color: #0056b3;">💡 Core Concept: Self-Attention Matrix Calculation</h4>
                <p>The core of Transformer is calculating attention between Tokens. To make it easier to understand, let's reduce the actual embedding dimension (e.g., 768) to <strong>8 dimensions</strong>.</p>
                <p>Assume an input sentence has <strong>12 Tokens</strong>, making the input matrix <code>X</code> shape <code>(12, 8)</code>:</p>
                <ul style="margin-bottom: 0;">
                    <li>Apply linear transformations to get <code>Q, K, V</code> matrices, also shape <code>(12, 8)</code>.</li>
                    <li>Calculate attention scores: <code>Q × K^T</code>. Since <code>Q</code> is <code>(12, 8)</code> and <code>K^T</code> is <code>(8, 12)</code>, the product is a <code>(12, 12)</code> attention matrix. This represents the pairwise correlation between the 12 words.</li>
                    <li>Finally, multiply by the <code>V</code> matrix: <code>(12, 12) × (12, 8) = (12, 8)</code>. The output maintains the original dimensions!</li>
                </ul>
            </div>

            <h3 style="color: #333; margin-top: 30px;">2. SFT (Supervised Fine-Tuning)</h3>
            <p><strong>Core Definition & Goal:</strong> Based on the pretrained model, use high-quality "Instruction-Response Pairs" for supervised training. The goal is <strong>Instruction Following</strong>, transforming the model from a "text completion machine" to a "Q&A assistant".</p>
            <p><strong>Data Format & Construction:</strong> Usually adopts a specific Chat Template, distinguishing between <code>System</code>, <code>User</code>, and <code>Assistant</code> roles. For example:</p>
            <pre style="background: #282c34; color: #abb2bf; padding: 15px; border-radius: 8px; overflow-x: auto;"><code>&lt;|im_start|&gt;user\\nHello&lt;|im_end|&gt;\\n&lt;|im_start|&gt;assistant\\nHello, I am an AI assistant&lt;|im_end|&gt;</code></pre>
            <ul>
                <li><strong>Data Sources:</strong> Human annotation, open-source instruction sets (e.g., Alpaca), model distillation (using GPT-4 to teach smaller models).</li>
                <li><strong>Key Point: Quality over Quantity.</strong> A few tens of thousands of high-quality, diverse SFT data points often perform better than millions of low-quality data points.</li>
                <li><strong>Training Details & Loss Calculation:</strong> When calculating Cross-Entropy Loss, <strong>only compute Loss for the Assistant's response</strong>. The User's prompt and System Prompt are Masked (Loss weight set to 0) because we want the model to learn "how to answer", not predict "what the user will ask".</li>
            </ul>

            <h3 style="color: #333; margin-top: 30px;">3. RLHF Alignment & PPO (Proximal Policy Optimization)</h3>
            <p><strong>Why RLHF?</strong> SFT is "imitation learning" and has two main issues: 1. <strong>Exposure Bias</strong> (training sees perfect answers, but one mistake in inference leads to cascading errors); 2. <strong>Inability to distinguish degrees of quality</strong> (it only tells the model the answer is right, but not that answer A is more polite than answer B).</p>
            
            <h4 style="color: #555;">RLHF Standard Three Steps:</h4>
            <ol>
                <li><strong>SFT:</strong> Obtain the initial Actor model.</li>
                <li><strong>Train Reward Model (RM):</strong> Given the same Prompt, generate multiple answers, have human annotators rank them, and train the RM to score answers.</li>
                <li><strong>Optimize Actor Model with PPO:</strong> Actor generates answer -> RM scores it -> Update Actor parameters using PPO, encouraging higher-scoring answers.</li>
            </ol>

            <h4 style="color: #555;">PPO Core Concepts</h4>
            <p>PPO is the most mainstream RL algorithm in RLHF. The core idea is: <strong>steady updates, preventing overly large steps that break the policy.</strong> Four models exist simultaneously during training: <code>Actor</code> (the LLM to be trained), <code>Reference</code> (frozen SFT model), <code>Reward Model</code> (frozen scoring model), and <code>Critic Model</code> (predicts expected reward).</p>
            <ul>
                <li><strong>KL Penalty:</strong> Prevents the Actor from hacking the reward. Output can get high scores, but its distribution <strong>must not deviate too far from the Reference</strong>; it must still output coherent text.</li>
                <li><strong>PPO-Clip:</strong> The soul of PPO. Limits the parameter change magnitude in each Actor update to prevent policy collapse from excessively large single updates.</li>
                <li><strong>Advantage Function (GAE):</strong> Looks not only at the current score but also how much higher it is than the Critic's "expected score". Positive updates are given only when exceeding expectations.</li>
            </ul>

            <div style="background-color: #fff3cd; padding: 15px; border-left: 4px solid #ffecb5; margin: 20px 0; border-radius: 4px;">
                <h4 style="margin-top: 0; color: #856404;">⭐ Addendum: DPO (Direct Preference Optimization)</h4>
                <p style="margin-bottom: 0;">Because PPO is highly complex and extremely VRAM-intensive, academia proposed DPO. It removes the RM entirely, cleverly integrating preference learning directly into the cross-entropy loss, becoming the mainstream lightweight alternative to PPO.</p>
            </div>
        </div>
        """,
        """
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.8; color: #333;">
            <h2 style="color: #0056b3; border-bottom: 2px solid #eee; padding-bottom: 10px;">大模型的三步走训练战略</h2>
            <p>本文将参考极简大模型开源项目 <a href="https://github.com/jingyaogong/minimind" target="_blank" style="color: #0056b3; text-decoration: none; font-weight: bold;">minimind (🚀🚀 「大模型」2小时完全从0训练64M的小参数GPT)</a>，为大家梳理构建大模型最核心的三个阶段。它不仅是一个极简结构的大模型全阶段开源复现项目，更是一套极具价值的教程。</p>

            <h3 style="color: #333; margin-top: 30px;">一、预训练 (Pretraining)</h3>
            <p><strong>目标：</strong>让模型学会语言的规律，掌握“文字接龙”的能力。但此时的模型只会无脑续写，并不懂得回答问题。</p>
            <p><strong>数据形式：</strong>海量的无标签纯文本。例如：</p>
            <pre style="background: #282c34; color: #abb2bf; padding: 15px; border-radius: 8px; overflow-x: auto;"><code>{"text": "如何才能摆脱拖延症？治愈拖延症并不容易，但以下建议可能有所帮助。"}
{"text": "清晨的阳光透过窗帘洒进房间，桌上的书页被风轻轻翻动。"}
{"text": "Transformer 通过自注意力机制建模上下文关系，是现代大语言模型的重要基础结构。"}</code></pre>
            
            <div style="background-color: #f0f7ff; padding: 15px; border-left: 4px solid #0056b3; margin: 20px 0; border-radius: 4px;">
                <h4 style="margin-top: 0; color: #0056b3;">💡 核心补充：自注意力 (Self-Attention) 的矩阵计算</h4>
                <p>Transformer 的核心是计算 Token 之间的注意力。为了方便理解，我们将真实的词向量维度（如 768 维）缩小到 <strong>8 维</strong>。</p>
                <p>假设输入一句话包含 <strong>12 个 Token</strong>，输入矩阵 <code>X</code> 的形状为 <code>(12, 8)</code>：</p>
                <ul style="margin-bottom: 0;">
                    <li>通过线性变换得到 <code>Q, K, V</code> 矩阵，形状同样为 <code>(12, 8)</code>。</li>
                    <li>计算注意力分数：<code>Q × K^T</code>。其中 <code>Q</code> 是 <code>(12, 8)</code>，<code>K^T</code> 是 <code>(8, 12)</code>，相乘得到 <code>(12, 12)</code> 的注意力矩阵。这代表了 12 个词中两两之间的关联度。</li>
                    <li>最后乘上 <code>V</code> 矩阵：<code>(12, 12) × (12, 8) = (12, 8)</code>，输出依然保持原维度！</li>
                </ul>
            </div>

            <h3 style="color: #333; margin-top: 30px;">二、SFT (Supervised Fine-Tuning) 监督微调</h3>
            <p><strong>核心定义与目标：</strong>在预训练模型的基础上，使用高质量的“指令-回复”对（Instruction-Response Pairs）进行有监督的训练。完成<strong>指令遵循（Instruction Following）</strong>，让模型从“文本补全机”转变为“问答助手”。</p>
            <p><strong>数据格式与构造：</strong>通常采用特定的对话模板（Chat Template），区分 <code>System</code>、<code>User</code> 和 <code>Assistant</code> 角色。例如：</p>
            <pre style="background: #282c34; color: #abb2bf; padding: 15px; border-radius: 8px; overflow-x: auto;"><code>&lt;|im_start|&gt;user\\n你好&lt;|im_end|&gt;\\n&lt;|im_start|&gt;assistant\\n你好，我是AI助手&lt;|im_end|&gt;</code></pre>
            <ul>
                <li><strong>数据来源：</strong>人工标注、开源指令集（如 Alpaca）、模型蒸馏（用 GPT-4 生成回复教小模型）。</li>
                <li><strong>关键点：质量重于数量。</strong>几万条高质量、多样化的 SFT 数据，往往比百万条低质量数据效果更好。</li>
                <li><strong>训练细节与 Loss 计算：</strong>在计算交叉熵损失（Cross-Entropy Loss）时，<strong>只对 Assistant 的回复部分计算 Loss</strong>，而对 User 的提问和 System Prompt 进行 Mask（Loss 权重设为 0）。因为我们希望模型学习“如何回答”，而不是去预测“用户会问什么”。</li>
            </ul>

            <h3 style="color: #333; margin-top: 30px;">三、RLHF 强化学习对齐与 PPO (Proximal Policy Optimization)</h3>
            <p><strong>为什么需要 RLHF？</strong>SFT 是“模仿学习”，存在两个问题：一是<strong>暴露偏差</strong>（训练看完美答案，推理一旦出错就步步错）；二是<strong>无法区分好坏程度</strong>（只能告诉模型答案是对的，无法告诉模型 A 比 B 更礼貌）。</p>
            
            <h4 style="color: #555;">RLHF 标准三步走：</h4>
            <ol>
                <li><strong>SFT：</strong>得到初始的 Actor 模型。</li>
                <li><strong>训练奖励模型 (Reward Model, RM)：</strong>给定同一个 Prompt，让模型生成多个回答，人类标注排序，训练 RM 学习给回答打分。</li>
                <li><strong>PPO 优化 Actor 模型：</strong>Actor 生成回答 -> RM 打分 -> 使用 PPO 算法更新 Actor 参数，使其倾向于生成高分回答。</li>
            </ol>

            <h4 style="color: #555;">PPO 核心详解</h4>
            <p>PPO 是 RLHF 中最主流的强化学习算法。核心思想是：<strong>稳步更新，防止步子迈得太大扯到蛋。</strong>训练中同时存在 4 个模型：<code>Actor</code> (要训练的大模型)、<code>Reference</code> (冻结的 SFT 模型)、<code>Reward Model</code> (冻结的打分模型)、<code>Critic Model</code> (预测预期奖励)。</p>
            <ul>
                <li><strong>KL 散度惩罚 (KL Penalty)：</strong>防止 Actor 钻空子骗分（Reward Hacking）。你的输出可以拿高分，但分布<strong>不能偏离 Reference 太远</strong>，必须得说“人话”。</li>
                <li><strong>近端裁剪 (PPO-Clip)：</strong>PPO 的灵魂。限制 Actor 每次更新的参数变化幅度，防止单次更新幅度过大导致策略崩坏。</li>
                <li><strong>优势函数 (Advantage Function, GAE)：</strong>不仅看当前拿了多少分，还要看比 Critic 预测的“预期分数”高出多少，高出预期才正向更新。</li>
            </ul>

            <div style="background-color: #fff3cd; padding: 15px; border-left: 4px solid #ffecb5; margin: 20px 0; border-radius: 4px;">
                <h4 style="margin-top: 0; color: #856404;">⭐ 补充：DPO (Direct Preference Optimization)</h4>
                <p style="margin-bottom: 0;">由于 PPO 极其复杂且极度吃显存，学术界提出了 DPO。它直接去掉了 RM 模型，将偏好学习巧妙融入到交叉熵损失中，成为了目前轻量级训练平替 PPO 的主流方案。</p>
            </div>
        </div>
        """
    )
]

c.execute("DROP TABLE IF EXISTS articles")
c.execute("DROP TABLE IF EXISTS projects")

c.execute("""
CREATE TABLE articles (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(255),
    title_zh VARCHAR(255),
    category VARCHAR(100),
    summary TEXT,
    summary_zh TEXT,
    content TEXT,
    content_zh TEXT,
    cover_image VARCHAR(255),
    created_at DATETIME,
    read_url VARCHAR(255)
)
""")

c.execute("""
CREATE TABLE projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title VARCHAR(255),
    title_zh VARCHAR(255),
    category VARCHAR(100),
    summary TEXT,
    summary_zh TEXT,
    content TEXT,
    content_zh TEXT,
    cover_image VARCHAR(255),
    tech_stack VARCHAR(255),
    created_at DATETIME
)
""")

for art in articles:
    c.execute("""
    INSERT INTO articles (title, title_zh, category, summary, summary_zh, cover_image, read_url, created_at, content, content_zh)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, art)

projects = [
    (
        "MathTasks Intelligent Production Platform",
        "MathTasks 智能生产平台",
        "Web & AI",
        "5-role full-link collaboration based on FSM & RBAC, solving concurrent routing conflicts. Built a 30+ field question bank model.",
        "基于 FSM & RBAC 的 5 角色全链路协作，解决并发路由冲突。构建了 30+ 字段的题库模型。",
        "work/work1/cover.png",
        "Python, FastAPI, Next.js, PostgreSQL, Playwright",
        "2026-01-10 10:00:00",
        """<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.8; color: #333;"><h2>Project Overview</h2></div>""",
        """<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.8; color: #333;"><h2>项目概述</h2></div>"""
    ),
    (
        "Enterprise LLM Unified Gateway & API Management",
        "企业级 LLM 统一网关与 API 管理",
        "Backend & Infrastructure",
        "Unified access to 8+ vendors and 20+ models. Configured multi-key load balancing and Failover.",
        "统一接入 8+ 厂商和 20+ 模型。配置多 Key 负载均衡和 Failover。",
        "work/work2/1.png",
        "Python, LiteLLM, Docker, PostgreSQL, Redis",
        "2026-02-10 10:00:00",
        """<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.8; color: #333;"><h2>System Architecture</h2></div>""",
        """<div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.8; color: #333;"><h2>系统架构</h2></div>"""
    )
]

for proj in projects:
    c.execute("""
    INSERT INTO projects (title, title_zh, category, summary, summary_zh, cover_image, tech_stack, created_at, content, content_zh)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, proj)

conn.commit()
conn.close()
print("Database seeded!")
