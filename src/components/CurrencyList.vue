<script setup>
import axios from "axios"
import { onMounted, ref } from "vue"
const URL = "http://127.0.0.1:8000/api/currencies"

const api_data = ref('')

onMounted(() => {
  axios.get(URL).then((response) => {
    api_data.value = response.data.currencies
  })
})
</script>

<template>
  <div class="flex flex-col">
    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
        <div class="overflow-hidden">
          <table class="min-w-full">
            <thead class="border-b">
              <tr>
                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                  #
                </th>
                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                  Nom de la devise
                </th>
                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                  Code de la devise
                </th>
                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                  Symbole de la devise
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b" v-for="data in api_data" :key="data.id" scope="row">
                <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"> {{ data.id}}</td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {{ data.currency_name }}
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {{ data.currency_code }}
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {{ data.currency_symbol }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>