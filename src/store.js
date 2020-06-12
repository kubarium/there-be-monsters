import Vue from 'vue'
import Vuex from 'vuex'
import data from "@/data/BestiaryCompendium1.4.0.json"
import CR from "@/data/cr.json";

const Environments = ["Arctic", "Coastal", "Desert", "Forest", "Grassland", "Hill", "Mountain", "Swamp", "Underdark", "Underwater", "Urban"];
const Languages = ["Auran", "Aarakocra", "Abyssal", "Aquan", "Blink Dog", "Bothii", "Bullywug", "Celestial", "Common", "Deep Speech", "Draconic", "Druidic", "Dwarvish", "Elvish", "Giant", "Giant Eagle", "Giant Elk", "Giant Owl", "Gith", "Gnoll", "Gnomish", "Goblin", "Grell", "Halfling", "Hook Horror", "Ice Toad", "Ignan", "Infernal", "Ixitxachitl", "Modron", "Netherese", "Orc", "Otyugh", "Primordial", "Sahuagin", "Slaad", "Sphinx", "Sylvan", "Telepathy", "Terran", "Thayan", "Thri-kreen", "Troglodyte", "Umber Hulk", "Undercommon", "Winter Wolf", "Worg", "Yeti", "Yikaria"];
const Types = ["Aberration", "Beast", "Celestial", "Construct", "Dragon", "Elemental", "Fey", "Fiend", "Giant", "Humanoid", "Monstrosity", "Ooze", "Plant", "Swarm Of Tiny Beasts", "Undead"];
const sizes = {
  "T": "Tiny",
  "S": "Small",
  "M": "Medium",
  "L": "Large",
  "H": "Huge",
  "G": "Gargantuan"
};

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentEncounter: null,
    encounters: []
  },
  mutations: {
    markEncounter(state, index) {
      state.currentEncounter = index
    },
    saveEncounters(state) {
      localStorage.setItem("there-be-monsters-encounters", JSON.stringify(state.encounters))
    },
    loadEncounters(state) {
      state.encounters = JSON.parse(localStorage.getItem("there-be-monsters-encounters")) || []
    }
  },
  getters: {
    monsters: () => data.map(monster => monster.name),
    fetchMonster: () => (name) => data.find(monster => monster.name == name),
    CR: () => CR,
    sizes: () => sizes
  },
  actions: {
    deleteMonster({ state, commit }, payload) {
      state.encounters[payload.index].monsters.splice(payload.mindex, 1)
      commit("saveEncounters")
    },
    addMonster({ state, commit }, name) {
      if (!state.encounters[state.currentEncounter].monsters.find(monster => monster == name) && name) {
        state.encounters[state.currentEncounter].monsters.unshift(name)
        state.encounters[state.currentEncounter].monsters.sort()
        commit("saveEncounters")
      }
    },
    deleteEncounter({ state, commit }, index) {
      state.encounters.splice(index, 1)
      commit("saveEncounters")
    },
    addEncounter({ state, commit }) {
      state.encounters.push({
        title: "New Encounter",
        monsters: []
      })
      commit("markEncounter", state.encounters.length - 1)
      commit("saveEncounters")
    }, updateEncounterTitle({ state, commit }, payload) {
      state.encounters[payload.index].title = payload.value
      commit("saveEncounters")

    },
  }
})
