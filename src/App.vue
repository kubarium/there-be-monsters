<template>
  <v-app>
    <v-app-bar app color="green" dark>
      <div class="d-flex align-center">
        <h1>
          There Be Monsters
        </h1>
      </div>

      <v-spacer></v-spacer>
      <v-autocomplete
        :items="$store.getters.monsters"
        label="Monsters"
        class="mx-3"
        clearable
        open-on-clear
        placeholder="Add a monster to the selected encounter"
        hide-details
        :disabled="$store.state.encounters.length == 0"
        @change="$store.dispatch('addMonster', $event)"
      />
      <v-btn @click="$store.dispatch('addEncounter')">Create Encounter</v-btn>
    </v-app-bar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
  export default {
    name: "App",
    data: () => ({
      //
    }),
    mounted() {
      this.$store.commit("loadEncounters");
    }
  };
</script>
