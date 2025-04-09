import Image from "next/image";

const CategoryCard = ({ image, title }) => {
    return (
        <>
            <div className="category-card">
                <Image
                    src={image}
                    alt={title}
                    className="w-100 h-100"
                    width={300}
                    height={265}
                />
                <div className="card-body">
                    <h6 className="course-title">{title}</h6>
                </div>
            </div>
        </>
    );
};

export default CategoryCard;
