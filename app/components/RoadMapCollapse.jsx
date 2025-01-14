import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Collapse from "./Collapse";
import DownloadModal from "./DownloadModal";
import Mashq from "./Mashq";
import ImageDownloadModal from "./ImageDownloadModal";
import VideoRedirectModal from "./VideoDownloadModal";

const RoadMapCollapse = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalImageVisible, setIsModalImageVisible] = useState(false);
  const [isModalVideoVisible, setIsModalVideoVisible] = useState(false);
  const [imageUrl, setImageUrl] = useState();
  const [title, setTitle] = useState();
  const [subtitle, setSubtitle] = useState();
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
  const handleImagePress = (title) => {
    console.log("Mashq button pressed");
    // Add your logic here
    switch (title) {
      case "Basic movements":
        setImageUrl("https://i.ibb.co/4ZfKKnb/Ruqaa-Movements.jpg");
        setTitle("Four basic movements");
        setSubtitle(
          "Basic movements in Ruqa’aa from which other letters are built"
        );
        break;

      case "Letters":
        setImageUrl("https://i.ibb.co/L9Nk55Q/Ruqaa-letters.png");
        setTitle("Ruqa’aa Letters");
        setSubtitle("Ruqa’aa Script letters from Hattat Mokhtar Alem Mashq");
        break;

      case "Words":
        setImageUrl("https://i.ibb.co/ns2fmPK/Ruqaa-words.jpg");
        setTitle("Ruqa’aa Words");
        setSubtitle(
          "Some words that explains how a single letter can come in many shapes while connecting with other letters"
        );
        break;
      case "Phrases":
        setImageUrl("https://i.ibb.co/QHRqqZL/ruqaa-phrases.jpg");
        setTitle("Ruqa’aa Pharses");
        setSubtitle(
          "Some phrases written with Ruqa’aa script to practice by Hattat Mokhtar Alem"
        );
        break;

      default:
      // Code to execute if none of the cases match
    }
    setIsModalImageVisible(true);
  };
  const handleVideoPress = () => {
    console.log("Mashq button pressed");
    // Add your logic here
    setIsModalVideoVisible(true);
  };

  return (
    <View className="px-3">
      <Collapse title="Ruq’aa Script">
        <Mashq number={1} title="Mashq" onPress={handlePress} />
        <Mashq
          number={2}
          title="Basic movements"
          onPress={() => handleImagePress("Basic movements")}
        />
        <Mashq
          number={3}
          title="Letters"
          onPress={() => handleImagePress("Letters")}
        />
        <Mashq
          number={4}
          title="Words"
          onPress={() => handleImagePress("Words")}
        />
        <Mashq
          number={5}
          title="Phrases"
          onPress={() => handleImagePress("Phrases")}
        />
        <Mashq number={6} title="Playlist" onPress={handleVideoPress} />
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
        title={title}
        subtitle={subtitle}
        imageUrl={imageUrl} // Replace with your actual image URL
      />
      <VideoRedirectModal
        isVisible={isModalVideoVisible}
        onClose={() => setIsModalVideoVisible(false)}
        title="Introduction to Ruqa’aa"
        subtitle="A playlist by Hattat Ahmed Al-Agha for beginners"
        thumbnailUrl="https://i.ibb.co/LvLLJcy/Screenshot-2025-01-09-220431.png"
        playlistUrl="https://www.youtube.com/playlist?list=PLV2SrnjkdtSkES5_KP9Pf_I819a9KVvho"
      />
    </View>
  );
};

export default RoadMapCollapse;
