const fetchCurrentUser = async () => {
   const res = await fetch("/api/session", { cache: "no-store" });
   if (!res.ok) throw new Error("Failed to fetch session");
   const data = await res.json();
   return data.user;
};

export default fetchCurrentUser;
