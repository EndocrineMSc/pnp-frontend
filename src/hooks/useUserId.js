import { useState, useEffect } from "react";

export default function useUserId() {
  const [userId, setUserId] = useState("");

  const getId = () => {
    const id = localStorage.getItem("userId");
    if (id) setUserId(id);
  };

  const saveUserId = (id) => {
    localStorage.setItem("userId", id);
    dispatchEvent(new Event("onUserIdSet"));
  };

  window.addEventListener("onUserIdSet", getId);

  useEffect(() => {
    getId();

    return () => {
      window.removeEventListener("onUserIdSet", getId);
    };
  }, []);

  return [userId, saveUserId];
}
