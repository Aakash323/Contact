import { useState } from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";


export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-purple-400 p-4">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-xl rounded-2xl p-8">
          <h2 className="text-[24px] font-extrabold mb-10 text-center text-gray-800">
            {isLogin ? "Welcome Back" : "Create an Account "}
          </h2>

          {isLogin ? <Login /> : <Signup />}

          <p className="text-center text-sm mt-6 text-gray-600">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="ml-1 text-purple-600 font-semibold hover:underline"
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
