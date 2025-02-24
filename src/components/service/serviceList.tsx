'use client'

import { useGetServicesQuery } from "@/redux/api/serviceApi";
import { AppDispatch } from "@/redux/store";
import { DollarSign, Loader2, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "../ui/button";
import { Card, CardHeader, CardContent, CardTitle, CardFooter } from "../ui/card";
import { cn } from "@/lib/utils";
import Link from "next/link";
import SearchBarComponent from "../jobposting/searchBar";
import ServicesSkeleton from "./servicesSkeleton";

const ServiceListComponent: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [page, setPage] = useState(0);

  const { 
    data: { data = [], totalCount = 0 } = {},
    isLoading,
    isFetching,
    } = useGetServicesQuery({
      offset: page * 6,
      limit: 6,
    });

    const handleLoadMore = () => setPage((prev) => prev + 1);
    const resetPagination = () => setPage(0);

    const handleCreateService = () => router.push("services/create")

    const handleSearch = (searchTerm: string) => {
        console.log("searching for services")
      };

    if (isLoading) return <ServicesSkeleton/>

    return (
        <div className="flex justify-center w-full p-2 sm:p-4 md:p-6 lg:p-8">
      <div className="w-full max-w-[100%] sm:max-w-[1200px] grid grid-cols-1 md:grid-cols-4 gap-4">
        <aside className="md:col-span-1 flex flex-col space-y-2 items-center">
          {/* <JobFilters
            sortBy={sortConfig.sortBy}
            sortOrder={sortConfig.sortOrder}
            onSortChange={handleSortChange}
          /> */}
          <Button onClick={handleCreateService} className="w-full">
            New service
          </Button>
        </aside>

        <main className="md:col-span-3">
          <SearchBarComponent onSearch={handleSearch} />

          <div className="grid gap-4 sm:gap-6">
            {data.length > 0 ? (
              data.map((service: any) => (
                <Card
                  key={service.id}
                  className={cn(
                    "flex flex-col justify-between max-w-[700px]",
                    service.featured && "border-2 border-primary",
                  )}
                >
                  <CardHeader>
                    <CardTitle className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                      <div className="flex flex-col">
                        <div className="flex flex-col">
                            <span
                            className="text-lg font-semibold truncate max-w-[200px] sm:max-w-[300px]"
                            title={service.title}
                            >
                            {service.title}
                            </span>
                        </div>
                        <div className="flex items-center">
                            <DollarSign className="mr-1 h-4 w-4 text-gray-500" />
                            <span className="text-sm font-normal text-gray-500">{service.price}/hr</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge variant="secondary">{service.status}</Badge>
                        {service.featured && (
                          <Badge variant="default">Featured</Badge>
                        )}
                      </div>
                    </CardTitle>
                  </CardHeader>

                  <CardContent className="flex-1">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:gap-4 text-sm text-muted-foreground">
                      <p className="truncate">{service.description}</p>
                    </div>
                  </CardContent>

                  <CardFooter>
                    <Button asChild className="w-full">
                      <Link href={`/services/${service.id}`}>View Details</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center text-muted-foreground p-8">
                No services found matching your criteria
              </div>
            )}
          </div>

          {data.length < totalCount && (
            <div className="flex justify-center mt-8 w-full lg:w-[78%]">
              <Button
                onClick={handleLoadMore}
                disabled={isFetching}
                className="min-w-[150px]"
              >
                {isFetching ? (
                  <>
                    <Loader2 className="animate-spin mr-2" />
                    Loading...
                  </>
                ) : (
                  "Load More"
                )}
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
    )
}

export default ServiceListComponent