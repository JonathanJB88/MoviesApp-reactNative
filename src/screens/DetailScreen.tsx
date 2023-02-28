import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../navigation/Navigation';

import { useMovieDetails } from '../hooks/useMovieDetails';
import { ActivityIndicator } from 'react-native';
import { MovieDetails } from '../components/MovieDetails';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { height: screenHeight } = Dimensions.get('screen');

interface Props extends StackScreenProps<RootStackParams, 'DetailScreen'> {
  // any, any: the first one is the name of the stack navigator, the second one is the name of the screen
}

export const DetailScreen = ({ route, navigation }: Props) => {
  const movie = route.params;
  const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  const { isLoading, cast, movieFull } = useMovieDetails(movie.id);
  const { top } = useSafeAreaInsets();

  return (
    <ScrollView>
      <View style={styles.imageContainer}>
        <View style={styles.imageBorder}>
          <Image source={{ uri }} style={styles.posterImage} />
        </View>
      </View>
      {/* Other details */}
      <View style={styles.marginContainer}>
        <Text style={styles.subtitle}>{movie.original_title}</Text>
        <Text style={styles.title}>{movie.title}</Text>
      </View>
      {isLoading ? (
        <ActivityIndicator size={35} color="grey" style={{ marginTop: 20 }} />
      ) : (
        <MovieDetails movieFull={movieFull!} cast={cast} />
      )}
      {/* Back Button */}
      <View
        style={{
          ...styles.backButton,
          top: Platform.OS === 'android' ? top : top - 10,
        }}>
        <TouchableOpacity onPress={() => navigation.pop()}>
          <Icon
            color="white"
            name="return-up-back-outline"
            size={30}
            style={styles.arrowIcon}
          />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    // overflow: 'hidden',
    width: '100%',
    height: screenHeight * 0.7,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 7,
    elevation: 9,
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
  },
  imageBorder: {
    flex: 1,
    overflow: 'hidden',
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
  },
  posterImage: {
    flex: 1,
  },
  marginContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.8,
    color: 'black',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  backButton: {
    position: 'absolute',
    zIndex: 999,
    elevation: 9,
    left: 5,
  },
  arrowIcon: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 7,
    elevation: 9,
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
    marginLeft: 5,
  },
});
