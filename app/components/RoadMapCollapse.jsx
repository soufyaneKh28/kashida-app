import { View, Text } from "react-native";
import React from "react";
import Collapse from "./Collapse";

const RoadMapCollapse = () => {
  return (
    <View className="px-3">
      <Collapse title="Ruq’aa Script">
        <Text>
          This is the content of section 1. You can add any custom content here!
        </Text>
      </Collapse>
      <Collapse title="Diwani Script">
        <View>
          <Text>Section 2 has more content!</Text>
          <Text>
            You can add more components here, such as images or lists.
          </Text>
          <Text>
            You can add more components here, such as images or lists.
          </Text>
          <Text>
            You can add more components here, such as images or lists.
          </Text>
          <Text>
            You can add more components here, such as images or lists.
          </Text>
        </View>
      </Collapse>
      <Collapse title="Thuluth Script">
        <View>
          <Text>Section 2 has more content!</Text>
          <Text>
            You can add more components here, such as images or lists.
          </Text>
          <Text>
            You can add more components here, such as images or lists.
          </Text>
          <Text>
            You can add more components here, such as images or lists.
          </Text>
          <Text>
            You can add more components here, such as images or lists.
          </Text>
        </View>
      </Collapse>
      <Collapse title="Naskh Script">
        <View>
          <Text>Section 2 has more content!</Text>
          <Text>
            You can add more components here, such as images or lists.
          </Text>
          <Text>
            You can add more components here, such as images or lists.
          </Text>
          <Text>
            You can add more components here, such as images or lists.
          </Text>
          <Text>
            You can add more components here, such as images or lists.
          </Text>
        </View>
      </Collapse>
    </View>
  );
};

export default RoadMapCollapse;
