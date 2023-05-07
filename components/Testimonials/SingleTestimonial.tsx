import { Testimonial } from "@/types/testimonial";
const starIcon = (
  <svg width="18" height="16" viewBox="0 0 18 16" className="fill-current">
    <path d="M9.09815 0.361679L11.1054 6.06601H17.601L12.3459 9.59149L14.3532 15.2958L9.09815 11.7703L3.84309 15.2958L5.85035 9.59149L0.595291 6.06601H7.0909L9.09815 0.361679Z" />
  </svg>
);

const SingleTestimonial = ({ testimonial }: { testimonial: Testimonial }) => {
  const { content, question } = testimonial;

  return (
    <div className="w-full">
      <div
        className="wow fadeInUp rounded-md bg-white p-8 shadow-one dark:bg-[#1D2144] lg:px-5 xl:px-8"
        data-wow-delay=".1s"
      >
        <p className="border-b border-body-color border-opacity-10 pb-5 text-base font-bold leading-relaxed text-gray-900 dark:border-white dark:border-opacity-10 dark:text-white">
          {question}
        </p>
        <p className=" text-base leading-relaxed text-body-color dark:border-white dark:border-opacity-10 dark:text-white">
          {content}
        </p>
      </div>
    </div>
  );
};

export default SingleTestimonial;
