type iListRequiredKeys = "listName" | "data"
type iDataRequiredKeys = "name" | "quantity"

interface iListsRequest {
  listName: string,
  data: iData[]
}

interface iData {
  name: string,
  quantity: string
}


interface iLists extends iListsRequest{
  id: number,
}

export {iListsRequest, iListRequiredKeys,iDataRequiredKeys, iLists, iData}