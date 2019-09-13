import { StockDetailsByFragmentQuery, StockDetailsBySymbolQuery } from "../../queries/stockDetail/stockDetailQueries";
import { StockDetailsDocument, StockDetails } from "../../../models/stock/stockDetails";

export const stockDetailsListByFragmentQueryHandler = (query: StockDetailsByFragmentQuery): Promise<StockDetailsDocument[]> => new Promise((resolve, reject) => {
    StockDetails.find()
        .or(
            [{ symbol: { $regex: query.fragment, $options: "i" } }, // Symbol match
            { name: { $regex: query.fragment, $options: "i" } }]    // Name match
        )
        .limit(6)
        .then((stockDetails: StockDetailsDocument[]) => {
            resolve(stockDetails)
        })
        .catch((err) => {
            reject(err)
        })
});

export let stockDetailsBySymbolQueryHandler = (query: StockDetailsBySymbolQuery): Promise<StockDetailsDocument> => new Promise((resolve, reject) => {
    StockDetails.findOne({ symbol: { $regex: new RegExp("^" + query.symbol, "i") } })
        .then((stockDetails: StockDetailsDocument) => {
            console.log(stockDetails)
            resolve(stockDetails)
        })
        .catch((err) => {
            reject(err)
        })
});

export let stockDetailsByIdQueryHandler = (_id: string): Promise<StockDetailsDocument> => new Promise((resolve, reject) => {
    StockDetails.findById(_id)
        .then((stockDetails: StockDetailsDocument) => {
            resolve(stockDetails)
        })
        .catch((err) => {
            console.log(err)
            reject(err)
        })
});