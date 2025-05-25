import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, FontAwesome } from '@expo/vector-icons';

const screenWidth = Dimensions.get('window').width;
const cardWidth = screenWidth / 2 - 24;

export default function Cozinha() {
  const router = useRouter();

  const [pedidos, setPedidos] = useState([
    { id: 1, cliente: 'João', item: 'Sanduíche', status: 'Em preparo', horario: '10:30' },
    { id: 2, cliente: 'Maria', item: 'Suco de laranja', status: 'Em preparo', horario: '10:35' },
    { id: 3, cliente: 'Pedro', item: 'Pizza', status: 'Em preparo', horario: '10:40' },
    { id: 4, cliente: 'Ana', item: 'Coxinha de Frango', status: 'Em preparo', horario: '11:10' },
    { id: 5, cliente: 'Bruno', item: 'Pão de Queijo', status: 'Em preparo', horario: '11:11' },
    { id: 6, cliente: 'Carlos', item: 'Tapioca Recheada', status: 'Em preparo', horario: '11:12' },
    { id: 7, cliente: 'Daniela', item: 'Pastel de Carne', status: 'Em preparo', horario: '11:13' },
    { id: 8, cliente: 'Eduardo', item: 'Bolo de Cenoura', status: 'Em preparo', horario: '11:14' },
    { id: 9, cliente: 'Fernanda', item: 'Refrigerante', status: 'Em preparo', horario: '11:15' },
    { id: 10, cliente: 'Gustavo', item: 'Água de Coco', status: 'Em preparo', horario: '11:16' },
    { id: 11, cliente: 'Helena', item: 'Hambúrguer Artesanal', status: 'Em preparo', horario: '11:17' },
    { id: 12, cliente: 'Igor', item: 'Salada de Frutas', status: 'Em preparo', horario: '11:18' },
    { id: 13, cliente: 'Júlia', item: 'Achocolatado', status: 'Em preparo', horario: '11:19' },
    { id: 14, cliente: 'Kleber', item: 'Esfirra de Queijo', status: 'Em preparo', horario: '11:20' },
    { id: 15, cliente: 'Lívia', item: 'Macarrão à Bolonhesa', status: 'Em preparo', horario: '11:21' },
  ]);

  const atualizarStatus = (id: number, novoStatus: string) => {
    setPedidos(prev =>
      prev.map(p => (p.id === id ? { ...p, status: novoStatus } : p))
    );
  };

  const excluirPedido = (id: number) => {
    Alert.alert('Excluir Pedido', 'Tem certeza que deseja excluir este pedido?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: () => {
          setPedidos(prev => prev.filter(p => p.id !== id));
        }
      }
    ]);
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.push('/')}>
          <Ionicons name="arrow-back" size={24} color="#374151" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Painel da Cozinha</Text>
        <FontAwesome name="cutlery" size={22} color="#374151" />
      </View>

      {/* Lista de pedidos */}
      <ScrollView contentContainerStyle={styles.grid}>
        {pedidos.map(pedido => (
          <View key={pedido.id} style={styles.card}>
            <Text style={styles.item}>{pedido.item}</Text>
            <Text style={styles.text}>Cliente: <Text style={styles.bold}>{pedido.cliente}</Text></Text>
            <Text style={styles.text}>Horário: <Text style={styles.bold}>{pedido.horario}</Text></Text>
            <Text style={styles.text}>
              Status:{' '}
              <Text style={[
                styles.bold,
                pedido.status === 'Concluído' ? styles.statusConcluido :
                pedido.status === 'Em andamento' ? styles.statusAndamento :
                styles.statusPreparo
              ]}>
                {pedido.status}
              </Text>
            </Text>

            <View style={styles.buttonGroup}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: '#FCD34D' }]}
                onPress={() => atualizarStatus(pedido.id, 'Em andamento')}
              >
                <Text style={styles.buttonText}>Andamento</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, { backgroundColor: '#10B981' }]}
                onPress={() => atualizarStatus(pedido.id, 'Concluído')}
              >
                <Text style={styles.buttonText}>Concluir</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, { backgroundColor: '#EF4444' }]}
                onPress={() => excluirPedido(pedido.id)}
              >
                <Text style={styles.buttonText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

// 🎨 Estilo compacto e moderno em grade
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
    paddingTop: 60,
    paddingHorizontal: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    paddingHorizontal: 8,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 24,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 16,
    width: cardWidth,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,
  },
  item: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
    color: '#111827',
  },
  text: {
    fontSize: 12,
    color: '#4B5563',
    marginBottom: 2,
  },
  bold: {
    fontWeight: '500',
    color: '#1F2937',
  },
  statusPreparo: {
    color: '#F59E0B',
  },
  statusAndamento: {
    color: '#D97706',
  },
  statusConcluido: {
    color: '#10B981',
  },
  buttonGroup: {
    marginTop: 10,
    gap: 6,
  },
  button: {
    paddingVertical: 6,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 12,
  },
});
