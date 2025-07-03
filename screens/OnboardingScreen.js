import {
  View,
  StyleSheet,
  Text,
  TextInput,
  Button,
  Platform,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useState } from "react";

export default function OnboardingScreen({ navigation }) {
  const { control, handleSubmit } = useForm();
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onSubmit = (data) => {
    console.log("입력값:", data);
    navigation.navigate("MainTabs");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>이름</Text>
      <Controller
        control={control}
        name="name"
        defaultValue=""
        render={({ field: { value, onChange } }) => (
          <TextInput
            style={styles.input}
            placeholder="이름 입력"
            value={value}
            onChangeText={onChange}
          />
        )}
      />

      <Text style={styles.label}>입대일</Text>
      <Controller
        control={control}
        name="enlistDate"
        defaultValue={new Date()}
        render={({ field: { value, onChange } }) => (
          <>
            <Button
              title={value ? value.toDateString() : "입대일 선택"}
              onPress={() => setShowDatePicker(true)}
            />
            {showDatePicker && (
              <DateTimePicker
                value={value || new Date()}
                mode="date"
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={(e, selectedDate) => {
                  setShowDatePicker(false);
                  if (selectedDate) onChange(selectedDate);
                }}
              />
            )}
          </>
        )}
      />

      <Text style={styles.label}>복무 형태</Text>
      <Controller
        control={control}
        name="serviceType"
        defaultValue="육군"
        render={({ field: { value, onChange } }) => (
          <View style={styles.pickerWrapper}>
            <Picker selectedValue={value} onValueChange={onChange}>
              <Picker.Item label="육군" value="육군" />
              <Picker.Item label="해군" value="해군" />
              <Picker.Item label="공군" value="공군" />
              <Picker.Item label="기타" value="기타" />
            </Picker>
          </View>
        )}
      />

      <Button title="완료" onPress={handleSubmit(onSubmit)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, justifyContent: "center" },
  label: { fontSize: 16, marginTop: 12 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginTop: 4,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginTop: 4,
  },
});
