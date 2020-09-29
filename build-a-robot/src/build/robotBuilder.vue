<template>
  <div v-if="availableParts" class="content">
    <div class="preview">
      <collapsibleSection>
      </collapsibleSection>
    <collapsibleSection> 
      <div class="preview-content">
        <div class="top-row">
          <img :src="selectedRobot.head.src" />
        </div>
        <div class="middle-row">
          <img :src="selectedRobot.leftArm.src" class="rotate-left" />
          <img :src="selectedRobot.torso.src" />
          <img :src="selectedRobot.rightArm.src" class="rotate-right" />
        </div>
        <div class="bottom-row">
          <img :src="selectedRobot.base.src" />
        </div>
      </div>
      </collapsibleSection> 
      <button class="add-to-cart" @click="addToCart()">Add to cart</button>
    </div>

    <div class="top-row">
      <!-- <div :class="[saleBorderClass, 'top', 'part']">
        <div class="robot-name">
          {{selectedRobot.head.title}}
          <span v-if="selectedRobot.head.onSale" class="sale">on sale !</span>
        </div>
      </div>-->
      <PartSelector
        position="top"
        v-on:partSelected="part=>selectedRobot.head=part"
        :parts="availableParts.heads"
      />
    </div>
    <div class="middle-row">
      <PartSelector
        position="left"
        v-on:partSelected="part=>selectedRobot.leftArm=part"
        :parts="availableParts.arms"
      />
      <PartSelector
        position="center"
        v-on:partSelected="part=>selectedRobot.torso=part"
        :parts="availableParts.torsos"
      />
      <PartSelector
        position="right"
        @partSelected="part=>selectedRobot.rightArm=part"
        :parts="availableParts.arms"
      />
    </div>
    <div class="bottom-row">
      <PartSelector
        position="bottom"
        @partSelected="part=>selectedRobot.base=part"
        :parts="availableParts.bases"
      />
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";
import createdHookMixins from "./created-hook-mixins";
import PartSelector from "./PartSelector";
import CollapsibleSection from "../shared/CollapsibleSection.vue"; 

export default {
  name: "robotBuilder",
  components: { PartSelector,CollapsibleSection },
  beforeRouteLeave (to, from, next) {
    // ...
    if(this.addedToCart){
      next(true);
    }else{
      const response=confirm('You have note added robot to cart. Are you sure you want to leave?');
      next(response);
    }
  },
  created(){
    //actions
    // this.$store.dispatch("robots/getParts");
    //use mapping
    this.getParts();
  }, 
  data() {
    return {
      addedToCart:false,
      selectedRobot: {
        head: {},
        leftArm: {},
        torso: {},
        rightArm: {},
        base: {},
      },
    };
  },
  methods: {
    ...mapActions("robots",["getParts","addRobotToCart"]),
    addToCart() {
      const robot = this.selectedRobot;
      const total =
        robot.head.cost +
        robot.leftArm.cost +
        robot.torso.cost +
        robot.rightArm.cost +
        robot.base.cost;

      //use store 
      //dispatch return a Promise
      
      // this.$store.dispatch("robots/addRobotToCart",Object.assign({}, robot, { total }))
      // .then(()=>this.$router.push("/cart"));
      //use mapping
      this.addRobotToCart(Object.assign({}, robot, { total }))
      .then(()=>this.$router.push("/cart"));

      // this.cart.push(Object.assign({}, robot, { total }));
      this.addedToCart=true;
    },
  },
  mixins: [createdHookMixins],
  computed: {
    availableParts(){
      return this.$store.state.robots.parts;
    },
    saleBorderClass() {
      return this.selectedRobot.head.onSale ? "sale-border" : "";
    },
    getHeadBorderStyle() {
      return {
        border: this.selectedRobot.head.onSale
          ? "2px solid red"
          : "3px solid #aaa",
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.part {
  position: relative;
  width: 165px;
  height: 165px;
  border: 3px solid #aaa;
}
.part {
  img {
    width: 165px;
  }
}
.top-row {
  display: flex;
  justify-content: space-around;
}
.middle-row {
  display: flex;
  justify-content: center;
}
.bottom-row {
  display: flex;
  justify-content: space-around;
  border-top: none;
}
.head {
  border-bottom: none;
}
.left {
  border-right: none;
}
.right {
  border-left: none;
}
.left img {
  transform: rotate(-90deg);
}
.right img {
  transform: rotate(90deg);
}
.bottom {
  border-top: none;
}
.prev-selector {
  position: absolute;
  z-index: 1;
  top: -3px;
  left: -28px;
  width: 25px;
  height: 171px;
}
.next-selector {
  position: absolute;
  z-index: 1;
  top: -3px;
  right: -28px;
  width: 25px;
  height: 171px;
}
.center .prev-selector,
.center .next-selector {
  opacity: 0.8;
}
.left .prev-selector {
  top: -28px;
  left: -3px;
  width: 144px;
  height: 25px;
}
.left .next-selector {
  top: auto;
  bottom: -28px;
  left: -3px;
  width: 144px;
  height: 25px;
}
.right .prev-selector {
  top: -28px;
  left: 24px;
  width: 144px;
  height: 25px;
}
.right .next-selector {
  top: auto;
  bottom: -28px;
  left: 24px;
  width: 144px;
  height: 25px;
}
.right .next-selector {
  right: -3px;
}
.robot-name {
  position: absolute;
  top: -25px;
  text-align: center;
  width: 100%;
}
.sale {
  color: red;
}
.content {
  position: relative;
}
.add-to-cart {
  position: absolute;
  width: 210px;
  padding: 3px;
  font-size: 16px;
}
.sale-border {
  border: 3px solid red;
}
.preview {
  position: absolute;
  top: -20px;
  right: 0;
  width: 210px;
  height: 210px;
  padding: 5px;
}
.preview-content {
  border: 1px solid #999;
}
.preview img {
  width: 50px;
  height: 50px;
}
.rotate-right {
  transform: rotate(90deg);
}
.rotate-left {
  transform: rotate(-90deg);
}
</style>
