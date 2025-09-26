'use client';

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    quote: "Em 30 dias, a SinergIA se tornou nosso principal canal de aquisição de clientes. Absolutamente transformador.",
    name: "Juliana Silva",
    title: "CEO da Growth Co."
  },
  {
    quote: "A capacidade de encontrar e gerenciar parceiros estratégicos em um só lugar economizou dezenas de horas do nosso time.",
    name: "Ricardo Mendes",
    title: "Diretor de Vendas da Innovate Solutions"
  },
  {
    quote: "Finalmente uma plataforma que entende as nuances do mercado B2B. Os insights que obtemos são de valor inestimável.",
    name: "Fernanda Costa",
    title: "Fundadora da TechLeads"
  }
];

export function AuthCarousel() {
  return (
    <div className="hidden bg-muted lg:flex items-center justify-center p-8">
      <Carousel className="w-full max-w-md">
        <CarouselContent>
          {testimonials.map((testimonial, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card className="bg-background">
                  <CardContent className="flex flex-col items-start justify-center p-6 aspect-square">
                    <blockquote className="text-lg font-semibold leading-snug">
                      "{testimonial.quote}"
                    </blockquote>
                    <footer className="mt-4 text-sm font-medium text-muted-foreground">
                      — {testimonial.name}, {testimonial.title}
                    </footer>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
