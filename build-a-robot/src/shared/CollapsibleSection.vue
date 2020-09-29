<template>
    <div>
        <div class="header">
            <span v-if="open" @click="open= !open">&#x25B2; Collapse</span>
            <span v-if="!open" @click="open =!open">&#x25BC; Expand</span>
        </div>
        <slot v-if="open">
            <div>Default Content</div>
        </slot>
    </div>
</template>

<script>
    export default {
        name:"CollapsibleSection",
        data(){
            return {
                open:true
            }
        }
    }
</script>

<style lang="scss" scoped>
.header{
    background-color: gray;
    padding: 3px;
    cursor:pointer;
}

</style>