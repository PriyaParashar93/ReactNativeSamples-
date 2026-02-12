import React from "react";
import { View, Text, ScrollView } from "react-native";
import { alignmentStyles } from "../CustomStyles/alignmentStyles";

const Box = ({ style }: any) => {
  return <View style={[alignmentStyles.box, style]} />;
};

const AlignmentScreen: React.FC  = () =>{
  return (
    // <Text style={alignmentStyles.title}>Alignment Assignment</Text>
    <ScrollView contentContainerStyle={alignmentStyles.container}>
      <Text style={alignmentStyles.title}>Alignment Assignment</Text>

      {/* ---------------- Row 1 ---------------- */}
      <View style={alignmentStyles.row}>
        <Box style={alignmentStyles.bigBox} />

        <View style={alignmentStyles.rightGrid}>
          <View style={[alignmentStyles.smallRow, { marginBottom: 20 }]}>
            <Box style={alignmentStyles.smallBox} />
            <Box style={alignmentStyles.smallBox} />
          </View>

          <View style={[alignmentStyles.smallRow, { marginBottom: 0 }]}>
            <Box style={alignmentStyles.smallBox} />
            <Box style={alignmentStyles.smallBox} />
          </View>
        </View>
      </View>

      {/* ---------------- Row 2 ---------------- */}
      <View style={alignmentStyles.row}>
        <Box style={alignmentStyles.sideBox} />

        <View style={alignmentStyles.centerColumn}>
          <Box style={alignmentStyles.midBox} />
          <Box style={alignmentStyles.midBox} />
        </View>

        <Box style={alignmentStyles.sideBox} />
      </View>

      {/* ---------------- Full Width Box ---------------- */}
      <Box style={alignmentStyles.fullBox} />

      {/* ---------------- Row 3 ---------------- */}
      <View style={alignmentStyles.rowBetween}>
        <Box style={alignmentStyles.bottomMidBox} />
        <Box style={alignmentStyles.bottomMidBox} />
      </View>

      {/* ---------------- Left Single Box ---------------- */}
      <Box style={alignmentStyles.singleLeftBox} />

      {/* ---------------- Bottom Row ---------------- */}
      <View style={alignmentStyles.rowBetween}>
        <Box style={alignmentStyles.lastBox} />
        <Box style={alignmentStyles .lastBox} />
      </View>
    </ScrollView>
  );
};

export default AlignmentScreen;

