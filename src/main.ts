import App from "@components/App.svelte";
import "katex/dist/katex.min.css";
import { mount } from "svelte";

const app = mount(App, {
  target: document.getElementById("app")!,
});

export default app;
