import { StyleSheet } from "react-native";

export const alignmentStyles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
  },

  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 25,
    color: "black",
  },

  box: {
    backgroundColor: "#D9D9D9",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },

  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },

  bigBox: {
    width: "50%",
    height: 150,
  },

  rightGrid: {
    width: "45%",
    justifyContent: "space-between",
    height:75,
  },

  smallRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    // marginBottom: 15,
  },

  smallBox: {
    width: "40%",
    height: 63,
  },

  sideBox: {
    width: "18%",
    height: 170,
  },

  centerColumn: {
    width: "55%",
    justifyContent: "space-between",
  },

  midBox: {
    width: "100%",
    height: 60,
  },

  fullBox: {
    width: "100%",
    height: 70,
    marginBottom: 25,
  },

  bottomMidBox: {
    width: "45%",
    height: 70,
  },

  singleLeftBox: {
    width: "35%",
    height: 110,
    marginBottom: 40,
  },

  lastBox: {
    width: "35%",
    height: 110,
  },
});