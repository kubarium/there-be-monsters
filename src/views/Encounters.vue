<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-card>
          <v-tabs dark background-color="teal darken-3" v-if="$store.state.encounters.length" v-model="tab" show-arrows>
            <v-tabs-slider color="teal lighten-3"></v-tabs-slider>

            <v-tab v-for="(encounter, index) in $store.state.encounters" :key="`encounter-${index}`">
              <v-text-field
                :value="encounter.title"
                prepend-icon="fa-window-close"
                append-outer-icon="far fa-dot-circle"
                @input="$store.dispatch('updateEncounterTitle', { index, value: $event })"
                @click:prepend="$store.dispatch('deleteEncounter', index)"
              />
            </v-tab>
            <v-tab-item v-for="(encounter, index) in $store.state.encounters" :key="index">
              <v-card flat>
                <v-card-text class="pa-0">
                  <p v-if="!encounter.monsters.length" class="pa-10">
                    Now add any monster to this encounter.
                  </p>
                  <v-tabs v-else vertical color="green lighten-3" background-color="teal lighten-1" show-arrows>
                    <v-tab
                      v-for="(monster, mindex) in encounter.monsters"
                      :key="`monster-${mindex}`"
                      class="justify-start"
                    >
                      <v-icon left @click="$store.dispatch('deleteMonster', { index, mindex })">
                        fa-window-close
                      </v-icon>
                      {{ monster }}
                    </v-tab>
                    <v-tab-item v-for="(monster, mindex) in encounter.monsters" :key="mindex">
                      <Monster :monster="$store.getters.fetchMonster(monster)" />
                    </v-tab-item>
                  </v-tabs>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs>

          <p class="pa-10" v-else>
            Create an encounter first then store monsters for that encounter.
          </p>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import Monster from "@/components/Monster.vue";
  export default {
    name: "Encounters",

    data: () => ({}),
    components: { Monster },
    computed: {
      tab: {
        set(index) {
          this.$store.commit("markEncounter", index);
        },
        get() {
          return this.$store.state.currentEncounter;
        }
      }
    },
    methods: {}
  };
</script>
