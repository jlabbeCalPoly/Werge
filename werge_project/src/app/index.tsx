import * as Device from 'expo-device';
import { useRef } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Keyboard } from '@/components/keyboard';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { WebBadge } from '@/components/web-badge';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useState, useEffect } from 'react';
import { GridDataInterface } from '@/types/grid-data-interface';
import { handleGameStartMock, handleGameStartAsync } from '@/hooks/game-start-functions';
import { TileGrid, TileGridHandle } from '@/components/tile-grid';
import { useLayoutConfigs } from '@/hooks/use-layout-configs';

function getDevMenuHint() {
  if (Platform.OS === 'web') {
    return <ThemedText type="small">use browser devtools</ThemedText>;
  }
  if (Device.isDevice) {
    return (
      <ThemedText type="small">
        shake device or press <ThemedText type="code">m</ThemedText> in terminal
      </ThemedText>
    );
  }
  const shortcut = Platform.OS === 'android' ? 'cmd+m (or ctrl+m)' : 'cmd+d';
  return (
    <ThemedText type="small">
      press <ThemedText type="code">{shortcut}</ThemedText>
    </ThemedText>
  );
}

export default function HomeScreen() {
  // Data used to render the TileGrid component
  const [gridState, setGridState] = useState<GridDataInterface | undefined>(undefined);
  // Data used to fill the focused row in TileGrid
  const [inputState, setInputState] = useState<string[] | undefined>(undefined);
  // Number used to track which index in inputState is currently being focused on
  const [inputIndex, setInputIndex] = useState<number>(0);

  // TileGrid referance for animations
  const tileGridRef = useRef<TileGridHandle|null>(null);

  const { tileGridLayoutConfig } = useLayoutConfigs()

  // Simple flag to determine if data should be fetched or if mock data should be used instead
  const testing = true;

  useEffect(() => {
    if (testing) {
      const { descriptionData, gridData, inputData } = handleGameStartMock();
      setGridState(gridData);
      setInputState(inputData);
    } else {
      const init = async () => {
         // const [descriptionData, gridData, inputData] = handleGameStartMock();
      };
      init();
    }
  }, []);

  function onKeyPress() {
    if (!tileGridRef.current) {
      return
    }

    tileGridRef.current.testAnimation()
  }

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedText type="code" style={styles.code}>
          Get started
        </ThemedText>

        <TileGrid ref={tileGridRef}
          gridState={gridState}
          inputState={inputState}
          layoutConfig={tileGridLayoutConfig}/>

        <Keyboard onKeyPress={onKeyPress} />

        {Platform.OS === 'web' && <WebBadge />}
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  safeArea: {
    flex: 1,
    flexDirection: "column",
    alignItems: 'center',
    paddingHorizontal: Spacing.three,
    justifyContent: "space-between"
  },
  heroSection: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: Spacing.four,
    gap: Spacing.four,
  },
  title: {
    textAlign: 'center',
  },
  code: {
    textTransform: 'uppercase',
  },
  stepContainer: {
    gap: Spacing.three,
    alignSelf: 'stretch',
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.four,
    borderRadius: Spacing.four,
  },
});
