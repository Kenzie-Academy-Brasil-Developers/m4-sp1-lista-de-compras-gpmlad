import { Request ,Response } from "express";
import { database } from "./database";
import { iLists } from "./interfaces";

const idGenerator = (array: iLists[]) => {
  if(array.length === 0){
    return 1
  }
  const lastList: number = array.length - 1
  const id:number = array[lastList].id + 1
  return id
}

const getAllLists = (request:Request,response:Response): Response =>{
  return response.status(200).json(database);
}

const getListById = (request:Request,response:Response): Response =>{
  const {index} = request.listIndex
  return response.status(200).json(database[index]);
}

const creatList = (request:Request,response:Response): Response =>{
  const {listName,data} = request.body
  const id = idGenerator(database)

  const newList: iLists = {
    listName,
    data,
    id
  }
  database.push(newList)
  return response.status(201).json(newList)
}

const updateItemList = (request:Request,response:Response): Response =>{
  const {index,itemIndex} = request.listIndex
  if (typeof(itemIndex) == 'number') {

    database[index].data[itemIndex] = {...database[index].data[itemIndex],...request.body}

  }

  return response.status(200).json(database[index])
}

const deleteList = (request:Request,response:Response): Response =>{
  const { index } = request.listIndex
  database.splice(index,1)
  return response.status(204).send();
}

const deleteItemList = (request:Request,response:Response): Response =>{
  const {index,itemIndex} = request.listIndex

  if(itemIndex){
    database[index].data.splice(itemIndex,1)
  }
  return response.status(204).json()
}


export {getAllLists, getListById, creatList, deleteList,deleteItemList,updateItemList}