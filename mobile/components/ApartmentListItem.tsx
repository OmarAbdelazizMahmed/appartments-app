import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Apartment } from '../../shared';

interface ApartmentListItemProps {
  apartment: Apartment;
  onPress?: () => void; // Optional onPress handler for navigation
}

const ApartmentListItem: React.FC<ApartmentListItemProps> = ({ apartment, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc' }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{apartment.name}</Text>
      <Text>{`${apartment.price} per month`}</Text>
      {apartment.image && ( // Conditionally display image if available
        <Image source={{ uri: apartment.image }} style={{ width: 50, height: 50, marginVertical: 10 }} />
      )}
      {/* Optionally display other relevant details like address, rating, etc. */}
    </View>
  </TouchableOpacity>
);

export default ApartmentListItem;
