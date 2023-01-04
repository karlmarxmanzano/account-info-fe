<script setup>
import { RouterLink } from 'vue-router';
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import { useAuthStore } from '@/stores/auth';
import router from '../router';

const authStore = useAuthStore();

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().required().email(),
  password: yup.string().required(),
  password_confirmation: yup.string().required(),
});

const onSubmit = async (values) => {
  const { name, email, password, password_confirmation } = values;

  await authStore
    .register(name, email, password, password_confirmation)
    .then(() => router.push({ name: 'dashboard' }))
    .catch(e => alert(e.response?.data.message));
};
</script>

<template>
  <div class="col-md-12">
    <div class="card shadow-sm" style="width: 25rem">
      <div class="card-body p-5">
        <h2 class="text-center">Registration</h2>

        <Form @submit="onSubmit" :validation-schema="schema" class="form mt-5">
          <div>
            <div class="form-group mb-3">
              <label for="name">Name</label>
              <Field name="name" type="text" class="form-control" />
              <ErrorMessage name="name" />
            </div>

            <div class="form-group mb-3">
              <label for="email">Email</label>
              <Field name="email" type="email" class="form-control" />
              <ErrorMessage name="email" />
            </div>

            <div class="form-group mb-3">
              <label for="password">Password</label>
              <Field name="password" type="password" class="form-control" />
              <ErrorMessage name="password" />
            </div>

            <div class="form-group mb-4">
              <label for="password_confirmation">Confirm Password</label>
              <Field
                name="password_confirmation"
                type="password"
                class="form-control"
              />
              <ErrorMessage name="password_confirmation" />
            </div>

            <button type="submit" class="btn btn-primary w-100">Submit</button>
          </div>
        </Form>
      </div>
    </div>

    <router-link to="/" class="nav-link mt-4 text-center text-primary">
      Already have an account? Log in here.
    </router-link>
  </div>
</template>
