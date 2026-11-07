"use client";

import { useMemo, useSyncExternalStore } from "react";

export type MotionMode = "static" | "cinematic";

/**
 * True only for hardware-accelerated WebGL on a reasonably capable device.
 * Software renderers (SwiftShader, llvmpipe) and very low-memory devices get
 * the static composition instead: the 3D scene would cost them seconds of
 * main-thread time. Append ?force3d to a URL to override for testing.
 */
function hasCapableWebGL() {
  try {
    if (new URLSearchParams(location.search).has("force3d")) return true;
    const nav = navigator as Navigator & { deviceMemory?: number };
    if ((nav.deviceMemory && nav.deviceMemory < 2) || (nav.hardwareConcurrency && nav.hardwareConcurrency < 2)) return false;
    const c = document.createElement("canvas");
    const gl = (c.getContext("webgl2") || c.getContext("webgl")) as WebGLRenderingContext | null;
    if (!gl) return false;
    const info = gl.getExtension("WEBGL_debug_renderer_info");
    const renderer = info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : "";
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return !/swiftshader|llvmpipe|software|basic render/i.test(renderer);
  } catch {
    return false;
  }
}

let webgl: boolean | null = null;

function subscribe(cb: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

function getSnapshot(): MotionMode {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "static";
  if (webgl === null) webgl = hasCapableWebGL();
  return webgl ? "cinematic" : "static";
}

/** Server and first paint render the static version; capable clients upgrade. */
export function useMotionMode(): MotionMode {
  return useSyncExternalStore(subscribe, getSnapshot, () => "static");
}

function subscribeMq(query: string) {
  return (cb: () => void) => {
    const mq = window.matchMedia(query);
    mq.addEventListener("change", cb);
    return () => mq.removeEventListener("change", cb);
  };
}

export function useMediaQuery(query: string, serverValue = false) {
  const subscribe = useMemo(() => subscribeMq(query), [query]);
  return useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => serverValue,
  );
}
