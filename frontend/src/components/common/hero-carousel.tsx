import {
  useQuery
} from "@tanstack/react-query";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "../ui/carousel";

import {
  Card
} from "../ui/card";

import {
  getHeroEventsService
} from "../../services/event.service";

import {
  Link
} from "react-router-dom";


import {
  Event
} from "../../types/event.type";

export default function HeroCarousel() {
  const { data } =
    useQuery({
      queryKey: [
        "hero-events"
      ],

      queryFn:
        getHeroEventsService
    });

    return (
      <div className="mb-10 w-full">
        <Carousel opts={{ align: "start", loop: true }} className="w-full">
          <CarouselContent className="-ml-0"> 
            {data?.data?.map((event: Event) => (
              <CarouselItem 
                key={event.id} 
                className="pl-0" 
              >
                <Link to={`/events/${event.id}`}>
                  <Card className="p-0 overflow-hidden rounded-2xl shadow-lg"> 
                    <div className="relative h-[450px] w-full">
                      <img
                        src={
                          event.thumbnail
                            ? `http://localhost:5000/uploads/events/${event.thumbnail}`
                            : "https://placehold.co/1200x450"
                        }
                        alt={event.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-12">
                        <h1 className="text-4xl md:text-6xl font-bold text-white max-w-2xl">
                          {event.title}
                        </h1>
                      </div>
                    </div>
                  </Card>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="hidden md:block">
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </div>
        </Carousel>
      </div>
    );
  }
