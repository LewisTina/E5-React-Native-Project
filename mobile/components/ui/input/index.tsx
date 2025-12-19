import { Control, FieldValues, useController } from "react-hook-form";
import { StyleSheet, Text, TextInput } from "react-native";

export default function Input(props: {
  name: string;
  controller: Control<FieldValues, any, FieldValues>;
  placeholder: string;
  className?: object;
  multiline?: boolean;
  numberOfLines?: number;
  keyboardType?: "default" | "email-address" | "numeric" | "phone-pad";
  editable?: boolean;
  secureTextEntry?: boolean;
  autocapitalize?: "none" | "sentences" | "words" | "characters";
}) {
  const { field, formState } = useController({
    name: props.name,
    control: props.controller,
    defaultValue: "",
  });
  const { errors } = formState;
  const errorMessage = errors[props.name]?.message as string | undefined;

  return (
    <>
      <TextInput
        style={[styles.input, props.className ? props.className : {}]}
        placeholder={props.placeholder}
        value={field.value}
        onChangeText={field.onChange}
        multiline={props.multiline ? true : false}
        numberOfLines={props.numberOfLines ? props.numberOfLines : 1}
        placeholderTextColor="#9ca3af"
        textAlignVertical="top"
        keyboardType={props.keyboardType ? props.keyboardType : "default"}
        editable={props.editable !== undefined ? props.editable : true}
        secureTextEntry={props.secureTextEntry ? props.secureTextEntry : false}
        autoCapitalize={
          props.autocapitalize ? props.autocapitalize : "sentences"
        }
      />
      {errorMessage && (
        <Text
          style={{
            color: "red",
            backgroundColor: "rgba(255, 0, 0, 0.1)",
            marginTop: 4,
            fontSize: 14,
          }}
        >
          {errorMessage}
        </Text>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    flex: 1,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: "#111827",
    borderWidth: 2,
    borderColor: "transparent",
  },
  inputWithIcon: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9fafb",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 2,
    borderColor: "transparent",
    gap: 12,
  },
  inputFlex: {
    flex: 1,
    fontSize: 16,
    color: "#111827",
  },
});
