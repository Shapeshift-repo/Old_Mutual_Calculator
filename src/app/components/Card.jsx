import Image from "next/image";
import Link from "next/link";
import Heading from "./Heading";

export default function Card({ heading = null, content = null, image = null, link = null, contentClasses = "" }){
  return (
    <div href={link}  className="card-box relative h-[433px] w-full rounded-[30px] overflow-hidden transition-transform duration-300 ease-in-out transform">
      {/* Card Image */}
      <div className="w-full h-full relative">
        <Image
          src={image || "https://via.placeholder.com/400x300"}
          alt="Card Image"
          layout="fill" // Ensures the image fills the parent container
          objectFit="cover" // Ensures the image maintains its aspect ratio
          className="transition-transform duration-300 ease-in-out transform"
          priority={false} // Lazy load by default unless `priority` is set to true
        />
      </div>

      {/* Card Content with Gradient Background */}
      <div 
        className="absolute bottom-0 w-full h-[66%] pt-[88px]  px-[30px] lg:px-[80px] pb-[30px]"
        style={{ background: 'linear-gradient(8.46deg, rgba(0, 150, 119, 0.93) 17.02%, rgba(80, 184, 72, 0.93) 44.72%, rgba(80, 184, 72, 0) 78.61%)' }}
      >
        {heading && (
          <Heading 
            content={heading}
            className="text-[18px] leading-[20px] lg:text-[25px] lg:leading-[35px] font-semibold pb-[5px] text-white" 
            tag="h3"
          />
        )}
        {content && (
          <p className={`text-[16px] leading-[24px] lg:text-[20px] lg:leading-[30px] min-h-[90px] font-light text-white ${contentClasses}`}>
            {content}
          </p>
        )}
        {link && (
          <div className="mt-[10px]">
            <Link href={link} className="link transition-transform duration-200 ease-in-out">              
              <svg width="47" height="15" viewBox="0 0 47 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M38.6959 0.594502C38.511 0.779408 38.4072 1.0302 38.4072 1.29169C38.4072 1.55319 38.511 1.80398 38.6959 1.98888L43.2347 6.5276L1.31745 6.5276C1.06986 6.54676 0.838614 6.65864 0.669926 6.84088C0.501237 7.02312 0.407529 7.26231 0.407528 7.51064C0.407527 7.75898 0.501237 7.99816 0.669925 8.18041C0.838613 8.36265 1.06986 8.47453 1.31745 8.49368L43.2068 8.49369L38.7029 12.9975C38.518 13.1825 38.4141 13.4332 38.4141 13.6947C38.4141 13.9562 38.518 14.207 38.7029 14.3919C38.8878 14.5768 39.1386 14.6807 39.4001 14.6807C39.6616 14.6807 39.9124 14.5768 40.0973 14.3919L46.372 8.1172C46.5384 7.95079 46.6319 7.72508 46.6319 7.48973C46.6319 7.25438 46.5384 7.02867 46.372 6.86226L40.0973 0.587529C40.0052 0.495379 39.8957 0.422408 39.7751 0.372835C39.6546 0.323263 39.5255 0.298072 39.3952 0.29872C39.2649 0.299369 39.136 0.325843 39.0159 0.376613C38.8959 0.427382 38.7872 0.501439 38.6959 0.594502Z" fill="white"/>
              </svg>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}