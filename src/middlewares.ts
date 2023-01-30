import { NextFunction, request, Request,Response } from "express"
import { database } from "./database"
import { iData, iDataRequiredKeys, iListRequiredKeys } from "./interfaces"

const ensureListExists = (request: Request, response: Response, next: NextFunction): Response | void => {
  const {id} = request.params

  const findListIndex: number = database.findIndex((list) => list.id === Number(id))

  if(findListIndex === -1){
    return response.status(404).json({message: `List with id ${id} does not exist`})
  }

  request.listIndex = {
      index: findListIndex
    }

  next()
}

const ensureItemListExists = (request: Request, response: Response, next: NextFunction): Response | void => {
  const { name } = request.params
  const  { index } = request.listIndex

  const findItemListIndex: number = database[index].data.findIndex((item) => item.name === name)

  if(findItemListIndex === -1){
    return response.status(404).json({message: `Item with name ${name} does not exist`})
  }

  request.listIndex = {
    index: index,
    itemIndex: findItemListIndex
  }

  next()
}

const validateBodyRequest = (request: Request, response: Response, next: NextFunction): Response | void => {

  try {
    const keys: Array<string> = Object.keys(request.body)
    const dataKeys: Array<any> = []

    request.body.data.forEach((element:iData) => {
      dataKeys.push((Object.keys(element)))
    });

    const requiredKeys: Array<iListRequiredKeys> = ["data", "listName"]
    const requiredDataKeys: Array<iDataRequiredKeys> = ["name","quantity"]

    const validatedKeys: boolean = requiredKeys.every((key)=> keys.includes(key))

    if(!validatedKeys || keys.length !== requiredKeys.length){
      return response.status(400).json({message: `Required fields are: listName and data`})
    }

    if(typeof(request.body.listName) !== "string"){
      return response.status(400).json({message: "The list name need to be a string"})
    }

    dataKeys.forEach(element => {
      const validatedDataKeys: boolean = requiredDataKeys.every(key => element.includes(key))
      if(!validatedDataKeys || element.length !== requiredDataKeys.length){
        return response.status(400).json({message: `Required fields are: name and quatity`})
      }  
    })

    next()

  } catch (error) {
    return response.status(404).json({message: `Required fields are: listName and data`})
  }
}

const validateDataBodyRequest = (request:Request, response: Response, next: NextFunction): Response | void => {
  const keys: Array<string> = Object.keys(request.body)
  const values: Array<any> = Object.values(request.body)
  const requiredDataKeys: Array<iDataRequiredKeys> = ["name","quantity"]

  const validatedKeys: boolean = keys.every((key:any) => requiredDataKeys.includes(key))
  const validatedTypeKeys: boolean = values.every((key:any) => typeof(key) === 'string')

  if(!validatedKeys){
    return response.status(400).json({message: "Updatable fields are: name and quantity"})
  }

  if(!validatedTypeKeys){
    return response.status(400).json({message: "Content must be a string"})
  }

  next()
}

export {ensureListExists, ensureItemListExists, validateBodyRequest, validateDataBodyRequest}