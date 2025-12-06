import { useUserStore } from '../store/userStore';
import { agoraService } from './agoraService'; // 注意：这里还是用 trtcService 文件名，但内容已经是 agoraService
import http from '../api/http';

export type AnchorInitResponse = {
  roomId: string;
  agoraChannel: string;
  userId: string;
  token: string;
  appId: string;
  channelName: string;
  uid: number;
};

export async function initAnchorLiveEnv(): Promise<AnchorInitResponse> {
  // 使用固定的频道名和临时令牌
  const fixedChannelName = 'yyyang';
  const temporaryToken = '007eJxTYAjTDLtWubazpkZCqIv3X8GLrPd5V2Zd/7v5XfDv51yJrdEKDImGKUaGJmamhiaWRiZJyYZJxkmmZsZmZgYWhonmpsZGE3caZzYEMjIcP+vJysgAgSA+G0NlZWViXjoDAwD5wSGp=';

  const agoraData: AnchorInitResponse = {
    roomId: '1',
    agoraChannel: fixedChannelName,
    userId: '1',
    token: temporaryToken,
    appId: 'a1d2146514924bc1b3b56366081a7532', // 替换为用户提供的App ID
    channelName: fixedChannelName,
    uid: 1
  };

  // 初始化 Agora，加入频道
  await agoraService.joinRoom({
    token: agoraData.token,
    channel: agoraData.agoraChannel,
    uid: agoraData.userId,
  });

  return agoraData;
}