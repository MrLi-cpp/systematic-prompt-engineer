# 示例：加载历史画像继续对话

## 场景设定

用户之前已经创建过 "Mamba" 的画像，现在想学习相关的 "Vision Mamba"。AI 检测到历史画像，进入 RESUMING 状态。

---

## 第 1 轮：触发词 + 历史画像检测

**用户输入：**
> 给我写一份关于 Vision Mamba 的提示词

**AI 处理：**
- 触发模式匹配："给我写一份...提示词" ✅
- 提取 topic："Vision Mamba"
- 读取画像数据库（profiles.json）
- 检测到相关画像："Mamba"（Vision Mamba 包含 "Mamba"）

**AI 输出：**

```
[画像继承 · RESUMING 状态]

检测到历史画像记录！

我在 2026-05-10 记录过你对 "Mamba" 的画像：
┌─────────────────────────────────────────┐
│ 核心主题：Mamba（Selective State Space）│
│ 目标深度：L2（原理分析 + 伪代码）       │
│ 你的背景：已深入 Transformer，RNN 基础   │
│ 你的身份：研一学生，科研导向             │
│ 学习目的：写调研报告                     │
│ 输出格式：Markdown（给 Kimi 执行）      │
│ 代码需求：伪代码即可，不跑代码           │
│ 约束条件：聚焦原始论文，变体简要提及     │
└─────────────────────────────────────────┘

这次你要学习 "Vision Mamba"，与之前主题高度相关。

我可以自动继承的维度（无需重复追问）：
✅ 你的身份：研一学生，科研导向
✅ 知识背景：已深入 Transformer，RNN 基础
✅ 输出格式：Markdown
✅ 代码偏好：伪代码即可

需要确认的主题特定维度：
❓ 目标深度：还是 L2 吗？Vision Mamba 涉及视觉任务，是否需要增加代码实现维度？
❓ 学习目的：还是调研报告吗？还是准备复现实验？

请选择：
1. 全部沿用（直接基于旧画像生成 Vision Mamba 提示词）
2. 修改某些维度（告诉我哪些变了）
3. 新建画像（完全不相关，从头开始）
```

---

## 第 2 轮：用户选择继承 + 微调

**用户输入：**
> 沿用大部分，深度升到 L3 吧，我想跑代码。调研报告还是要的。

**AI 处理：**
- 用户选择：继承 + 修改
- 更新画像：
  - topic: "Vision Mamba"（新 topic）
  - depth: L3（从 L2 升级）
  - persona/background/format/stack: 继承旧值
  - learning_goal: "research"（不变）
  - constraints: 新增"需要可运行代码"

**画像变更摘要：**
```
变更项：
- topic: "Mamba" → "Vision Mamba"
- depth: L2 → L3（增加代码实现维度）
- 代码需求: 伪代码 → 可运行 PyTorch 代码

继承项：
- persona: 研一学生，科研导向
- background: 已深入 Transformer，RNN 基础
- format: Markdown
- goal: 调研报告
```

**AI 输出：**

```
[画像继承确认 · 第 2 轮]

已基于历史画像生成新画像（Vision Mamba）：

┌─────────────────────────────────────────┐
│ 核心主题：Vision Mamba                   │
│ 目标深度：L3（代码实现 + 原理分析）     │
│ 你的背景：已深入 Transformer，RNN 基础   │
│ 你的身份：研一学生，科研导向             │
│ 学习目的：调研报告（需要可运行代码）     │
│ 输出格式：Markdown（给 Kimi 执行）      │
│ 代码需求：可运行的 PyTorch 代码          │
│ 继承来源：2026-05-10 的 "Mamba" 画像   │
└─────────────────────────────────────────┘

画像已自动保存到 profiles.json。

如果确认无误，以下是基于该画像生成的 Vision Mamba 体系化提示词：

[直接输出提示词]
```

---

## 第 3 轮：用户反馈 + 自动保存

**用户输入：**
> 不错，但代码部分能不能用 Hugging Face 的库，我不想从头写

**AI 处理：**
- 用户提出修改意见 → REFINING 状态
- 更新 constraints：anti 列表加入"从头实现"，explicit 加入"使用 Hugging Face transformers"
- 自动保存到 profiles.json

**AI 输出：**

```
[迭代精修 · REFINING 状态]

已记录你的反馈：
- 代码部分使用 Hugging Face transformers 库
- 不从头实现，基于现有库演示

画像已更新并保存。

以下是修改后的提示词：

[输出修改后的提示词]
```

---

## 对比：有画像 vs 无画像

### 无画像时（第一次学 Mamba）

```
用户：给我写一份 Mamba 的提示词
AI：[画像构建 · 第 1 轮] 我需要确认...
     1. 你之前学过 Transformer 吗？
     2. 你是学生还是工程师？
     3. 输出格式要什么？
用户：回答了 3 个问题
AI：[画像构建 · 第 2 轮] 还有 2 个问题...
     1. 需要跑代码吗？
     2. 聚焦原始论文还是变体？
用户：回答了 2 个问题
AI：[画像确认] → 输出提示词
总计：3 轮对话，5 个问题
```

### 有画像时（第二次学 Vision Mamba）

```
用户：给我写一份 Vision Mamba 的提示词
AI：[画像继承 · RESUMING] 检测到 "Mamba" 的历史画像...
     我可以继承身份/背景/格式，需要确认深度和目的
用户：沿用，深度升到 L3
AI：[画像确认] → 输出提示词
总计：2 轮对话，1 个确认问题
```

**效率提升**：有画像时，追问数量从 5 个减少到 1-2 个，对话轮次从 3 轮减少到 2 轮。

---

## 数据库结构示例

```json
{
  "profiles": [
    {
      "topic": "Mamba",
      "depth": "L2",
      "persona": "研一学生，科研导向",
      "background": "已深入 Transformer，RNN 基础",
      "learning_goal": "research",
      "stack": "Python/PyTorch",
      "output_format": "markdown",
      "constraints": {
        "explicit": ["聚焦原始论文", "伪代码即可"],
        "anti": ["不跑代码"]
      },
      "conversation_history": [...],
      "confidence_score": 0.9,
      "status": "finalized",
      "created_at": "2026-05-10T14:00:00Z",
      "updated_at": "2026-05-10T15:30:00Z",
      "version": 2
    },
    {
      "topic": "Vision Mamba",
      "depth": "L3",
      "persona": "研一学生，科研导向",
      "background": "已深入 Transformer，RNN 基础",
      "learning_goal": "research",
      "stack": "Python/PyTorch/HuggingFace",
      "output_format": "markdown",
      "constraints": {
        "explicit": ["使用 Hugging Face", "可运行代码"],
        "anti": ["从头实现"]
      },
      "parent_topic": "Mamba",
      "conversation_history": [...],
      "confidence_score": 0.95,
      "status": "finalized",
      "created_at": "2026-05-13T10:00:00Z",
      "updated_at": "2026-05-13T10:15:00Z",
      "version": 1
    }
  ]
}
```
