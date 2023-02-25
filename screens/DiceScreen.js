import { Text, View } from 'react-native';

import CalculatorHistory from '../calculator/CalculatorHistory';

export default SettingsScreen = ({ rollHistory, setRollHistory }) => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2a2d35',
      }}
    >
      {/* <CalculatorHistory history={rollHistory} /> */}
      <Text style={{ color: 'white' }}>Classic Dice Screen!</Text>
    </View>
  );
};
