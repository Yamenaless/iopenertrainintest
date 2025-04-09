const CurrencySymbol = ({ currency }) => {
    const symbolMap = {
        Euro: "€",
        USD: "$",
        Pound: "£",
    };

    const symbol = symbolMap[currency];

    return <span> {symbol ? symbol : currency}</span>;
};

export default CurrencySymbol;
