# Systematic Prompt Engineer

一个可复用的 AI Skill，用于将用户的口语化、碎片化技术学习需求，转化为可直接交付执行的体系化提示词（Master Prompt）。

## 核心理念

用户通常不知道"好提示词"应该长什么样。他们只会说：

> "我想学 Mamba，要深入一点，有代码和数学"

这个 Skill 的作用就是**把这句话翻译成一份结构严谨、维度完整、可直接给另一个 AI 执行的 Master Prompt**。

## 使用方法

### 在 Kimi 中使用

1. 新建一个对话
2. 将 `skill/system-prompt.md` 的内容粘贴到**系统提示词**（或作为第一条消息发送）
3. 然后直接输入你的口语化需求，例如：

   > "我想学 Vision Mamba，要代码和对比 Transformer，做成文档"

4. AI 会自动输出一份体系化提示词，你可以直接复制给另一个 AI 生成最终文档

### 在 ChatGPT / Claude 中使用

- 使用 **Custom GPTs** / **Projects** 功能，将 `system-prompt.md` 设为 System Instruction
- 用户输入口语化需求后，AI 自动输出结构化提示词

### 在 OpenClaw 中使用

将 `skill/system-prompt.md` 作为 Skill 的系统提示词配置，Agent 即可自动执行需求解析 → 框架构建 → 输出生成。

## 项目结构

```
systematic-prompt-engineer/
├── README.md                      # 项目说明 + 使用指南
├── skill/
│   ├── system-prompt.md           # 核心技能文件（给 AI 看的系统提示词）
│   └── framework-schema.md        # 维度框架库（可扩展的模板字典）
├── examples/
│   ├── mamba-deep-learning.md     # Mamba 需求的输入→输出示例
│   └── react-hooks-learning.md    # React Hooks 示例（前端方向）
└── .github/
    └── ISSUE_TEMPLATE/
        └── prompt-request.md      # 社区贡献模板（可选）
```

## 设计原则

1. **追问优于猜测**：信息不足时先追问，不瞎编
2. **维度动态组合**：不是所有主题都需要所有维度，根据 DEPTH 和主题智能选取
3. **输出即执行**：生成的提示词必须能被直接复制使用，无需二次修改
4. **技术准确性**：禁止编造论文、数据、模型名称

## 维度库（D1-D8）

| 维度 | 名称 | 说明 | 深度要求 |
|------|------|------|----------|
| D1 | 起源与痛点 | 为什么需要这个技术 | 必选 |
| D2 | 核心机制 | 技术如何工作 | 必选 |
| D3 | 数学直觉 | 公式背后的直觉 | L2+ |
| D4 | 架构对比 | 与相关技术全维度对比 | 必选 |
| D5 | 生态与应用 | 开源实现与工业应用 | L2+ |
| D6 | 代码级解析 | 伪代码与实现细节 | L3+ |
| D7 | 知识网络 | Mermaid 演化树与关系图 | L2+ |
| D8 | 输出格式约束 | Markdown/LaTeX/代码规范 | 必选 |

扩展维度（按领域）：前端(D9/D10)、数据库(D9/D10)、硬件(D9/D10)

## 深度等级

| 等级 | 名称 | 内容 |
|------|------|------|
| L1 | 概念理解 | 是什么、为什么、适用场景 |
| L2 | 原理分析 | 数学推导 + 对比分析 + 知识网络 |
| L3 | 代码实现 | 伪代码/实现 + 工程细节 + 性能对比 |
| L4 | 工程部署 | 上线配置 + 生产优化 + 监控运维 |

## 示例

### Mamba 深度学习（L3）

输入：
> "我需要深入学习 Mamba 架构。我不满足于浅层的介绍，我希望构建一个完整的知识体系。请你为我撰写一份 'Mamba 深度学习提示词'。"

输出：包含 D1-D8 全部维度 + D6 代码级 PyTorch 伪代码 + D7 Mermaid 知识图谱 + D4 Big-O 对比表的完整 Master Prompt。

详见 [examples/mamba-deep-learning.md](examples/mamba-deep-learning.md)

### React Hooks（L3）

输入：
> "我想系统学习 React Hooks，深入理解 useEffect 的闭包陷阱、useMemo 的依赖项管理，以及自定义 Hooks 的设计模式。"

输出：包含 D1-D8 + D9 API 设计模式 + D10 工程化实践的完整 Master Prompt。

详见 [examples/react-hooks-learning.md](examples/react-hooks-learning.md)

## 贡献

如果你有好的需求→输出示例，欢迎提交 PR 或 Issue！

使用 [ISSUE_TEMPLATE](.github/ISSUE_TEMPLATE/prompt-request.md) 提交你的口语化需求，社区可以帮你生成体系化提示词。

## 许可证

MIT
