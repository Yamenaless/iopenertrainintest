"use client";
import {
    Document,
    Page,
    Image,
    Text,
    View,
    StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
    page: {
        flexDirection: "row",
    },
    section: {
        // margin: 10,
        // padding: 10,
        flexGrow: 1,
    },
    details: {
        // margin: 10,
        // padding: 10,
        // flexGrow: 1,
    },
    h3: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#a91314",
        marginBottom: 15,
    },
    h4: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#a91314",
        marginBottom: 15,
    },
    h5: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#222",
        marginBottom: 10,
    },
    p: {
        marginBottom: 25,
        fontSize: 12,
        color: "#575555",
        lineHeight: 1.5,
    },
    ul: {
        marginBottom: 15,
    },
    ol: {
        marginBottom: 15,
    },
    li: {
        fontSize: 12,
        marginBottom: 5,
        marginLeft: 5,
        marginRight: 5,
        color: "#575555",
        lineHeight: 1.5,
    },

    categoryContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    titleName: {
        color: "#fff",
        fontWeight: "bolder",
        position: "absolute",
        bottom: "210px",
        left: "90px",
    },
    cityName: {
        color: "#fff",
        fontWeight: "bold",
        position: "absolute",
        bottom: "140px",
        left: "90px",
    },
    datePdf: {
        color: "#fff",
        fontWeight: "bold",
        position: "absolute",
        bottom: "110px",
        left: "90px",
    },
    backgroundImage: {
        position: "absolute",
        width: "100%",
        height: "100%",
        zIndex: 1,
    },
    content: {
        paddingLeft: 15,
        paddingRight: 15,
        paddingBottom: 250,
    },
    logoImage: {
        with: "100%",
        marginTop: 5,
    },
    footerImage: {},
});

const PdfContentCourse = ({ details, titleName, datePdf, cityName }) => {
    const logoHead =
        "https://iopener-training.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fpdf-header.2398d66a.jpg&w=1080&q=75";
    const footerPdf =
        "https://iopener-training.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fpdf-footer.3191f640.jpg&w=640&q=75";
    const CoverImage =
        "https://iopener-training.com/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcover-pdf.24fa8a16.jpg&w=1920&q=75";
    // const logoHead =
    //     "http://localhost:3000/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fheader-pdf.05f2da53.png&w=1920&q=75";
    // const footerPdf =
    //     "http://localhost:3000/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Ffooter-pdf.21dc3b1b.png&w=1920&q=75";
    // const CoverImage =
    //     "http://localhost:3000/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fcover-pdf.24fa8a16.jpg&w=1920&q=75";

    const renderHtml = (html) => {
        if (!html) return null;

        // Remove <br> tags from the html string
        html = html.replace(/<br\s*\/?>/gi, "");

        const regexTag = /<([a-zA-Z0-9]+)>(.*?)<\/\1>/g;
        const output = [];
        let match;
        while ((match = regexTag.exec(html))) {
            switch (match[1]) {
                case "h4":
                    output.push(<Text style={styles.h4}>{match[2]}</Text>);
                    break;
                case "h5":
                    output.push(<Text style={styles.h5}>{match[2]}</Text>);
                    break;
                case "p":
                    output.push(<Text style={styles.p}>{match[2]}</Text>);
                    break;
                case "ul":
                case "ol":
                    const listItems = match[2].split("</li><li>");
                    listItems.forEach((item, index) => {
                        if (index === 0) item = item.replace("<li>", "");
                        if (index === listItems.length - 1)
                            item = item.replace("</li>", "");
                        output.push(<Text style={styles.li}>{item}</Text>);
                    });
                    break;
                default:
                    output.push(<Text>{match[2]}</Text>);
            }
        }
        return output;
    };

    return (
        <Document>
            <Page size="A4" style={styles.page}>
                <View style={[styles.section, styles.categoryContainer]}>
                    <Image
                        src={CoverImage}
                        style={styles.backgroundImage}
                        alt=""
                    />
                    <Text style={styles.titleName}>{titleName}</Text>
                </View>
            </Page>
            <Page size="A4" style={styles.page}>
                {/* <Image src={pagePdf} style={styles.backgroundImage} alt="" /> */}
                <View style={styles.details}>
                    <Image
                        src={logoHead}
                        style={styles.logoImage}
                        alt=""
                        fixed
                    />
                    {/* Render HTML details */}
                    <View style={styles.content}>{renderHtml(details)}</View>
                    <Image
                        src={footerPdf}
                        style={styles.footerImage}
                        alt=""
                        fixed
                    />
                </View>
            </Page>
        </Document>
    );
};

export default PdfContentCourse;
