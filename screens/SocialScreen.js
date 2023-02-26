import { useEffect } from 'react';
import { Text, View } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';

const SettingsScreen = ({ db }) => {
  useEffect(() => {
    const getSharedRolls = async () => {
      const querySnapshot = await getDocs(collection(db, 'SharedRolls'));
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
      });
    };

    getSharedRolls();
  });

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2a2d35',
      }}
    >
      <Text style={{ color: 'white' }}>Social Rolls!</Text>
    </View>
  );
};

export default SettingsScreen;
