import Image from "next/image";
import dubai from "../assets/images/cities/dubai.jpg";
const CityCard = () => {
    return (
        <div className="box-city tow">
            <a href="" title="">
                <Image
                    src={dubai}
                    alt=""
                    className="w-100"
                    width={306}
                    height={205}
                />
                <span className="city-name">London</span>
            </a>
        </div>
    );
};

export default CityCard;
