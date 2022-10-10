<script setup>
import axios from "axios"
import { onMounted, ref } from "vue"

const URL = "http://127.0.0.1:8000/api/pairs"
const api_data = ref([])
const currency_id_a = ref([])
const currency_id_b = ref([])

onMounted(() => {
  axios.get(URL).then((response) => {
      api_data.value = response.data.pair
      api_data.value.forEach((element) => {
        let requestA = `http://127.0.0.1:8000/api/currencies/${element.currency_id_a}`
        let requestB = `http://127.0.0.1:8000/api/currencies/${element.currency_id_b}`
        const requestOne = axios.get(requestA)
        const requestTwo = axios.get(requestB)
        axios.all([requestOne, requestTwo])
          .then(
            axios.spread((...responses) => {
              currency_id_a.value.push(responses[0].data.currency)
              currency_id_b.value.push(responses[1].data.currency)
            }),
          )
          .catch((error) => {
            console.log(error);
          });
      });
    })
    .catch((error) => {
      console.log(error);
    })
  })

</script>

<template>
  <h1 class="font-medium leading-tight text-5xl mt-0 mb-2 text-blue-600 text-center uppercase">tableau d'administration</h1>
  <div class="flex flex-col">
    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
        <div class="overflow-hidden">
          <table class="min-w-full">
            <thead class="border-b">
              <tr>
                <th scope="col" class="text-sm font-semibold text-gray-900 px-6 py-4 text-left">
                  Nom de la paire
                </th>
                <th scope="col" class="text-sm font-semibold text-gray-900 px-6 py-4 text-left">
                  Taux de change
                </th>
                <th scope="col" class="text-sm font-semibold text-gray-900 px-6 py-4 text-left">
                  Décompte
                </th>
                <th scope="col" class="text-sm font-semibold text-gray-900 px-6 py-4 text-left">
                  Modifier
                </th>
                <th scope="col" class="text-sm font-semibold text-gray-900 px-6 py-4 text-left">
                  Supprimer
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="data in currency_id_a" :key="data.id" class="border-b" scope="row">
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {{ data.currency_name }}
                </td>
                <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>


<!-- <template>
  <div>
    <h1>tableau d'administration</h1>
    <hr />
    <table class="table table-striped table-dark">
      <thead>
        <tr>
          <th>Nom de la paire</th>
          <th>Taux de change</th>
          <th>Décompte</th>
          <th>Modifier</th>
          <th>Supprimer</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="pair in pairs" :key="pair.id">
          <td>
            {{ currency_id_a[1].currency_code }}'=>'{{
            currency_id_b[1].currency_code
            }}
          </td>
          <td>{{ pair.exchange_rate_a_to_b }}</td>
          <td>{{ pair.count }}</td>
          <td><button class="btn btn-primary">Modifier</button></td>
          <td><button class="btn btn-primary">Supprimer</button></td>
        </tr>
      </tbody>
    </table>
  </div>
  <div class="flex space-x-2 justify-center">
    <div>
      <button type="button"
        class="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Ajouter
        une nouvelle paire de devise</button>
    </div>
  </div>
</template> -->
