<template>
  <div>
    <h1>{{part.title}}</h1>
    <div>{{part.description}}</div>
  </div>
</template>

<script>
import getPartsMixin from "./get-parts-mixin";

export default {
  props:['partType','id'],
  mixins:[getPartsMixin],
  computed: {
    part() {
      // const partType = this.$route.params.partType;
      // const id = this.$route.params.id;
      
      // const {partType, id}=this.$route.params;

      //params from props
      const {partType, id}=this;      
      return this.parts[partType].find(part =>part.id=== +id);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>