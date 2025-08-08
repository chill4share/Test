<script setup lang="ts">
import { onMounted } from 'vue';
import { tsParticles } from 'tsparticles-slim';
import { useDragonAnimation } from './composables/useDragon';

onMounted(() => {
  // Khởi tạo nền hạt
  tsParticles.load({
    id: 'particle-background',
    options: {
      fpsLimit: 60,
      interactivity: {
        events: {
          onHover: { enable: true, mode: 'repulse' },
        },
        modes: {
          repulse: { distance: 100, duration: 0.4 },
        },
      },
      particles: {
        color: { value: '#ffffff' },
        links: { color: '#ffffff', distance: 150, enable: true, opacity: 0.1, width: 1 },
        move: {
          direction: 'none',
          enable: true,
          outModes: 'out',
          random: false,
          speed: 1,
          straight: false,
        },
        number: { density: { enable: true }, value: 80 },
        opacity: { value: 0.1 },
        shape: { type: 'circle' },
        size: { value: { min: 1, max: 3 } },
      },
      detectRetina: true,
    },
  });
});

// Khởi tạo rồng bay
useDragonAnimation('dragon-canvas');
</script>

<template>
  <div class="main-container">
    <div id="particle-background" class="layer"></div>

    <canvas id="dragon-canvas" class="layer"></canvas>
  </div>
</template>

<style>
/* Reset CSS cơ bản */
body, html {
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #1a1a2e; /* Màu nền cứng để dễ test */
}

/* CSS cho các lớp */
.main-container, .layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}

#particle-background {
  z-index: 1;
}

#dragon-canvas {
  z-index: 2;
}
</style>