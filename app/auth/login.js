import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import React, { useEffect } from 'react'
import { Formik } from 'formik'
import * as Yup from "yup"
import { Stack, useRouter } from 'expo-router';
import { useMutation } from '@tanstack/react-query';
import { loginUser } from '../(services)/api/api';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserAction } from '../(redux)/authSlice';


//Schema
const validationSchema = Yup.object().shape({
  email: Yup.string().required("Email is required").email().label("Email"),
  password: Yup.string().required("Password is required").min(4).label("Password"),
});

const Login = () => {
    const mutation = useMutation({
      mutationFn: loginUser,
      mutationKey: ["login"],
    });
    //dispatch
    const dispatch = useDispatch()

    const auth = useSelector((state) => state?.auth)
    
    const router = useRouter();

    

    
  return (
    <View style={styles.container}>
      <Stack.Screen options={{title: "Login"}} />
      <Image style={styles.image} source={require("../../assets/logo.png")} />
      <Text style={styles.title}>Login</Text>

      {/* Display messages */}
      {mutation?.isError && (
        <Text style={styles.errorText}>
          {mutation?.error?.response?.data?.message}
        </Text>
      )}
      {mutation?.isSuccess && (
        <Text style={styles.successText}>Logged in successfully</Text>
      )}

      {/* Formik configuration */}
      <Formik
        initialValues={{ email: "user1@email.com", password: "123456" }}
        onSubmit={(values) => {
          //calling mutation
          mutation
            .mutateAsync(values)
            .then((data) => {
              dispatch(loginUserAction(data));
              router.push("/(tabs)");
            })
            .catch((error) => {});

          //
        }}
        validationSchema={validationSchema}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              value={values.email}
              keyboardType="email-address"
            />
            {/* Error messages */}
            {errors.email && touched.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}

            <TextInput
              style={styles.input}
              placeholder="Password"
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
              secureTextEntry
            />
            {/* Error messages */}
            {errors.password && touched.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            {/* Login Button */}
            <TouchableOpacity onPress={handleSubmit}>
              <View style={styles.button}>
                {mutation?.isPending ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <Text style={styles.buttonText}>Login</Text>
                )}
              </View>
            </TouchableOpacity>
          </View>
        )}
      </Formik>
    </View>
  );
}

export default Login

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: "#8ac926",
    borderWidth: 5,
    resizeMode: "cover",
    marginBottom: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#333",
  },
  form: {
    width: "100%",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: "#fff",
  },
  errorText: {
    color: "red",
    marginBottom: 16,
  },
  successText: {
    color: "#8ac926",
    marginBottom: 16,
  },
  button: {
    height: 50,
    backgroundColor: "#8ac926",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 16,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});