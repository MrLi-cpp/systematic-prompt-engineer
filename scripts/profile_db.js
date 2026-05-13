#!/usr/bin/env node
/**
 * Profile Database — 本地画像存储
 * 纯 JSON 文件，零依赖，Agent 可直接 read/write
 * 存放位置：~/.kimi_openclaw/workspace/memory/profiles.json
 */

const fs = require('fs');
const path = require('path');

const DB_DIR = path.join(process.env.HOME || '/tmp', '.kimi_openclaw/workspace/memory');
const DB_PATH = path.join(DB_DIR, 'profiles.json');

function ensureDB() {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }
  if (!fs.existsSync(DB_PATH)) {
    fs.writeFileSync(DB_PATH, JSON.stringify({ profiles: [], version: '1.0' }, null, 2));
  }
}

function loadDB() {
  ensureDB();
  try {
    return JSON.parse(fs.readFileSync(DB_PATH, 'utf8'));
  } catch (e) {
    return { profiles: [], version: '1.0' };
  }
}

function saveDB(db) {
  ensureDB();
  fs.writeFileSync(DB_PATH, JSON.stringify(db, null, 2));
}

// ========== API ==========

/**
 * 列出所有历史画像
 */
function listProfiles() {
  const db = loadDB();
  return db.profiles.map(p => ({
    topic: p.topic,
    depth: p.depth,
    persona: p.persona,
    updated_at: p.updated_at,
    status: p.status || 'draft'
  }));
}

/**
 * 读取指定 topic 的最新画像（精确匹配）
 */
function getProfile(topic) {
  const db = loadDB();
  return db.profiles.find(p => p.topic === topic) || null;
}

/**
 * 读取最近更新的画像（不知道 topic 时用）
 */
function getLastProfile() {
  const db = loadDB();
  if (db.profiles.length === 0) return null;
  return db.profiles.sort((a, b) =>
    new Date(b.updated_at) - new Date(a.updated_at)
  )[0];
}

/**
 * 模糊匹配 topic（支持子串匹配和大小写不敏感）
 */
function findRelatedProfiles(topic) {
  const db = loadDB();
  const t = topic.toLowerCase();
  return db.profiles.filter(p =>
    p.topic.toLowerCase().includes(t) ||
    t.includes(p.topic.toLowerCase())
  );
}

/**
 * 保存/更新画像
 */
function saveProfile(profile) {
  const db = loadDB();
  const idx = db.profiles.findIndex(p => p.topic === profile.topic);
  const now = new Date().toISOString();

  if (idx >= 0) {
    // 更新现有画像
    db.profiles[idx] = {
      ...db.profiles[idx],
      ...profile,
      updated_at: now,
      version: (db.profiles[idx].version || 1) + 1
    };
  } else {
    // 新建画像
    db.profiles.push({
      ...profile,
      created_at: now,
      updated_at: now,
      version: 1
    });
  }
  saveDB(db);
}

/**
 * 添加对话记录到画像
 */
function appendConversation(topic, turn) {
  const db = loadDB();
  const p = db.profiles.find(p => p.topic === topic);
  if (!p) return;
  if (!p.conversation_history) p.conversation_history = [];
  p.conversation_history.push({
    ...turn,
    timestamp: new Date().toISOString()
  });
  p.updated_at = new Date().toISOString();
  saveDB(db);
}

// ========== CLI ==========

function main() {
  const [cmd, ...args] = process.argv.slice(2);

  switch (cmd) {
    case 'list':
      console.log(JSON.stringify(listProfiles(), null, 2));
      break;
    case 'get':
      console.log(JSON.stringify(getProfile(args[0]) || null, null, 2));
      break;
    case 'last':
      console.log(JSON.stringify(getLastProfile() || null, null, 2));
      break;
    case 'related':
      console.log(JSON.stringify(findRelatedProfiles(args[0] || ''), null, 2));
      break;
    case 'save':
      try {
        const profile = JSON.parse(args.slice(1).join(' '));
        saveProfile(profile);
        console.log(JSON.stringify({ ok: true }, null, 2));
      } catch (e) {
        console.log(JSON.stringify({ ok: false, error: e.message }, null, 2));
      }
      break;
    default:
      console.log('Usage: node profile_db.js [list|get <topic>|last|related <topic>|save <json>]');
  }
}

if (require.main === module) {
  main();
}

// 导出 API 供其他脚本使用
module.exports = {
  listProfiles,
  getProfile,
  getLastProfile,
  findRelatedProfiles,
  saveProfile,
  appendConversation
};
