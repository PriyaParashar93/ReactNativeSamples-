import { Text, ViewStyle } from "react-native";

type Props = {
  title: string;
  style?: ViewStyle;
};

const CustomTextView = (props: Props) => {
    return (
        <Text style={{ color: 'black', 
            fontSize: 20, 
            fontWeight: 'bold',
             marginTop: 10,
    marginBottom: 10, ...props.style }}>{props.title}</Text>
    )
}

export default CustomTextView;