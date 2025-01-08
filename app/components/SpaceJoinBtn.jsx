import {
  View,
  Text,
  TouchableOpacity,
  Pressable,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { CheckBadgeIcon, PlusIcon } from "react-native-heroicons/solid";
import { joinSpace, UnjoinSpace } from "../api/Spaces";

const SpaceJoinBtn = ({ JoinStatus, spaceName, navigation }) => {
  const [join, setJoin] = useState(JoinStatus);

  console.log("====================================");
  console.log("spaceNamespaceNamespaceNamespaceName", spaceName);
  console.log("====================================");
  function handleJoin() {
    if (!join) {
      setJoin(true);
      joinSpace(spaceName);
      console.log("pressed true");
    } else {
      setJoin(false);
      UnjoinSpace(spaceName);
      console.log("pressed falde");
    }
  }
  return (
    <TouchableOpacity style={styles.btnContainer} onPress={handleJoin}>
      {join ? (
        <View style={styles.joined}>
          <CheckBadgeIcon color="white" />
          <Text style={styles.btnText}>Joined</Text>
        </View>
      ) : (
        <View style={styles.unJoined}>
          <PlusIcon color="white" />
          <Text style={styles.btnText}>Join</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default SpaceJoinBtn;

const styles = StyleSheet.create({
  btnContainer: {
    width: 150,
    flexDirection: "row",
    height: 50,
    borderRadius: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  joined: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "white",
    borderStyle: "solid",
    alignItems: "center",
    height: "100%",
    borderRadius: 50,
  },
  unJoined: {
    width: "100%",
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    height: "100%",
    backgroundColor: "#00868C",

    borderRadius: 50,
  },
  btnText: {
    // text-center text-lg ms-3 font-semibold text-white
    textAlign: "center",
    fontSize: 16,
    marginStart: 5,
    fontWeight: "600",
    color: "white",
  },
});
