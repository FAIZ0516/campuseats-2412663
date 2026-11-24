import { useEffect, useState } from "react";
import { subscribeToVendors } from "../services/vendors.js";

// Week 6: the vendors come live from Firestore instead of vendors.json.
export function useVendors() {
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const unsubscribe = subscribeToVendors(
      (data) => {
        setVendors(data);
        setLoading(false);
      },
      (err) => {
        setError(err.message);
        setLoading(false);
      },
    );
    return unsubscribe; // stop listening when the component unmounts
  }, [reloadKey]);

  function reload() {
    setError(null);
    setLoading(true);
    setReloadKey((key) => key + 1);
  }

  return { vendors, loading, error, reload };
}
