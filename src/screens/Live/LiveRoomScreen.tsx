import React, { useState, useCallback, useEffect } from 'react';
import { View, Button, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import LiveVideoView from '../../components/LiveVideoView';
import { useLiveStore } from '../../store/liveStore';
import { LiveApi } from '../../api/liveApi';
import { agoraService } from '../../services/trtcService';
import ViewerCard from '../../components/ViewerCard';
import ViewerModal from '../../components/ViewerModal';

const LiveRoomScreen = ({ route, navigation }: any) => {
  const { roomId } = route.params;
  const title = useLiveStore((s: any) => s.title);
  // For demo purposes maintain a local viewers list. In production this should come
  // from IM / server push events.
  const [viewers, setViewers] = useState(
    Array.from({ length: 8 }).map((_: any, i: number) => ({ id: `${1000 + i}`, name: `观众${i + 1}` }))
  );
  const [selectedViewer, setSelectedViewer] = useState<any>(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    // 组件卸载时离开房间
    return () => {
      agoraService.leaveRoom();
    };
  }, []);

  const onEndLive = async () => {
    try {
      await LiveApi.stopRoom(roomId);
    } catch (e) {
      console.warn('停止直播接口调用失败', e);
    }
    await agoraService.leaveRoom();
    navigation.replace('EndSummary', { roomId });
  };

  const openViewer = useCallback((viewer: any) => {
    setSelectedViewer(viewer);
    setModalVisible(true);
  }, []);

  const closeModal = () => {
    setModalVisible(false);
    setSelectedViewer(null);
  };

  const handleMute = async () => {
    if (!selectedViewer) return;
    try {
      await LiveApi.muteViewer(roomId, selectedViewer.id);
      Alert.alert('操作成功', '已对该观众禁言');
      closeModal();
    } catch (e) {
      console.warn('禁言接口失败', e);
      Alert.alert('操作失败', '禁言请求失败（请确认后端支持该接口）');
    }
  };

  const handleKick = async () => {
    if (!selectedViewer) return;
    try {
      await LiveApi.kickViewer(roomId, selectedViewer.id);
      // locally remove viewer so UI reacts immediately
      setViewers(prev => prev.filter(v => v.id !== selectedViewer.id));
      Alert.alert('操作成功', '已将该观众移出直播间');
      closeModal();
    } catch (e) {
      console.warn('踢出接口失败', e);
      Alert.alert('操作失败', '踢出请求失败（请确认后端支持该接口）');
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <LiveVideoView />

      <View style={{ position: 'absolute', top: 40, left: 16 }}>
        <Text style={{ color: '#fff', fontSize: 18 }}>{title}</Text>
      </View>

      <View style={{ position: 'absolute', top: 40, right: 16 }}>
        <Button title="结束" onPress={onEndLive} color="#f44" />
      </View>

      {/* 右侧观众列表（示例实现） */}
      <View style={styles.viewerListContainer} pointerEvents="box-none">
        <View style={styles.viewerList}>
          <FlatList
            data={viewers}
            keyExtractor={item => item.id}
            renderItem={({ item }) => <ViewerCard viewer={item} onPress={openViewer} />}
          />
        </View>
      </View>

      <ViewerModal
        visible={modalVisible}
        viewer={selectedViewer}
        onRequestClose={closeModal}
        onMute={handleMute}
        onKick={handleKick}
      />

      {/* TODO: 聊天、连麦、商品、投票面板在这里叠加 */}
    </View>
  );
};

const styles = StyleSheet.create({
  viewerListContainer: {
    position: 'absolute',
    right: 0,
    top: 120,
    bottom: 80,
    width: 140,
    paddingRight: 8,
    alignItems: 'flex-end',
  },
  viewerList: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    borderRadius: 8,
    overflow: 'hidden',
    width: 140,
    maxHeight: '100%'
  }
});

export default LiveRoomScreen;