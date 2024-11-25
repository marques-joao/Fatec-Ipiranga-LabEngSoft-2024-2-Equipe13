import React, { useState } from 'react';
import { View, Text, screenWidth, Image, ScrollView, TouchableOpacity, Switch, Share, Dimensions } from 'react-native';
import { BarChart, PieChart } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import { Circle, G, Text as SVGText, Rect } from 'react-native-svg';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './../components/RelatoriosStyles';


const Relatorios = () => {
  const [periodo, setPeriodo] = useState('Dia');
  const [isPieChartMedication, setIsPieChartMedication] = useState(false);
  const [isPieChartSOS, setIsPieChartSOS] = useState(false);
  const screenWidth = Dimensions.get('window').width;

  // Função para compartilhar relatório
  const shareReport = async () => {
    try {
      await Share.share({
        message: 'Aqui está o relatório do sistema, com os dados mais recentes.',
      });
    } catch (error) {
      console.error('Erro ao tentar compartilhar:', error);
    }
  };

  // Obtém dados estáticos para gráficos com base no período e tipo
  const getDataByPeriod = (type) => {
    const data = {
      Dia: {
        heartRate: [
          { quantidade: 75, svg: { fill: '#FFB444' } },
        ],
        oxygenation: [
          { quantidade: 95, svg: { fill: '#C8A2C8' } },
        ],
        sos: [
          { motivo: 'Queda', quantidade: 1, svg: { fill: '#FF6384' } },
        ],
        medication: [
          { label: 'Tomou', quantidade: 5, svg: { fill: '#ABDBB0' } },
          { label: 'Não Tomou', quantidade: 1, svg: { fill: '#C98181' } },
        ],
      },
      Semana: {
        // Mock: Adicione dados para Semana
        heartRate: [
          { quantidade: 65, svg: { fill: '#FFB444' } },
          { quantidade: 58, svg: { fill: '#FFB444' } },
          { quantidade: 56, svg: { fill: '#FFB444' } },
          { quantidade: 60, svg: { fill: '#FFB444' } },
          { quantidade: 65, svg: { fill: '#FFB444' } },
          { quantidade: 56, svg: { fill: '#FFB444' } },
          { quantidade: 70, svg: { fill: '#FFB444' } },
        ],
        oxygenation: [
          { quantidade: 95, svg: { fill: '#C8A2C8' } },
          { quantidade: 100, svg: { fill: '#C8A2C8' } },
          { quantidade: 98, svg: { fill: '#C8A2C8' } },
          { quantidade: 96, svg: { fill: '#C8A2C8' } },
          { quantidade: 95, svg: { fill: '#C8A2C8' } },
          { quantidade: 95, svg: { fill: '#C8A2C8' } },
          { quantidade: 86, svg: { fill: '#C8A2C8' } },
        ],
        sos: [
          { motivo: 'Queda', quantidade: 2, svg: { fill: '#FF6384' } },
          { motivo: 'Manifestação de Alergia', quantidade: 6, svg: { fill: '#FFCE56' } },
          { motivo: 'Dificuldade para Respirar', quantidade: 4, svg: { fill: '#75BFFF' } },
        ],
        medication: [
          { label: 'Tomou', quantidade: 25, svg: { fill: '#ABDBB0' } },
          { label: 'Não Tomou', quantidade: 10, svg: { fill: '#C98181' } },
        ],
      },
      Mês: {
        // Mock: Adicione dados para Mês
        heartRate: [
          { quantidade: 85, svg: { fill: '#FFB444' } },
        ],
        oxygenation: [
          { quantidade: 75, svg: { fill: '#C8A2C8' } },
        ],
        sos: [
          { motivo: 'Queda', quantidade: 6, svg: { fill: '#FF6384' } },
          { motivo: 'Manifestação de Alergia', quantidade: 12, svg: { fill: '#FFCE56' } },
          { motivo: 'Dificuldade para Respirar', quantidade: 9, svg: { fill: '#75BFFF' } },
          { motivo: 'AVC', quantidade: 1, svg: { fill: '#C8A2C8' } },
          { motivo: 'Acidente Doméstico', quantidade: 3, svg: { fill: '#FFB444' } },
        ],
        medication: [
          { label: 'Tomou', quantidade: 65, svg: { fill: '#ABDBB0' } },
          { label: 'Não Tomou', quantidade: 24, svg: { fill: '#C98181' } },
        ],
      },
    };

    // Retorna os dados do período ou vazio se o período não estiver definido
    return data[periodo]?.[type] || [];
  };

  // Gera as datas conforme o período selecionado
  const getDatesByPeriod = () => {
    const today = new Date();
    if (periodo === 'Dia') {
      return [today.toLocaleDateString('pt-BR')]; // Retorna apenas o dia atual
    } else if (periodo === 'Semana') {
      const weekDays = [];
      for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        weekDays.push(date.toLocaleDateString('pt-BR').slice(0, 5)); // Formato "dd/MM"
      }
      return weekDays;
    } else if (periodo === 'Mês') {
      const today = new Date();
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const currentMonth = monthNames[today.getMonth()];
      return [currentMonth]; // Retorna um array com o mês atual
    }
  };

  const renderBarValues = (data, chartWidth, chartHeight = 200, contentInset = { top: 30, bottom: 10 }) => {
    const barWidth = chartWidth / data.length; // Calcula a largura de cada coluna
  
    return data.map((item, index) => {
      const x = barWidth * index + barWidth / 2; // Calcula o centro de cada coluna
      const y = chartHeight - contentInset.bottom - item.quantidade; // Ajusta a posição vertical
      
  
      return (
        <G key={index}>
          <SVGText
            x={x * 76 / 83 }
            y={180 / y + 60} // Coloca o texto acima da barra
            fontSize={14}
            fontWeight="bold"
            fill="black"
            textAnchor="middle"
          >
            {item.quantidade}
          </SVGText>
        </G>
      );
    });
  };
  
  const data = getDataByPeriod(periodo);

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
                gridMax = {130}
            >

              {renderBarValues(getDataByPeriod('oxygenation'), screenWidth)}
            </BarChart>

            {/* Exibe as datas abaixo do gráfico */}
            <View style={styles.datesContainer}>
                  {getDatesByPeriod().map((date, index) => (
                  <Text key={index} style={styles.dateText}>
                    {date}
                  </Text>
                  ))}
                </View>
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
            gridMax = {120}
          >
            {getDataByPeriod('medication').map((item, index) => (
              <G key={index}>
                <SVGText
                 key={index}
                 x={ index * 210 + 90}
                 y={180 - item.quantidade - 20} // Ajusta posição acima da coluna
                 fontSize={14}
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
        <Text style={styles.chartTitle}>Batimento Cardíaco (bpm)</Text>
        </View>
            <BarChart
                style={styles.graph}
                data={getDataByPeriod('heartRate')}
                yAccessor={({ item }) => item.quantidade}
                svg={{ fill: '#1e90ff' }}
                contentInset={{ top: 30, bottom: 10 }}
                spacingInner={0.2}
                gridMin={0}
                gridMax = {100}
            >
                {renderBarValues(getDataByPeriod('heartRate'), screenWidth)}
                
            </BarChart>

             {/* Exibe as datas abaixo do gráfico */}
             <View style={styles.datesContainer}>
                  {getDatesByPeriod().map((date, index) => (
                  <Text key={index} style={styles.dateText}>
                    {date}
                  </Text>
                  ))}
                </View>

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
            gridMax = {16}
          >
            {renderBarValues(getDataByPeriod('sos'), screenWidth)}
          </BarChart>
        )}

        {renderLegend(getDataByPeriod('sos'), 'sos')}
        
      </View>
    </ScrollView>
  );
};

export default Relatorios;