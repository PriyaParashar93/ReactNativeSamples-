import { Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import {CustomView} from "../Components/CustomView.tsx";
import CustomTextView from "../Components/CustomTextView.tsx";
import React, { useState } from "react";
import CustomInputField from "../Components/CustomInputField.tsx";
import CustomButton from "../Components/CustomButton.tsx";
import CustomCheckBox from "../Components/CustomCheckbox.tsx";
import CustomRadioButton from "../Components/CustomRadioButton.tsx";
import CustomSwitchRow from "../Components/CustomSwitchRow.tsx";
import CustomTabBar from "../Components/CustomTabBar.tsx";

const ComponentScreen: React.FC  = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("Enter email");
  const [enable, setEnable] = useState(true);
  const [disable, setDisable] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Enable");
  const [darkMode, setDarkMode] = useState(true);
  const [selectedTab, setSelectedTab] = useState(0);




  return (
 <CustomView>
 
    <Text style={{ fontSize: 26, color: 'black', fontWeight: 'bold', textAlign: 'center',marginVertical: 10 }}>Welcome to My
       React Native Learning</Text>
<CustomTextView title="Input Fields" />

  <CustomInputField
        value={""}
        onChangeText={(text) => {
          // setEmail(text);
          // setError(""); // ✅ clear error while typing

          console.log("First Name:", text); // ✅ log text changes

        }}
        placeholder="First Name"
        iconName="person-outline"
        isRoundedBorder={false} // ✅ borderRadius condition
      />
    <CustomInputField
        value={""}
        onChangeText={(text) => {
      
          console.log("Last Name:", text); // ✅ log text changes
           }}
        placeholder="Last Name"
        iconName="person-outline"
        isRoundedBorder={true} // ✅ borderRadius condition
      />

      <CustomInputField
        value={email}
        onChangeText={(text) => {
          setEmail(text);

          if(text.includes("@")) {
            setError("");
          }else if(text.length === 0) {
            setError("Enter email");
          }
          else {
            setError("Invalid email address");
          }
    
          console.log("Email:", text); // ✅ log text changes

        }}
        placeholder="Email"
        error={error}
        iconName="mail-outline"
        isRoundedBorder={false} // ✅ borderRadius condition
      />


<CustomTextView title="Buttons" />

<View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
  <CustomButton
    title="First"
    onPress={() => console.log("First Button Pressed")}
    type="filled"
  />

  <CustomButton
    title="Second"
    onPress={() => console.log("Second Button Pressed")}
    type="filled"
    iconName="heart-outline"
  />


</View>

<CustomButton
    title="Outlined Button"
    onPress={() => console.log("Outlined Button Pressed")}
    type="outlined"
    iconName="heart-outline"
    style={{ marginTop: 20 }}
  />


<CustomTextView title="CheckBox" style={{ width: '100%',justifyContent:"flex-start" }} />


      <View style={{ flexDirection: "row", justifyContent: "flex-start", width: '100%' }}>
        <CustomCheckBox
          label="Enable"
          checked={enable}
          onPress={() => setEnable(!enable)}
        />

        <CustomCheckBox
          label="Disable"
          checked={disable}
          onPress={() => setDisable(!disable)}
          style={{marginStart:20}}
        />
      </View>

      <CustomTextView title="Radio Button" style={{ width: '100%', justifyContent:"flex-start" }} />
      <View style={{ flexDirection: "row", justifyContent: "flex-start", width: '100%' }}>
        <CustomRadioButton
          label="Disable"
          selected={selectedOption === "Disable"}
          onPress={() => setSelectedOption("Disable")}
        />

        <CustomRadioButton
          label="Enable"
          selected={selectedOption === "Enable"}
          onPress={() => setSelectedOption("Enable")}
          style={{marginStart:20}}
        />
      </View>
      
      <View style={{ flexDirection: "row", justifyContent: "flex-start", width: '100%', height: 1 ,backgroundColor:'#000000',marginVertical:15}} />

    <CustomSwitchRow
        title="Enable Dark Mode"
        value={darkMode}
        onValueChange={setDarkMode}
      />
     <View style={{ flexDirection: "row", justifyContent: "flex-start", width: '100%', height: 1 ,backgroundColor:'#000000',marginVertical:15}} />

      <CustomTabBar
        tabs={["selected", "Two", "Three", "Four", "Five", "Six"]}
        selectedIndex={selectedTab}
        onSelect={setSelectedTab}
      />
  </CustomView>
  );
}

export default ComponentScreen;