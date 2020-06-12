<template>
  <div id="monster-container">
    <div class="bar"></div>
    <div id="monster">
      <h1>{{ monster.name }}</h1>
      <h2>{{ $store.getters.sizes[monster.size] }} {{ monster.type }}, {{ monster.alignment }}</h2>
      <div class="divider"></div>
      <div>
        <div>
          <h4>Armor Class</h4>
          {{ monster.ac }}
        </div>
        <div>
          <h4>Hit Points</h4>
          {{ monster.hp }}
        </div>
        <div>
          <h4>Speed</h4>
          {{ monster.speed }}
        </div>
        <div class="d-flex">
          <h4>Passive Perception</h4>
          {{ monster.passive }}
          <v-spacer />
          <h4>CR</h4>
          {{ monster.cr }} ({{ `${$store.getters.CR[monster.cr]} XP` }})
        </div>
      </div>
      <div class="divider"></div>
      <div class="d-flex text-center justify-space-between px-2">
        <div class="d-flex flex-column">
          <span class="font-weight-bold">STR</span>
          <span>{{ attribute(monster.str) }}</span>
        </div>
        <div class="d-flex flex-column">
          <span class="font-weight-bold">DEX</span>
          <span>{{ attribute(monster.dex) }}</span>
        </div>
        <div class="d-flex flex-column">
          <span class="font-weight-bold">CON</span>
          <span>{{ attribute(monster.con) }}</span>
        </div>
        <div class="d-flex flex-column">
          <span class="font-weight-bold">INT</span>
          <span>{{ attribute(monster.int) }}</span>
        </div>
        <div class="d-flex flex-column">
          <span class="font-weight-bold">WIS</span>
          <span>{{ attribute(monster.wis) }}</span>
        </div>
        <div class="d-flex flex-column">
          <span class="font-weight-bold">CHA</span>
          <span>{{ attribute(monster.cha) }}</span>
        </div>
      </div>

      <div
        class="divider"
        v-if="
          monster.save ||
            monster.skill ||
            monster.resist ||
            monster.immune ||
            monster.conditionImmune ||
            monster.senses ||
            monster.languages
        "
      ></div>
      <section>
        <div class="property-block" v-if="monster.save">
          <h4>Saving Throws</h4>
          <p>{{ monster.save }}</p>
        </div>

        <div class="property-block" v-if="monster.skill">
          <h4>Skills</h4>
          <p v-for="skill in monster.skill" :key="skill">{{ skill }}</p>
        </div>

        <div class="property-block" v-if="monster.resist">
          <h4>Damage Resistances</h4>
          <p>{{ monster.resist }}</p>
        </div>

        <div class="property-block" v-if="monster.immune">
          <h4>Damage Immunities</h4>
          <p>{{ monster.immune }}</p>
        </div>

        <div class="property-block" v-if="monster.conditionImmune">
          <h4>Condition Immunities</h4>
          <p>{{ monster.conditionImmune }}</p>
        </div>

        <div class="property-block" v-if="monster.senses">
          <h4>Senses</h4>
          <p>{{ monster.senses }}</p>
        </div>

        <div class="property-block" v-if="monster.languages">
          <h4>Languages</h4>
          <p>{{ monster.languages }}</p>
        </div>
      </section>

      <section v-if="monster.trait">
        <div class="divider"></div>

        <div class="trait-block" v-for="trait in monster.trait" :key="trait.name">
          <h4>{{ trait.name }}.</h4>

          <p v-for="(text, index) in trait.text" :key="index">{{ text }}</p>
        </div>
      </section>

      <section v-if="monster.action">
        <div class="divider mb-3"></div>
        <h3>Actions</h3>
        <div class="trait-block" v-for="action in monster.action" :key="action.name">
          <h4>{{ action.name }}.</h4>

          <p v-for="(text, index) in action.text" :key="index">{{ text }}</p>

          <p v-show="monster.attack" v-for="attack in monster.attack" :key="attack">{{ attack }}</p>
        </div>
      </section>

      <section v-if="monster.reaction">
        <h3>Reactions</h3>
        <div class="trait-block" v-for="reaction in monster.reaction" :key="reaction.name">
          <h4>{{ reaction.name }}.</h4>

          <p v-for="(text, index) in reaction.text" :key="index">{{ text }}</p>
        </div>
      </section>

      <section v-if="monster.legendary">
        <h3>Legendary Actions</h3>
        <div class="trait-block" v-for="legendary in monster.legendary" :key="legendary.name">
          <h4>{{ legendary.name }}.</h4>

          <p v-for="(text, index) in legendary.text" :key="index">{{ text }}</p>
        </div>
      </section>
    </div>
    <div class="bar"></div>
  </div>
</template>

<script>
  export default {
    props: { monster: { type: Object, required: true } },
    created() {
      console.log(this.monster);
    },
    methods: {
      attribute(score) {
        var bonus = Math.floor((score - 10) / 2);
        var modifier = bonus >= 0 ? `(+${bonus})` : `(${bonus})`;
        return `${score} ${modifier}`;
      },
      attackSummary(attack) {
        var damage = attack.split("|")[2];
        var modifier;
        var roll;
        var times;
        var die;
        if (damage.search(/\+/) > -1) {
          roll = damage.split("+")[0];
          modifier = Number(damage.split("+")[1]);
        } else {
          roll = damage;
          modifier = 0;
        }

        times = Number(roll.split("d")[0]);
        die = Number(roll.split("d")[1]);

        damage = Math.floor((times * (die + 1)) / 2 + modifier);

        return `${attack} (${damage})`;
      }
    }
  };
</script>

<style scoped>
  #monster-container {
    max-width: 430px;
    margin: 10px auto;
    text-align: left;
  }

  .divider {
    width: 0;
    margin: 3px 0;
    height: 0;
    border-style: solid;
    border-width: 1px 0 2px 410px;
    border-color: transparent transparent transparent #922610;
  }

  #monster {
    color: #7a200d;
    font-family: "Noto Sans", "Myriad Pro", Calibri, Helvetica, Arial, sans-serif;
    font-size: 13.5px;
    background: #fdf1dc url("../assets/monster-background.jpg");
    padding: 0.6em;
    padding-bottom: 0.5em;
    border: 1px #ddd solid;
    box-shadow: 0 0 1.5em #867453;
    position: relative;
    z-index: 0;
    -webkit-columns: 320px;
    -moz-columns: 320px;
    columns: 320px;
    -webkit-column-gap: 40px;
    -moz-column-gap: 40px;
    column-gap: 40px;
    -webkit-column-fill: auto;
    -moz-column-fill: auto;
    column-fill: auto;
  }

  .bar {
    height: 7px;
    position: relative;
    left: -0.5%;
    right: -0.5%;
    width: 101%;
    background: #e69a28;
    border: 1px solid #000;
  }
  section1 {
    outline: 1px solid red;
  }
  .trait-block {
    display: block;
  }

  .trait-block {
    color: #333333;
    margin: 0.5em 0;
  }
  .trait-block > div {
    margin: 5px 0;
  }

  .trait-block h4 {
    font-style: italic;
  }

  h1 {
    font-family: "Libre Baskerville", "Lora", "Calisto MT", "Bookman Old Style", Bookman, "Goudy Old Style", Garamond,
      "Hoefler Text", "Bitstream Charter", Georgia, serif;
    font-weight: 700;
    margin: 0px;
    font-size: 23px;
    font-variant: small-caps;
  }

  h2 {
    font-weight: normal;
    font-style: italic;
    font-size: 12px;
    margin: 0;
  }

  h3 {
    border-bottom: 1px solid #7a200d;
    color: #7a200d;
    font-size: 21px;
    font-variant: small-caps;
    font-weight: normal;
    letter-spacing: 1px;
    margin: 0;
    margin-bottom: 0.3em;
    break-inside: avoid-column;
    break-after: avoid-column;
  }

  h4 {
    margin-right: 3px;
    display: inline;
    font-weight: bold;
    font-size: 14px;
  }

  em {
    font-weight: bold;
    font-style: normal;
  }
  p {
    margin: 5px 0;
  }

  p:first-of-type {
    display: inline;
    text-indent: 0;
  }

  p {
    text-indent: 1em;
  }
</style>
