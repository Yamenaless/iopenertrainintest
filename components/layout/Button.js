import Link from "next/link";

const ButtonIo = ({ className, text, href, type }) => {
    return (
        <Link type={type} href={href} className={`  ${className}`}>
            {text}
        </Link>
    );
};

export default ButtonIo;
