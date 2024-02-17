import React, { useState, useEffect } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import { Apartment } from '../../shared';
import { useParams } from 'react-router-dom';

const ApartmentDetailsScreen: React.FC = () => {
  const { id } = useParams();
  const [apartment, setApartment] = useState<Apartment | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/apartments/${id}`);
        const data = await response.json();
        setApartment(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching apartment details:', error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  if (isLoading) {
    return <ActivityIndicator size="large" />;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  if (!apartment) {
    return <Text>Apartment not found.</Text>;
  }

  return (
    <View>
      <Text>{apartment.title}</Text>
      <Image source={{ uri: apartment.image }} style={{ width: 200, height: 150 }} />
        <Text>{apartment.location}</Text>
        <Text>${apartment.price}</Text>
        <Text>{apartment.description}</Text>
    </View>
  );
};

export default ApartmentDetailsScreen;
