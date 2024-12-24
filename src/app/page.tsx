import LoginButton from "@/components/auth/LoginButton";
import { Code, Users, Zap } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 text-gray-800">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 flex flex-col items-center text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
          Connect, Collaborate, Innovate
        </h1>
        <p className="text-xl mb-4 max-w-2xl text-gray-600">
          Join TechConnect, the premier social network for tech professionals.
          Expand your network, share knowledge, and accelerate your career.
        </p>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Why TechConnect?
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Users className="h-12 w-12 text-blue-600" />}
            title="Expand Your Network"
            description="Connect with like-minded professionals, industry leaders, and potential collaborators."
          />
          <FeatureCard
            icon={<Code className="h-12 w-12 text-indigo-600" />}
            title="Share Knowledge"
            description="Engage in discussions, share insights, and learn from experts across various tech domains."
          />
          <FeatureCard
            icon={<Zap className="h-12 w-12 text-purple-600" />}
            title="Accelerate Your Career"
            description="Discover job opportunities, showcase your skills, and stay ahead in the fast-paced tech industry."
          />
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-3xl font-bold mb-6 text-gray-800">
          Ready to Take Your Career to the Next Level?
        </h2>
        <LoginButton text={"Join TechConnect Today"} />
      </section>

      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f1a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f1a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)]"></div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, description }: any) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
      <div className="flex justify-center mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
