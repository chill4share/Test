// src/composables/useDragon.ts
import { onMounted, onUnmounted } from 'vue'

export function useDragonAnimation(canvasId: string) {
  onMounted(() => {
    let animationFrameId: number;

    const canvas = document.getElementById(canvasId) as HTMLCanvasElement;
    if (!canvas) return;

    const ctx = canvas.getContext('2d')!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const numSegments = 35;
    const segmentLength = 10;
    const segments = [] as { x: number; y: number }[];
    const head = { x: canvas.width / 2, y: canvas.height / 2 };

    for (let i = 0; i < numSegments; i++) {
      segments.push({ ...head });
    }

    let angle = 0;

    function animate() {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radiusX = centerX - 50;
      const radiusY = centerY - 100;
      head.x = centerX + Math.sin(angle * 2.1) * radiusX;
      head.y = centerY + Math.cos(angle * 3.2) * radiusY;
      angle += 0.01;

      let parent = head;
      for (const segment of segments) {
        const dx = parent.x - segment.x;
        const dy = parent.y - segment.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > segmentLength) {
          const moveX = dx / dist * (dist - segmentLength);
          const moveY = dy / dist * (dist - segmentLength);
          segment.x += moveX;
          segment.y += moveY;
        }
        parent = segment;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(175, 238, 238, 0.7)';
      ctx.lineWidth = 3;

      let parentDraw = head;
      for (const segment of segments) {
        ctx.moveTo(parentDraw.x, parentDraw.y);
        ctx.lineTo(segment.x, segment.y);
        parentDraw = segment;
      }
      ctx.stroke();

      animationFrameId = requestAnimationFrame(animate);
    }

    animate();

    onUnmounted(() => {
      cancelAnimationFrame(animationFrameId);
    });
  });
}