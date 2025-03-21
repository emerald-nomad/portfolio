import Image from "next/image";
import { PortableTextComponents } from "next-sanity";

export const components: PortableTextComponents = {
  types: {
    quote: (props) =>
      props ? (
        <div className="quotebox">
          <div className="icon">
            <Image
              width={56}
              height={50}
              className="svg"
              src="/img/svg/quote.svg"
              alt="tumb"
            />
          </div>
          <p>{props.value.text}</p>
        </div>
      ) : null,
  },
};
