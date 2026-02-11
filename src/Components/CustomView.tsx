import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

type Props = {
  children: React.ReactNode;
};

export const CustomView:React.FC<Props> = ({ children }) => {
    return (
          <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
  {children}
     
     </SafeAreaView>
        </SafeAreaProvider>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',  
        width: '100%',
        paddingHorizontal: 40,

    }
});

