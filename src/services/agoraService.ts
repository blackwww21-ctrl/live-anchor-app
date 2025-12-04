import { AGORA_CONFIG } from '../config/agoraConfig';
import { RtcEngineContext, createAgoraRtcEngine } from 'react-native-agora';

class AgoraService {
  private engine: any = null;

  async init() {
    if (this.engine) return;
    
    // 动态导入 Agora SDK
    try {
      this.engine = createAgoraRtcEngine();
      
      this.engine.initialize({
        appId: AGORA_CONFIG.appId,
        channelProfile: 1, // Live broadcasting
      });

      // 启用视频模块
      this.engine.enableVideo();
      
      console.log('Agora SDK 初始化成功');
    } catch (error) {
      console.error('Agora SDK 初始化失败:', error);
    }
  }

  async joinRoom(params: { 
    token: string; 
    channel: string; 
    uid: string; 
  }) {
    await this.init();
    
    if (this.engine) {
      try {
        // v4.5.3 的正确 API
        this.engine.joinChannel(params.token, params.channel, 0);
        this.engine.startPreview();
        console.log('加入房间成功');
      } catch (error) {
        console.error('加入房间失败:', error);
      }
    }
  }

  async setupLocalVideo(view: any) {
    // 在 v4.5.3 中，视频视图通过组件处理
    console.log('设置本地视频视图');
  }

  async leaveRoom() {
    if (this.engine) {
      this.engine.leaveChannel();
      this.engine.stopPreview();
      this.engine = null;
      console.log('离开房间');
    }
  }

  async muteAudio() {
    if (this.engine) {
      this.engine.muteLocalAudioStream(true);
    }
  }

  async unmuteAudio() {
    if (this.engine) {
      this.engine.muteLocalAudioStream(false);
    }
  }

  async switchCamera() {
    if (this.engine) {
      this.engine.switchCamera();
    }
  }
}

export const agoraService = new AgoraService();