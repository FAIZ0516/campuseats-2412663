import { useEffect, useState } from "react";
import { subscribeToVendor, subscribeToMenu } from "../services/vendors.js";

// One vendor plus its menu, both live. Two listeners, so two cleanups.
export function useVendor(vendorId) {
  const [vendor, setVendor] = useState(undefined);
  const [menu, setMenu] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const stopVendor = subscribeToVendor(vendorId, setVendor, (err) =>
      setError(err.message),
    );
    const stopMenu = subscribeToMenu(vendorId, setMenu, (err) =>
      setError(err.message),
    );
    // one cleanup that stops both listeners
    return () => {
      stopVendor();
      stopMenu();
    };
  }, [vendorId]);

  return { vendor, menu, loading: vendor === undefined && !error, error };
}
