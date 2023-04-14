import React, { useState } from "react";
import { auth } from "../firebase/firebase";
import { sendPasswordResetEmail } from "firebase/auth";
const PasswordResetForm = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handlePasswordReset = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      await sendPasswordResetEmail(auth,email);
      setIsSent(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handlePasswordReset}>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Sending..." : "Send Password Reset Email"}
        </button>
      </form>
      {isSent && (
        <p>
          A password reset link has been sent to your email. Please follow the instructions in the email to reset your password.
        </p>
      )}
    </div>
  );
};
export default PasswordResetForm;