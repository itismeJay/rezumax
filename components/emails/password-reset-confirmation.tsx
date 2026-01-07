import * as React from "react";

interface PasswordResetConfirmationProps {
  userEmail?: string;
}

export const PasswordResetConfirmation = () => {
  const userEmail = "j***@example.com";

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center px-4 font-sans">
      <div className="bg-white rounded-lg shadow-sm max-w-2xl w-full mx-auto px-12 py-10 text-center">
        {/* Success Header */}
        <div className="mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#3ECF8E" }}
            >
              <span className="text-white text-lg font-bold">✓</span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Check Your Email
          </h1>
          <p className="text-base text-gray-600">
            We've sent a password reset link to <strong>{userEmail}</strong>
          </p>
        </div>

        {/* Main Instructions */}
        <div className="mb-8 text-center">
          <p className="text-base text-gray-700 leading-6 mb-4">
            Please check your email inbox for a message from us. The password
            reset link will expire in 1 hour for security reasons.
          </p>
          <p className="text-base text-gray-700 leading-6">
            If you don't see the email within a few minutes, please check your
            spam or junk folder.
          </p>
        </div>

        {/* Action Button */}
        <div className="mb-4">
          <a
            href="/login"
            className="inline-block px-6 py-3 rounded-lg text-sm font-semibold text-white no-underline transition-colors"
            style={{ backgroundColor: "#3ECF8E" }}
          >
            Back to Login
          </a>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 mt-6 pt-6 text-center">
          <p className="text-xs text-gray-500">
            Didn't request a password reset?{" "}
            <a href="#" className="underline" style={{ color: "#3ECF8E" }}>
              Contact support
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
