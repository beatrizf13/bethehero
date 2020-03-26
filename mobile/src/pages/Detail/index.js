import React from 'react';
import { View, Image, Text, TouchableOpacity, Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';

import styles from './styles';
import logoImg from '../../assets/logo.png';

export default function Detail() {
  const navigation = useNavigation();
  const route = useRoute();

  const incident = route.params.incident;

  function navigateBack() {
    navigation.goBack();
  }

  const message =
  `Hello ${
    incident.name
  }, I am contacting you because I would like to help in the case "${
    incident.title
  }" with the value of ${Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(incident.value)}.`;

  function sendMail() {
    MailComposer.composeAsync({
      subject: `Hero from incident: ${incident.title}`,
      recipients: [incident.email],
      body: message
    });
  }

  function sendWhatsapp() {
    Linking.openURL(
      `whatsapp://send?phone=55${incident.whatsapp}&text=${message}`
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={logoImg} />

        <TouchableOpacity onPress={navigateBack}>
          <Feather name="arrow-left" size={28} color="#e02041" />
        </TouchableOpacity>
      </View>

      <View style={styles.incident}>
        <Text style={[styles.incidentProperty, { marginTop: 0 }]}>NGO: </Text>
        <Text style={styles.incidentValue}>{incident.name} </Text>

        <Text style={styles.incidentProperty}>incident: </Text>
        <Text style={styles.incidentValue}>{incident.title} </Text>

        <Text style={styles.incidentProperty}>value: </Text>
        <Text style={styles.incidentValue}>
          {Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(incident.value)}
        </Text>
      </View>

      <View style={styles.contactBox}>
        <Text style={styles.heroTitle}>save the day</Text>
        <Text style={styles.heroTitle}>be the hero of this incident</Text>

        <Text style={styles.heroDescription}>contact:</Text>

        <View style={styles.actions}>
          <TouchableOpacity onPress={sendWhatsapp} style={styles.action}>
            <Text style={styles.actionText}>whatsapp</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={sendMail} style={styles.action}>
            <Text style={styles.actionText}>e-mail</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
