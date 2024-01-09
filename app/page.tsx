import Cards from '@/components/Cards';
import HeroSection from '@/components/HeroSection';
import { cardExpression } from '@/expressions/cardexpression';

export default function Home() {
  return (
    <>
      <HeroSection />
      <div className="container mx-auto  h-full ">
        <h1
          id="services"
          className="text-3xl font-medium dark:text-white mt-10 mb-5 uppercase  text-center"
        >
          Supports more than one playground
        </h1>
        <div className="w-full text-white py-7 gap-8 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3  auto-rows-fr">
          {cardExpression.map((card) => (
            <Cards
              link={card.link}
              heading={card.heading}
              key={card.id}
              image={card.image}
              desc={card.desc}
            />
          ))}
        </div>
      </div>
    </>
  );
}
