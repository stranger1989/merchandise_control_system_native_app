import React, { SFC } from 'react';
import { View, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import { Text } from '@ui-kitten/components';

import { images } from '../../../assets/index';

const dimensions = Dimensions.get('window');

const styles = StyleSheet.create({
  image: {
    width: dimensions.width,
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageText: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
  },
});

interface ImageDisplayProps {
  imageName: string;
  imageText: string;
}

const ImageDisplay: SFC<ImageDisplayProps> = ({ imageName, imageText }) => {
  return (
    <View>
      <ImageBackground
        source={images[`dummy_${imageName}`] ?? null}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.imageOverlay}>
          <Text style={styles.imageText}>{imageText}</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default ImageDisplay;
