import React, { useEffect, useState } from 'react';
import { View, TextInput, Button, Text, PermissionsAndroid, Platform, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/AppNavigator';
import { useLiveStore } from '../../store/liveStore';
import LiveVideoView from '../../components/LiveVideoView';
import { LiveApi } from '../../api/liveApi';
import { initAnchorLiveEnv } from '../../services/liveBootstrap';

type Props = NativeStackScreenProps<RootStackParamList, 'Prelive'>;

const PreliveScreen = ({ navigation }: Props) => {
  const [title, setTitle] = useState('我的直播间');
  const setRoom = useLiveStore((s: any) => s.setRoom);
  const [roomId, setRoomId] = useState(null);
  const [hasPermissions, setHasPermissions] = useState(false);

  useEffect(() => {
    const requestPermissions = async () => {
      if (Platform.OS === 'android') {
        try {
          const cameraPermission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA
          );
          
          const audioPermission = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
          );
          
          if (cameraPermission === PermissionsAndroid.RESULTS.GRANTED && 
              audioPermission === PermissionsAndroid.RESULTS.GRANTED) {
            setHasPermissions(true);
          } else {
            Alert.alert('权限不足', '需要相机和麦克风权限才能开始直播');
          }
        } catch (err) {
          console.warn(err);
        }
      } else {
        // iOS 权限已经在 Info.plist 中声明
        setHasPermissions(true);
      }
    };

    requestPermissions();
  }, []);

  useEffect(() => {
    const initRoom = async () => {
      if (!hasPermissions) return;
      
      try {
        const initData = await initAnchorLiveEnv();
        setRoomId(initData.roomId);
        setRoom(initData.roomId, title);
      } catch (e) {
        console.warn('初始化主播直播环境失败', e);
        Alert.alert('初始化失败', '无法初始化直播环境，请检查网络连接和配置');
      }
    };

    initRoom();
  }, [hasPermissions]);

  const onStartLive = async () => {
    if (!roomId) return;
    try {
      await LiveApi.startRoom(roomId);
      navigation.replace('LiveRoom', { roomId });
    } catch (e) {
      console.warn('开始直播失败', e);
      Alert.alert('启动失败', '无法开始直播，请检查网络连接');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <LiveVideoView />
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          padding: 16,
          backgroundColor: 'rgba(0,0,0,0.6)',
        }}
      >
        <Text style={{ color: '#fff', marginBottom: 8 }}>直播标题</Text>
        <TextInput
          style={{ backgroundColor: '#fff', marginBottom: 12, padding: 8, borderRadius: 4 }}
          value={title}
          onChangeText={setTitle}
        />
        <Button 
          title={hasPermissions ? "开始直播" : "请求权限中..."} 
          onPress={onStartLive} 
          disabled={!hasPermissions}
        />
      </View>
    </View>
  );
};

export default PreliveScreen;