import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import DatePicker from "react-native-date-picker";

export default function EditProfileModal({
  visible,
  onClose,
  initialData,
  onSave,
}) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    username: initialData?.username || "",
    phone: initialData?.phone || "",
    birthday: initialData?.birthday
      ? new Date(2003, 1, 1)
      : new Date(1993, 1, 1),
    bio: initialData?.bio || "",
  });
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSave = () => {
    onSave({
      ...formData,
      birthday: formData.birthday.toISOString().split("T")[0], // Format as YYYY-MM-DD
    });
    onClose();
  };

  const handleDateChange = (date) => {
    setFormData((prev) => ({ ...prev, birthday: date }));
  };

  const formatDate = (date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={visible}
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container}>
        <ScrollView>
          <View style={styles.header}>
            <View style={styles.headerLine} />
            <Text style={styles.headerText}>Edit Profile</Text>
          </View>

          <View style={styles.imageContainer}>
            <View style={styles.imageWrapper}>
              <Image
                source={{
                  uri:
                    initialData?.photo ||
                    "/placeholder.svg?height=128&width=128",
                }}
                style={styles.profileImage}
              />
              <TouchableOpacity style={styles.editImageButton}>
                <Image
                  source={{ uri: "/placeholder.svg?height=20&width=20" }}
                  style={styles.editIcon}
                />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                value={formData.name}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, name: text }))
                }
                placeholder="Enter your name"
                placeholderTextColor="#999999"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Username</Text>
              <TextInput
                style={styles.input}
                value={formData.username}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, username: text }))
                }
                placeholder="Enter username"
                placeholderTextColor="#999999"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Phone number</Text>
              <TextInput
                style={styles.input}
                value={formData.phone}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, phone: text }))
                }
                placeholder="Enter phone number"
                placeholderTextColor="#999999"
                keyboardType="phone-pad"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Birthday</Text>
              <TouchableOpacity
                style={styles.birthdayButton}
                onPress={() => setShowDatePicker(true)}
              >
                <Text style={styles.birthdayButtonText}>
                  {formatDate(formData.birthday)}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Bio</Text>
              <TextInput
                style={[styles.input, styles.bioInput]}
                value={formData.bio}
                onChangeText={(text) =>
                  setFormData((prev) => ({ ...prev, bio: text }))
                }
                placeholder="Write something about yourself"
                placeholderTextColor="#999999"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
              />
            </View>

            <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <Modal visible={showDatePicker} transparent={true} animationType="fade">
          <View style={styles.datePickerModal}>
            <View style={styles.datePickerContainer}>
              <DatePicker
                date={formData.birthday}
                onDateChange={handleDateChange}
                mode="date"
                maximumDate={new Date()}
                minimumDate={new Date(1900, 0, 1)}
                androidVariant="iosClone"
                textColor="#0e1922"
              />
              <TouchableOpacity
                style={styles.closeDatePickerButton}
                onPress={() => setShowDatePicker(false)}
              >
                <Text style={styles.closeDatePickerButtonText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    alignItems: "center",
    paddingVertical: 16,
  },
  headerLine: {
    width: 48,
    height: 4,
    backgroundColor: "#d9d9d9",
    borderRadius: 2,
    marginBottom: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: "600",
    color: "#0e1922",
  },
  imageContainer: {
    alignItems: "center",
    marginVertical: 32,
  },
  imageWrapper: {
    position: "relative",
  },
  profileImage: {
    width: 128,
    height: 128,
    borderRadius: 64,
  },
  editImageButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#00868c",
    padding: 8,
    borderRadius: 20,
  },
  editIcon: {
    width: 20,
    height: 20,
  },
  formContainer: {
    paddingHorizontal: 16,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 8,
    color: "#0e1922",
  },
  input: {
    backgroundColor: "#f3faff",
    padding: 16,
    borderRadius: 8,
    fontSize: 16,
    color: "#0e1922",
  },
  bioInput: {
    height: 120,
  },
  birthdayButton: {
    backgroundColor: "#f3faff",
    padding: 16,
    borderRadius: 8,
  },
  birthdayButtonText: {
    fontSize: 16,
    color: "#0e1922",
  },
  saveButton: {
    backgroundColor: "#00868c",
    paddingVertical: 16,
    borderRadius: 8,
    marginTop: 16,
    marginBottom: 24,
  },
  saveButtonText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
  },
  datePickerModal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  datePickerContainer: {
    backgroundColor: "#ffffff",
    borderRadius: 8,
    padding: 16,
    width: "90%",
  },
  closeDatePickerButton: {
    backgroundColor: "#00868c",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  closeDatePickerButtonText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
});
