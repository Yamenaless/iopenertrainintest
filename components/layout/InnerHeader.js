import Image from "next/image";

const InnerHeader = ({ image, altText, textPage, classHeader, navigation }) => {
    return (
        <div className={classHeader}>
            <div className="bg-image">
                <Image src={image} alt={altText} width={1920} height={300} />
            </div>
            <div className="big_titles2">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <nav aria-label="breadcrumb">
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item">
                                        <a href="/"> {navigation.home} </a>
                                    </li>
                                    <li
                                        className="breadcrumb-item active"
                                        aria-current="page">
                                        {textPage}
                                    </li>
                                </ol>
                            </nav>
                        </div>
                        <div className="col-md-6">
                            <div className="title-inn-slide">
                                <h1 title={altText}>{textPage}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InnerHeader;
