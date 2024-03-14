import SignupForm from "../components/SignupForm"

const SignUp: React.FC = () => {
  return (
    <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8  bg-slate-900 p-4 text-white">
      <div className="max-w-md w-full space-y-8 p-4">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold">Register Your Account</h2>
        </div>
        <SignupForm/>
      </div>
    </div>
  );
};

export default SignUp;
