import { useEffect } from "react";

export function usePopupClose(isOpen, closePopup) {
  useEffect(() => {

    const handleOverlay = (event) => {

        if (event.target.classList.contains("popup_opened") && typeof closePopup === 'function') {
        closePopup();
      }
    };

    const handleEscape = (e) => {
      if (e.key === "Escape" && typeof closePopup === 'function') {
        closePopup();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleOverlay);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("mousedown", handleOverlay);
    };

}, [isOpen, closePopup]);
}

