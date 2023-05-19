import React, { useCallback, useState } from 'react'
import { View, TouchableOpacity, StyleSheet } from 'react-native'
import { ScrollView, Text, useTheme, Image, Button, Square } from 'tamagui'
import { XStack, YStack } from '@tamagui/stacks'
import { Uploader } from 'uploader'
import { UploadButton } from 'react-uploader'
import { useSelector } from './context'
import { ZStack } from '@my/ui'
import { CheckCircle, Pencil } from '@tamagui/lucide-icons'

const uploader = Uploader({ apiKey: 'public_kW15b6k48wHEjGR8criKk5RMZ1Db' }) // Your real API key.

const RectangleSelector = ({ setImage, setSelectedImageIndex, image, index }: any) => {
  const theme = useTheme()

  return (
    <Square backgroundColor={'$backgroundStrong'} f={1} alignContent="center" aspectRatio={1}>
      <UploadButton
        uploader={uploader}
        options={{ multi: false, editor: { images: { cropRatio: 1 } } }}
        onComplete={(files) => files[0] && setImage(files[0]?.fileUrl, index)}
      >
        {({ onClick }) =>
          image ? (
            <ZStack aspectRatio={1} f={1}>
              <Square
                backgroundColor={'$backgroundStrong'}
                f={1}
                alignContent="center"
                aspectRatio={1}
                position={'relative'}
                onPress={() => setSelectedImageIndex(index)}
              >
                <Image source={image} style={{ ...styles.image }} resizeMode="contain" />
              </Square>
              <Square
                f={1}
                alignContent="center"
                aspectRatio={1}
                position={'absolute'}
                zIndex={10}
                onPress={() => console.log('click')}
                bottom="$0"
                right="$0"
              >
                <Button onPress={onClick}>
                  <Pencil size={'$1'} />
                </Button>
              </Square>
            </ZStack>
          ) : (
            <Button
              onClick={onClick}
              margin="-44px"
              backgroundColor={'$backgroundStrong'}
              width="100%"
              height="100%"
            >
              {/** ^ I don't like this but it makes the divs equal width */}
              <Text color="$color">+</Text>
            </Button>
          )
        }
      </UploadButton>
    </Square>
  )
}

const RectangleScreen = () => {
  const { images, setImage, selectedImageIndex, setSelectedImageIndex } = useSelector()

  return (
    <YStack space="$3" flex={1} pt="$3" paddingRight="$10" paddingLeft="$10" alignContent="center">
      <YStack f={1} width="100%" jc="center" alignItems="center">
        <Image
          source={{ uri: images[selectedImageIndex] || '' }}
          width="100%"
          height="100%"
          resizeMode="contain"
        />
      </YStack>
      <XStack justifyContent="center" alignContent="stretch" space="$3">
        <RectangleSelector
          setImage={setImage}
          setSelectedImageIndex={setSelectedImageIndex}
          index={0}
          image={images[0]}
        />
        <RectangleSelector
          setImage={setImage}
          setSelectedImageIndex={setSelectedImageIndex}
          index={1}
          image={images[1]}
        />
        <RectangleSelector
          setImage={setImage}
          setSelectedImageIndex={setSelectedImageIndex}
          index={2}
          image={images[2]}
        />
        <RectangleSelector
          setImage={setImage}
          setSelectedImageIndex={setSelectedImageIndex}
          index={3}
          image={images[3]}
        />
        <RectangleSelector
          setImage={setImage}
          setSelectedImageIndex={setSelectedImageIndex}
          index={4}
          image={images[4]}
        />
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
    height: '100%',
    width: '100%',
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
})

export default RectangleScreen
