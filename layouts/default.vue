<template>
  <div :class="[`app-${$store.state.theme}`]">
    <SetupModal />
    <nuxt />
  </div>
</template>

<script>
import SetupModal from "@/components/setupModal";
export default {
  components: {
    SetupModal,
  },
};
</script>

<style></style>
