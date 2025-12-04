import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const ViewerModal = ({ visible = false, viewer = null, onRequestClose = () => {}, onMute = () => {}, onKick = () => {} }) => {
  if (!viewer) return null;

  return (
    <Modal transparent visible={visible} animationType="fade" onRequestClose={onRequestClose}>
      <View style={styles.backdrop}>
        <View style={styles.container}>
          <Text style={styles.title}>{viewer.name}</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, styles.muteButton]}
              onPress={() => onMute(viewer.id)}
            >
              <Text style={styles.buttonText}>禁言</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.kickButton]}
              onPress={() => onKick(viewer.id)}
            >
              <Text style={styles.buttonText}>踢出</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.closeArea} onPress={onRequestClose}>
            <Text style={styles.closeText}>取消</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    width: 280,
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    marginBottom: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 6,
    borderRadius: 6,
    alignItems: 'center',
  },
  muteButton: {
    backgroundColor: '#f59e0b',
  },
  kickButton: {
    backgroundColor: '#ef4444',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
  closeArea: {
    marginTop: 12,
  },
  closeText: {
    color: '#6b7280',
  },
});

export default ViewerModal;
