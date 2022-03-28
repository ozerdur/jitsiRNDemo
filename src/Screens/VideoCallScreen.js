import React, {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import JitsiMeet, {JitsiMeetView} from 'react-native-jitsi-meet';

function VideoCallScreen(props) {
  const [jitsiVisible, setJitsiVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const url = 'https://meet.jit.si/ozer';
    const userInfo = {
      displayName: 'ozer',
      email: 'ozer@ozer.com',
      avatar: 'user.image',
    };
    if (Platform.OS === 'android') {
      setTimeout(() => {
        JitsiMeet.call(url, userInfo);
        setTimeout(() => forceRefresh(), 200);
      }, 1000);
    } else {
      JitsiMeet.call(url, userInfo);
    }

    return () => {
      JitsiMeet.endCall();
    };
  }, []);

  function forceRefresh() {
    setJitsiVisible(false);
    setTimeout(() => {
      setJitsiVisible(true);
    }, 100);
  }

  function handleOnConferenceTerminated(nativeEvent) {}

  function handleOnConferenceJoined(nativeEvent) {
    setTimeout(() => {
      setIsLoading(false);
    }, 100);
  }

  function handleOnConferenceWillJoin(nativeEvent) {}

  return (
    <View style={styles.container}>
      {jitsiVisible && (
        <JitsiMeetView
          onConferenceTerminated={handleOnConferenceTerminated}
          onConferenceJoined={handleOnConferenceJoined}
          onConferenceWillJoin={handleOnConferenceWillJoin}
          style={{flex: 1, height: '100%', width: '100%'}}
        />
      )}
      {isLoading && (
        <View style={styles.loadingBackground}>
          <ActivityIndicator size="large" color="#FFF" />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  loadingBackground: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },
});

export default VideoCallScreen;
