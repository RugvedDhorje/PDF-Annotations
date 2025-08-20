import { useEffect, useState } from "react";

export const useProcess = () => {
  const [process, setProcess] = useState([]);
  const [error, setError] = useState(null);

  const fetchProcess = async () => {
    try {
      const response = await fetch("/api/process");
      if (!response.ok) throw new Error("Failed to fetch Process");
      const data = await response.json();
      setProcess(data);
    } catch (error) {
      setError("An error occurred" + error.message);
    }
  };
  useEffect(() => {
    fetchProcess();
  }, []);
  return { process, error };
};
