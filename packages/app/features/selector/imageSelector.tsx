import React, { useState } from 'react'
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native'
import * as ImagePicker from 'expo-image-picker'
import { ScrollView, Square, Text, useTheme } from 'tamagui'
import { XStack, YStack } from '@tamagui/stacks'

const Rectangle = ({ onPress, imageSource }) => {
  const theme = useTheme()
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ ...styles.rectangle, backgroundColor: theme.backgroundStrong.val }}
    >
      {imageSource ? (
        <Image source={imageSource} style={styles.image} />
      ) : (
        <Text color="$color">Upload Image</Text>
      )}
    </TouchableOpacity>
  )
}

const RectangleScreen = () => {
  const [images, setImages] = useState<({ uri: string } | null)[]>([null, null, null, null, null])

  const selectImage = async (index) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [3, 3],
    })
    if (!result.canceled) {
      const newImages = [...images]
      newImages[index] = result.assets[0]?.uri ? { uri: result.assets[0]?.uri } : null
      setImages(newImages)
    }
  }

  return (
    <YStack space="$3" flex={1} pt="$3" paddingRight="$10" paddingLeft="$10" fullscreen>
      <XStack flex={1} space="$3">
        <Rectangle onPress={() => selectImage(0)} imageSource={images[0]} />
        <Rectangle onPress={() => selectImage(1)} imageSource={images[1]} />
      </XStack>
      <XStack flex={1} space="$3">
        <Rectangle onPress={() => selectImage(2)} imageSource={images[2]} />
        <Rectangle onPress={() => selectImage(3)} imageSource={images[3]} />
      </XStack>
      <XStack flex={1} justifyContent="center" space="$3">
        <Rectangle onPress={() => selectImage(4)} imageSource={images[4]} />
      </XStack>
    </YStack>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rectangle: {
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
})

export default RectangleScreen
