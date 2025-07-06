"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser, setLoading } from "@/lib/store/authSlice";
import { Button } from "@/components/ui/button";
import UserProfile from "./userProfile";
import { motion } from "framer-motion";

export default function AuthHeader() {
  const { data: session, status } = useSession();
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") {
      dispatch(setLoading(true));
    } else {
      dispatch(setLoading(false));
      if (session?.user) {
        dispatch(
          setUser({
            id: session.user.email || "",
            name: session.user.name || "",
            email: session.user.email || "",
            image: session.user.image || undefined,
          })
        );
      } else {
        dispatch(setUser(null));
      }
    }
  }, [session, status, dispatch]);

  const handleSignIn = () => {
    router.push("/login");
  };

  return (
    <div className="flex items-center gap-4">
      {status === "loading" ? (
        <div className="w-8 h-8 animate-spin rounded-full border-2 border-primary border-t-transparent" />
      ) : session ? (
        <UserProfile />
      ) : (
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={handleSignIn}
            variant="outline"
            className="flex items-center gap-2"
          >
            Sign In
          </Button>
        </motion.div>
      )}
    </div>
  );
}
