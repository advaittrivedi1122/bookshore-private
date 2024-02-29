import axios from "axios"

const makeQuery = async (query: string, variables: Record<string,any>, operationName: "Mutation" | "Query") => {
    try {
        const res: any = await axios.post(process.env.APOLLO_SERVER_URL as string + "graphql", {
            operationName: "Mutation",
            query: query,
            variables: variables
        }, {
            method: "POST",
            headers: {
                "mode": "no-cors",
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
            }
        })
        if (res) {
            console.log("🚀 ~ makeQuery ~ res:", res.data.data)
            return res.data.data
        }
    } catch (error:any) {
        console.log("🚀 ~ makeQuery ~ error:", error)
        return error.message
    }
    
}

export default makeQuery;