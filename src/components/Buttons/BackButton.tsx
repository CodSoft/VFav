import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity, Text } from 'react-native';

interface BackButtonProps {
  onPress?: () => void;
}

const BackButton: React.FC<BackButtonProps> = ({ onPress }) => {
  return (
    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={onPress}>
      <MaterialCommunityIcons name={'chevron-left'} size={20} color={'white'} />
      <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>back</Text>
    </TouchableOpacity>
  );
};

export default BackButton;
