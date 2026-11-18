import { useState, useEffect } from "react";

export default function useOnlineStatus() {
  const [online, setOnline] = useState(navigator.onLine);

  useEffect(() => {
    const aoVoltar = () => setOnline(true);
    const aoCair = () => setOnline(false);

    window.addEventListener("online", aoVoltar);
    window.addEventListener("offline", aoCair);

    return () => {
      window.removeEventListener("online", aoVoltar);
      window.removeEventListener("offline", aoCair);
    };
  }, []);

  return online;
}
