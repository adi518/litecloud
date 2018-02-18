<template lang="pug">
.logo
</template>

<style lang="scss">
.logo {
  @include cursor-default;
  @include half-border-radius;
  width: to-rem(80);
  height: to-rem(80);
  background-size: cover;
  background-image: url($logo-path);
}
</style>
