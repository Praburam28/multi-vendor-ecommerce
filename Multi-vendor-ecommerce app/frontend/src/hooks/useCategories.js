import { useEffect, useState } from "react";
import { getCategories } from "../services/categoryService";

export default function useCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        console.error(err);
      }
    }

    loadCategories();
  }, []);

  return categories;
}