"use client";
import Resume from "@/components/Resume";
import { useAuth } from "@/context/Auth.context";

const page = () => {
  const { user, loading } = useAuth();
  console.log("Auth state:", { user, loading });

  return (
    <div>
      <Resume />
    </div>
  );
};

export default page;
