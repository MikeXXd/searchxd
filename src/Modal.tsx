import { FormEvent, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useHotkeys } from "react-hotkeys-hook";

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const Modal = ({ isOpen, onClose }: ModalProps) => {
  const [isClosing, setIsClosing] = useState(false);
  const [result, setResult] = useState("");
  const prevIsOpen = useRef<boolean>();

  useHotkeys("esc", onClose);
  useHotkeys("Tab", onClose);

  useLayoutEffect(() => {
    if (!isOpen && prevIsOpen.current) {
      setIsClosing(true);
    }

    prevIsOpen.current = isOpen;
  }, [isOpen]);

  if (!isOpen && !isClosing) return null;

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult("Odesílám...");
    const formData = new FormData(event.target as HTMLFormElement);

    formData.append("access_key", "62f2e004-9ade-4a96-8e85-b852b2cce203");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Formulář byl odeslán");
      (event.target as HTMLFormElement).reset();
      setTimeout(() => {
        setResult("");
        onClose();
      }, 4000);
    } else {
      console.log("Error", data);
      setResult("Chyba odeslání");
      setTimeout(() => {
        setResult("")
      }, 5000);
    }
  };

  return createPortal(
    <div
      onAnimationEnd={() => setIsClosing(false)}
      className={`modal ${isClosing && "closing"}`}
    >
      <div className="overlay" onClick={onClose} />
      <div
        className="modal-body"
        style={isClosing ? { transform: "translateY(-200%)" } : undefined}
      >
        <div className="modal-content">
          <h2>Požadavek na jiný formát</h2>
          <p>
            V případě, že Vám žádný s dostupných formátu
            nevyhovuje, rádi Vám potřebný formát doplníme, stačí vyplnit
            formulář a odeslat, o zpracování požadavku bedete informováni
            emailem. <p>Děkujeme, že používáte naši aplikaci</p>
          </p>
          <form onSubmit={onSubmit}>
            <label htmlFor="name">Jméno</label>
            <input type="text" id="name" name="Jméno" required minLength={3} />
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
            <label htmlFor="format">Požadovaný formát</label>
            <input
              type="text"
              id="Format"
              name="format"
              required
              minLength={2}
            />
            <label htmlFor="message">Zpráva</label>
            <textarea id="message" name="message" rows={5} minLength={3} />
            <div className="modal-content-bottom">
              <button className="button-submit" type="submit">{result ? result : "Odeslat"}</button>
              <button className="button-cancel" onClick={onClose}>Zrušit</button>
            </div>
          </form>
        </div>
      </div>{" "}
      {/*style send the children to the right instead returning left */}
    </div>,
    document.querySelector("#portal") as HTMLElement
  );
};

export default Modal;
