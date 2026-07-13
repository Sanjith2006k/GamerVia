import Button from "../../../components/Button/Button";

const PriceComparison = ({ deals }) => {
  console.log("PriceComparison deals:", deals);
  if (!deals || !deals.deals || deals.deals.length === 0) {
    return null;
  }

  // Find the cheapest deal to highlight
  const cheapestDealId = deals.deals[0].dealID;

  return (
    <div className="mb-12">
      <h3 className="text-2xl font-heading font-semibold text-white mb-6">Price Comparison</h3>
      
      <div className="glass rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/5 border-b border-white/10 text-text-muted text-sm uppercase tracking-wider">
              <th className="p-4 font-semibold">Store</th>
              <th className="p-4 font-semibold">Price</th>
              <th className="p-4 font-semibold">Discount</th>
              <th className="p-4 font-semibold text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {deals.deals.map((deal, index) => {
              const isCheapest = deal.dealID === cheapestDealId;
              
              return (
                <tr 
                  key={deal.dealID} 
                  className={`border-b border-white/5 hover:bg-white/5 transition-colors ${
                    isCheapest ? "bg-accent/10 relative" : ""
                  }`}
                >
                  <td className="p-4 text-white font-medium">
                    {deal.storeName}
                  </td>
                  <td className="p-4">
                    <span className="text-lg font-bold text-white">${deal.price}</span>
                    {deal.savings > 0 && (
                      <span className="text-sm text-text-muted line-through ml-2">${deal.retailPrice}</span>
                    )}
                  </td>
                  <td className="p-4">
                    {deal.savings > 0 ? (
                      <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-sm font-semibold">
                        -{parseFloat(deal.savings).toFixed(0)}%
                      </span>
                    ) : (
                      <span className="text-text-muted">—</span>
                    )}
                    {isCheapest && (
                      <span className="ml-3 text-xs font-bold text-accent uppercase tracking-wider">Best Deal</span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <a href={`https://www.cheapshark.com/redirect?dealID=${deal.dealID}`} target="_blank" rel="noreferrer">
                      <Button variant={isCheapest ? "primary" : "outline"} size="sm">
                        Buy
                      </Button>
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PriceComparison;
