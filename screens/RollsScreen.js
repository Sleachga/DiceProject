import { Text, View } from 'react-native';

export default RollsScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2a2d35',
      }}
    >
      <Text style={{ color: 'white' }}>Saved Rolls!</Text>
    </View>
  );
};
