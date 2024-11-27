import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    // padding: 10,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  image: {
    marginBottom: 25,
    marginTop: 48,
    width: 150, 
    height: 150
  },
  title: {
    fontSize: 36,
    color: '#8DBF4D',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  periodSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  periodButton: {
    padding: 10,
    backgroundColor: '#8DBF4D',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  periodButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  shareButton: {
    marginLeft: 10,
    padding: 10,
    paddingTop: 30,
  },
  chartContainer: {
    // borderRadius: 10,
    // padding: 15,
    marginBottom: 20,
    // shadowColor: '#000',
    // shadowOpacity: 0.1,
    // shadowRadius: 5,
    // elevation: 3,
  },
  chartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  graph: {
    height: 200,
    // marginBottom: 20,
  },
  datesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  dateText: {
    fontSize: 14,
    color: '#000',
    marginHorizontal: 3, // Espaçamento entre as datas
    textAlign: 'center', // Centraliza o texto
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
    lineHeight: 20,
  },
  legendContainer: {
    marginTop: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    width: (width - 40) / 2,
  },
  legendColor: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 10,
  },
  legendText: {
    fontSize: 14,
    color: '#333',
  },
  chart: {
    height: 200,
    marginBottom: 20,
  },
});

export default styles;
