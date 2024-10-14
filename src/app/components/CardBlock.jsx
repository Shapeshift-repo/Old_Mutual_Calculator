import Heading from "./Heading";
import Card from "./Card";

export default function CardBlock({ cardsData }) {
  return (
    <section id="calculator-section" className="calculator-section">
        <div className="container">
            <Heading 
                content="Calculators" 
                className="text-[24px] lg:text-[35px] leading-[32px] font-extrabold text-transparent text-center w-full mb-[47px] lg:mb-[78px] card-section-heading" 
                tag="h2"
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-[44px] lg:gap-[47px]">
                {cardsData.map((data, index) => (
                    <Card
                      key={index}
                      heading={data.heading}
                      content={data.content}
                      image={data.image}
                      link={data.link}
                      contentClasses={data.contentClasses}
                    />
                ))}
            </div>

        </div>
    </section>
  );
}