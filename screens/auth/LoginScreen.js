import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import EncabezadoLogin from "../../components/login/EncabezadoLogin";
import FormLogin from "../../components/login/FormLogin";
import useAuth from "../../hooks/useAuth";

export default function LoginScreen() {

  const { loading, documento, password, showPassword, toggleShowPassword, setDocumento, setPassword, handleLogin,
    goRegistrar } = useAuth();

  return (
    <SafeAreaView style={[tw`flex-1 bg-white`, { paddingTop: StatusBar.currentHeight || 0 }]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={tw`flex-1`}
      >
        <ScrollView contentContainerStyle={tw`flex-grow`}>
          <View style={tw`flex-1 justify-center items-center p-4`}>
            <EncabezadoLogin />
            <FormLogin
              documento={documento}
              password={password}
              handleLogin={handleLogin}
              setDocumento={setDocumento}
              setPassword={setPassword}
              loading={loading}
              show={showPassword}
              toggleShowPassword={toggleShowPassword}
            />
            <TouchableOpacity style={tw`flex-row mt-4`} onPress={goRegistrar}>
              <Text style={tw`text-gray-500`}>No tienes cuenta? </Text>
              <Text style={tw`text-gray-500 font-bold`}>registrate</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
