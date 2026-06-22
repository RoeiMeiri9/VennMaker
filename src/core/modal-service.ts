import { createEl } from "../utils/dom";

export function showImageModal(pngBlob: Blob) {
  const overlay = createEl("div", "", { id: "venn-overlay" });
  const modal = createEl("div", "venn-modal");

  const closeBtn = createEl("button", "venn-modal-close", { innerHTML: "✕" });
  closeBtn.onclick = () => overlay.remove();

  const title = createEl("h3", "venn-modal-title", {
    innerText: "הדיאגרמה מוכנה להעתקה",
  });
  const subtitle = createEl("p", "venn-modal-subtitle", {
    innerHTML:
      '<strong>לחץ לחיצה ארוכה</strong> על התמונה מטה,<br>ובחר <strong>"העתק" (Copy)</strong>.',
  });

  const img = createEl("img", "venn-modal-img", {
    src: URL.createObjectURL(pngBlob),
  });

  modal.append(closeBtn, title, subtitle, img);
  overlay.append(modal);
  document.body.appendChild(overlay);

  setTimeout(() => (overlay.style.opacity = "1"), 10);
  overlay.onclick = (e) => {
    if (e.target === overlay) overlay.remove();
  };
}
