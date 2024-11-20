import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Switch, Share } from 'react-native';
import { LineChart, BarChart, PieChart } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import { Circle, G, Text as SVGText, Rect } from 'react-native-svg';
import Icon from 'react-native-vector-icons/FontAwesome';

const Relatorios = () => {
  const [periodo, setPeriodo] = useState('Dia');
  const [isPieChartMedication, setIsPieChartMedication] = useState(false);
  const [isPieChartSOS, setIsPieChartSOS] = useState(false);

  // Função para compartilhar relatório
  const shareReport = async () => {
    try {
      await Share.share({
        message: 'Aqui está o relatório do sistema, com os dados mais recentes.',
      });
    } catch (error) {
      console.error('Erro ao tentar compartilhar:', error);
    }
  }

  const getDataByPeriod = (type) => {
    const data = {
      Dia: {
        heartRate: [
          { quantidade: 50, svg: { fill: '#FFB444' } },
          { quantidade: 56, svg: { fill: '#FFB444' } },
          { quantidade: 98, svg: { fill: '#FFB444' } },
          { quantidade: 69, svg: { fill: '#FFB444' } },
        ],
        oxygenation: [
          { quantidade: 95, svg: { fill: '#C8A2C8' } },
          { quantidade: 82, svg: { fill: '#C8A2C8' } },
          { quantidade: 98, svg: { fill: '#C8A2C8' } },
          { quantidade: 88, svg: { fill: '#C8A2C8' } },
        ],
        sos: [
          { motivo: 'Queda', quantidade: 15, svg: { fill: '#FF6384' } },
          { motivo: 'Dor Forte', quantidade: 28, svg: { fill: '#FFCE56' } },
          { motivo: 'Dificuldade Respiratória', quantidade: 30, svg: { fill: '#75BFFF' } },
        ],
        medication: [
          { label: 'Tomou', quantidade: 30, svg: { fill: '#ABDBB0' } },
          { label: 'Não Tomou', quantidade: 15, svg: { fill: '#C98181' } },
        ],
      },
    };
    return data[periodo][type];
  };

  const PieChartLabels = ({ slices }) =>
    slices.map((slice, index) => {
      const { pieCentroid, data } = slice;
      return (
        <SVGText
          key={index}
          x={pieCentroid[0]-10}
          y={pieCentroid[1]}
          fill="black"
          fontSize={15}
          textAnchor="middle"
          alignmentBaseline="middle"
          fontWeight="bold"
        >
          {((data.quantidade / slices.reduce((sum, d) => sum + d.data.quantidade, 0)) * 100).toFixed(1)}%
        </SVGText>
      );
    });

  const renderLegend = (data, type) => (
    <View style={styles.legendContainer}>
      {data.map((item, index) => (
        <View key={index} style={styles.legendItem}>
          <View style={[styles.legendColor, { backgroundColor: item.svg.fill }]} />
          <Text style={styles.legendText}>
            {type === 'medication' ? item.label : item.motivo}
          </Text>
        </View>
      ))}
    </View>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/Relatorio.png')} style={styles.image} />
        <Text style={styles.title}>Relatórios</Text>
      </View>

      <View style={styles.periodSelector}>
        {['Dia', 'Semana', 'Mês'].map((item) => (
          <TouchableOpacity key={item} onPress={() => setPeriodo(item)} style={styles.periodButton}>
            <Text style={styles.periodButtonText}>{item}</Text>
          </TouchableOpacity>
        ))}
        <TouchableOpacity style={styles.shareButton} onPress={shareReport}>
          <Icon name="share-alt" size={28} color="#8DBF4D" marginBottom= '20'  />
        </TouchableOpacity>
      </View>

      {/* Oxigenação Sanguínea */}
      <View style={styles.chartContainer}>
        <View style={styles.chartHeader}>
        <Text style={styles.chartTitle}>Oxigenação Sanguínea</Text>
        </View>
            <BarChart
                style={styles.graph}
                data={getDataByPeriod('oxygenation')}
                yAccessor={({ item }) => item.quantidade}
                svg={{ fill: '#1e90ff' }}
                contentInset={{ top: 30, bottom: 10 }}
                spacingInner={0.2}
                gridMin={0}
                gridMax = {115}
            >
                {getDataByPeriod('oxygenation').map((item, index) => (
                        <G key={index}>
                        <SVGText
                            key={index}
                            x={index * 100 + 40}
                            y={180 - item.quantidade - 40} // Ajusta posição acima da coluna
                            fontSize={16}
                            fontWeight="bold"
                            fill="#333"
                            alignmentBaseline="middle"
                            textAnchor="middle"
                            >
                            {item.quantidade}%
                        </SVGText>
                        </G>
                    ))}
                
            </BarChart>
            <Text style={styles.description}>
                Os valores de saturação de oxigênio normais para idosos são de 95% à 100%. Em caso de doenças crônicas, os valores considerados normais são de 88% à 95%.
            </Text>
      </View>     

      {/*Adesão de Medicamentos */}
      <View style={styles.chartContainer}>
        <View style={styles.chartHeader}>
          <Text style={styles.chartTitle}>Adesão de Medicamentos</Text>
          <Switch
            value={isPieChartMedication}
            onValueChange={() => setIsPieChartMedication(!isPieChartMedication)}
          />
        </View>
        {isPieChartMedication ? (
          <PieChart
            style={[styles.chart, { height: 240 }]}
            data={getDataByPeriod('medication')}
            valueAccessor={({ item }) => item.quantidade}
            outerRadius="95%"
            innerRadius="40%"
          >
            <PieChartLabels />
          </PieChart>
        ) : (
          <BarChart
            style={styles.chart}
            data={getDataByPeriod('medication')}
            yAccessor={({ item }) => item.quantidade}
            svg={{ fill: '#1e90ff' }}
            contentInset={{ top: 30, bottom: 10 }}
            spacingInner={0.2}
            gridMin={0}
            gridMax = {100}
          >
            {getDataByPeriod('medication').map((item, index) => (
              <G key={index}>
                <SVGText
                 key={index}
                 x={ index * 210 + 90}
                 y={180 - item.quantidade - 20} // Ajusta posição acima da coluna
                 fontSize={16}
                 fontWeight="bold"
                 fill="#333"
                 alignmentBaseline="middle"
                 textAnchor="middle"
                >
                  {item.quantidade}
                </SVGText>
              </G>
            ))}
          </BarChart>
        )}
        {renderLegend(getDataByPeriod('medication'), 'medication')}
      </View>

      {/* Batimento Cardíaco */}
      <View style={styles.chartContainer}>
        <View style={styles.chartHeader}>
        <Text style={styles.chartTitle}>Batimento Cardíaco</Text>
        </View>
            <BarChart
                style={styles.graph}
                data={getDataByPeriod('heartRate')}
                yAccessor={({ item }) => item.quantidade}
                svg={{ fill: '#1e90ff' }}
                contentInset={{ top: 30, bottom: 10 }}
                spacingInner={0.2}
                gridMin={0}
                gridMax = {130}
            >
                {getDataByPeriod('heartRate').map((item, index) => (
                        <G key={index}>
                        <SVGText
                            key={index}
                            x={index * 100 + 30}
                            y={180 - item.quantidade - 30} // Ajusta posição acima da coluna
                            fontSize={16}
                            fontWeight="bold"
                            fill="#333"
                            alignmentBaseline="middle"
                            textAnchor="middle"
                            >
                            {item.quantidade}    bpm
                        </SVGText>
                        </G>
                    ))}
                
            </BarChart>
            <Text style={styles.description}>
                A frequência cardíaca normal para idosos em repouso varia entre 50bpm e 60bpm.
            </Text>
      </View>     

      {/* Gráfico de SOS */}
      <View style={styles.chartContainer}>
        <View style={styles.chartHeader}>
          <Text style={styles.chartTitle}>Ocorrências de SOS</Text>
          <Switch
            value={isPieChartSOS}
            onValueChange={() => setIsPieChartSOS(!isPieChartSOS)}
          />
        </View>
        {isPieChartSOS ? (
          <PieChart
            style={[styles.chart, { height: 240 }]}
            data={getDataByPeriod('sos')}
            valueAccessor={({ item }) => item.quantidade}
            outerRadius="95%"
            innerRadius="40%"
          >
            <PieChartLabels />
          </PieChart>
        ) : (
          <BarChart
            style={styles.chart}
            data={getDataByPeriod('sos')}
            yAccessor={({ item }) => item.quantidade}
            svg={{ fill: '#1e90ff' }}
            contentInset={{ top: 30, bottom: 10 }}
            spacingInner={0.2}
            gridMin={0}
            gridMax = {100}
          >
            {getDataByPeriod('sos').map((item, index) => (
              <G key={index}>
                <SVGText
                   x={60 + index * 135}
                   y={180 - item.quantidade - 20} // Ajusta posição acima da coluna
                   fontSize={16}
                   fontWeight="bold"
                   fill="#333"
                   alignmentBaseline="middle"
                   textAnchor="middle"
                >
                  {item.quantidade}
                </SVGText>
              </G>
            ))}
          </BarChart>
        )}
        {renderLegend(getDataByPeriod('sos'), 'sos')}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  header: { alignItems: 'center', marginBottom: 20 },
  image: { width: 140, height: 140, resizeMode: 'contain', marginTop: 60 },
  title: { fontSize: 45, fontWeight: 'bold', color: '#8DBF4D', marginTop: 10, textAlign: 'center' },
  periodSelector: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 },
  periodButton: { padding: 10, backgroundColor: '#8DBF4D', borderRadius: 5, marginBottom: 20},
  periodButtonText: { color: '#fff', fontWeight: 'bold' },
  shareButton: { padding: 10, backgroundColor: '#fff', borderRadius: 5, justifyContent: 'center', alignItems: 'center' },
  chartContainer: { marginBottom: 30 },
  chartHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  chartTitle: { fontSize: 18, fontWeight: 'bold' },
  graph: {
    height: 200,  // Ajuste a altura conforme necessário
    width: '100%',  // Ou defina uma largura fixa, se preferir
  },
  chart: { height: 200, marginBottom: 10 },
  legendContainer: { flexDirection: 'row', marginTop: 10, marginLeft: 5 },
  legendItem: { flexDirection: 'row', alignItems: 'center', marginRight: 10 },
  legendColor: { width: 16, height: 16, marginRight: 5 },
  legendText: { fontSize: 14, color: '#333', marginRight: 5 },
});

export default Relatorios;