import React, { useRef, useEffect } from 'react';
import { View } from 'react-native';
import { agoraService } from '../services/trtcService';
import { RtcSurfaceView } from 'react-native-agora';

const LiveVideoView = () => {
  const viewRef = useRef(null);

  useEffect(() => {
    console.log('LiveVideoView 组件已加载');
    
    return () => {
      agoraService.leaveRoom();
    };
  }, []);

  return (
    <View 
      ref={viewRef} 
      style={{ 
        flex: 1, 
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center'
      }} 
    >
      {/* 添加 Agora 视频组件 */}
      <RtcSurfaceView 
        style={{ flex: 1, width: '100%', height: '100%' }} 
        canvas={{ uid: 0 }}
      />
    </View>
  );
};

export default LiveVideoView;