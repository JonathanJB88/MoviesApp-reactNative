import React from 'react';
import { View, Text, FlatList } from 'react-native';
import currencyFormatter from 'currency-formatter';
import { MovieFull } from '../interfaces/movieInterface';
import { Cast } from '../interfaces/creditsInterface';
import Icon from 'react-native-vector-icons/Ionicons';
import { CastItem } from './CastItem';

interface Props {
  movieFull: MovieFull;
  cast: Cast[];
}

export const MovieDetails = ({ movieFull, cast }: Props) => {
  return (
    <>
      {/* Details */}

      <View style={{ marginHorizontal: 20 }}>
        <View style={{ flexDirection: 'row' }}>
          <Icon name="star-outline" size={16} color="grey" />
          <Text style={{ color: 'black', marginLeft: 5 }}>
            {movieFull.vote_average.toFixed(1)}
          </Text>
          <Text style={{ marginLeft: 5, color: 'black' }}>
            - {movieFull.genres.map(g => g.name).join(', ')}
          </Text>
        </View>

        {/* Story */}
        <Text
          style={{
            fontSize: 23,
            marginTop: 10,
            fontWeight: 'bold',
            color: 'black',
          }}>
          Overview
        </Text>
        <Text style={{ fontSize: 16, color: 'black', marginTop: 5 }}>
          {movieFull.overview}
        </Text>

        {/* Story */}
        <Text
          style={{
            fontSize: 23,
            marginTop: 10,
            fontWeight: 'bold',
            color: 'black',
          }}>
          Budget
        </Text>
        <Text style={{ fontSize: 18, color: 'black', marginTop: 5 }}>
          {currencyFormatter.format(movieFull.budget, { code: 'USD' })}
        </Text>
      </View>

      {/* Cast */}
      <View style={{ marginTop: 10, marginBottom: 50 }}>
        <Text
          style={{
            fontSize: 23,
            marginTop: 10,
            fontWeight: 'bold',
            color: 'black',
            marginHorizontal: 20,
          }}>
          Actors
        </Text>
        <FlatList
          data={cast}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => <CastItem actor={item} />}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={{ marginTop: 10, height: 70 }}
        />
      </View>
    </>
  );
};
