<script setup>
import { RouterLink } from 'vue-router';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();

const schema = yup.object().shape({
  email: yup.string().required().email(),
  password: yup.string().required(),
});

const onSubmit = async (values) => {
  const { email, password } = values;

  await authStore.login(email, password);
};
</script>

<template>
  <Form @submit="onSubmit" :validation-schema="schema">
    <Field name="email" type="email" placeholder="Email" />
    <ErrorMessage name="email" />

    <Field name="password" type="password" placeholder="Password" />
    <ErrorMessage name="password" />

    <button type="submit">Submit</button>
  </Form>

  <router-link to="/register" class="nav-link mt-4 text-center text-primary">
    Do not have an account yet? Register here.
  </router-link>
</template>
