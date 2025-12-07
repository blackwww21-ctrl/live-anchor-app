# 📱 Live Anchor App

这是一个基于Expo的直播应用项目，支持Android APK自动构建。

## 🚀 功能特性

- 🎥 **实时直播**: 支持推流和观看
- 💬 **实时聊天**: 观众互动聊天功能
- 🎁 **礼物系统**: 虚拟礼物打赏
- 📱 **跨平台**: 支持Android和iOS
- 🎨 **现代UI**: 美观的用户界面

## 🤖 自动构建

项目配置了GitHub Actions，自动构建Android APK：

### 构建状态
[![Build Android APK](https://github.com/yangyang/live-anchor-app/actions/workflows/local-android-build.yml/badge.svg)](https://github.com/yangyang/live-anchor-app/actions)

### 下载APK
1. 访问 [Releases](https://github.com/yangyang/live-anchor-app/releases) 页面
2. 下载最新的 `app-debug.apk`
3. 在Android设备上安装

## 📋 技术栈

- **框架**: React Native 0.81.5 + Expo 54
- **语言**: JavaScript/TypeScript
- **状态管理**: Zustand
- **导航**: React Navigation
- **音视频**: Agora RTC
- **存储**: AsyncStorage

## 🛠️ 本地开发

```bash
# 克隆仓库
git clone https://github.com/yangyang/live-anchor-app.git
cd live-anchor-app

# 安装依赖
npm install --legacy-peer-deps

# 启动开发服务器
npx expo start
```

## 📱 应用截图

*应用截图将在APK构建后添加*

## 🔧 构建配置

- **最低版本**: Android 7.0 (API 24)
- **目标版本**: Android 14 (API 36)
- **架构**: ARM64, ARM, x86, x86_64
- **签名**: Debug keystore

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 👥 贡献

欢迎提交Issue和Pull Request！

---

🤖 **由GitHub Actions自动构建** ✨