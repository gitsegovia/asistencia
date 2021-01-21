import { useEffect, useState } from "react";
import axios from "../utils/axios";

export function useModules() {

  const [loading, setLoading] = useState(false);
  const [modules, setModules] = useState([]);

  useEffect(() => {
    setLoading(true);
    getModules()
      .then(setModules)
      .catch((e) => console.log(e))
      .finally(() => setLoading(false));
  }, []);

  return [modules, loading];

}

async function getModules() {
  const modules = await axios.get("/module");
  return modules.data.data;
}
