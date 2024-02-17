import React, { useState, useEffect } from 'react';
import { FlatList, ActivityIndicator, View, Text } from 'react-native';
import { Apartment } from '../../shared';
import ApartmentListItem from '../components/ApartmentListItem';

interface ApartmentsScreenState {
  apartments: Apartment[] | null;
  isLoading: boolean;
  error: string | null;
}

const ApartmentsScreen: React.FC = () => {
  const [state, setState] = useState<ApartmentsScreenState>({
    apartments: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/apartments');
        const data = await response.json();
        setState({ apartments: data, isLoading: false, error: null });
      } catch (error) {
        console.error('Error fetching apartments:', error);
        setState({ ...state, isLoading: false, error: error.message });
      }
    };

    fetchData();
  }, []);

  const renderItem = ({ item }: { item: Apartment }) => (
    <ApartmentListItem key={item.id} apartment={item} />
  );

  if (state.isLoading) {
    return <ActivityIndicator size="large" />;
  }

  if (state.error) {
    return <Text>Error: {state.error}</Text>;
  }

  return (
    <FlatList
      data={state.apartments}
      renderItem={renderItem}
      keyExtractor={(item) => item.id.toString()} // Handle potential number/string ID
    />
  );
};

export default ApartmentsScreen;
