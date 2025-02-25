import ServiceListComponent from "@/components/service/serviceList";

export default function Services() {
  return (
    <div className="min-h-screen bg-background bg-gray-50">
      <header className="py-12 bg-gray-100 flex justify-center items-center">
        <div className="container max-w-2xl text-center px-4">
          <h1 className="text-3xl font-bold mb-4">
            Find your perfect service provider
          </h1>
          <p className="text-xl mb-8">
            Discover services that match your needs and interests.
          </p>
        </div>
      </header>

      <main className="py-4 flex justify-center">
        <ServiceListComponent />
      </main>
    </div>
  );
}