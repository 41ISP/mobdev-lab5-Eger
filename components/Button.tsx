import { TouchableOpacity, Text, GestureResponderEvent } from "react-native"

interface IProps {
    onPress: ((event: GestureResponderEvent) => void) | undefined,
    title: string,
    color?: string
}

const MyButton = ({ onPress, title, color='#2196f3'}: IProps) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={{
        backgroundColor: color,
        padding: 10,
        borderRadius: 10,
        alignItems: 'center'
      }}
    >
      <Text style={{color: 'white'}}>{title}</Text>
    </TouchableOpacity>
  );

export default MyButton