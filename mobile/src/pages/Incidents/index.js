import React, { useState, useEffect } from 'react';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

import styles from './styles';
import logoImg from '../../assets/logo.png';

import api from '../../services/api';

export default function Incidents() {
  const navigation = useNavigation();

  const [incidents, setIncidents] = useState([]);
  const [totalIncidents, setTotalIncidents] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  async function loadIncidents() {
    if (loading) return;
    if (totalIncidents > 0 && incidents.length === totalIncidents) return;

    setLoading(true);

    const response = await api.get('/incidents', {
      params: { page }
    });
    setIncidents([...incidents, ...response.data.incidents]);
    setTotalIncidents(response.headers['x-total-count']);

    setPage(page + 1);
    setLoading(false);
  }

  useEffect(() => {
    loadIncidents();
  }, []);

  function navigateToDetail(incident) {
    navigation.navigate('Detail', { incident });
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>
          total
          <Text style={styles.headerTextBold}> {totalIncidents} incidents</Text>
        </Text>
      </View>

      <Text style={styles.title}>welcome</Text>
      <Text style={styles.description}>
        choose one of the incidents below and save the day
      </Text>

      <FlatList
        style={styles.incidentList}
        data={incidents}
        keyExtractor={incident => String(incident.id)}
        showsVerticalScrollIndicator={false}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
        renderItem={({ item: incident }) => (
          <View style={styles.incident}>
            <Text style={styles.incidentProperty}>NGO: </Text>
            <Text style={styles.incidentValue}>
              {incident.name} of {incident.city}/{incident.uf}
            </Text>

            <Text style={styles.incidentProperty}>incident: </Text>
            <Text style={styles.incidentValue}>{incident.title} </Text>

            <Text style={styles.incidentProperty}>value: </Text>
            <Text style={styles.incidentValue}>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(incident.value)}
            </Text>

            <TouchableOpacity
              style={styles.detailsButton}
              onPress={() => navigateToDetail(incident)}
            >
              <Text style={styles.detailsButtonText}>see more details</Text>
              <Feather name="arrow-right" size={16} color="#e02041" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
