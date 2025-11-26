import { useEffect, useRef } from 'react';
import { Renderer, Program, Mesh, Triangle, Color } from 'ogl';

const Threads = ({ 
  color = [1, 1, 1], 
  amplitude = 1, 
  distance = 0, 
  enableMouseInteraction = true, 
  style = {},
  ...rest 
}) => {
  const containerRef = useRef(null);
  const animationFrameId = useRef();
  const mousePosition = useRef({ x: 0.5, y: 0.5 });
  const mouseActive = useRef(false);
  const hoverIntensity = useRef(0);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;

    const renderer = new Renderer({ alpha: true });
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    container.appendChild(gl.canvas);

    const vertexShader = `
      attribute vec2 position;
      attribute vec2 uv;
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const fragmentShader = `
      precision highp float;

      uniform float iTime;
      uniform vec3 iResolution;
      uniform vec3 uColor;
      uniform float uAmplitude;
      uniform float uDistance;
      uniform vec2 uMouse;
      uniform float uHoverIntensity;

      #define PI 3.1415926538

      const int u_line_count = 40;
      const float u_line_width = 7.0;
      const float u_line_blur = 10.0;

      float Perlin2D(vec2 P) {
          vec2 Pi = floor(P);
          vec4 Pf_Pfmin1 = P.xyxy - vec4(Pi, Pi + 1.0);
          vec4 Pt = vec4(Pi.xy, Pi.xy + 1.0);
          Pt = Pt - floor(Pt * (1.0 / 71.0)) * 71.0;
          Pt += vec2(26.0, 161.0).xyxy;
          Pt *= Pt;
          Pt = Pt.xzxz * Pt.yyww;
          vec4 hash_x = fract(Pt * (1.0 / 951.135664));
          vec4 hash_y = fract(Pt * (1.0 / 642.949883));
          vec4 grad_x = hash_x - 0.49999;
          vec4 grad_y = hash_y - 0.49999;
          vec4 grad_results = inversesqrt(grad_x * grad_x + grad_y * grad_y)
              * (grad_x * Pf_Pfmin1.xzxz + grad_y * Pf_Pfmin1.yyww);
          grad_results *= 1.4142135623730950;
          vec2 blend = Pf_Pfmin1.xy * Pf_Pfmin1.xy * Pf_Pfmin1.xy
                     * (Pf_Pfmin1.xy * (Pf_Pfmin1.xy * 6.0 - 15.0) + 10.0);
          vec4 blend2 = vec4(blend, vec2(1.0 - blend));
          return dot(grad_results, blend2.zxzx * blend2.wwyy);
      }

      float pixel(float count, vec2 resolution) {
          return (1.0 / max(resolution.x, resolution.y)) * count;
      }

      float lineFn(vec2 st, float width, float perc, float offset, vec2 mouse, float time, float amplitude, float distance, float hoverIntensity) {
          float split_offset = (perc * 0.4);
          float split_point = 0.1 + split_offset;

          // Enhanced mouse influence with hover intensity
          float mouseInfluence = 1.0 + (mouse.y - 0.5) * 0.5 + hoverIntensity * 0.5;
          float amplitude_normal = smoothstep(split_point, 0.7, st.x);
          float amplitude_strength = 0.5;
          
          // Apply hover intensity to amplitude
          float finalAmplitude = amplitude_normal * amplitude_strength * amplitude * mouseInfluence;

          // Time scaling with mouse influence
          float time_scaled = time / 10.0 + (mouse.x - 0.5) * 2.0 * (1.0 + hoverIntensity * 0.5);
          
          // Blur effect enhanced by hover
          float blur = smoothstep(split_point, split_point + 0.05, st.x) * perc * (1.0 + hoverIntensity * 0.3);

          // Noise with mouse influence
          float xnoise = mix(
              Perlin2D(vec2(time_scaled, st.x + perc) * (2.5 + hoverIntensity * 1.0)),
              Perlin2D(vec2(time_scaled, st.x + time_scaled) * (3.5 + hoverIntensity * 1.0)) / 1.5,
              st.x * (0.3 + hoverIntensity * 0.2)
          );

          // Position with stronger mouse influence
          float y = 0.5 + (perc - 0.5) * distance + xnoise / 2.0 * finalAmplitude;

          // Add a wave effect when hovering
          float waveEffect = sin(time * 0.5 + perc * 10.0) * 0.01 * hoverIntensity;
          y += waveEffect;

          float line_start = smoothstep(
              y + (width / 2.0) + (u_line_blur * pixel(1.0, iResolution.xy) * blur),
              y,
              st.y
          );

          float line_end = smoothstep(
              y,
              y - (width / 2.0) - (u_line_blur * pixel(1.0, iResolution.xy) * blur),
              st.y
          );

          return clamp(
              (line_start - line_end) * (1.0 - smoothstep(0.0, 1.0, pow(perc, 0.3))),
              0.0,
              1.0
          );
      }

      void mainImage(out vec4 fragColor, in vec2 fragCoord) {
          vec2 uv = fragCoord / iResolution.xy;

          // Calculate distance from mouse pointer for additional effects
          vec2 mouseUV = uMouse;
          float distFromMouse = distance(uv, mouseUV);
          float mouseProximity = 1.0 - smoothstep(0.0, 0.3, distFromMouse);
          
          // Enhance effect based on mouse proximity
          float proximityAmplitude = uAmplitude * (1.0 + mouseProximity * 0.5 * uHoverIntensity);

          float line_strength = 1.0;
          for (int i = 0; i < u_line_count; i++) {
              float p = float(i) / float(u_line_count);
              line_strength *= (1.0 - lineFn(
                  uv,
                  u_line_width * pixel(1.0, iResolution.xy) * (1.0 - p) * (1.0 + uHoverIntensity * 0.2),
                  p,
                  (PI * 1.0) * p,
                  uMouse,
                  iTime,
                  proximityAmplitude,
                  uDistance,
                  uHoverIntensity
              ));
          }

          float colorVal = 1.0 - line_strength;
          
          // Add a glow effect around mouse position
          float glow = exp(-distFromMouse * 10.0) * 0.3 * uHoverIntensity;
          colorVal += glow;
          
          fragColor = vec4(uColor * colorVal, colorVal);
      }

      void main() {
          mainImage(gl_FragColor, gl_FragCoord.xy);
      }
    `;

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        iTime: { value: 0 },
        iResolution: {
          value: new Color(gl.canvas.width, gl.canvas.height, gl.canvas.width / gl.canvas.height)
        },
        uColor: { value: new Color(...color) },
        uAmplitude: { value: amplitude },
        uDistance: { value: distance },
        uMouse: { value: new Float32Array([0.5, 0.5]) },
        uHoverIntensity: { value: 0 }
      }
    });

    const mesh = new Mesh(gl, { geometry, program });

    function resize() {
      const { clientWidth, clientHeight } = container;
      renderer.setSize(clientWidth, clientHeight);
      program.uniforms.iResolution.value.r = clientWidth;
      program.uniforms.iResolution.value.g = clientHeight;
      program.uniforms.iResolution.value.b = clientWidth / clientHeight;
    }
    window.addEventListener('resize', resize);
    resize();

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = 1.0 - (e.clientY - rect.top) / rect.height;
      mousePosition.current = { x, y };
      mouseActive.current = true;
    };

    const handleMouseLeave = () => {
      mouseActive.current = false;
    };

    const handleMouseEnter = () => {
      mouseActive.current = true;
    };

    if (enableMouseInteraction) {
      container.addEventListener('mousemove', handleMouseMove);
      container.addEventListener('mouseleave', handleMouseLeave);
      container.addEventListener('mouseenter', handleMouseEnter);
      
      // Add touch events for mobile devices
      container.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const rect = container.getBoundingClientRect();
        const x = (e.touches[0].clientX - rect.left) / rect.width;
        const y = 1.0 - (e.touches[0].clientY - rect.top) / rect.height;
        mousePosition.current = { x, y };
        mouseActive.current = true;
      }, { passive: false });
      
      container.addEventListener('touchend', () => {
        mouseActive.current = false;
      });
    }

    function update(t) {
      // Smoothly transition hover intensity
      const targetHoverIntensity = mouseActive.current ? 1.0 : 0.0;
      hoverIntensity.current += (targetHoverIntensity - hoverIntensity.current) * 0.1;
      
      // Update mouse position with smoothing
      program.uniforms.uMouse.value[0] = mousePosition.current.x;
      program.uniforms.uMouse.value[1] = mousePosition.current.y;
      program.uniforms.uHoverIntensity.value = hoverIntensity.current;
      program.uniforms.iTime.value = t * 0.001;

      renderer.render({ scene: mesh });
      animationFrameId.current = requestAnimationFrame(update);
    }
    animationFrameId.current = requestAnimationFrame(update);

    return () => {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      window.removeEventListener('resize', resize);

      if (enableMouseInteraction) {
        container.removeEventListener('mousemove', handleMouseMove);
        container.removeEventListener('mouseleave', handleMouseLeave);
        container.removeEventListener('mouseenter', handleMouseEnter);
      }
      if (container.contains(gl.canvas)) container.removeChild(gl.canvas);
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    };
  }, [color, amplitude, distance, enableMouseInteraction]);

  return (
    <div 
      style={{ 
        width: '100%', 
        height: '600px', 
        position: 'relative', 
        cursor: enableMouseInteraction ? 'none' : 'default',
        ...style 
      }} 
      {...rest}
    >
      <div ref={containerRef} className="w-full h-full relative" />
    </div>
  );
};

export default Threads;