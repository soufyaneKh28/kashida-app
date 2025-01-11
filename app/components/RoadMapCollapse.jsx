import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Collapse from "./Collapse";
import DownloadModal from "./DownloadModal";
import Mashq from "./Mashq";
import ImageDownloadModal from "./ImageDownloadModal";

const RoadMapCollapse = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalImageVisible, setIsModalImageVisible] = useState(false);
  const handleDownload = async () => {
    // Implement your download logic here
    console.log("Downloading...");
    // Close modal after download
    setIsModalVisible(false);
  };

  const handlePress = () => {
    console.log("Mashq button pressed");
    // Add your logic here
    setIsModalVisible(true);
  };
  const handleImagePress = () => {
    console.log("Mashq button pressed");
    // Add your logic here
    setIsModalImageVisible(true);
  };

  return (
    <View className="px-3">
      <Collapse title="Ruq’aa Script">
        <Mashq number={1} title="Mashq" onPress={handlePress} />
        <Mashq number={2} title="Basic movements" onPress={handleImagePress} />
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

      {/* <DownloadModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        title="Hattat Muhammed Izzat Mashq"
        subtitle="the classic Osmanlic way in learning ruqa'aa script"
        imageUrl="https://i.ibb.co/mNqSR5P/rukaaPdf.png" // Replace with your image URL
        onDownload={handleDownload}
      /> */}

      <DownloadModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        title="Hattat Muhammed Izzat Mashq"
        subtitle="the classic Osmanlic way in learning ruqa'aa script"
        imageUrl="https://i.ibb.co/mNqSR5P/rukaaPdf.png" // Replace with your image URL
        pdfUrl="https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf" // Replace with your PDF URL
      />
      <ImageDownloadModal
        isVisible={isModalImageVisible}
        onClose={() => setIsModalImageVisible(false)}
        title="Four basic movements"
        subtitle="Basic movements in Ruqa'aa from which other letters are built"
        imageUrl="https://i.ibb.co/mNqSR5P/rukaaPdf.png" // Replace with your actual image URL
      />
    </View>
  );
};

export default RoadMapCollapse;
