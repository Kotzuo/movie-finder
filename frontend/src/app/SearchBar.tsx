"use client";

import { useRouter } from "next/navigation";
import styles from "./SearchBar.module.scss";
import { useState } from "react";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const router = useRouter();

  return (
    <form
      className={styles.searchContainerInputs}
      onSubmit={(e) => {
        e.preventDefault();
        router.push(`/${search}`);
      }}
    >
      <input
        type="search"
        placeholder="Search with title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button type="submit">Search</button>
      <button
        type="button"
        onClick={() => {
          setSearch("");
          router.replace("/");
        }}
      >
        Reset
      </button>
      <input type="submit" hidden />
    </form>
  );
}
