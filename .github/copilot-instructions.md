**项目概览**

这是一个包含移动端示例、Expo demo 与后端的多包示例仓库：
- `live-anchor-app/`：React Native (TypeScript) 主体代码（`src/` 下包含 `api/`, `services/`, `store/`, `navigation/` 等）。
- `live-anchor-expo/`：基于 Expo 的可运行演示（`App.js` 为快速本地预览与交互）。
- `live-backend/`：NestJS 后端，实现用于 Demo 的 REST 接口与测试脚本。
- `live-web-demo/`：浏览器端静态 demo。

**大局与数据流（重要）**

- 前端通过 `live-anchor-app/src/api/http.ts` 的 `axios` 实例与后端通信，`baseURL` 来自 `src/config/trtcConfig.ts`（请修改 `API_BASE_URL` 指向你的后端）。
- 所有 HTTP 请求通过 `http.interceptors.request` 注入 `Authorization: Bearer <token>`，该 `token` 来自 `useUserStore`（`src/store/userStore.ts`）。因此任何修改授权逻辑要同时更新 `userStore` 与 `http.ts`。
- 主流程：前端调用后台初始化接口（`POST /live/anchor/init`）获取 `sdkAppId, userId, userSig, roomId`（参见 `liveBootstrap.initAnchorLiveEnv` 中的 `AnchorInitResponse` 类型），然后调用 `trtcService.enterRoom` 完成 TRTC 初始化/进房。
- TRTC 集成点在 `src/services/trtcService.ts`（目前多处 TODO）。所有与腾讯云 TRTC SDK 的直接交互应集中在此文件，以便后续替换/mock。

**关键文件与示例**

- API 和 Auth：
  - `live-anchor-app/src/api/http.ts` — axios 实例与 token 注入
  - `live-anchor-app/src/api/authApi.ts` — `AuthApi.loginByPhone(phone, code)` -> `POST /auth/login`
  - `live-anchor-app/src/api/liveApi.ts` — room 创建/开始/停止、获取 `userSig` 等
- TRTC / 启动流程：
  - `live-anchor-app/src/services/trtcService.ts` — SDK 封装层（入口点：`enterRoom`, `startLocalPreview` 等）
  - `live-anchor-app/src/services/liveBootstrap.ts` — `initAnchorLiveEnv()`：调用后端 `/live/anchor/init`，随后调用 `trtcService.enterRoom`
- 状态管理：
  - `live-anchor-app/src/store/userStore.ts`（Zustand） — 保持 `userId` / `token`
  - `live-anchor-app/src/store/liveStore.ts` — 房间信息与计数
- 导航：
  - `live-anchor-app/src/navigation/AppNavigator.tsx` — 路由表：`Login`, `Prelive`, `LiveRoom`, `EndSummary`

**后端约定（前端依赖的端点）**

- `POST /auth/login`  body: `{ phone, code }`，返回 token（前端存入 `userStore`）。
- `POST /live/anchor/init` 返回 `AnchorInitResponse`，至少包含 `{ sdkAppId, userId, userSig, roomId }`。
- 直播操作：`POST /live/create`, `POST /live/:roomId/start`, `POST /live/:roomId/stop`。
- `GET /trtc/userSig?userId=...` 用于服务端签发/代理 userSig（前端调用 `LiveApi.getUserSig`）。

**运行与调试**

- 后端（`live-backend/`）：使用 NestJS 脚本
  - 开发：`cd live-backend && npm run start:dev`（默认监听 3000，或通过 `PORT` 覆盖）
  - 构建：`npm run build`; 生产：`npm run start:prod`
  - 测试：`npm run test` / `npm run test:e2e`
- 移动 Demo（Expo，`live-anchor-expo/`）：
  - 本地运行：`cd live-anchor-expo && npm install && npm start`，或 `npm run android` / `npm run ios`。
  - `live-anchor-app/` 没有脚本声明（仅包含源码与依赖），用于与 `live-backend` / `trtcService` 集成的核心实现。

**工程约定 / 注意事项（对 AI 代理很重要）**

- 不要在任意文件直接写入 TRTC 凭证或私钥。SDK AppID 放在 `src/config/trtcConfig.ts`（示例为占位符），userSig 由后端签发/代理。
- 所有后端交互假设 axios 返回结构为 `{ data: ... }`，前端通常使用 `res.data`。修改 API 层时请保持一致。
- 将与平台/原生相关的实现（摄像头视图、推流）集中在 `trtcService.ts`，以便在不同运行时（Expo / 纯 RN / 真机）下替换实现。
- 状态读取在拦截器中通过 `useUserStore.getState().token`，直接从钩子调用 `getState()` 是预期模式（避免组件钩子依赖于拦截器逻辑）。

**当你需要修改或扩展时的具体建议**

- 新增后端字段：同时更新 `liveBootstrap.AnchorInitResponse`、后端接口返回规范及前端使用位置（例如 `trtcService.enterRoom`）。
- 添加新的 API 路径：修改 `live-anchor-app/src/api/*`，并在 `http.ts` 中确保 baseURL/超时/拦截器策略正确。
- 实现 TRTC SDK：在 `trtcService.ts` 中实现 `enterRoom`, `startLocalPreview` 等；先用注入式 mock 实现单元测试。

**限制与未覆盖项（agent 不应假设）**

- TRTC SDK 的实际 RN API 未在仓库中实现（文件里有 TODO）。请勿假设函数签名，参考腾讯云官方 SDK 文档并把实现限定在 `trtcService.ts`。
- 后端业务逻辑（鉴权、房间生命周期）可能在 demo 中较简化，生产迁移时需与后端团队确认契约。

**快速参考路径列表**

- `live-anchor-app/src/api/http.ts`
- `live-anchor-app/src/api/authApi.ts`
- `live-anchor-app/src/api/liveApi.ts`
- `live-anchor-app/src/services/trtcService.ts`
- `live-anchor-app/src/services/liveBootstrap.ts`
- `live-anchor-app/src/config/trtcConfig.ts`
- `live-anchor-app/src/store/*.ts`
- `live-anchor-expo/App.js`（快速运行 demo）
- `live-backend/`（NestJS 服务与脚本）

请告诉我：是否需要把这份说明拆成针对 **前端开发者** 与 **后端开发者** 的两个更详细版？或者需要我把 `trtcService` 的实现骨架（mockable）写在仓库中以便本地调试？
