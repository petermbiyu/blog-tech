"use client";
import { useModalStore } from "@/app/store/useModalStore";
import Modals from "./modals";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const SignInModal = () => {
  const { isSignInOpen, closeSignIn } = useModalStore();
  return (
    <Modals onClose={closeSignIn} isOpen={isSignInOpen}>
      <h2 className="text-xl font-semibold text-white mb-2">
        Sign in to TechBlog
      </h2>
      <p className="text-sm text-gray-400 mb-8">
        Continue with one of the providers below
      </p>
      <div className="space-y-4">
        {/* google */}
        <button className="w-full flex items-center justify-center gap-3 py-3 rounded-full cursor-pointer bg-white text-black font-medium hover:bg-gray-200 transition">
          <FcGoogle className="text-xl" />
          Continue with Google
        </button>
        <button className="w-full flex items-center justify-center gap-3 py-3 rounded-full cursor-pointer bg-hover text-white font-medium hover:bg-[#202020] transition">
          <FaGithub className="text-xl" />
          Continue with Github
        </button>
      </div>
      <p className="text-xs text-gray-500 mt-8 text-center">
        BY continuing, you agree to our Terms & Privacy Policy
      </p>
    </Modals>
  );
};

export default SignInModal;
