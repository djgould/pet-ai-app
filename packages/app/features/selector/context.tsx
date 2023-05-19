import React, { useCallback, useState } from 'react'
import { useReducer } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

const useStatePersist = (key, initialState) => {
  const [state, setState] = useState(initialState)

  React.useEffect(() => {
    AsyncStorage.getItem(key).then((value) => {
      if (value) {
        setState(JSON.parse(value))
      }
    })
  }, [])

  const setPersistedState = useCallback(
    (newState) => {
      AsyncStorage.setItem(key, JSON.stringify(newState), () => setState(newState))
    },
    [key]
  )

  return [state, setPersistedState]
}

const SelectorContext = React.createContext<{
  images: Array<string | null>
  setImage: (image: string, index: number) => void
  selectedImageIndex: number
  setSelectedImageIndex: (index: number) => void
}>({
  images: [null, null, null, null, null],
  setImage: () => {},
  selectedImageIndex: -1,
  setSelectedImageIndex: () => {},
})

export const SelectorProvider = ({ children }) => {
  const [images, setImages] = useStatePersist('@images', [null, null, null, null, null])
  const [selectedImageIndex, setSelectedImageIndex] = useState(-1)

  console.log(images)

  const setImage = useCallback((image, index) => {
    const newImages = [...images]
    newImages[index] = image
    setImages(newImages)
    setSelectedImageIndex(index)
  }, images)

  return (
    <SelectorContext.Provider
      value={{ images, setImage, selectedImageIndex, setSelectedImageIndex }}
    >
      {children}
    </SelectorContext.Provider>
  )
}

export const useSelector = () => {
  const context = React.useContext(SelectorContext)
  if (context === undefined) {
    throw new Error('useSelector must be used within a SelectorProvider')
  }
  return context
}
